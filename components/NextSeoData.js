import { ArticleJsonLd, NextSeo } from 'next-seo'

import React from 'react'

const NextSeoData = ({ slug, metadata, publishedDate }) => {
  // Use default values if summary or image are missing
  const summary = metadata.frontmatter?.summary || '';
  const image = metadata.frontmatter?.image || '';
  return (
    <>
      <NextSeo
        additionalMetaTags={[
          { property: 'twitter:card', content: 'summary_large_image' },
          {
            property: 'twitter:url',
            content: `https://abdulrahman.id/projects/${slug}`,
          },
          { property: 'twitter:title', content: metadata.title },
          {
            property: 'twitter:description',
            content: summary,
          },
          { property: 'twitter:image', content: image },
        ]}
        canonical={`https://abdulrahman.id/projects/${slug}`}
        description={summary}
        openGraph={{
          url: `https://abdulrahman.id/projects/${slug}`,
          site_name: 'Abdul Rahman',
          title: metadata.title,
          description: summary,
          type: 'article',
          article: {
            authors: ['Abdul Rahman'],
            publishedTime: publishedDate,
            modifiedTime: publishedDate,
            tags: ['Programming', 'Web Development', 'Software Engineering'],
          },
          images: [
            {
              url: image,
              alt: metadata.title,
            },
          ],
        }}
        title={metadata.title}
      />
      <ArticleJsonLd
        authorName="Abdul Rahman"
        dateModified={publishedDate}
        datePublished={publishedDate}
        description={summary}
        images={[image]}
        publisherLogo="https://imagizer.imageshack.com/a/img923/7612/A5tDeP.png"
        publisherName="Abdul Rahman"
        title={metadata.title}
        url={`https://abdulrahman.id/projects/${slug}`}
      />
    </>
  )
}

export default NextSeoData
