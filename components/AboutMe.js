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
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
        <SlideUpWhenVisible>
          <Stack spacing={4}>
            <Heading fontFamily="Ubuntu" fontSize="2xl" 
            transition="all 0.3s ease"
            _hover={{
            transform: 'scale(1.07)',
            
          }}>
              ⚡ About Me
            </Heading>
            <Text
              color="textSecondary"
              fontSize={{ base: '14px', md: '16px' }}
              whiteSpace="pre-line"
            >
              Hey! I’m Tanmay Chouhan, a Computer Science student at {' '}
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
               I’ve been close to a computer since an early age and passionate
                about technology ever since. <br/> <br/> I really loved tinkering with 
                simple scripts in school, and from that spark I taught myself {' '}
              <MoreInfo
                content={"I really enjoy using C++, Python, and JavaScript together to build versatile solutions that span low-level systems and modern web frameworks."}
                text="C++, Python & JavaScript"
              />
              —fast-forward to today, I build full-stack applications and had the 
              privilege to work at Suvidha Foundation and Globalprime Healthcare. 
              I’m all about crafting seamless user experiences, automating workflows,
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
              When I’m not coding, you’ll find me chilling with my friends, 
              binge-watching the latest Netflix series, or—if the mood
               strikes—lacing up my gloves and hitting the bag! 🥊
            </Text>
          </Stack>
        </SlideUpWhenVisible>
        <SlideUpWhenVisible>
          <Flex align="center" justify="center">
            <Box
              pos="relative"
              maxW={{ base: '300px', lg: '350px' }}
              maxH={{ base: '300px', lg: '350px' }}
              transition="all 0.3s ease"
          // display="inline-block"
          _hover={{
            transform: 'scale(1.08)',
            textShadow: '0 0 20px rgba(60, 207, 145, 0.3)'
          }}
            >
              <Image
                pos="absolute"
                zIndex={3}
                top="0px"
                right={{ base: '-32px', lg: '-64px' }}
                w={{ base: '100px', lg: '150px' }}
                alt=""
                filter="invert(0.1)"
                src="https://svgsilh.com/svg/26432.svg"
              />
              <Image
                w={{ base: '300px', lg: '350px' }}
                h={{ base: '300px', lg: '350px' }}
                objectFit="cover"
                borderRadius="50%"
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