import { ChakraProvider } from '@chakra-ui/react'
import { Global, css } from '@emotion/react'
import { prismDarkTheme } from '../styles/prism'
import customTheme from '../styles/theme'
import BackToTopButton from '../components/BackToTopButton'
import LiquidGlassBackground from '../components/LiquidGlassBackground'
import '../styles/globals.css'
import { useEffect } from 'react'

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
            background-color: #000;
            background-image: linear-gradient(195deg,rgb(17, 29, 60), #020409 70%);
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

function DotCursor() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    // Create cursor element
    let cursor = document.getElementById('dot-cursor');
    if (!cursor) {
      cursor = document.createElement('div');
      cursor.id = 'dot-cursor';
      document.body.appendChild(cursor);
    }
    cursor.style.position = 'fixed';
    cursor.style.top = '0px';
    cursor.style.left = '0px';
    cursor.style.width = '12px';
    cursor.style.height = '12px';
    cursor.style.borderRadius = '50%';
    cursor.style.background = 'rgb(255, 255, 255)'; // fully transparent
    cursor.style.backdropFilter = 'none';
    cursor.style.border = '2.5px solid white';
    cursor.style.pointerEvents = 'none';
    cursor.style.zIndex = '99999';
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    cursor.style.transition = 'background 0.2s, transform 0.2s, border 0.2s, box-shadow 0.2s, backdrop-filter 0.2s, width 0.2s, height 0.2s';
    cursor.style.mixBlendMode = 'difference';
    cursor.style.boxShadow = 'none';
    cursor.style.opacity = '1';
    // Add a halo element for the transparent circle
    let halo = document.getElementById('dot-cursor-halo');
    if (!halo) {
      halo = document.createElement('div');
      halo.id = 'dot-cursor-halo';
      document.body.appendChild(halo);
    }
    halo.style.position = 'fixed';
    halo.style.top = '0px';
    halo.style.left = '0px';
    halo.style.width = '56px';
    halo.style.height = '56px';
    halo.style.borderRadius = '50%';
    halo.style.background = 'rgba(255,255,255,0.13)';
    halo.style.backdropFilter = 'blur(18px) saturate(180%)';
    halo.style.border = '1.5px solid rgb(255, 255, 255)';
    halo.style.pointerEvents = 'none';
    halo.style.zIndex = '99998';
    halo.style.transform = 'translate(-50%, -50%) scale(0)';
    halo.style.transition = 'transform 0.32s cubic-bezier(.4,2,.6,1), background 0.2s, border 0.2s, backdrop-filter 0.2s, width 0.2s, height 0.2s';
    halo.style.opacity = '0.7';
    // Hide default cursor
    document.body.style.cursor = 'none';
    // Animate both cursor and halo
    let mouseX = 0, mouseY = 0, dotX = 0, dotY = 0;
    const animate = () => {
      dotX += (mouseX - dotX) * 0.18;
      dotY += (mouseY - dotY) * 0.18;
      cursor.style.left = dotX + 'px';
      cursor.style.top = dotY + 'px';
      halo.style.left = dotX + 'px';
      halo.style.top = dotY + 'px';
      requestAnimationFrame(animate);
    };
    const move = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', move);
    animate();
    // Grow and show halo on interactive elements
    const grow = () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(0.5)';
      // cursor.style.border = '2.5px solid white';
      cursor.style.background = 'rgb(244, 244, 244)';
      cursor.style.width = '18px';
      cursor.style.height = '18px';
      halo.style.transform = 'translate(-50%, -50%) scale(1.15)';
      halo.style.background = 'rgba(255, 255, 255, 0.1)';
      halo.style.backdropFilter = 'blur(22px) saturate(180%)';
      halo.style.width = '70px';
      halo.style.height = '70px';
      halo.style.border = '1.5px solid rgba(2, 0, 0, 0.22)';
    };
    const shrink = () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      // cursor.style.border = '2.5px solid white';
      cursor.style.background = 'rgb(255, 255, 255)';
      cursor.style.width = '16px';
      cursor.style.height = '16px';
      halo.style.transform = 'translate(-50%, -50%) scale(0)';
      halo.style.background = 'rgba(255, 255, 255, 0.13)';
      halo.style.backdropFilter = 'blur(18px) saturate(180%)';
      halo.style.width = '56px';
      halo.style.height = '56px';
      halo.style.border = '1.5px solid rgba(255,255,255,0.18)';
    };
    // Use event delegation for better performance
    const interactiveSelectors = 'a,button,[role="button"],input,textarea,label,select,summary,.cursor-pointer';
    let lastHovered = null;
    const onMouseOver = (e) => {
      if (e.target.closest(interactiveSelectors)) {
        grow();
        lastHovered = e.target.closest(interactiveSelectors);
      }
    };
    const onMouseOut = (e) => {
      if (lastHovered && !e.relatedTarget?.closest(interactiveSelectors)) {
        shrink();
        lastHovered = null;
      }
    };
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);
    // Clean up
    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      if (cursor && cursor.parentNode) cursor.parentNode.removeChild(cursor);
      if (halo && halo.parentNode) halo.parentNode.removeChild(halo);
      document.body.style.cursor = '';
    };
  }, []);
  return null;
}

function MyApp({ Component, pageProps }) {
  return (
    <>
      <DotCursor />
      <ChakraProvider theme={customTheme}>
        <LiquidGlassBackground />
        <GlobalStyle>
          <Component {...pageProps} />
          <BackToTopButton />
        </GlobalStyle>
      </ChakraProvider>
    </>
  )
}

export default MyApp
