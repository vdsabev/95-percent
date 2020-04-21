import styled from 'styled-components';
import theme from '../theme';

const Input = styled.input`
  outline: 0;
  border: 0;
  border-bottom: 2px solid ${theme.primary.main};
  font-size: 1.8rem;
  font-family: ${theme.fontFamily};

  &::placeholder {
    font-size: 1.2rem;
  }
`;

export default Input;
