import type { Plugin } from "vite";

interface IgdbGame {
  id: number;
  name: string;
}

interface TokenCache {
  value: string;
  expiresAt: number;
}

let tokenCache: TokenCache | null = null;

async function getTwitchToken(clientId: string, clientSecret: string) {
  if (tokenCache && Date.now() < tokenCache.expiresAt) {
    console.log("[igdb] reusing cached Twitch token");
    return tokenCache.value;
  }

  console.log("[igdb] requesting Twitch app token");
  const url = new URL("https://id.twitch.tv/oauth2/token");
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("client_secret", clientSecret);
  url.searchParams.set("grant_type", "client_credentials");

  const response = await fetch(url, { method: "POST" });
  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Twitch token failed: ${response.status} ${details}`);
  }

  const data = (await response.json()) as {
    access_token: string;
    expires_in: number;
  };

  tokenCache = {
    value: data.access_token,
    expiresAt: Date.now() + (data.expires_in - 60) * 1000,
  };

  console.log(`[igdb] Twitch token ok, expires in ${data.expires_in}s`);
  return tokenCache.value;
}

async function fetchGames(clientId: string, clientSecret: string) {
  const accessToken = await getTwitchToken(clientId, clientSecret);

  const response = await fetch("https://api.igdb.com/v4/games", {
    method: "POST",
    headers: {
      "Client-ID": clientId,
      Authorization: `Bearer ${accessToken}`,
    },
    body: "fields id,name; sort rating_count desc; where rating_count != null; limit 20;",
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`IGDB failed: ${response.status} ${details}`);
  }

  const results = (await response.json()) as IgdbGame[];
  console.log(
    `[igdb] IGDB returned ${results.length} games:`,
    results.slice(0, 3).map((game) => game.name)
  );
  return { count: results.length, results, source: "igdb" };
}

export function igdbApi(env: Record<string, string>): Plugin {
  return {
    name: "igdb-api",
    configureServer(server) {
      server.middlewares.use("/api/games", async (req, res) => {
        if (req.method !== "GET") {
          res.statusCode = 405;
          res.end();
          return;
        }

        const clientId = env.TWITCH_CLIENT_ID;
        const clientSecret = env.TWITCH_CLIENT_SECRET;

        if (!clientId || !clientSecret) {
          console.error("[igdb] missing TWITCH_CLIENT_ID or TWITCH_CLIENT_SECRET");
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.end(
            JSON.stringify({
              error:
                "Missing TWITCH_CLIENT_ID or TWITCH_CLIENT_SECRET in .env",
            })
          );
          return;
        }

        console.log(
          `[igdb] GET /api/games  clientId=${clientId.slice(0, 6)}…`
        );

        try {
          const data = await fetchGames(clientId, clientSecret);
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(data));
        } catch (error) {
          console.error("[igdb] request failed:", error);
          res.statusCode = 502;
          res.setHeader("Content-Type", "application/json");
          res.end(
            JSON.stringify({
              error:
                error instanceof Error ? error.message : "IGDB request failed",
            })
          );
        }
      });
    },
  };
}
