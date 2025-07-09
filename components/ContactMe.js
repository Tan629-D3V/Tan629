import {
  Link,
  Button,
  chakra,
  Heading,
  Stack,
  Text,
  SlideFade,
} from '@chakra-ui/react'
import useMediaQuery from '../hook/useMediaQuery'
import { FaLinkedin, FaEnvelope, FaGithub, FaFileAlt, FaRegComments } from 'react-icons/fa'
import ReactGA from 'react-ga4'
import { ScaleFade } from '@chakra-ui/react'

export default function ContactMe({ contactMe }) {
  const isLargerThan800 = useMediaQuery(800)
  const handleClick = (event) => {
    ReactGA.event({
      category: 'click',
      action: event,
    })
  }
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      w="100%"
      mt={{ base: '0', md: '5rem' }}
      mb={{ base: '0', md: '2rem' }}
      spacing={10}
    >
      <ScaleFade
        transition={{ enter: { duration: 0.7, delay: 0.2 } }}
        in={true}
        initialScale={0.9}
      >
        <Heading
          fontSize={{ base: '8xl', md: '7xl' }}
           textAlign="center"
            bgGradient="linear(to-r, gray.600, gray.400)"
          bgClip="text"
          _hover={{
            transform: 'scale(1.1)',
            textShadow: '0 0 20px rgba(60, 207, 145, 0.3)',
          }}
          transition="all 0.3s ease"
        >
          Keep In Touch.
        </Heading>
      </ScaleFade>

      <SlideFade
        direction="bottom"
        transition={{ enter: { duration: 0.7, delay: 0.4 } }}
        in={true}
      >
        <Text
          color="textSecondary"
          fontSize="xl"
          textAlign="center"
          _hover={{
            transform: 'translateY(-1px)',
            color: 'white',
          }}
          transition="all 0.3s ease"
        >
          {contactMe && contactMe.length > 0 && contactMe[0].fields ? (
            <>
              {contactMe[0].fields.title}{' '}
              <chakra.span
                color="button1"
                display={{ base: 'block', md: 'inline' }}
              >
                {' '}
                {contactMe[0].fields.highlightText}
              </chakra.span>
              .
              <br />
              {contactMe[0].fields.description}
            </>
          ) : (
            <>
              I'm always open to discussing new opportunities and{' '}
              <chakra.span
                color="button1"
                display={{ base: 'block', md: 'inline' }}
              >
                {' '}
                innovative projects.
              </chakra.span>
              <br />
              Whether it's a full-time role, internship, or collaboration -
              let's connect and build something amazing together!
            </>
          )}
        </Text>
      </SlideFade>

      <ScaleFade
        transition={{ enter: { duration: 1.0, delay: 0.6 } }}
        in={true}
        initialScale={0.8}
      >
        {/* <Stack align="center" mb={6}>
          <a href="mailto:tanmaychouhan826629@gmail.com?subject=Let%27s%20Talk" style={{ textDecoration: 'none' }}>
            <Button
              variant="ghost"
              color="white"
              size={isLargerThan800 ? 'md' : 'sm'}
              fontWeight="normal"
              px={5}
              py={3}
              borderRadius="lg"
              leftIcon={<FaRegComments color="#3CCF91" size={20} />}
              transition="all 0.3s cubic-bezier(0.4,0,0.2,1)"
              _hover={{
                transform: 'translateY(-2px) scale(1.04)',
                boxShadow: '0 4px 16px rgba(60, 207, 145, 0.15)',
                bg: 'rgba(60, 207, 145, 0.08)',
                color: 'white',
              }}
              _active={{ transform: 'translateY(-1px) scale(1.01)' }}
            >
              Let's Talk
            </Button>
          </a>
        </Stack> */}
        <Stack
          _hover={{ transform: 'scale(1.1)' }}
          transition="all 0.4s ease"
          isInline
          spacing={4}
        >
          <Link href="https://github.com/Tan629-D3V" isExternal>
            <Button
              pos="static"
              color="white"
              _hover={{
                transform: 'translateY(-3px) scale(1.05)',
                shadow: 'lg',
                boxShadow: '0 10px 25px rgba(60, 207, 145, 0.3)',
                bg: 'rgba(60, 207, 145, 0.1)',
              }}
              _active={{ transform: 'translateY(-1px) scale(1.02)' }}
              transition="all 0.3s ease"
              leftIcon={<FaGithub color="#3CCF91" />}
              onClick={() => handleClick('introduction_github')}
              size={isLargerThan800 ? 'md' : 'sm'}
            >
              Github
            </Button>
          </Link>
          <Link href="https://linkedin.com/in/tanmay19" isExternal>
            <Button
              pos="static"
              color="white"
              _hover={{
                transform: 'translateY(-3px) scale(1.05)',
                boxShadow: '0 10px 25px rgba(60, 207, 145, 0.3)',
                bg: 'rgba(60, 207, 145, 0.1)',
              }}
              _active={{ transform: 'translateY(-1px) scale(1.02)' }}
              transition="all 0.3s ease"
              leftIcon={<FaLinkedin color="#3CCF91" />}
              onClick={() => handleClick('introduction_linkedin')}
              size={isLargerThan800 ? 'md' : 'sm'}
            >
              LinkedIn
            </Button>
          </Link>
          <Link href="mailto:tanmaychouhan826629@gmail.com" isExternal>
            <Button
              pos="static"
              color="white"
              _hover={{
                transform: 'translateY(-3px) scale(1.05)',
                boxShadow: '0 10px 25px rgba(60, 207, 145, 0.3)',
                bg: 'rgba(60, 207, 145, 0.1)',
              }}
              _active={{ transform: 'translateY(-1px) scale(1.02)' }}
              transition="all 0.3s ease"
              leftIcon={<FaEnvelope fill="#3CCF91" />}
              onClick={() => handleClick('introduction_email')}
              size={isLargerThan800 ? 'md' : 'sm'}
            >
              Email
            </Button>
          </Link>
          
          <Link href="https://drive.google.com/file/d/1sG4-zdVapM_rTww-ToOll8-CQCYA-Pqv/view?usp=sharing" isExternal>
            <Button
              pos="static"
              color="white"
              _hover={{
                transform: 'translateY(-3px) scale(1.05)',
                boxShadow: '0 10px 25px rgba(60, 207, 145, 0.3)',
                bg: 'rgba(60, 207, 145, 0.1)',
              }}
              _active={{ transform: 'translateY(-1px) scale(1.02)' }}
              transition="all 0.3s ease"
              leftIcon={<FaFileAlt fill="#3CCF91" />}
              onClick={() => handleClick('introduction_resume')}
              size={isLargerThan800 ? 'md' : 'sm'}
            >
              Resume
            </Button>
          </Link>
        </Stack>
      </ScaleFade>
    </Stack>
  )
}
