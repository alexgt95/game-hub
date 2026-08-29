import { useState } from "react"
import { Grid, GridItem, Box } from "@chakra-ui/react"
import NavBar from "./components/NavBar"
import GameGrid from "./components/GameGrid"
import GenreList from "./components/GenreList"
import PlatformSelector from "./components/PlatformSelector"
import { Genre } from "./types/Genre"
import { Platform } from "./types/Platform"

function App() {
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null);

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
        <GenreList selectedGenre={selectedGenre} onSelectGenre={setSelectedGenre} />
      </Box>
      <GridItem area="main">
        <PlatformSelector selectedPlatform={selectedPlatform} onSelectPlatform={setSelectedPlatform} />
        <GameGrid selectedGenre={selectedGenre} selectedPlatform={selectedPlatform} />
      </GridItem>
    </Grid>
  )
}

export default App