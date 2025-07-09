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

export default function HealthcarePortalProject({ source, frontmatter, toc }) {
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
      <Box as="header" mx={{ base: 4, md: 1 }} my={{ base: 10, md: 16 }} textAlign="center">
        <Heading
          as="h1"
          mb={3}
          color={accent}
          fontWeight="extrabold"
          lineHeight={1.1}
          letterSpacing="tight"
          size="2xl"
        >
          {frontmatter?.title || 'Healthcare Portal'}
        </Heading>
        {frontmatter?.summary && (
          <Text
            maxW="2xl"
            mx="auto"
            mb={6}
            color={textColor}
            fontSize={{ base: 'lg', md: 'xl' }}
          >
            {frontmatter.summary}
          </Text>
        )}
        {frontmatter?.tags && (
          <Stack justify={{ base: 'center', md: 'center' }} direction="row" mt={3} spacing={2}>
            {frontmatter.tags.map((tag) => (
              <Box
                key={tag}
                px={3}
                py={1}
                color="white"
                fontSize="sm"
                fontWeight="bold"
                bg={accent}
                borderRadius="full"
                shadow="md"
              >
                {tag}
              </Box>
            ))}
          </Stack>
        )}
      </Box>
      <Box
        className="mdx-content"
        sx={{
          'h2, h3, h4': {
            fontWeight: 'bold',
            my: { base: 2, md: 5 },
            letterSpacing: 'wide',
            textAlign: 'left',
            color: accent,
          },
          p: { fontSize: { base: 'md', md: 'lg' }, mb: 2, textAlign: 'left', my: { base: 5, md: 25 }, color: textColor },
          ul: { mb: 2, pl: 2, textAlign: 'left', my: { base: 5, md: 30 }, mx: { base: 5, md: 30 }, color: textColor },
          ol: { mb: 5, pl: 6, textAlign: 'left', color: textColor },
          code: { px: 2, borderRadius: 'md', fontSize: 'sm', color: accent, bg: 'gray.800' },
          a: { fontSize: { base: 'md', md: 'lg' }, color: 'teal.300', _hover: { color: 'white' } },
        }}
        mx={{ base: 2, md: 24 }}
        my={{ base: 20, md: 24 }}
        px={{ base: 4, md: 200 }}
      >
        <MDXRemote {...source} components={MDXComponents} />
      </Box>
    </Container>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'content/projects/healthcare-portal.mdx');
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