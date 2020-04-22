import styled from 'styled-components';
import theme from '../theme';

const Button = styled.button`
  cursor: pointer;
  border: 2px solid ${theme.primary.main};
  background: ${theme.primary.contrast};
  padding: 2rem 3rem;

  color: ${theme.primary.main};
  font-size: 1.8rem;
  font-family: ${theme.fontFamily};
  font-variant: small-caps;
  text-transform: uppercase;

  transition: all ${theme.durations.short}ms ${theme.transitions.easeInOut};
  transition-property: background, color, outline-color;

  &:focus {
    outline: 2px dotted ${theme.primary.main};
    outline-offset: -6px;
  }

  &:hover {
    outline-color: ${theme.primary.contrast};
    background: ${theme.primary.main};
    color: ${theme.primary.contrast};
  }
`;

export default Button;
