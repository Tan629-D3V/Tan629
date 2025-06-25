import Head from 'next/head'
import { Stack, Box, Text } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import Container from '../components/Container'
import Introduction from '../components/Introduction'
import FeaturedProjects from '../components/FeaturedProjects'
import AboutMe from '../components/AboutMe'
import Skills from '../components/Skills'
import ContactMe from '../components/ContactMe'
// import QuoteSection from '../components/QuoteSection'

// Lazy load components with motion
const MotionStack = motion(Stack)

export default function Index({ introduction, projects, contactMe }) {
  return (
    <>
      <Container enableTransition={true}>
        <Head>
          <title>Tanmay Chouhan - Full Stack Developer & Software Engineer</title>
          <meta content="Tanmay Chouhan - Full Stack Developer & Software Engineer" name="title" />
          <meta content="tanmay chouhan, full stack developer, software engineer, computer science, vit bhopal, react developer, node.js developer, javascript, typescript, mern stack" name="keywords" />
          <meta
            content="Tanmay Chouhan is a passionate Full Stack Developer and Computer Science student at VIT Bhopal. Specializing in React.js, Node.js, and modern web technologies. Building innovative solutions with MERN stack and cloud technologies."
            name="description"
          />
          <meta name="author" content="Tanmay Chouhan" />
          <meta name="robots" content="index, follow" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="canonical" href="https://tanmaychouhan.dev" />

          {/* Open Graph / Facebook */}
          <meta content="website" property="og:type" />
          <meta content="https://tanmaychouhan.dev" property="og:url" />
          <meta
            content="Tanmay Chouhan - Full Stack Developer & Software Engineer"
            property="og:title"
          />
          <meta
            content="Passionate Full Stack Developer and Computer Science student at VIT Bhopal. Specializing in React.js, Node.js, and modern web technologies."
            property="og:description"
          />
          <meta
            content="https://tanmaychouhan.dev/tan629.png"
            property="og:image"
          />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:site_name" content="Tanmay Chouhan Portfolio" />

          {/* Twitter */}
          <meta content="summary_large_image" property="twitter:card" />
          <meta content="https://tanmaychouhan.dev" property="twitter:url" />
          <meta
            content="Tanmay Chouhan - Full Stack Developer & Software Engineer"
            property="twitter:title"
          />
          <meta
            content="Passionate Full Stack Developer and Computer Science student at VIT Bhopal. Specializing in React.js, Node.js, and modern web technologies."
            property="twitter:description"
          />
          <meta
            content="https://tanmaychouhan.dev/tan629.png"
            property="twitter:image"
          />
          <meta name="twitter:creator" content="@tanmay629" />

          {/* Additional SEO */}
          <meta name="theme-color" content="#3CCF91" />
          <meta name="msapplication-TileColor" content="#3CCF91" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        </Head>

        <MotionStack
          as="main"
          alignItems="center"
          justifyContent="center"
          px={{ base: '5vw', md: '10vw' }}
          mt={{ base: '5vh', md: '8vh' }}
          pb="144px"
          spacing={{ base: '100px', md: '144px' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Introduction introduction={introduction} />

          <AboutMe />
          <Skills />
          <FeaturedProjects projects={projects} />

          {/* <QuoteSection /> */}

          <ContactMe contactMe={contactMe} />
        </MotionStack>
      </Container>
    </>
  )
}

export async function getStaticProps() {
  // Default empty data
  let data = { items: [] };
  let data3 = { items: [] };
  let data4 = { items: [] };

  // Create Contentful client only if environment variables are properly configured
  let client = null;
  if (process.env.CONTENTFUL_SPACE_ID &&
      process.env.CONTENTFUL_ACCESS_TOKEN &&
      process.env.CONTENTFUL_SPACE_ID !== 'placeholder_space_id' &&
      process.env.CONTENTFUL_ACCESS_TOKEN !== 'placeholder_access_token') {
    client = require('contentful').createClient({
      space: process.env.CONTENTFUL_SPACE_ID,
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    });
  }

  // Only fetch data if Contentful client is available
  if (client) {
    try {
      data = await client.getEntries({
        content_type: 'featuredProjects',
        order: 'fields.order',
      });

      data3 = await client.getEntries({
        content_type: 'introduction',
        limit: 2,
        order: 'sys.createdAt',
      });

      data4 = await client.getEntries({
        content_type: 'contactMe',
        limit: 1,
        order: 'sys.createdAt',
      });
    } catch (error) {
      console.warn('Contentful data fetch failed:', error.message);
    }
  }

  return {
    props: {
      projects: data.items || [],
      introduction: data3.items || [],
      contactMe: data4.items || [],
    },
    revalidate: 3600, // Revalidate every hour
  }
}
