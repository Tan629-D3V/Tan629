import NextDocument, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link href="https://fonts.googleapis.com" rel="preconnect" />
          <link crossOrigin="true" href="https://fonts.gstatic.com" rel="preconnect" />
          <link
            as="style"
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap"
            rel="stylesheet"
          />
          <link
            as="style"
            href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@500&display=swap"
            rel="stylesheet"
          />
          <meta content="black" name="theme-color" />
          <link rel="icon" type="image/png" sizes="32x32" href="/cropped_circle_image.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/cropped_circle_image.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/cropped_circle_image.png" />
          <link rel="shortcut icon" href="/cropped_circle_image.png" />

          <title>Tanmay Chouhan | Full Stack Developer</title>
          <meta name="description" content="Tanmay Chouhan is a Full Stack Developer skilled in React, Next.js, Node.js, and modern web technologies. Building performant, accessible, and beautiful web applications." />
          <meta property="og:title" content="Tanmay Chouhan | Full Stack Developer" />
          <meta property="og:description" content="Full Stack Developer skilled in React, Next.js, Node.js, and modern web technologies. Building performant, accessible, and beautiful web applications." />
          <meta property="og:image" content="/cropped_circle_image.png" />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="Tanmay Chouhan Portfolio" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
