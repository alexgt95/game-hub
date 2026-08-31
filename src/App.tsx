import { useState } from "react"
import { Grid, GridItem, Box } from "@chakra-ui/react"
import NavBar from "./components/NavBar"
import GameGrid from "./components/GameGrid"
import GenreList from "./components/GenreList"
import PlatformSelector from "./components/PlatformSelector"
import { Genre } from "./types/Genre"
import { Platform } from "./types/Platform"

export interface GameQuery {
  genre: Genre | null;
  platform: Platform | null;
}

function App() {
  const [gameQuery, setGameQuery] = useState<GameQuery>({ genre: null, platform: null });

  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav"
      "aside main"`,
      }}
      templateColumns={{ base: '1fr', lg: '200px 1fr' }}
    >
      <GridItem area="nav">
        <NavBar />
      </GridItem>
      <Box display={{ base: 'none', lg: 'block' }} gridArea="aside" paddingX={5}>
        <GenreList selectedGenre={gameQuery.genre ?? null} onSelectGenre={(genre) => setGameQuery({ ...gameQuery, genre })} />
      </Box>
      <GridItem area="main">
        <PlatformSelector selectedPlatform={gameQuery.platform ?? null} onSelectPlatform={(platform) => setGameQuery({ ...gameQuery, platform })} />
        <GameGrid gameQuery={gameQuery} />
      </GridItem>
    </Grid>
  )
}

export default App