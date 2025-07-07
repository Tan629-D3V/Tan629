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
          <link rel="icon" type="image/png" sizes="32x32" href="/tan629.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/tan629.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/tan629.png" />
          <link rel="shortcut icon" href="/tan629.png" />

          <title>Abdulrahman Tan | Full Stack Developer</title>
          <meta name="description" content="Abdulrahman Tan is a Full Stack Developer skilled in React, Next.js, Node.js, and modern web technologies. Building performant, accessible, and beautiful web applications." />
          <meta property="og:title" content="Abdulrahman Tan | Full Stack Developer" />
          <meta property="og:description" content="Full Stack Developer skilled in React, Next.js, Node.js, and modern web technologies. Building performant, accessible, and beautiful web applications." />
          <meta property="og:image" content="/Tan629logo.png" />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="Abdulrahman Tan Portfolio" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
