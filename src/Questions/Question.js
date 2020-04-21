import React from 'react';
import styled from 'styled-components';

const Question = ({ isFirst, question, min, max, setRange, ...props }) => {
  return (
    <Container {...props}>
      <Title>{question}</Title>
      At least&nbsp;
      <RangeInput value={min} onChange={setRange('min')} autoFocus={isFirst} />
      &nbsp;but no more than&nbsp;
      <RangeInput value={max} onChange={setRange('max')} />
    </Container>
  );
};

const Container = styled.section`
  & + & {
    margin-top: 2rem;
  }
`;

const Title = styled.h3`
  margin-bottom: 1rem;
`;

const RangeInput = styled.input.attrs({ type: 'number', required: true })``;

export default Question;
