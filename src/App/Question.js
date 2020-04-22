import React from 'react';
import styled from 'styled-components';

import Input from '../Components/Input';

const Question = ({ isFirst, question, min, max, setRange, ...props }) => {
  return (
    <Container {...props}>
      <Title>{question}</Title>
      <AnswerContainer>
        95% confidence interval:
        <RangeInput
          value={min ?? ''}
          onChange={setRange('min')}
          placeholder="minimum"
          autoFocus={isFirst}
        />
        <RangeInput
          value={max ?? ''}
          onChange={setRange('max')}
          placeholder="maximum"
        />
      </AnswerContainer>
    </Container>
  );
};

const Container = styled.section`
  margin-top: 4rem;
`;

const Title = styled.h5`
  margin: 2em 0 0.8em 0;
`;

const AnswerContainer = styled.div`
  display: flex;
  align-items: baseline;
  flex-flow: column;

  @media (min-width: 50em) {
    flex-flow: row;
  }
`;

const RangeInput = styled(Input).attrs({ type: 'number', required: true })`
  flex: 1;
  width: 100%;
  margin: 2rem 0 0 0;

  @media (min-width: 50em) {
    margin: 0 0 0 2rem;
  }
`;

export default Question;
