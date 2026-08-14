import { Grid, GridItem, Box } from "@chakra-ui/react"
import NavBar from "./components/NavBar"

function App() {
  return (
    <Grid templateAreas={{
      base: `"nav main"`,
      lg: `"nav nav"
      "aside main"`,
    }}>
      <GridItem area="nav">
        <NavBar />
      </GridItem>
      <Box display={{ base: 'none', lg: 'block' }} gridArea="aside">
        Aside
      </Box>
      <GridItem area="main">
        Main
      </GridItem>
    </Grid>
  )
}

export default App