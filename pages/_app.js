import { ChakraProvider } from '@chakra-ui/react'
import { Global, css } from '@emotion/react'
import { prismDarkTheme } from '../styles/prism'
import customTheme from '../styles/theme'
import BackToTopButton from '../components/BackToTopButton'

const GlobalStyle = ({ children }) => {
  return (
    <>
      <Global
        styles={css`
          ${prismDarkTheme};
          ::selection {
            background-color: #90cdf4;
            color: #fefefe;
          }
          ::-moz-selection {
            background: #ffb7b7;
            color: #fefefe;
          }
          html {
            min-width: 356px;
          }
          body {
            background-color: #020409;
            background-image: linear-gradient(195deg, #111d3c, #020409 50%);
            background-attachment: fixed;
            color: #fff;
            font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
          }
          #__next {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            position: relative;
          }
          #__next::before {
            content: '';
            position: absolute;
            top: 0;
            left: 50%;
            width: 60px;
            height: 150px;
            transform: translateX(-50%);
            background: 
              linear-gradient(to bottom, rgba(0, 0, 0, 0) 30%, transparent),
              repeating-linear-gradient(to right, 
                transparent, 
                transparent 14px, 
                rgba(255, 255, 255, 0.08) 15px, 
                rgba(255, 255, 255, 0.08) 16px,
                transparent 16px
              );
            opacity: 0.6;
            pointer-events: none;
          }
          ::-webkit-scrollbar {
            width: 8px;
            background: #080808;
          }

          ::-webkit-scrollbar-thumb {
            background: #111111;
            border-radius: 8px;
          }
        `}
      />
      {children}
    </>
  )
}

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={customTheme}>
      <GlobalStyle>
        <Component {...pageProps} />
        <BackToTopButton />
      </GlobalStyle>
    </ChakraProvider>
  )
}

export default MyApp
