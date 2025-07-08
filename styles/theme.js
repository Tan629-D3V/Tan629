import { extendTheme } from '@chakra-ui/react'

// Simple theme configuration for Chakra UI
// Fluid Typography.
// font-size  = calc(ZZ + ((1vw - XX) * YY))
// Where   XX = min_viewport / 100
//         YY = 100 * (max_font_size - min_font_size) / (max_viewport - min_viewport)
//            = 100 * font_size_difference / viewport_difference
//         ZZ = Minimum font-size stated in REM

const fluidType = (minFont, maxFont) => {
  let XX = 768 / 100
  let YY = (100 * (maxFont - minFont)) / (1920 - 768)
  let ZZ = minFont / 16
  return `calc(${ZZ}rem + ((1vw - ${XX}px) * ${YY}))`
}

const customTheme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  colors: {
    background: '#000000', // Jet Black: Primary background for depth and sophistication
    secondary: '#080808', // Carbon Black: Cards, containers, and layered elements
    complement: '#FA934F', // Amber Highlight: Interactive elements, warnings
    displayColor: '#FFFFFF', // Titanium White: Headings, key UI elements
    textPrimary: '#D1D5DB', // Text Primary: Body copy, paragraphs
    textSecondary: '#8F9094', // Text Secondary: Labels, captions
    button1: '#3CCF91', // Emerald Accent (should be #3CCF91): Primary CTAs, success states
    button2: '#F6A20E', // Secondary Accent: Secondary buttons
    button3: '#5132BF', // Tertiary Accent: Special features, badges
    borderColor: '#111111', // Borders: Dividers, input borders
    logoGrey: '#8F9094', // Supporting color for logos/icons
  },
  fonts: {
    body: `Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`,
    heading: `Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`,
    mono: 'Fira Code, Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace',
  },
  fontSizes: {
    xs: fluidType(10, 12),
    sm: fluidType(12, 14),
    md: fluidType(14, 16),
    lg: fluidType(16, 18),
    xl: fluidType(18, 20),
    '2xl': fluidType(20, 24),
    '3xl': fluidType(24, 28),
    '4xl': fluidType(28, 36),
    '5xl': fluidType(32, 40),
    '6xl': fluidType(36, 48),
    '7xl': fluidType(40, 64),
    '8xl': fluidType(44, 72),
    display: fluidType(48, 144),
    display2: fluidType(24, 36),
    display3: fluidType(16, 24),
  },
  components: {
    Link: {
      baseStyle: {
        color: '#3CCF91',
        _hover: { textDecoration: 'none' },
        _focus: { boxShadow: 'none' },
      },
    },
  },
})

export default customTheme
