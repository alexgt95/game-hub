import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import App from './App'
import theme from './theme'
import { ColorModeProvider } from './components/ui/color-mode'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider value={theme}>
      <ColorModeProvider defaultTheme="dark" enableSystem={false}>
        <App />
      </ColorModeProvider>
    </ChakraProvider>
  </React.StrictMode>
)