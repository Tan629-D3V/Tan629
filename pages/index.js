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
          {/* Primary Meta Tags */}
          <title>Tanmay Chouhan | Full Stack Developer</title>
          <meta name="title" content="Tanmay Chouhan | Full Stack Developer" />
          <meta name="description" content="Tanmay Chouhan is a Full Stack Developer skilled in React, Next.js, Node.js, and modern web technologies. Building performant, accessible, and beautiful web applications." />

          {/* Open Graph / Facebook */}
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://tanmaychouhan.dev/" />
          <meta property="og:title" content="Tanmay Chouhan | Full Stack Developer" />
          <meta property="og:description" content="Tanmay Chouhan is a Full Stack Developer skilled in React, Next.js, Node.js, and modern web technologies. Building performant, accessible, and beautiful web applications." />
          <meta property="og:image" content="https://tanmaychouhan.dev/cropped_circle_image.png" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:site_name" content="Tanmay Chouhan Portfolio" />

          {/* Twitter */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:url" content="https://tanmaychouhan.dev/" />
          <meta name="twitter:title" content="Tanmay Chouhan | Full Stack Developer" />
          <meta name="twitter:description" content="Tanmay Chouhan is a Full Stack Developer skilled in React, Next.js, Node.js, and modern web technologies. Building performant, accessible, and beautiful web applications." />
          <meta name="twitter:image" content="https://tanmaychouhan.dev/cropped_circle_image.png" />
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
