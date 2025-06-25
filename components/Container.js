import { Box, Flex, Stack, Text, chakra } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import ReactGA from 'react-ga4'
import Footer from './Footer'
import Navbar from './Navbar.jsx'

const Container = ({ enableTransition, children }) => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    // Only initialize Google Analytics if UA code is provided
    if (process.env.NEXT_PUBLIC_UA_CODE && process.env.NEXT_PUBLIC_UA_CODE.trim() !== '') {
      ReactGA.initialize(process.env.NEXT_PUBLIC_UA_CODE)
    }
  }, [])

  useEffect(() => {
    setMounted(true)
  }, [])

  // fix hydration mismatch from using useMediaQuery hooks
  if (mounted)
    return (
      <Flex direction="column" minH="100vh">
        <Box
          w="100%"
          transition="0.4s"
          flex="1"
        >
          <Navbar enableTransition={enableTransition} />
          <Flex as="main" direction="column">
            {children}
          </Flex>
        </Box>
        <Footer />
      </Flex>
    )
}

export default Container
