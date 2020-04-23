import React from 'react';
import styled from 'styled-components';

import { fadeIn } from '../animations';
import theme from '../theme';
import Input from '../Components/Input';

const Question = ({
  question,
  min,
  max,
  setIntervalValue,
  ...props
}) => {
  return (
    <Container {...props}>
      <Title>{question}</Title>
      <AnswerContainer>
        95% confidence interval:
        <IntervalInput
          value={min ?? ''}
          onChange={setIntervalValue('min')}
          placeholder="minimum"
        />
        <IntervalInput
          value={max ?? ''}
          onChange={setIntervalValue('max')}
          placeholder="maximum"
        />
      </AnswerContainer>
    </Container>
  );
};

export default Question;

const Container = styled.label`
  animation: ${fadeIn} ${theme.durations.long}ms forwards;
  animation-delay: ${({ delay }) => delay * theme.durations.stagger}ms;

  opacity: 0;
  display: block;
  margin: 8rem 0;
`;

Container.defaultProps = {
  delay: 0,
};

const Title = styled.h5`
  margin: 1em 0;
`;

const AnswerContainer = styled.div`
  display: flex;
  align-items: baseline;
  flex-direction: column;

  @media (min-width: 50em) {
    flex-direction: row;
  }
`;

const IntervalInput = styled(Input).attrs({ type: 'number', required: true })`
  flex: 1;
  width: 100%;
  margin: 2rem 0 0 0;

  @media (min-width: 50em) {
    margin: 0 0 0 2rem;
  }
`;
