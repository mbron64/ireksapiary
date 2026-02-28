import React from 'react';
import { ThemeProvider as SCThemeProvider } from 'styled-components';
import { GlobalStyles } from './GlobalStyles';

// Fluid scaling: values interpolate linearly between 320px and 1320px viewports.
// Below 320px the min holds; above 1320px the max holds.
const MIN_VP = 320;
const MAX_VP = 1320;

function fluid(minPx, maxPx) {
  if (minPx === maxPx) return `${minPx / 16}rem`;
  const slope = (maxPx - minPx) / (MAX_VP - MIN_VP);
  const interceptRem = (minPx - slope * MIN_VP) / 16;
  const slopeVw = slope * 100;
  const r = (n) => Math.round(n * 1000) / 1000;
  return `clamp(${r(minPx / 16)}rem, ${r(interceptRem)}rem + ${r(slopeVw)}vw, ${r(maxPx / 16)}rem)`;
}

const theme = {
  colors: {
    cream:        '#FDF6E4',
    creamDark:    '#F4E7C6',
    brown:        '#3C2A21',
    brownMedium:  '#967E76',
    brownLight:   '#B7A28F',
    gold:         '#B38728',
    goldDark:     '#826F2B',
    white:        '#FFFDF9',
    pureWhite:    '#FFFFFF',
    error:        '#842029',
    errorBg:      '#F8D7DA',
    errorBorder:  '#F5C2C7',
    overlay:      'rgba(60, 42, 33, 0.4)',
  },

  fonts: {
    display: "'EB Garamond', 'Times New Roman', serif",
    body:    "'Crimson Text', Georgia, serif",
    mono:    "'Courier New', monospace",
  },

  //                  320px  → 1320px
  fontSizes: {
    xs:    fluid(12, 12),   // 12px fixed
    sm:    fluid(13, 14),   // 13 → 14
    base:  fluid(15, 16),   // 15 → 16
    md:    fluid(16, 18),   // 16 → 18
    lg:    fluid(18, 20),   // 18 → 20
    xl:    fluid(20, 24),   // 20 → 24
    '2xl': fluid(24, 32),   // 24 → 32
    '3xl': fluid(28, 40),   // 28 → 40
    '4xl': fluid(32, 56),   // 32 → 56
    '5xl': fluid(40, 80),   // 40 → 80
  },

  //                  320px → 1320px
  space: {
    xs:    fluid(3, 4),     //  3 →  4
    sm:    fluid(5, 8),     //  5 →  8
    md:    fluid(8, 16),    //  8 → 16
    lg:    fluid(12, 24),   // 12 → 24
    xl:    fluid(16, 32),   // 16 → 32
    '2xl': fluid(20, 48),   // 20 → 48
    '3xl': fluid(28, 64),   // 28 → 64
    '4xl': fluid(40, 96),   // 40 → 96
  },

  radii: {
    sm:   '4px',
    md:   '8px',
    lg:   '16px',
    xl:   '32px',
    full: '9999px',
  },

  shadows: {
    sm:    '0 1px 2px rgba(60, 42, 33, 0.08)',
    md:    '0 4px 12px rgba(60, 42, 33, 0.12)',
    lg:    '0 8px 24px rgba(60, 42, 33, 0.16)',
    inner: 'inset 0 1px 2px rgba(60, 42, 33, 0.06)',
  },

  breakpoints: {
    sm:  '480px',
    md:  '768px',
    lg:  '1024px',
    xl:  '1280px',
  },

  transitions: {
    fast:   '0.15s ease',
    base:   '0.25s ease',
    slow:   '0.4s ease',
    spring: '0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
  },

  zIndex: {
    base:       0,
    content:    1,
    header:     100,
    cartOverlay: 999,
    cart:       1000,
    modal:      1100,
  },

  layout: {
    maxWidth:    '1320px',
    headerH:     fluid(56, 72),
    announcH:    fluid(32, 36),
  },
};

export function ThemeProvider({ children }) {
  return (
    <SCThemeProvider theme={theme}>
      <GlobalStyles />
      {children}
    </SCThemeProvider>
  );
}

export default theme;
