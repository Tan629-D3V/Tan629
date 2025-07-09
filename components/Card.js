import {
  Center,
  Divider,
  Link,
  ScaleFade,
  Stack,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
  Box,
} from '@chakra-ui/react'
import ReactGA from 'react-ga4'
import {
  FaBootstrap,
  FaCode,
  FaDatabase,
  FaExternalLinkAlt,
  FaGithub,
  FaJs,
  FaLaravel,
  FaPepperHot,
  FaPython,
  FaReact,
  FaSass,
} from 'react-icons/fa'
import { SiChakraui, SiNextdotjs } from 'react-icons/si'
import useMediaQuery from '../hook/useMediaQuery'
import Image from 'next/image'
import { useRouter } from 'next/router'

export default function Cards({ imageURL, title, slug, desc, tag }) {
  const router = useRouter()
  const getTag = (tag) => {
    let values = []
    if (tag == 'React') {
      values[0] = 'blue'
      values[1] = FaReact
    } else if (tag == 'Python') {
      values[0] = 'orange'
      values[1] = FaPython
    } else if (tag == 'Javascript') {
      values[0] = 'yellow'
      values[1] = FaJs
    } else if (tag == 'Sass') {
      values[0] = 'pink'
      values[1] = FaSass
    } else if (tag == 'Flask') {
      values[0] = 'green'
      values[1] = FaPepperHot
    } else if (tag == 'Laravel') {
      values[0] = 'red'
      values[1] = FaLaravel
    } else if (tag == 'Bootstrap') {
      values[0] = 'purple'
      values[1] = FaBootstrap
    } else if (tag == 'SQL') {
      values[0] = 'blue'
      values[1] = FaDatabase
    } else if (tag == 'Next.js') {
      values[0] = 'gray'
      values[1] = SiNextdotjs
    } else if (tag == 'Chakra UI') {
      values[0] = 'teal'
      values[1] = SiChakraui
    } else {
      values[0] = 'gray'
      values[1] = FaCode
    }
    return values
  }

  const isLargerThan800 = useMediaQuery(800)

  const Tags = tag.map((item) => (
    <Tag
      key={item}
      colorScheme={getTag(item)[0]}
      size={isLargerThan800 ? 'md' : 'sm'}
    >
      <TagLeftIcon as={getTag(item)[1]}></TagLeftIcon>
      <TagLabel>{item}</TagLabel>
    </Tag>
  ))
  const handleClick = (event) => {
    ReactGA.event({
      category: 'click',
      action: event,
    })
    router.push(`/projects/${slug}`)
  }

  const customCursor = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3Ccircle cx='12' cy='12' r='3'/%3E%3C/svg%3E") 16 16, auto`;

  return (
    <Box
      sx={{ '&:hover': { cursor: customCursor } }}
      role="group"
    >
      <Stack
        minH="320px"
        maxH="500px"
        bg="secondary"
        border="1px"
        borderColor={{ base: '#333', md: 'borderColor' }}
        borderRadius="10px"
        _hover={{
          shadow: 'lg',
          boxShadow: '0 0 25px rgba(60, 207, 145, 0.5)',
          transform: 'scale(1.02)',
        }}
        transition="transform 0.25s cubic-bezier(.4,2,.6,1), box-shadow .2s, border-color .2s"
      >
        <Link _hover={{ textDecoration: 'none' }} href={`/projects/${slug}`}>
          <ScaleFade transition={{ duration: 1 }} in={true}>
            <Center w="auto">
              <Image
                w="100%"
                h="auto"
                minH={{ base: '180px', md: '270px' }}
                maxW={800}
                borderRadius="10px 10px 0px 0px"
                transition="0.3s"
                objectFit="cover"
                style={{ borderRadius: '10px 10px 0px 0px', objectFit: 'cover', width: '100%', height: 'auto', maxWidth: 800, minHeight: '180px' }}
                alt={title}
                src={imageURL}
              />
            </Center>
            <Stack px={4} py={2}>
              <Stack alignItems="center" justifyContent="space-between" isInline>
                <Text
                  color="displayColor"
                  fontFamily="Ubuntu"
                  fontSize="2xl"
                  _groupHover={{
                    color: 'button1',
                    transform: 'scale(1.05)',
                  }}
                  transition="color 0.25s, transform 0.25s cubic-bezier(.4,2,.6,1)"
                >
                  {title}
                </Text>
                <Stack
                  alignItems="center"
                  justifyContent="flex-end"
                  isInline
                  spacing={4}
                >
                  <Link
                    alignItems="center"
                    display="flex"
                    color="white"
                    _hover={{ color: 'button1' }}
                    transition="color 0.25s"
                    href={`/projects/${slug}`}
                    onClick={() =>
                      handleClick(`project_${title.replace('@', '-at')}`)
                    }
                  >
                    <FaExternalLinkAlt aria-label="project link" size={20} />
                  </Link>
                </Stack>
              </Stack>
              <Stack align="center" direction="row" mt={2} mb={2} spacing={2}>
                {Tags}
              </Stack>
              <Divider />
              <Text
                mx={2}
                color="textSecondary"
                fontSize={['sm', 'md']}
                _groupHover={{
                  color: 'white',
                  transform: 'scale(1.02)',
                }}
                transition="color 0.25s, transform 0.25s cubic-bezier(.4,2,.6,1)"
              >
                {desc}
              </Text>
            </Stack>
          </ScaleFade>
        </Link>
      </Stack>
    </Box>
  )
}
