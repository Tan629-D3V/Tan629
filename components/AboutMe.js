import {
  SimpleGrid,
  Text,
  Stack,
  Heading,
  Image,
  Flex,
  Box,
  chakra,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'

import useMediaQuery from '../hook/useMediaQuery'
import SlideUpWhenVisible from '../hook/SlideUpWhenVisible'
import ReactGA from 'react-ga4'

export default function AboutMe() {
  const isLargerThan800 = useMediaQuery(800)
  const handleHover = (event) => {
    ReactGA.event({
      category: 'hover',
      action: event,
    })
  }
  const MoreInfo = ({ text, content }) => {
    return (
      <>
        {' '}
        {isLargerThan800 ? (
          <Popover isLazy placement="right" trigger="hover">
            <PopoverTrigger>
              <chakra.span
                color="button1"
                cursor="help"
                onMouseOver={() => handleHover(`about_${text}`)}
              >
                {text}
              </chakra.span>
            </PopoverTrigger>
            <PopoverContent color="white" bg="secondary" borderColor="button1">
              <PopoverArrow bg="button1" />
              <PopoverBody color="textPrimary" fontSize="sm">
                {content}
              </PopoverBody>
            </PopoverContent>
          </Popover>
        ) : (
          <Text as="span" color="button1">
            {text}
          </Text>
        )}{' '}
      </>
    )
  }

  return (
    <>
      <SimpleGrid columns={{ base: 1, md: 2 }} id="about-me" spacing={{ base: 4, md: 8 }}>
        <SlideUpWhenVisible>
          <Stack spacing={{ base: 3, md: 4 }}>
            <Heading fontFamily="Ubuntu" fontSize={{ base: 'xl', md: '2xl' }} _hover={{ transform: 'scale(1.07)' }} transition="all 0.3s ease">
              ⚡ About Me
            </Heading>
            <Text color="textSecondary" fontSize={{ base: '14px', md: '16px' }} whiteSpace="pre-line">
              Hey! I'm Tanmay Chouhan, a Computer Science student at {' '}
              <MoreInfo
                content={
                  <Image
                    w={306}
                    h={102}
                    alt="VIT Vellore"
                    src="https://imagizer.imageshack.com/img924/6016/mB0lSy.jpg"
                  />
                }
                text="Vellore Institute of Technology"
              />
              I've been close to a computer since an early age and passionate
              about technology ever since. <br/> <br/> I really loved tinkering with 
              simple scripts in school, and from that spark I taught myself {' '}
              <MoreInfo
                content={"I really enjoy using C++, Python, and JavaScript together to build versatile solutions that span low-level systems and modern web frameworks."}
                text="C++, Python & JavaScript"
              />
              —fast-forward to today, I build full-stack applications and had the 
              privilege to work at Suvidha Foundation and Globalprime Healthcare. 
              I'm all about crafting seamless user experiences, automating workflows,
              and architecting scalable solutions.
              <br/> <br/>
              I'm interested in building something awesome with code and
              automate tasks with code, currently focused on
              <MoreInfo
                content="Building Web and Mobile Applications using Javascript Frameworks (React, React Native and Next.js)"
                text="Web & Mobile Development,"
              />
              contributing to
              <MoreInfo
                content="I really like the idea of contributing new features to open source projects that can be useful to other people."
                text="Open Source"
              />
              and sharpening my skills through 
              <MoreInfo
                content="Competitive Programming helped me to sharpen my Algorithms and Problem Solving skills."
                text="Competitive Programming"
              />
              <br />
              <br />
              When I'm not coding, you'll find me chilling with my friends, 
              binge-watching the latest Netflix series, or—if the mood
              strikes—lacing up my gloves and hitting the bag! 🥊
            </Text>
          </Stack>
        </SlideUpWhenVisible>
        <SlideUpWhenVisible>
          <Flex align="center" justify="center">
            <Box
              pos="relative"
              maxW={{ base: '220px', sm: '260px', md: '300px', lg: '350px' }}
              maxH={{ base: '220px', sm: '260px', md: '300px', lg: '350px' }}
              _hover={{ transform: 'scale(1.08)', textShadow: '0 0 20px rgba(60, 207, 145, 0.3)' }}
              transition="all 0.3s ease"
            >
              <Image
                pos="absolute"
                zIndex={3}
                top="0px"
                right={{ base: '-16px', sm: '-24px', md: '-32px', lg: '-64px' }}
                w={{ base: '60px', sm: '80px', md: '100px', lg: '150px' }}
                alt=""
                filter="invert(0.1)"
                src="https://svgsilh.com/svg/26432.svg"
              />
              <Image
                w={{ base: '220px', sm: '260px', md: '300px', lg: '350px' }}
                h={{ base: '220px', sm: '260px', md: '300px', lg: '350px' }}
                borderRadius="50%"
                objectFit="cover"
                alt="Abdul Rahman"
                src="/ME.jpg"
              />
            </Box>
          </Flex>
        </SlideUpWhenVisible>
      </SimpleGrid>
    </>
  )
}