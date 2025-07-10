import {
  Box,
  Center,
  Divider,
  HStack,
  Heading,
  Link,
  Spinner,
  Stack,
  Text,
  Badge,
  Button,
  Icon,
} from '@chakra-ui/react'
import { MDXRemote } from 'next-mdx-remote'
import { useEffect, useState } from 'react'
import ReactGA from 'react-ga4'
import { useRouter } from 'next/router'
import { FaGithub, FaLink, FaCalendar, FaUser, FaArrowLeft } from 'react-icons/fa'
import NextLink from 'next/link'

import Container from '../../components/Container'
import MDXComponents from '../../components/MDXComponents'
import ProjectContainer from '../../components/ProjectContainer'
import NextSeoData from '../../components/NextSeoData'
import useUtterances from '../../hook/useUtterances'
import Image from 'next/image'

// Helper to extract width/height from placeholder.com or fallback
function getPlaceholderSize(url) {
  // Matches /400x200 or /400
  if (!url) return { width: 400, height: 200 };
  const match = url.match(/placeholder.com\/(\d+)(x(\d+))?/);
  if (match) {
    const width = parseInt(match[1], 10) || 400;
    const height = match[3] ? parseInt(match[3], 10) : width;
    return { width, height };
  }
  // fallback
  return { width: 400, height: 200 };
}

export default function Project({ metadata, publishedDate, source, toc }) {
  const [views, setViews] = useState('...')
  const router = useRouter()
  const { slug } = router.query

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/views/${slug}`)
      .then((res) => res.json())
      .then((json) => setViews(json.views))
  }, [slug])

  const [activeId, setActiveId] = useState()
  useEffect(() => {
    const handleScroll = () => {
      let currentId
      for (const heading of toc) {
        const element = document.getElementById(heading.title)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top < window.innerHeight / 2) {
            currentId = heading.title
          } else {
            break
          }
        }
      }
      setActiveId(currentId)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [toc])

  const handleClick = (event) => {
    ReactGA.event({
      category: 'click',
      action: event,
    })
  }

  const { isCommentsLoading } = useUtterances('comments', metadata.title)

  if (!metadata) {
    return (
      <Container>
        <Center minH="50vh">
          <Stack align="center" spacing={4}>
            <Spinner color="button1" size="xl" />
            <Text>Project not found</Text>
            <NextLink href="/projects" passHref>
              <Button as="a" colorScheme="blue" leftIcon={<FaArrowLeft />}>
                Back to Projects
              </Button>
            </NextLink>
          </Stack>
        </Center>
      </Container>
    )
  }

  // Fallback to a default image if metadata.image is missing or invalid
  const imageSrc = metadata.image || 'https://via.placeholder.com/400x200?text=No+Image';
  const { width, height } = getPlaceholderSize(imageSrc);
  console.log('Image src:', imageSrc, 'width:', width, 'height:', height);

  return (
    <>
      <NextSeoData
        slug={slug}
        metadata={metadata}
        publishedDate={publishedDate}
      />

      <Container>
        <Stack spacing={6}>
          {/* Back Button */}
          <Box>
            <NextLink href="/projects" passHref>
              <Button
                as="a"
                _hover={{ bg: 'rgba(60, 207, 145, 0.1)' }}
                leftIcon={<FaArrowLeft />}
                onClick={() => handleClick('project_back_to_projects')}
                size="sm"
                variant="ghost"
              >
                Back to Projects
              </Button>
            </NextLink>
          </Box>

          {/* Project Header */}
          <Stack
            overflow="hidden"
            mx="auto"
            border="1px"
            borderColor={{ base: '#333', md: 'borderColor' }}
            borderRadius="10px"
          >
            <Image
              src={imageSrc}
              alt={metadata.title}
              width={width}
              height={height}
              style={{ width: '100%', height: 'auto', borderRadius: '10px', objectFit: 'cover' }}
              priority
              blurDataURL={imageSrc}
            />
          </Stack>

          {/* Project Info */}
          <Stack
            pt={4}
            spacing={4}
          >
            <Stack spacing={2}>
              <Heading
                as="h1"
                fontSize={['3xl', '3xl', '5xl', '5xl']}
                lineHeight="1.1"
                bgGradient="linear(to-r, gray.600, gray.400)"
                bgClip="text"
              >
                {metadata.title}
              </Heading>
              <Text color="textPrimary" fontSize={['sm', 'md']} lineHeight="1.6">
                {metadata.summary}
              </Text>
            </Stack>

            {/* Project Meta */}
            <HStack flexWrap="wrap" spacing={4}>
              <HStack spacing={2}>
                <Icon as={FaCalendar} color="textSecondary" />
                <Text color="textPrimary" fontSize="sm">
                  {new Date(metadata.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </Text>
              </HStack>
              <HStack spacing={2}>
                <Icon as={FaUser} color="textSecondary" />
                <Text color="textPrimary" fontSize="sm">
                  {metadata.category}
                </Text>
              </HStack>
              <HStack spacing={2}>
                <Text color="textPrimary" fontSize="sm">
                  {views} views
                </Text>
              </HStack>
            </HStack>

            {/* Project Tags */}
            {metadata.tags && (
              <HStack flexWrap="wrap" spacing={2}>
                {metadata.tags.map((tag, index) => (
                  <Badge
                    key={index}
                    px={2}
                    py={1}
                    fontSize="xs"
                    colorScheme="blue"
                    variant="outline"
                  >
                    {tag}
                  </Badge>
                ))}
              </HStack>
            )}

            {/* Project Links */}
            <HStack flexWrap="wrap" spacing={4}>
              {metadata.githubLink && (
                <Link
                  href={metadata.githubLink}
                  isExternal
                  onClick={() => handleClick(`${metadata.title}_github`)}
                >
                  <Button
                    _hover={{ bg: 'rgba(60, 207, 145, 0.1)' }}
                    colorScheme="blue"
                    leftIcon={<FaGithub />}
                    size="sm"
                    variant="outline"
                  >
                    GitHub
                  </Button>
                </Link>
              )}
              {metadata.deployLink && (
                <Link
                  href={metadata.deployLink}
                  isExternal
                  onClick={() => handleClick(`${metadata.title}_livesite`)}
                >
                  <Button
                    _hover={{ bg: 'rgba(60, 207, 145, 0.1)' }}
                    colorScheme="green"
                    leftIcon={<FaLink />}
                    size="sm"
                    variant="outline"
                  >
                    Live Demo
                  </Button>
                </Link>
              )}
            </HStack>
          </Stack>

          <Divider h="0.5px" bg="textSecondary" />
        </Stack>

        {/* Project Content */}
        <HStack alignItems="start" pt="23px" spacing="36px">
          <Stack w={{ base: '100%', md: '50rem' }}>
            <ProjectContainer>
              <MDXRemote {...source} components={MDXComponents} />
            </ProjectContainer>
          </Stack>

          {/* Table of Contents */}
          {toc.length > 0 && (
          <Stack
            pos="sticky"
            top="6rem"
            display={{ base: 'none', md: 'flex' }}
            w="250px"
            h="500px"
          >
            <Text mb={4} color="displayColor" fontSize="xl" fontWeight="semibold">
              Table of Contents
            </Text>
            {toc.map((heading) => (
              <Box key={heading.title} pl={`${heading.level * 1}rem`}>
                <Text
                  key={heading.id}
                  color={heading.title === activeId ? 'button1' : 'textSecondary'}
                  fontSize={['sm', 'sm', 'md', 'md']}
                  fontWeight={heading.title === activeId ? 'semibold' : 'normal'}
                  _hover={{ color: 'button1' }}
                  cursor="pointer"
                >
                  <a href={`#${heading.title}`}>{heading.title}</a>
                </Text>
              </Box>
            ))}
          </Stack>
          )}
        </HStack>

        {/* Comments Section */}
        <Stack w="100%" mt="36px" mb="15vh">
          {isCommentsLoading && (
            <Center flexDir="column" pt={8}>
              <Spinner w="56px" h="56px" color="button1" thickness="5px" />
              <Text pt={2} color="textSecondary" fontSize="sm">
                Loading comments...
              </Text>
            </Center>
          )}
          <Stack opacity={isCommentsLoading ? 0 : 1}>
            <div id="comments" />
          </Stack>
        </Stack>
      </Container>
    </>
  )
}

