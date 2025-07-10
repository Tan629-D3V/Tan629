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
        <Stack align="center" my={{ base: '10vh', md: '8vh' }} spacing={16}>
          <Heading
            fontSize={{ base: '4xl', md: '7xl' }}
            fontWeight="extrabold"
            textAlign="center"
            bgGradient="linear(to-r, gray.600, gray.400)"
            bgClip="text"
          >
            Projects
          </Heading>
          <Text maxW="2xl" color="textSecondary" fontSize={{ base: 'md', md: 'xl' }} textAlign="center">
            A showcase of my favorite projects, built with modern web technologies and a passion for great user experience.
          </Text>
          <Stack w="100%" maxW="3xl" spacing={16}>
            {projects.map((project) => (
              <NextLink key={project.slug} href={`/projects/${project.slug}`} passHref>
                <Box
                  as="a"
                  display="block"
                  overflow="hidden"
                  bg="secondary"
                  border="1px"
                  borderColor="borderColor"
                  borderRadius="2xl"
                  shadow="lg"
                  _hover={{ shadow: 'xl', transform: 'scale(1.01)', textDecoration: 'none' }}
                  transition="box-shadow 0.2s, transform 0.2s"
                >
                  <Image
                    w="100%"
                    h="auto"
                    maxH="320px"
                    objectFit="cover"
                    alt={project.title}
                    src={project.image}
                  />
                  <Box p={{ base: 5, md: 8 }}>
                    <HStack flexWrap="wrap" mb={2} spacing={3}>
                      {project.tags && project.tags.map((tag) => (
                        <Badge key={tag} px={2} py={1} fontSize="xs" borderRadius="full" colorScheme="blue" variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </HStack>
                    <Heading
                      as="h2"
                      mb={1}
                      fontSize={{ base: '2xl', md: '3xl' }}
                      fontWeight="bold"
                      bgGradient="linear(to-r, gray.600, gray.400)"
                      bgClip="text"
                    >
                      {project.title}
                    </Heading>
                    <Text mb={3} color="textSecondary" fontSize={{ base: 'md', md: 'lg' }} noOfLines={3}>
                      {project.summary}
                    </Text>
                    <HStack mb={2} color="gray.400" fontSize="sm" spacing={6}>
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
          summary: project.frontmatter.summary || '',
          image: project.frontmatter.image,
          tags: project.frontmatter.tags,
          category: typeof project.frontmatter.category === 'undefined' ? null : project.frontmatter.category,
          date: project.frontmatter.date || null,
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
