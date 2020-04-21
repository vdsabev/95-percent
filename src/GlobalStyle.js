import { createGlobalStyle } from 'styled-components';
import theme from './theme';

// Source: https://github.com/cmless/seed/blob/master/src/style.css
const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  html,
  body {
    margin: 0;
    padding: 0;
  }

  html {
    /* 0.625 of 16px is 10px: https://engageinteractive.co.uk/blog/em-vs-rem-vs-px */
    font-size: 62.5%;
    font-family: ${theme.fontFamily};
    color: ${theme.neutral.darkest};
  }

  body {
    font-size: 1.6rem;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: ${theme.primary.main};
    /* Source: https://www.heropatterns.com/ */
    background-image: url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.4' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E");
  }

  h1, h2, h3, h4, h5, h6,
  p {
    margin-block-start: 0;
    margin-block-end: 0;
  }

  h1 { font-size: 4rem; }
  h2 { font-size: 3.2rem; }
  h3 { font-size: 2.8rem; }
  h4 { font-size: 2.4rem; }
  h5 { font-size: 2rem; }
  h6 { font-size: 1.6rem; }

  p + p {
    margin-top: 0.8rem;
  }

  a {
    display: inline-block;
    color: inherit;
    text-decoration: none;
  }

  /* https://stackoverflow.com/questions/11243337/a-taller-than-its-img-child */
  a > img {
    display: block;
  }

  img {
    max-width: 100%;
  }

  svg {
    fill: currentColor;
  }

  fieldset {
    border: 0;
    margin: 0;
    padding: 0;
  }
`;

export default GlobalStyle;
