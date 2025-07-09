import { Stack, Heading, Text, Box, Badge, HStack, Link, Image } from '@chakra-ui/react'
import Container from '../../components/Container'
import Head from 'next/head'
import NextLink from 'next/link'

export default function Projects({ projects }) {
  return (
    <>
      <Container>
        <Head>
          <title>Tanmay Chouhan - Projects</title>
          <meta content="Tanmay Chouhan - Projects" name="title" />
          <meta
            content="Full Stack Developer and Computer Science student at VIT Bhopal. Explore my projects and creative works."
            name="description"
          />
        </Head>
        <Stack align="center" spacing={16} my={{ base: '10vh', md: '8vh' }}>
          <Heading
            fontSize={{ base: '4xl', md: '7xl' }}
            fontWeight="extrabold"
            textAlign="center"
            bgGradient="linear(to-r, gray.600, gray.400)"
            bgClip="text"
          >
            Projects
          </Heading>
          <Text fontSize={{ base: 'md', md: 'xl' }} color="textSecondary" maxW="2xl" textAlign="center">
            A showcase of my favorite projects, built with modern web technologies and a passion for great user experience.
          </Text>
          <Stack spacing={16} w="100%" maxW="3xl">
            {projects.map((project) => (
              <NextLink key={project.slug} href={`/projects/${project.slug}`} passHref>
                <Box
                  as="a"
                  borderRadius="2xl"
                  overflow="hidden"
                  shadow="lg"
                  bg="secondary"
                  border="1px"
                  borderColor="borderColor"
                  transition="box-shadow 0.2s, transform 0.2s"
                  _hover={{ shadow: 'xl', transform: 'scale(1.01)', textDecoration: 'none' }}
                  display="block"
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    w="100%"
                    h="auto"
                    maxH="320px"
                    objectFit="cover"
                  />
                  <Box p={{ base: 5, md: 8 }}>
                    <HStack spacing={3} mb={2} flexWrap="wrap">
                      {project.tags && project.tags.map((tag) => (
                        <Badge key={tag} colorScheme="blue" variant="outline" fontSize="xs" px={2} py={1} borderRadius="full">
                          {tag}
                        </Badge>
                      ))}
                    </HStack>
                    <Heading
                      as="h2"
                      fontSize={{ base: '2xl', md: '3xl' }}
                      bgGradient="linear(to-r, gray.600, gray.400)"
                      bgClip="text"
                      fontWeight="bold"
                      mb={1}
                    >
                      {project.title}
                    </Heading>
                    <Text color="textSecondary" fontSize={{ base: 'md', md: 'lg' }} mb={3} noOfLines={3}>
                      {project.summary}
                    </Text>
                    <HStack spacing={6} color="gray.400" fontSize="sm" mb={2}>
                      {project.date && (
                        <Text>{new Date(project.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</Text>
                      )}
                      {project.category && <Text>{project.category}</Text>}
                    </HStack>
                  </Box>
                </Box>
              </NextLink>
            ))}
          </Stack>
        </Stack>
      </Container>
    </>
  )
}

export async function getStaticProps() {
  const { getAllProjects } = await import('../../utils/mdxUtils')
  try {
    const projects = getAllProjects()
    return {
      props: {
        projects: projects.map(project => ({
          slug: project.slug,
          title: project.frontmatter.title,
          summary: project.frontmatter.summary,
          image: project.frontmatter.image,
          tags: project.frontmatter.tags,
          category: project.frontmatter.category,
          date: project.frontmatter.date,
        })),
      },
      revalidate: 30,
    }
  } catch (error) {
    console.error('Error in getStaticProps:', error)
    return {
      props: {
        projects: [],
      },
      revalidate: 30,
    }
  }
}