export async function getStaticPaths() {
  const { getAllProjectSlugs } = await import('../../utils/mdxUtils')
  
  try {
    const paths = getAllProjectSlugs()
    return {
      paths,
      fallback: false,
    }
  } catch (error) {
    console.error('Error generating static paths:', error)
  return {
      paths: [],
    fallback: false,
    }
  }
}

export async function getStaticProps({ params }) {
  const { getProjectBySlug, serializeMDX, extractHeadings } = await import('../../utils/mdxUtils')
  
  try {
    const project = getProjectBySlug(params.slug)

    if (!project) {
    return {
      notFound: true,
    }
  }

    const source = await serializeMDX(project.content)
    const toc = extractHeadings(project.content)

  return {
    props: {
        metadata: {
          title: project.frontmatter.title,
          summary: project.frontmatter.summary,
          image: project.frontmatter.image,
          date: project.frontmatter.date,
          category: project.frontmatter.category,
          githubLink: project.frontmatter.githubLink,
          deployLink: project.frontmatter.deployLink,
          tags: project.frontmatter.tags,
        },
        publishedDate: new Date(project.frontmatter.date).toISOString(),
        source,
        toc,
    },
    revalidate: 30,
    }
  } catch (error) {
    console.error('Error in getStaticProps:', error)
    return {
      notFound: true,
    }
  }
}
