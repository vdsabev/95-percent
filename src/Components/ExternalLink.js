import styled from 'styled-components';

import { nudge } from '../animations';
import theme from '../theme';

const ExternalLink = styled.a.attrs({
  target: '_blank',
  rel: 'noopener noreferrer',
})`
  position: relative;

  &::after {
    animation: ${nudge} ${theme.durations.medium}ms ${theme.transitions.easeInOut};
    animation-fill-mode: both;
    animation-direction: alternate;
    animation-iteration-count: infinite;

    position: absolute;
    right: -0.9em;
    content: '◂';

    opacity: 0;
    transition: opacity ${theme.durations.short}ms;
  }

  &:hover::after {
    opacity: 1;
  }
`;

export default ExternalLink;
