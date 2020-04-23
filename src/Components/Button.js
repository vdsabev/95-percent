import styled from 'styled-components';
import theme from '../theme';
import { tooltip } from './Tooltip';

const Button = styled.button`
  cursor: pointer;
  border: 2px solid var(--color);
  background: var(--background);
  padding: 2rem 3rem;

  color: var(--color);
  font-size: 1.8rem;
  font-family: ${theme.fontFamily};
  font-variant: small-caps;
  text-transform: uppercase;

  transition: all ${theme.durations.short}ms ${theme.transitions.easeInOut};
  transition-property: background, color, outline-color;

  &:focus {
    outline: 2px dotted var(--color);
    outline-offset: -6px;
  }

  &:hover {
    outline-color: var(--background);
    background: var(--color);
    color: var(--background);
  }

  &:disabled {
    --color: ${theme.neutral.dark};
    ${tooltip()}
  }
`;

export const PrimaryButton = styled(Button)`
  --color: ${theme.primary.main};
  --background: ${theme.primary.contrast};
`;

export const SuccessButton = styled(Button)`
  --color: ${theme.success.main};
  --background: ${theme.success.contrast};
`;

export const WarningButton = styled(Button)`
  --color: ${theme.warning.main};
  --background: ${theme.warning.contrast};
`;

export const DangerButton = styled(Button)`
  --color: ${theme.danger.main};
  --background: ${theme.danger.contrast};
`;

export const InfoButton = styled(Button)`
  --color: ${theme.info.main};
  --background: ${theme.info.contrast};
`;
