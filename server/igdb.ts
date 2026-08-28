import type { Plugin } from "vite";

interface IgdbGame {
  id: number;
  name: string;
  cover?: { id: number; image_id: string };
  platforms?: Array<{
    id: number;
    name: string;
    slug: string;
    abbreviation?: string;
    platform_family?: number;
  }>;
  aggregated_rating?: number;
}

interface IgdbGenre {
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
  /* fetch no lanza error en respuestas HTTP 4xx/5xx — solo lo hace si falla la red.
  Por eso hay que chequear response.ok manualmente y lanzar un error propio con el código
  y el cuerpo de la respuesta para debug. */
  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Twitch token failed: ${response.status} ${details}`);
  }

  const data = (await response.json()) as {
    /* un token y sus segundos de vida. */
    access_token: string;
    expires_in: number;
  };

  tokenCache = {
    /* el token y su fecha de expiración. */
    value: data.access_token,
    /* restamos 60s para que el token no expire justo en el momento de usarlo. */
    expiresAt: Date.now() + (data.expires_in - 60) * 1000,
  };

  console.log(`[igdb] Twitch token ok, expires in ${data.expires_in}s`);
  /* devolvemos el token para que se pueda usar en la siguiente petición. */
  return tokenCache.value;
}

async function fetchGames(clientId: string, clientSecret: string, genreId?: string) {
  /* obtenemos el token para la siguiente petición (usado o nuevo) */
  const accessToken = await getTwitchToken(clientId, clientSecret);
  /* hacemos la petición a la API de IGDB. */

  const whereClauses = ["rating_count != null", "cover != null"];
  if (genreId) {
    whereClauses.push(`genres = (${genreId})`);
  }

  const response = await fetch("https://api.igdb.com/v4/games", {
    method: "POST",
    headers: {
      "Client-ID": clientId,
      Authorization: `Bearer ${accessToken}`,
    },
    body: `fields *, id,name,cover.image_id,platforms.name,platforms.abbreviation,platforms.slug,platforms.platform_family; sort rating_count desc; where ${whereClauses.join(" & ")}; limit 20;`,
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

async function fetchGenres(clientId: string, clientSecret: string) {
  const accessToken = await getTwitchToken(clientId, clientSecret);

  const response = await fetch("https://api.igdb.com/v4/genres", {
    method: "POST",
    headers: {
      "Client-ID": clientId,
      Authorization: `Bearer ${accessToken}`,
    },
    body: "fields id,name; sort name asc; limit 50;",
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`IGDB failed: ${response.status} ${details}`);
  }

  const results = (await response.json()) as IgdbGenre[];
  console.log(`[igdb] IGDB returned ${results.length} genres`);
  return { count: results.length, results };
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

        const { searchParams } = new URL(req.url ?? "", "http://localhost");
        const genresParam = searchParams.get("genres");
        const genreId = genresParam && /^\d+$/.test(genresParam) ? genresParam : undefined;

        console.log(
          `[igdb] GET /api/games  clientId=${clientId.slice(0, 6)}…  genres=${genreId ?? "any"}`
        );

        try {
          const data = await fetchGames(clientId, clientSecret, genreId);
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

      server.middlewares.use("/api/genres", async (req, res) => {
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
          `[igdb] GET /api/genres  clientId=${clientId.slice(0, 6)}…`
        );

        try {
          const data = await fetchGenres(clientId, clientSecret);
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
