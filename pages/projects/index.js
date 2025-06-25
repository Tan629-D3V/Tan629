import { useState } from 'react'
import { Stack, Heading, Text, SimpleGrid, Divider } from '@chakra-ui/react'

import Cards from '../../components/Card'
import Container from '../../components/Container'
import Head from 'next/head'
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input'
import { FaSearch } from 'react-icons/fa'

export default function Projects({ projects }) {
  const [query, setQuery] = useState('')
  const handleChange = (e) => {
    setQuery(e.target.value)
  }

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

          <meta content="website" property="og:type" />
          <meta content="https://tanmaychouhan.dev/projects" property="og:url" />
          <meta
            content="Tanmay Chouhan - Projects"
            property="og:title"
          />
          <meta
            content="Full Stack Developer and Computer Science student at VIT Bhopal. Explore my projects and creative works."
            property="og:description"
          />
          <meta
            content="https://via.placeholder.com/800x400?text=Tanmay+Chouhan&bg=3CCF91&color=000000"
            property="og:image"
          />

          <meta content="summary_large_image" property="twitter:card" />
          <meta
            content="https://tanmaychouhan.dev/projects"
            property="twitter:url"
          />
          <meta
            content="Tanmay Chouhan - Projects"
            property="twitter:title"
          />
          <meta
            content="Full Stack Developer and Computer Science student at VIT Bhopal. Explore my projects and creative works."
            property="twitter:description"
          />
          <meta
            content="https://via.placeholder.com/800x400?text=Tanmay+Chouhan&bg=3CCF91&color=000000"
            property="twitter:image"
          />
        </Head>
        <Stack
          justifyContent="center"
          my={{ base: '15vh', md: '10vh' }}
          mx={{ base: '15vh', md: '16vh' }}
          spacing={30}
        >
          <Stack spacing={5}>
            <Heading bgGradient="linear(to-r, gray.600, gray.400)" bgClip="text" fontSize={{ base: '4xl', md: '8xl' }}>
              Projects
            </Heading>
            <Text fontSize={{ base: '14px', md: '16px' }} color="textSecondary" transition="all 0.2s ease-in-out" _hover={{ transform: 'scale(1.02)' }}>
              I love building projects and practicing my engineering skills.
              Here's an archive of things that I've worked on.
            </Text>
            <InputGroup maxW="400px">
              <InputRightElement pointerEvents="none">
                <FaSearch color="textSecondary" />
              </InputRightElement>
              <Input
                placeholder="Search projects..."
                type="text"
                value={query}
                onChange={handleChange}
                bg="secondary"
                borderColor="borderColor"
                _focus={{ borderColor: 'button1', boxShadow: '0 0 0 1px #3CCF91' }}
                _placeholder={{ color: 'textSecondary' }}
              />
            </InputGroup>
            <Divider borderColor="borderColor" />
          </Stack>
          
          {projects.length === 0 ? (
            <Stack align="center" spacing={4} py={10}>
              <Text color="textSecondary" fontSize="lg">
                No projects found matching "{query}"
              </Text>
              <Text color="textSecondary" fontSize="sm">
                Try adjusting your search terms
              </Text>
            </Stack>
          ) : (
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={16}>
            {projects
                .filter((project) =>
                  project.title.toLowerCase().includes(query.toLowerCase()) ||
                  project.summary.toLowerCase().includes(query.toLowerCase()) ||
                  (project.tags && project.tags.some(tag => 
                    tag.toLowerCase().includes(query.toLowerCase())
                  ))
              )
              .map((project) => (
                <Cards
                    key={project.slug}
                    desc={project.summary}
                    imageURL={project.image}
                    tag={project.tags || []}
                  title={project.title}
                    slug={project.slug}
                />
              ))}
          </SimpleGrid>
          )}
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
          githubLink: project.frontmatter.githubLink,
          deployLink: project.frontmatter.deployLink,
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
