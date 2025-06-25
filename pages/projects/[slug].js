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
            <Spinner size="xl" color="button1" />
            <Text>Project not found</Text>
            <NextLink href="/projects" passHref>
              <Button as="a" leftIcon={<FaArrowLeft />} colorScheme="blue">
                Back to Projects
              </Button>
            </NextLink>
          </Stack>
        </Center>
      </Container>
    )
  }

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
                leftIcon={<FaArrowLeft />}
                variant="ghost"
                size="sm"
                onClick={() => handleClick('project_back_to_projects')}
                _hover={{ bg: 'rgba(60, 207, 145, 0.1)' }}
              >
                Back to Projects
              </Button>
            </NextLink>
          </Box>

          {/* Project Header */}
          <Stack
            mx="auto"
            border="1px"
            borderColor={{ base: '#333', md: 'borderColor' }}
            borderRadius="10px"
            overflow="hidden"
          >
            <Image
              width={1366}
              height={768}
              objectFit="cover"
              style={{
                borderRadius: '10px',
              }}
              alt={metadata.title}
              priority
              src={metadata.image}
              blurDataURL={metadata.image}
            />
          </Stack>

          {/* Project Info */}
          <Stack pt={4} spacing={4}>
            <Stack spacing={2}>
            <Heading
              as="h1"
              bgGradient="linear(to-r, gray.600, gray.400)"
              bgClip="text"
              fontSize={['3xl', '3xl', '5xl', '5xl']}
                lineHeight="1.1"
            >
              {metadata.title}
            </Heading>
              <Text color="textPrimary" fontSize={['sm', 'md']} lineHeight="1.6">
                {metadata.summary}
              </Text>
            </Stack>

            {/* Project Meta */}
            <HStack spacing={4} flexWrap="wrap">
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
              <HStack spacing={2} flexWrap="wrap">
                {metadata.tags.map((tag, index) => (
                  <Badge
                    key={index}
                    colorScheme="blue"
                    variant="outline"
                    fontSize="xs"
                    px={2}
                    py={1}
                  >
                    {tag}
                  </Badge>
                ))}
              </HStack>
            )}

            {/* Project Links */}
            <HStack spacing={4} flexWrap="wrap">
              {metadata.githubLink && (
                    <Link
                  href={metadata.githubLink}
                      isExternal
                      onClick={() => handleClick(`${metadata.title}_github`)}
                    >
                  <Button
                    leftIcon={<FaGithub />}
                    size="sm"
                    variant="outline"
                    colorScheme="blue"
                    _hover={{ bg: 'rgba(60, 207, 145, 0.1)' }}
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
                    leftIcon={<FaLink />}
                    size="sm"
                    variant="outline"
                    colorScheme="green"
                    _hover={{ bg: 'rgba(60, 207, 145, 0.1)' }}
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
              <Text color="displayColor" fontSize="xl" fontWeight="semibold" mb={4}>
              Table of Contents
            </Text>

            {toc.map((heading) => (
              <Box key={heading.title} pl={`${heading.level * 1}rem`}>
                <Text
                  key={heading.id}
                  color={
                      heading.title === activeId ? 'button1' : 'textSecondary'
                  }
                  fontSize={['sm', 'sm', 'md', 'md']}
                  fontWeight={
                    heading.title === activeId ? 'semibold' : 'normal'
                  }
                    cursor="pointer"
                    _hover={{ color: 'button1' }}
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
