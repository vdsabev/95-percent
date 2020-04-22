import { keyframes } from 'styled-components';

export const brightIn = keyframes`
  0% {
    filter: brightness(7);
  }
  100% {
    filter: brightness(1);
  }
`;

export const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const nudge = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(0.33em);
  }
`;

export const slideInFromTop = keyframes`
  0% {
    transform: translateY(-12.5vmin);
  }
  100% {
    transform: translateY(0);
  }
`;

export const slideInFromBottom = keyframes`
  0% {
    transform: translateY(12.5vmin);
  }
  100% {
    transform: translateY(0);
  }
`;
