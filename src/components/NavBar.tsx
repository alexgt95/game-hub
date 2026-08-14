import { HStack, Image, Text } from '@chakra-ui/react'
import logo from '../assets/logo.webp'
import { ColorModeButton } from './ui/color-mode'

const NavBar = () => {
  return (
    <HStack>
        <Image src={logo} alt="Logo" boxSize="60px" />
        <ColorModeButton />
        <Text fontSize="2xl" fontWeight="bold">
            NavBar
        </Text>
    </HStack>
  )
}

export default NavBar