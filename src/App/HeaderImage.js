import React, { useState } from 'react';
import styled from 'styled-components';

import { fadeIn, slideInFromTop } from '../animations';
import theme from '../theme';

import headerImageUrl from './header.svg';

const HeaderImage = (props) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <Image
      src={headerImageUrl}
      onLoad={() => setLoaded(true)}
      data-loaded={loaded}
      aria-hidden
      {...props}
    />
  );
};

export default HeaderImage;

const Image = styled.img`
  animation: ${fadeIn} ${theme.durations.short}ms,
    ${slideInFromTop} ${theme.durations.long}ms ${theme.transitions.easeInOut};
  animation-fill-mode: forwards;
  animation-play-state: ${(props) =>
    props['data-loaded'] ? 'running' : 'paused'};

  z-index: 1000; /* Displays image over app container */
  position: relative; /* Creates a new z-index context */
  display: block;
  height: 45.2rem;
  max-height: 50vmin;
  margin: 7.5vmin auto -22.5vmin auto;
`;
