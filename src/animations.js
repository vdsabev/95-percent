import { keyframes } from 'styled-components';

export const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const slideInFromTop = keyframes`
  0% {
    top: -30vh;
  }
  100% {
    top: 0;
  }
`;

export const slideInFromBottom = keyframes`
  0% {
    bottom: -10vh;
  }
  100% {
    bottom: 0;
  }
`;
