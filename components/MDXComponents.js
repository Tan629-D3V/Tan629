import {
  Box,
  Code,
  Divider,
  HStack,
  Heading,
  Link,
  Text,
  useColorMode,
  Center,
  Stack,
  Badge,
  List,
  ListItem,
  ListIcon,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Grid,
  GridItem,
  Image as ChakraImage,
  Button,
  Icon,
} from '@chakra-ui/react'
import Image from 'next/image'
import NextLink from 'next/link'
import { FaCheckCircle, FaInfoCircle, FaWarning, FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import ProjectCard from './ProjectCard'

const CustomLink = (props) => {
  const { colorMode } = useColorMode()
  const color = {
    light: 'blue.500',
    dark: 'blue.500',
  }

  const href = props.href
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'))

  if (isInternalLink) {
    return (
      <NextLink passHref href={href}>
        <Link color={color[colorMode]} {...props} />
      </NextLink>
    )
  }

  return <Link color={color[colorMode]} isExternal {...props} />
}

const DocsHeading = (props) => (
  <HStack
    pl={props.as === 'h2' && 4}
    borderLeft={props.as === 'h2' && '4px solid #3CCF91'}
  >
    <Link
      color="displayColor"
      _hover={{
        textDecoration: 'none !important',
        '.heading-anchor': {
          visibility: 'visible',
        },
      }}
      cursor="pointer"
      outline="none"
      href={`#${props.id}`}
    >
      <Heading
        as={props.as}
        fontSize={props.as === 'h2' ? '1.75em' : '1.25em'}
        bgGradient="linear(to-r, gray.600, gray.400)"
        bgClip="text"
        pointerEvents="auto"
        css={{
          scrollMarginTop: '80px',
          scrollSnapMargin: '80px', // Safari
          cursor: 'pointer',
        }}
        id={props.id}
      >
        {props.children}
        <Box
          className="heading-anchor"
          as="span"
          pl={2}
          color="logoGrey"
          visibility="hidden"
          aria-label="anchor"
        >
          #
        </Box>
      </Heading>
    </Link>
  </HStack>
)

const Hr = () => {
  const { colorMode } = useColorMode()
  const borderColor = {
    light: 'gray.200',
    dark: 'gray.600',
  }

  return <Divider w="100%" my={4} borderColor={borderColor[colorMode]} />
}

// Tech Stack Component
const TechStack = ({ technologies }) => (
  <Box my={4}>
    <Text mb={2} color="displayColor" fontWeight="bold">
      Technologies Used:
    </Text>
    <HStack flexWrap="wrap" spacing={2}>
      {technologies.map((tech, index) => (
        <Badge key={index} colorScheme="blue" variant="outline">
          {tech}
        </Badge>
      ))}
    </HStack>
  </Box>
)

// Feature List Component
const FeatureList = ({ features, title = "Key Features" }) => (
  <Box my={4}>
    <Text mb={2} color="displayColor" fontWeight="bold">
      {title}:
    </Text>
    <List spacing={2}>
      {features.map((feature, index) => (
        <ListItem key={index}>
          <ListIcon as={FaCheckCircle} color="button1" />
          {feature}
        </ListItem>
      ))}
    </List>
  </Box>
)

// Project Links Component
const ProjectLinks = ({ githubUrl, liveUrl, demoUrl }) => (
  <Box my={4}>
    <Text mb={2} color="displayColor" fontWeight="bold">
      Project Links:
    </Text>
    <HStack spacing={3}>
      {githubUrl && (
        <Button
          as="a"
          colorScheme="blue"
          href={githubUrl}
          leftIcon={<FaGithub />}
          rel="noopener noreferrer"
          size="sm"
          target="_blank"
          variant="outline"
        >
          GitHub
        </Button>
      )}
      {liveUrl && (
        <Button
          as="a"
          colorScheme="green"
          href={liveUrl}
          leftIcon={<FaExternalLinkAlt />}
          rel="noopener noreferrer"
          size="sm"
          target="_blank"
          variant="outline"
        >
          Live Demo
        </Button>
      )}
      {demoUrl && (
        <Button
          as="a"
          colorScheme="purple"
          href={demoUrl}
          leftIcon={<FaExternalLinkAlt />}
          rel="noopener noreferrer"
          size="sm"
          target="_blank"
          variant="outline"
        >
          Demo
        </Button>
      )}
    </HStack>
  </Box>
)

// Info Alert Component
const InfoAlert = ({ title, children, type = "info" }) => {
  const alertProps = {
    info: { icon: FaInfoCircle, colorScheme: "blue" },
    warning: { icon: FaWarning, colorScheme: "orange" },
    success: { icon: FaCheckCircle, colorScheme: "green" }
  }
  
  const { icon, colorScheme } = alertProps[type]
  
  return (
    <Alert my={4} borderRadius="md" status={type} variant="subtle">
      <AlertIcon as={icon} />
      <Box>
        {title && <AlertTitle>{title}</AlertTitle>}
        <AlertDescription>{children}</AlertDescription>
      </Box>
    </Alert>
  )
}

// Code Block with Syntax Highlighting
const CodeBlock = ({ children, language, title }) => (
  <Box my={4}>
    {title && (
      <Text mb={2} color="textSecondary" fontSize="sm">
        {title}
      </Text>
    )}
    <Code
      display="block"
      overflow="auto"
      p={4}
      color="white"
      fontSize="sm"
      bg="gray.800"
      borderRadius="md"
      whiteSpace="pre"
    >
      {children}
    </Code>
  </Box>
)

// Image Gallery Component
const ImageGallery = ({ images, columns = 2 }) => (
  <Grid gap={4} templateColumns={`repeat(${columns}, 1fr)`} my={4}>
    {images.map((image, index) => (
      <GridItem key={index}>
        <Image
          src={image.src}
          alt={image.alt || `Project image ${index + 1}`}
          width={400}
          height={300}
          objectFit="cover"
          borderRadius="md"
          style={{ width: '100%', height: 'auto' }}
        />
      </GridItem>
    ))}
  </Grid>
)

const MDXComponents = {
  h1: (props) => (
    <Heading as="h1" my={4} bgGradient="linear(to-r, gray.600, gray.400)" bgClip="text" size="xl" {...props} />
  ),
  h2: (props) => (
    <DocsHeading
      as="h2"
      id={props.children}
      fontWeight="bold"
      size="lg"
      bgGradient="linear(to-r, gray.600, gray.400)"
      bgClip="text"
      {...props}
    />
  ),
  h3: (props) => (
    <DocsHeading
      as="h3"
      id={props.children}
      fontWeight="bold"
      size="md"
      bgGradient="linear(to-r, gray.600, gray.400)"
      bgClip="text"
      {...props}
    />
  ),
  h4: (props) => (
    <DocsHeading
      as="h4"
      id={props.children}
      fontWeight="bold"
      size="sm"
      bgGradient="linear(to-r, gray.600, gray.400)"
      bgClip="text"
      {...props}
    />
  ),
  h5: (props) => (
    <DocsHeading
      as="h5"
      id={props.children}
      fontWeight="bold"
      size="sm"
      bgGradient="linear(to-r, gray.600, gray.400)"
      bgClip="text"
      {...props}
    />
  ),
  h6: (props) => (
    <DocsHeading
      as="h6"
      id={props.children}
      fontWeight="bold"
      size="xs"
      bgGradient="linear(to-r, gray.600, gray.400)"
      bgClip="text"
      {...props}
    />
  ),
  img: (props) => (
    <Center>
      <Box w={{ base: '100%', md: '80%' }} maxW="100vw" h="auto">
        <Image
          src={props.src}
          w="100%"
          h="auto"
          layout="responsive"
          style={{ maxWidth: '100%', height: 'auto' }}
          {...props}
          alt=""
        />
      </Box>
    </Center>
  ),
  inlineCode: (props) => (
    <Code mt={-10} fontSize="0.84em" colorScheme="blue" {...props} />
  ),
  code: CodeBlock,
  br: (props) => <Box h="24px" {...props} />,
  hr: Hr,
  a: CustomLink,
  p: (props) => <Text as="p" mt={0} lineHeight="tall" {...props} />,
  ul: (props) => <Box as="ul" ml={2} pt={2} pl="1.625em" {...props} />,
  ol: (props) => <Box as="ol" ml={2} pt={2} pl="1.625em" {...props} />,
  li: (props) => <Box as="li" pb={1} {...props} />,
  // Custom components
  ProjectCard,
  TechStack,
  FeatureList,
  ProjectLinks,
  InfoAlert,
  ImageGallery,
}

export { CustomLink, ProjectCard, TechStack, FeatureList, ProjectLinks, InfoAlert, ImageGallery }
export default MDXComponents
