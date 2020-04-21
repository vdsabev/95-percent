import styled from 'styled-components';

const ExternalLink = styled.a.attrs({
  target: '_blank',
  rel: 'noopener noreferrer',
})`
  &:hover {
    text-decoration: underline;
  }
`;

export default ExternalLink;
