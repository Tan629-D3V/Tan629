import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import fs from 'fs';
import path from 'path';
import Container from '../../components/Container';
import MDXComponents from '../../components/MDXComponents';
import { Box, Stack, Heading, Text, useColorModeValue, Link } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import remarkSlug from 'remark-slug';
import mdxPrism from 'mdx-prism';

export default function SynapseProject({ source, frontmatter, toc }) {
  const [activeId, setActiveId] = useState(toc[0]?.title || '');
  const accent = useColorModeValue('teal.400', 'teal.200');
  const headingColor = useColorModeValue('white', 'teal.100');
  const textColor = useColorModeValue('gray.100', 'gray.300');

  useEffect(() => {
    if (!toc.length) return;
    const headingElements = toc.map(({ title }) => document.getElementById(title));
    const handleIntersect = (entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting);
      if (visible.length > 0) {
        setActiveId(visible[0].target.id);
      }
    };
    const observer = new window.IntersectionObserver(handleIntersect, {
      rootMargin: '-40% 0px -55% 0px',
      threshold: 0.1,
    });
    headingElements.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [toc]);

  return (
    <Container maxW="4xl" >
      {/* Header Section */}
      <Box as="header" textAlign="center" my={{ base: 10, md: 16 }} mx={{ base: 4, md: 1 }}>

        <Heading
          as="h1"
          size="3xl"
          fontWeight="extrabold"
          color={accent}
          mb={4}
          letterSpacing="tight"
          lineHeight={1.1}
        >
          {frontmatter?.title || 'Synapse'}
        </Heading>
        {frontmatter?.summary && (
          <Text fontSize={{ base: 'lg', md: 'xl' }} color={textColor} mb={6} maxW="2xl" mx="auto">
            {frontmatter.summary}
          </Text>
        )}
        {/* Pill tags/buttons */}
        <Stack direction="row" spacing={3} justify="center" mb={8} flexWrap="wrap">
          {frontmatter?.tags?.map((tag) => (
            <Box key={tag} px={4} py={1} bg={accent} color="white" borderRadius="full" fontSize="sm" fontWeight="bold" boxShadow="md" letterSpacing="wide">
              {tag}
            </Box>
          ))}
          {frontmatter?.duration && (
            <Box px={4} py={1} bg={useColorModeValue('gray.700', 'gray.600')} color="white" borderRadius="full" fontSize="sm" fontWeight="bold" boxShadow="md">
              {frontmatter.duration}
            </Box>
          )}
          {frontmatter?.projectUrl && (
            <Link href={frontmatter.projectUrl} isExternal px={4} py={1} bg={useColorModeValue('gray.900', 'gray.700')} color={accent} borderRadius="full" fontSize="sm" fontWeight="bold" boxShadow="md" _hover={{ bg: accent, color: 'white' }} transition="all 0.2s">
              Visit Project
            </Link>
          )}
        </Stack>
      </Box>
      {/* Image Gallery Section (if images exist) */}
      {frontmatter?.images && Array.isArray(frontmatter.images) && frontmatter.images.length > 0 && (
        <Stack direction="row" spacing={4} justify="center" mb={12} flexWrap="wrap">
          {frontmatter.images.map((img, idx) => (
            <Box key={idx} borderRadius="xl" overflow="hidden" boxShadow="lg" maxW="sm" minW="180px">
              <img src={img} alt={`Project image ${idx + 1}`} style={{ width: '100%', height: 'auto', display: 'block' }} />
            </Box>
          ))}
        </Stack>
      )}
      {/* Main Content Section */}
      <Box
        className="mdx-content"
        px={{ base: 4, md: 200 }}
        mx={{ base: 2, md: 24 }}
        my={{ base: 20, md: 24 }}
        sx={{
          'h2, h3, h4': {
            
            color: accent,
            fontWeight: 'bold',
            my: { base: 2, md: 5 },
            letterSpacing: 'wide',
            textAlign: 'left',
          },
          p: { color: textColor, fontSize: { base: 'md', md: 'lg' }, mb: 2, textAlign: 'left', my: { base: 5, md: 25 }},
          ul: { color: textColor, mb: 2, pl: 2, textAlign: 'left',my: { base: 5, md: 30 },mx: { base: 5, md: 30 } },
          ol: { color: textColor, mb: 5, pl: 6, textAlign: 'left' },
          code: { color: accent, bg: 'gray.800', px: 2, borderRadius: 'md', fontSize: 'sm'  },
          a: { color: "teal.300", _hover: { color: 'white' }, fontSize: { base: 'md', md: 'lg' } },
        }}
      >
        <MDXRemote {...source} components={MDXComponents} />
      </Box>
    </Container>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'content/projects/synapse.mdx');
  const source = fs.readFileSync(filePath, 'utf8');
  const { data, content } = require('gray-matter')(source);
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkSlug],
      rehypePlugins: [mdxPrism],
    },
  });
  // Extract headings for TOC
  const headings = content.match(/^#{2,4} .+/gm) || [];
  const toc = headings.map((heading) => {
    const level = heading.match(/#/g).length - 2;
    const title = heading.replace(/^#{2,4} /, '').trim();
    return { title, level };
  });
  return {
    props: {
      source: mdxSource,
      frontmatter: data,
      toc,
    },
  };
} 