import { css } from 'styled-components'
import theme from '../theme'

export const tooltip = ({
  color = theme.info.contrast,
  background = theme.info.main,
  textAttribute = 'data-tooltip',
} = {}) => css`
  cursor: help;
  position: relative;

  &::before {
    position: absolute;
    bottom: calc(100% + 0.1em);
    left: calc(50% - 0.5em);

    border-color: ${background} transparent;
    border-style: solid;
    border-width: 0.5em 0.5em 0 0.5em;

    content: '';
  }

  &::after {
    position: absolute;
    right: 0;
    bottom: calc(100% + 1em);
    left: 0;

    border-radius: 1rem;
    border: 3px solid ${background};
    /* 'CC' adds 80% transparency to the hex color: https://css-tricks.com/8-digit-hex-codes/ */
    background: ${background}CC;
    padding: 2em;

    color: ${color};
    font-size: 1rem;
    text-align: center;
    content: attr(${textAttribute});
  }

  &::before,
  &::after {
    display: none;
    opacity: 0;
    transition: opacity ${theme.durations.short}ms;
  }

  &:hover::before,
  &:hover::after {
    display: block;
    opacity: 1;
  }
`
