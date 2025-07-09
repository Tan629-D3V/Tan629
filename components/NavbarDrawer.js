import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Button,
  Stack,
  Box,
  IconButton,
  Text,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'

const MotionIconButton = motion(IconButton)

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'About', href: '#about-me', scroll: true },
  { label: 'Contact', href: '#contact-me', scroll: true },
]

const glassBg = {
  bg: 'rgba(8,8,8,0.85)',
  backdropFilter: 'blur(18px) saturate(180%)',
  borderRadius: '2xl',
  boxShadow: '0 8px 32px 0 rgba(0,0,0,0.37)',
  border: '1.5px solid #111111',
}

const linkStyle = {
  w: '100%',
  fontSize: 'xl',
  fontWeight: 'semibold',
  color: 'displayColor',
  variant: 'ghost',
  borderRadius: 'lg',
  py: 4,
  px: 2,
  transition: 'all 0.2s',
  _hover: {
    color: 'button1',
    bg: 'rgba(60, 207, 145, 0.08)',
    transform: 'scale(1.04)',
  },
}

const AnimatedMenuIcon = ({ isOpen, ...props }) => (
  <motion.div
    animate={{ rotate: isOpen ? 90 : 0 }}
    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    style={{ display: 'inline-block' }}
    {...props}
  >
    {isOpen ? <AiOutlineClose size={32} /> : <AiOutlineMenu size={32} />}
  </motion.div>
)

const NavbarDrawer = ({ isOpen, onClose }) => {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="right" size="xs">
      <DrawerOverlay />
      <DrawerContent {...glassBg} p={0}>
        <DrawerCloseButton
          as={MotionIconButton}
          top={4}
          right={4}
          color="displayColor"
          bg="transparent"
          _hover={{ color: 'button1', bg: 'rgba(60, 207, 145, 0.08)' }}
          transition="all 0.2s"
          aria-label="Close menu"
          icon={<AnimatedMenuIcon isOpen={true} />}
          size="lg"
        />
        <DrawerHeader pt={12} pb={4} textAlign="center" borderBottomWidth="0">
          <Box w="60px" h="60px" mx="auto" mb={2}>
            <Image
              src="/cropped_circle_image.png"
              alt="Tan629 Logo"
              width={60}
              height={60}
              style={{ borderRadius: '50%' }}
              priority
            />
          </Box>
          <Text color="displayColor" fontSize="2xl" fontWeight="bold">
            Tanmay Chouhan
          </Text>
        </DrawerHeader>
        <DrawerBody px={0} pt={6}>
          <Stack align="center" w="100%" spacing={2}>
            {navLinks.map((link) =>
              link.scroll ? (
                <Button
                  key={link.label}
                  {...linkStyle}
                  aria-label={`Scroll to ${link.label} section`}
                  onClick={e => {
                    e.preventDefault();
                    onClose();
                    setTimeout(() => {
                      const el = document.getElementById(link.href.replace('#', ''));
                      if (el) {
                        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      } else {
                        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                      }
                    }, 200);
                  }}
                >
                  {link.label}
                </Button>
              ) : (
                <NextLink passHref href={link.href} key={link.label}>
                  <Button {...linkStyle} as="a" onClick={onClose}>
                    {link.label}
                  </Button>
                </NextLink>
              )
            )}
          </Stack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

export default NavbarDrawer 