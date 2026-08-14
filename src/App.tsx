import { Grid, GridItem, Box } from "@chakra-ui/react"

function App() {
  return (
    <Grid templateAreas={{
      base: `"nav main"`,
      lg: `"nav nav"
      "aside main"`,
    }}>
      <GridItem area="nav" bg="coral">
        Nav
      </GridItem>
      <Box display={{ base: 'none', lg: 'block' }} gridArea="aside" bg="gold">
        Aside
      </Box>
      <GridItem area="main" bg="dodgerblue">
        Main
      </GridItem>
    </Grid>
  )
}

export default App