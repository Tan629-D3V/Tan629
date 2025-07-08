import {
  Link,
  Text,
  Stack,
  Heading,
  Box,
  Button,
  SlideFade,
  Image,
  ScaleFade,
  Fade,
} from '@chakra-ui/react'
import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa'
import { motion } from 'framer-motion'
import useMediaQuery from '../hook/useMediaQuery'
import ReactGA from 'react-ga4'
import React, { useState, useEffect } from 'react'

// Motion components for lazy loading
const MotionBox = motion(Box)
const MotionStack = motion(Stack)
const MotionHeading = motion(Heading)
const MotionText = motion(Text)

export default function Introduction({ introduction }) {
  const isLargerThan800 = useMediaQuery(800)
  const isDesktop = useMediaQuery(1024);
  const handleClick = (event) => {
    ReactGA.event({
      category: 'click',
      action: event,
    })
  }

  return (
    <Stack
      alignItems={{ base: 'center', md: 'flex-start' }}
      justifyContent={{ base: 'center', md: 'flex-start' }}
      w="100%"
      minH="80vh"
      spacing={{ base: 6, md: 4 }}
      textAlign={{ base: 'center', md: 'left' }}
    >
      <Box
        display="inline-block"
        pos="relative"
        _hover={{
          transform: 'scale(1.08)',
          textShadow: '0 0 20px rgba(60, 207, 145, 0.3)'
        }}
      >
        
        <Text
          pos="relative"
          zIndex={1}
          color="button1"
          fontSize={{ base: '3xl', md: 'display2' }}
          fontWeight="medium"
          transition="all 0.3s ease"
          display="inline-block"
          _hover={{
            transform: 'scale(1.08)',
            textShadow: '0 0 20px rgba(60, 207, 145, 0.3)'
          }}
        >
          Hey there!, I'm-
        </Text>
      </Box>

      <Heading
        pos="relative"
        zIndex={1}
        paddingBottom={4}
        mt={-6}  
        bgGradient="linear(to-r, gray.600, gray.400)"
        bgClip="text"
        fontSize={{ base: '4.5rem', md: 'display' }}
        lineHeight={'95%'}
        letterSpacing={{ sm: '-1.5px', md: '-1.8px' }}
        display="inline-block"
        transition="all 0.3s ease"
        _hover={{
          transform: 'scale(1.04)',
          textShadow: '0 0 20px rgba(60, 207, 145, 0.3)',
        }}

      >
        Tanmay Chouhan.
      </Heading>

      <Heading
        bgGradient="linear(to-r, gray.600, gray.400)"
        bgClip="text"
        fontSize={{ base: '2xl', md: 'display2' }}
        fontWeight="medium"
        letterSpacing="-1.6px"
        display="inline-block"
        transition="all 0.3s ease"
        _hover={{
          transform: 'scale(1.05)',
          textShadow: '0 0 16px rgba(60, 207, 145, 0.2)'
        }}
      >
        <Box as="span" color="displayColor">
          {/* Typewriter effect for multiple titles, looping infinitely */}
          {(() => {
            const titles = [
              'Full Stack Developer',
              'Frontend Developer',
              'Software Engineer',
              'Backend Developer',
            ];
            const [displayed, setDisplayed] = useState('');
            const [titleIndex, setTitleIndex] = useState(0);
            useEffect(() => {
              const currentTitle = titles[titleIndex];
              if (displayed.length < currentTitle.length) {
                const timeout = setTimeout(() => {
                  setDisplayed(currentTitle.slice(0, displayed.length + 1));
                }, 70);
                return () => clearTimeout(timeout);
              } else {
                // Pause before next title
                const pause = setTimeout(() => {
                  setDisplayed('');
                  setTitleIndex((titleIndex + 1) % titles.length);
                }, 900);
                return () => clearTimeout(pause);
              }
            }, [displayed, titleIndex]);
            return (
              <>
                {displayed}
                <span
                  style={{
                    marginLeft: '2px',
                    width: '1ch',
                    animation: 'blink 1s steps(1) infinite',
                    fontWeight: 'inherit',
                    fontSize: 'inherit',
                    color: 'inherit',
                    verticalAlign: 'baseline',
                  }}
                >
                  |
                </span>
                <style>{`
                  @keyframes blink {
                    0%, 50% { opacity: 1; }
                    51%, 100% { opacity: 0; }
                  }
                `}</style>
              </>
            );
          })()}
        </Box>{' '}
        {/* Responsive: single line on mobile/tablet, line break on desktop */}
        {isDesktop ? (
          <>
            A self-taught developer with an<br />interest in Computer Science.
          </>
        ) : (
          <>
            A self-taught developer with an interest in Computer Science.
          </>
        )}
      </Heading>

      <Text 
        color="textSecondary" 
        fontSize={{ base: 'md', md: 'display3' }}
        display="inline-block"
        transition="all 0.3s ease"
        _hover={{
          transform: 'scale(1.04)',
          color: 'white',
          textShadow: '0 0 12px rgba(60, 207, 145, 0.15)'
        }}
      >
        {introduction && introduction[0] && introduction[0].fields ? (
          <>
            {introduction[0].fields.emoji} {introduction[0].fields.description}
            <br />
            <Stack isInline spacing={1} display="inline-block">
              <Box>{introduction[1] && introduction[1].fields ? introduction[1].fields.emoji : '💼'}</Box>
              <Box>
                {introduction[1] && introduction[1].fields ? introduction[1].fields.description : 'Currently working at'}{' '}
                {introduction[1] && introduction[1].fields && introduction[1].fields.companyUrl ? (
                  <Link
                    href={introduction[1].fields.companyUrl}
                    isExternal
                    onClick={() => handleClick('Introduction_companyUrl')}
                    rel="noreferrer"
                    transition="all 0.3s ease"
                    _hover={{ 
                      color: 'button1',
                      textDecoration: 'underline',
                      transform: 'translateY(-1px)'
                    }}
                  >
                    {introduction[1].fields.company}
                  </Link>
                ) : (
                  <Box as="span" color="button1">
                    {introduction[1] && introduction[1].fields ? introduction[1].fields.company : 'Various Projects'}
                  </Box>
                )}
              </Box>
            </Stack>
          </>
        ) : (
          <>
            🎓 Computer Science student at VIT Bhopal, passionate about Full Stack Development.
            <br />
            <Text display="inline-block">
              <span role="img" aria-label="briefcase">💼</span> Full Stack Developer Intern at{' '}
              <Box as="span" color="button1" display="inline">
                Suvidha Foundation
              </Box>
            </Text>
          </>
        )}
      </Text>

      <ScaleFade
        initialScale={0.8}
        in={true}
        transition={{ enter: { duration: 1.0, delay: 0.6 } }}
      >
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
          
        </Stack>
      </ScaleFade>

      {/* Minimal Animated Down Arrow Scroll Indicator */}
      <MotionBox
        display="flex"
        justifyContent="center"
        alignItems="center"
        w="100%"
        mt={{ base: 8, md: 1 }}
        mb={{ base: 2, md: 4 }}
        style={{ position: 'relative', height: '54px', cursor: 'pointer' }}
        onClick={() => {
          const el = document.getElementById('about-me');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        aria-label="Scroll down"
        role="button"
        tabIndex={0}
        onKeyPress={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            const el = document.getElementById('about-me');
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
            }
          }
        }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, delay: 1.5 }}
      >
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            display: 'block',
            margin: '0 auto',
            animation: 'arrowDownAnim 1.6s infinite',
            opacity: 0.7,
          }}
        >
          <polyline
            points="12,21 24,33 36,21"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <style>{`
          @keyframes arrowDownAnim {
            0% { transform: translateY(0); opacity: 0.7; }
            40% { opacity: 1; }
            50% { transform: translateY(12px); opacity: 1; }
            60% { opacity: 1; }
            100% { transform: translateY(0); opacity: 0.7; }
          }
        `}</style>
      </MotionBox>
    </Stack>
  )
}
