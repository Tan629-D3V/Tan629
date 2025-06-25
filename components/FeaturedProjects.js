import {
  Link,
  Stack,
  Heading,
  Text,
  SimpleGrid,
  Flex,
  Box,
} from '@chakra-ui/layout'
import NextLink from 'next/link'
import Cards from './Card'
import SlideUpWhenVisible from '../hook/SlideUpWhenVisible'
import ReactGA from 'react-ga4'

export default function FeaturedProjects({ projects }) {
  const handleClick = (event) => {
    ReactGA.event({
      category: 'click',
      action: event,
    })
  }

  return (
    <>
      <Stack spacing={8} w="full">
        <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={16}>
          <SlideUpWhenVisible threshold={0.1}>
            <Stack spacing={1}>
              <Stack
                isInline
                alignItems="center"
                justifyContent="space-between"
              >
                <Heading
                  color="displayColor"
                  fontFamily="Ubuntu"
                  fontSize={{ base: 'xl', md: '2xl' }}
                >
                  All Creative Works.
                </Heading>
                <NextLink passHref href="/projects">
                  <Link
                    onClick={() => handleClick('featuredprojects_explore more')}
                  >
                    <Text
                      _hover={{ color: 'button2' }}
                      color="button1"
                      display={{ base: 'block', md: 'none' }}
                      fontSize={{ base: 'sm', md: 'xl' }}
                    >
                      {' '}
                      Explore more &rarr;
                    </Text>
                  </Link>
                </NextLink>
              </Stack>
              <Text color="textSecondary" fontSize={{ base: 'md', md: 'xl' }}>
                Here are some of the innovative projects I've built using modern technologies.
              </Text>
              <NextLink href="/projects">
                <Link
                  onClick={() => handleClick('featuredprojects_explore more')}
                >
                  <Text
                    display={{ base: 'none', md: 'block' }}
                    fontSize={{ base: 'md', md: 'xl' }}
                  >
                    Explore more &rarr;
                  </Text>
                </Link>
              </NextLink>
            </Stack>
          </SlideUpWhenVisible>
          {projects && projects.length > 0 && projects[0] && projects[0].fields ? (
            <SlideUpWhenVisible>
              <Cards
                slug={projects[0].fields.slug}
                desc={projects[0].fields.description}
                imageURL={projects[0].fields.imageUrl}
                tag={projects[0].fields.tags}
                title={projects[0].fields.title}
              />
            </SlideUpWhenVisible>
          ) : (
            <SlideUpWhenVisible>
              <Cards
                slug="synapse"
                desc="Developed a real-time NLP chatbot (MERN, OpenAI API) with JWT authentication, achieving 100% message accuracy through model optimization."
                imageURL="https://via.placeholder.com/400x200?text=Synapse&bg=3CCF91&color=000000"
                tag={['MERN Stack', 'OpenAI API', 'JWT', 'AI']}
                title="Synapse - AI Chatbot"
              />
            </SlideUpWhenVisible>
          )}
          {projects && projects.length > 1 && projects[1] && projects[1].fields ? (
            <SlideUpWhenVisible>
              <Box mt={{ md: '-50%' }}>
                <Cards
                  slug={projects[1].fields.slug}
                  desc={projects[1].fields.description}
                  imageURL={projects[1].fields.imageUrl}
                  tag={projects[1].fields.tags}
                  title={projects[1].fields.title}
                />
              </Box>
            </SlideUpWhenVisible>
          ) : (
            <SlideUpWhenVisible>
              <Box mt={{ md: '-50%' }}>
                <Cards
                  slug="sonify"
                  desc="Designed a Spotify-like app with OAuth 2.0 login, playlist CRUD operations, and Redis caching, supporting users. Reduced server response time by 20% through MongoDB indexing and JWT session management."
                  imageURL="https://via.placeholder.com/400x200?text=Sonify&bg=F6A20E&color=000000"
                  tag={['MERN Stack', 'OAuth 2.0', 'Redis', 'MongoDB']}
                  title="Sonify - Music Streaming App"
                />
              </Box>
            </SlideUpWhenVisible>
          )}
          {projects && projects.length > 2 && projects[2] && projects[2].fields ? (
            <SlideUpWhenVisible threshold={0.8}>
              <Cards
                slug={projects[2].fields.slug}
                desc={projects[2].fields.description}
                imageURL={projects[2].fields.imageUrl}
                tag={projects[2].fields.tags}
                title={projects[2].fields.title}
              />
            </SlideUpWhenVisible>
          ) : (
            <SlideUpWhenVisible threshold={0.8}>
              <Cards
                slug="healthcare-portal"
                desc="Developed a responsive healthcare portal with React.js and Node.js, boosting user engagement by 40% and reducing load time by 25%. Implemented secure patient data management and appointment scheduling."
                imageURL="https://via.placeholder.com/400x200?text=Healthcare+Portal&bg=5132BF&color=FFFFFF"
                tag={['React.js', 'Node.js', 'Healthcare', 'REST API']}
                title="Healthcare Portal"
              />
            </SlideUpWhenVisible>
          )}
        </SimpleGrid>
      </Stack>
    </>
  )
}
