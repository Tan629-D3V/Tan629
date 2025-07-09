'use client'

import { Box, Text, Flex } from '@chakra-ui/react'
import { keyframes } from '@chakra-ui/system'

const pulseGlow = keyframes`
  0% { text-shadow: 0 0 10px rgba(220, 220, 220, 0.2); }
  50% { text-shadow: 0 0 35px rgba(255, 255, 255, 0.5); }
  100% { text-shadow: 0 0 10px rgba(220, 220, 220, 0.2); }
`

export default function Footer() {
  return (
    <Flex
      as="footer"
      align="center"
      justify="center"
      overflow="hidden"
      w="100%"
      minH={{ base: '60px', md: '180px' }}
      m={0}
      p={0}
      bg="transparent"
    >
      <Text
        maxW="100vw"
        mx={0}
        mt={{ base: 0, md: '-8rem' }}
        mb={{ base: 0, md: '-12rem' }}
        fontFamily="sans-serif"
        fontSize={{ base: '5.5rem', sm: '6rem', md: '8rem', lg: '14rem', xl: '18rem' }}
        fontWeight="thin"
        lineHeight="1"
        letterSpacing={{ base: '0.12em', md: '0.05em' }}
        textAlign="center"
        bgGradient="linear(to-r, gray.600, gray.400)"
        bgClip="text"
        textShadow="0 0 10px rgba(220, 220, 220, 0.2)"
        _hover={{
          animation: `${pulseGlow} 3s ease-in-out infinite`,
        }}
        overflowWrap="break-word"
        transition="text-shadow 0.4s ease"
      >
        TANMAY
      </Text>
    </Flex>
  )
} 