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
} from '@chakra-ui/react'
import NextLink from 'next/link'
import Image from 'next/image'

const NavbarDrawer = ({ isOpen, onClose }) => {
  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      placement="right"
    >
      <DrawerOverlay />
      <DrawerContent bgColor="secondary">
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth="1px">
          <Box
            w="40px"
            h="40px"
            position="relative"
          >
            <Image
              src="/tan629.svg"
              alt="Tan629 Logo"
              width={40}
              height={40}
              priority
            />
          </Box>
        </DrawerHeader>

        <DrawerBody>
          <Stack spacing="24px">
            <NextLink passHref href="/">
              <Button as="a" fontSize="16px" variant="ghost">
                Home
              </Button>
            </NextLink>
            <NextLink passHref href="/projects">
              <Button as="a" fontSize="16px" variant="ghost">
                Projects
              </Button>
            </NextLink>
          </Stack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

export default NavbarDrawer 