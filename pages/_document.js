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
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
