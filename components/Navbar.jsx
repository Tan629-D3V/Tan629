import React, { useRef } from 'react'
import {
  Button,
  Flex,
  Box,
  Text,
  Slide,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Stack,
  Icon,
  Image,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import styled from '@emotion/styled'
import useMediaQuery from '../hook/useMediaQuery'
import { AiOutlineMenu } from 'react-icons/ai'
import NavbarDrawer from './NavbarDrawer'
import Link from 'next/link'

// Add fade-in animation for the logo
const fadeInLogo = `
@keyframes fadeInLogo {
  0% { opacity: 0; transform: scale(0.8); }
  100% { opacity: 1; transform: scale(1.2); }
}
`;
if (typeof window !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = fadeInLogo;
  document.head.appendChild(style);
}

export default function Navbar({ enableTransition }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const isLargerThan768 = useMediaQuery(768)
  const firstField = useRef()
  const Bracket = styled.span`
    color: #8f9094;
    font-weight: 600;
  `

  return (
    <Box pos="sticky" top={0} zIndex={200}>
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        direction="row"
        w="100%"
        px={{ base: 10, md: 36 }}
        py={{ base: 2, md: 6 }}
        bg="rgba(0, 0, 0, 0)"
        backdropFilter="blur(10px)"
        // borderBottom="1px solid rgba(0, 0, 0, 0))"
        // boxShadow="0 0 25px rgba(0, 0, 0, 0)"
        style={{ position: 'sticky', top: 0, zIndex: 200 }}
      >
        <Box
          as={Link}
          href="https://tan629.vercel.app/"
          display="flex"
          alignItems="center"
          className="navbar-logo-wrapper"
          _hover={{ opacity: 0.9, transform: 'scale(1.2)' }}
          transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
          w={{ base: 12, md: 20 }}
          h={{ base: 12, md: 20 }}
          style={{ justifyContent: 'center', margin: '0 1rem', animation: 'fadeInLogo 1.2s ease' }}
          borderRadius="full"
        >
          <Image
            src="/Tan629logo.png"
            alt="Tan629 Logo"
            w="100%"
            h="100%"
            objectFit="contain"
            borderRadius="full"
            style={{ display: 'block' }}
          />
        </Box>
        {isLargerThan768 ? (
          <Box mr={7} color="displayColor">
            <NextLink passHref href="/">
              <Button as="a" p="4" fontSize={{ base: 'sm', md: 'lg' }} variant="ghost" transition="all 0.2s ease-in-out" _hover={{ color: 'white', bg: 'rgba(60, 207, 145, 0.1)' }}>
                Home
              </Button>
            </NextLink>
            <NextLink passHref href="/projects">
              <Button as="a" p="4" fontSize={{ base: 'sm', md: 'lg' }} variant="ghost" transition="all 0.2s ease-in-out" _hover={{ color: 'white', bg: 'rgba(60, 207, 145, 0.1)' }}>
                Projects
              </Button>
            </NextLink>
          </Box>
        ) : (
          <Icon as={AiOutlineMenu} w={{ base: 6, md: 7 }} h={{ base: 6, md: 7 }} onClick={onOpen} />
        )}
      </Flex>
      <NavbarDrawer isOpen={isOpen} onClose={onClose} />
    </Box>
  )
}
