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
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'
import { motion } from 'framer-motion'
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

  const AnimatedMenuIcon = ({ isOpen }) => (
    <motion.div
      animate={{ rotate: isOpen ? 90 : 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{ display: 'inline-block' }}
    >
      {isOpen ? <AiOutlineClose size={32} /> : <AiOutlineMenu size={32} />}
    </motion.div>
  )

  return (
    <Box pos="sticky" top={0} zIndex={200} bg="charcoal" shadow="sm">
      <Flex
        as="nav"
        w="100%"
        direction="row"
        align="center"
        justify="space-between"
        px={{ base: 10, md: 36 }}
        py={{ base: 2, md: 6 }}
        bg="charcoal"
        color="white"
        shadow="sm"
        backdropFilter="blur(10px)"
        style={{ position: 'sticky', top: 0, zIndex: 200 }}
      >
        <Box
          as="button"
          className="navbar-logo-wrapper"
          style={{ justifyContent: 'center', margin: '0 1rem', animation: 'fadeInLogo 1.2s ease' }}
          w={{ base: 12, md: 20 }}
          h={{ base: 12, md: 20 }}
          d="flex"
          alignItems="center"
          borderRadius="full"
          transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
          _hover={{ opacity: 0.9, transform: 'scale(1.2)' }}
          onClick={() => window.location.href = '/'}
          aria-label="Homepage"
        >
          <Image
            src="/cropped_circle_image.png"
            alt="Tan629 Logo"
            w="100%"
            h="100%"
            objectFit="contain"
            borderRadius="full"
            style={{ display: 'block' }}
          />
        </Box>
        <Box
          display={{ base: 'none', md: 'flex' }}
          alignItems="center"
          gap={2}
          color="displayColor"
          mr={7}
        >
          <NextLink passHref href="/">
            <Button
              as="a"
              variant="ghost"
              p="4"
              fontSize={{ base: 'sm', md: 'lg' }}
              transition="all 0.2s ease-in-out"
              _hover={{ color: 'white', bg: 'rgba(60, 207, 145, 0.1)' }}
            >
              Home
            </Button>
          </NextLink>
          <Button
            as="a"
            variant="ghost"
            href="#about-me"
            p="4"
            fontSize={{ base: 'sm', md: 'lg' }}
            transition="all 0.2s ease-in-out"
            _hover={{ color: 'white', bg: 'rgba(60, 207, 145, 0.1)' }}
            onClick={e => {
              e.preventDefault();
              document.getElementById('about-me')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            About
          </Button>
          <NextLink passHref href="/projects">
            <Button
              as="a"
              variant="ghost"
              p="4"
              fontSize={{ base: 'sm', md: 'lg' }}
              transition="all 0.2s ease-in-out"
              _hover={{ color: 'white', bg: 'rgba(60, 207, 145, 0.1)' }}
            >
              Projects
            </Button>
          </NextLink>
          <Button
            as="a"
            variant="ghost"
            href="#contact-me"
            p="4"
            fontSize={{ base: 'sm', md: 'lg' }}
            transition="all 0.2s ease-in-out"
            _hover={{ color: 'white', bg: 'rgba(60, 207, 145, 0.1)' }}
            onClick={e => {
              e.preventDefault();
              const el = document.getElementById('contact-me');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              } else {
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
              }
            }}
            aria-label="Scroll to Contact section"
          >
            Contact
          </Button>
        </Box>
        {isLargerThan768 ? null : (
          <Box as="span" display="inline-block">
            <button
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              onClick={isOpen ? onClose : onOpen}
              style={{ background: 'none', border: 'none', padding: 0, margin: 0, cursor: 'pointer' }}
            >
              <AnimatedMenuIcon isOpen={isOpen} />
            </button>
          </Box>
        )}
      </Flex>
      <NavbarDrawer isOpen={isOpen} onClose={onClose} />
    </Box>
  )
}
