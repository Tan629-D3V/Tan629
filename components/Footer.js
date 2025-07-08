'use client'

import { Box, Text } from '@chakra-ui/react'
import { keyframes } from '@chakra-ui/system'

const pulseGlow = keyframes`
  0% { text-shadow: 0 0 10px rgba(220, 220, 220, 0.2); }
  50% { text-shadow: 0 0 35px rgba(255, 255, 255, 0.5); }
  100% { text-shadow: 0 0 10px rgba(220, 220, 220, 0.2); }
`

export default function Footer() {
  return (
    <Box
      as="footer"
      bg="transparent"
      w="100%"
      minH={{ base: '60px', md: '180px' }}
      display="flex"
      alignItems="center"
      justifyContent="center"
      overflow="hidden"
      p={0}
      m={0}
    >
      <Text
        mt={{ base: 0, md: '-8rem' }}
        mb={{ base: 0, md: '-12rem' }}
        mx={0}
        lineHeight="1"
        fontSize={{ base: '5.5rem', sm: '6rem', md: '8rem', lg: '14rem', xl: '18rem' }}
        fontWeight="thin"
        letterSpacing={{ base: '0.12em', md: '0.05em' }}
        fontFamily="sans-serif"
        bgGradient="linear(to-r, gray.600, gray.400)"
        bgClip="text"
        textAlign="center"
        textShadow="0 0 10px rgba(220, 220, 220, 0.2)"
        transition="text-shadow 0.4s ease"
        _hover={{
          animation: `${pulseGlow} 3s ease-in-out infinite`,
        }}
        maxW="100vw"
        overflowWrap="break-word"
      >
        TANMAY
      </Text>

      
    </Box>
  )
} 