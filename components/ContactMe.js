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
    <Stack alignItems="center" justifyContent="center" 
    w="100%" spacing={10} 
    mt={{ base: '0', md: '5rem' }} 
    mb={{ base: '0', md: '2rem' }}
    >
      <ScaleFade
        initialScale={0.9}
        in={true}
        transition={{ enter: { duration: 0.7, delay: 0.2 } }}
      >
        <Heading
          fontSize={{ base: '8xl', md: '7xl' }}
           bgGradient="linear(to-r, gray.600, gray.400)"
            bgClip="text"
          textAlign="center"
          transition="all 0.3s ease"
          _hover={{
            transform: 'scale(1.1)',
            textShadow: '0 0 20px rgba(60, 207, 145, 0.3)',
          }}
        >
          Keep In Touch.
        </Heading>
      </ScaleFade>

      <SlideFade
        direction="bottom"
        in={true}
        transition={{ enter: { duration: 0.7, delay: 0.4 } }}
      >
        <Text
          color="textSecondary"
          fontSize="xl"
          textAlign="center"
          transition="all 0.3s ease"
          _hover={{
            transform: 'translateY(-1px)',
            color: 'white',
          }}
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
        initialScale={0.8}
        in={true}
        transition={{ enter: { duration: 1.0, delay: 0.6 } }}
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
          isInline
          spacing={4}
          transition="all 0.4s ease"
          _hover={{ transform: 'scale(1.1)' }}
        >
          <Link href="https://github.com/Tan629-D3V" isExternal>
            <Button
              pos="static"
              color="white"
              leftIcon={<FaGithub color="#3CCF91" />}
              onClick={() => handleClick('introduction_github')}
              size={isLargerThan800 ? 'md' : 'sm'}
              transition="all 0.3s ease"
              _hover={{
                transform: 'translateY(-3px) scale(1.05)',
                boxShadow: '0 10px 25px rgba(60, 207, 145, 0.3)',
                bg: 'rgba(60, 207, 145, 0.1)',
              }}
              _active={{ transform: 'translateY(-1px) scale(1.02)' }}
            >
              Github
            </Button>
          </Link>
          <Link href="https://linkedin.com/in/tanmay19" isExternal>
            <Button
              pos="static"
              color="white"
              leftIcon={<FaLinkedin color="#3CCF91" />}
              onClick={() => handleClick('introduction_linkedin')}
              size={isLargerThan800 ? 'md' : 'sm'}
              transition="all 0.3s ease"
              _hover={{
                transform: 'translateY(-3px) scale(1.05)',
                boxShadow: '0 10px 25px rgba(60, 207, 145, 0.3)',
                bg: 'rgba(60, 207, 145, 0.1)',
              }}
              _active={{ transform: 'translateY(-1px) scale(1.02)' }}
            >
              LinkedIn
            </Button>
          </Link>
          <Link href="mailto:tanmaychouhan826629@gmail.com" isExternal>
            <Button
              pos="static"
              color="white"
              transition="all 0.3s ease"
              leftIcon={<FaEnvelope fill="#3CCF91" />}
              onClick={() => handleClick('introduction_email')}
              size={isLargerThan800 ? 'md' : 'sm'}
              _hover={{
                transform: 'translateY(-3px) scale(1.05)',
                boxShadow: '0 10px 25px rgba(60, 207, 145, 0.3)',
                bg: 'rgba(60, 207, 145, 0.1)',
              }}
              _active={{ transform: 'translateY(-1px) scale(1.02)' }}
            >
              Email
            </Button>
          </Link>
          
          <Link href="https://drive.google.com/file/d/1sG4-zdVapM_rTww-ToOll8-CQCYA-Pqv/view?usp=sharing" isExternal>
            <Button
              pos="static"
              color="white"
              transition="all 0.3s ease"
              leftIcon={<FaFileAlt fill="#3CCF91" />}
              onClick={() => handleClick('introduction_resume')}
              size={isLargerThan800 ? 'md' : 'sm'}
              _hover={{
                transform: 'translateY(-3px) scale(1.05)',
                boxShadow: '0 10px 25px rgba(60, 207, 145, 0.3)',
                bg: 'rgba(60, 207, 145, 0.1)',
              }}
              _active={{ transform: 'translateY(-1px) scale(1.02)' }}
            >
              Resume
            </Button>
          </Link>
        </Stack>
      </ScaleFade>
    </Stack>
  )
}
