import { createGlobalStyle } from 'styled-components';
import { colors, mediaBreaks } from './variables';

export default createGlobalStyle`
  :root {
    font-size: 60%;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  html, body, #root {
    height: 100vh;
  }

  body {
    font: 400 1.6rem 'Open sans', sans-serif;
    background: ${colors.primary};
    color: ${colors.textLight};
    -webkit-font-smoothing: antialiased;
  }

  input,
  button,
  textarea {
    color: ${colors.textDark};
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 500;
  }

  button {
    cursor: pointer;
  }

  @media (min-width:  ${mediaBreaks.mobile}) {
    :root {
      font-size: 62.5%;
    }
  }
`;
