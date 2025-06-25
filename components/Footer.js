'use client'

import { Box, Text, keyframes } from '@chakra-ui/react'

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
      h={{ base: '180px', md: '240px' }}
      py={10}
      display="flex"
      alignItems="center"
      justifyContent="center"
      overflow="hidden"
    >
      <Text
        mt={{ base: '-2rem', md: '-15rem' }}
        mb={{ base: '-2rem', md: '-22rem' }}
        lineHeight="1"
        fontSize={{ base: '9xl', md: '22rem' }}
        fontWeight="thin"
        letterSpacing={{ base: '0.2em', md: '0.03em' }}
        fontFamily="sans-serif"
        bgGradient="linear(to-r, gray.600, gray.400)"
        bgClip="text"
        textAlign="center"
        textShadow="0 0 10px rgba(220, 220, 220, 0.2)"
        transition="text-shadow 0.4s ease"
        _hover={{
          animation: `${pulseGlow} 3s ease-in-out infinite`,
        }}
      >
        TANMAY
      </Text>
    </Box>
  )
} 