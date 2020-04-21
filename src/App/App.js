import React, { useState } from 'react';
import styled from 'styled-components';

import theme from '../theme';

const questions = JSON.parse(process.env.REACT_APP_QUESTIONS);

const App = () => {
  const [ranges, setRanges] = useState([]);
  const setRange = (key, index) => (e) => {
    const { value } = e.target;
    setRanges((ranges) => [
      ...ranges.slice(0, index),
      { ...ranges[index], [key]: value },
      ...ranges.slice(index + 1),
    ]);
  };

  const [correctAnswers, setCorrectAnswers] = useState(null);
  const accuracy = Math.round(100 * (correctAnswers / questions.length));

  const checkAnswers = (e) => {
    e.preventDefault();
    const correctAnswers = questions.reduce(
      (correctAnswers, questions, questionIndex) => {
        const range = ranges[questionIndex];
        const answerIsCorrect =
          range.min <= questions.a && questions.a <= range.max;
        return correctAnswers + (answerIsCorrect ? 1 : 0);
      },
      0
    );
    setCorrectAnswers(correctAnswers);
  };

  const resetAnswers = () => {
    setRanges([]);
    setCorrectAnswers(null);
  };

  return (
    <AppContainer>
      <form onSubmit={checkAnswers}>
        <fieldset disabled={correctAnswers != null}>
          {questions.map((question, questionIndex) => (
            <QuestionContainer key={question.q}>
              <QuestionTitle>{question.q}</QuestionTitle>
              At least&nbsp;
              <RangeInput
                value={ranges[questionIndex]?.min || ''}
                onChange={setRange('min', questionIndex)}
                autoFocus={questionIndex === 0}
              />
              &nbsp;but no more than&nbsp;
              <RangeInput
                value={ranges[questionIndex]?.max || ''}
                onChange={setRange('max', questionIndex)}
              />
            </QuestionContainer>
          ))}

          {correctAnswers == null && (
            <Button type="submit">Check Answers</Button>
          )}
        </fieldset>
      </form>

      {correctAnswers != null && (
        <>
          <p>
            You answered {correctAnswers} out of {questions.length} questions
            correctly. This amounts to <b>{accuracy}%</b> accuracy.
          </p>

          <Button type="button" onClick={resetAnswers} autoFocus>
            Reset Answers
          </Button>
        </>
      )}
    </AppContainer>
  );
};

export default App;

const AppContainer = styled.div`
  --marginY: 8rem;
  max-width: 80rem;
  min-height: calc(100vh - 2 * var(--marginY));
  margin: var(--marginY) auto;
  background: ${theme.neutral.lightest};
  padding: 4rem;
`;

const QuestionContainer = styled.section`
  & + & {
    margin-top: 2rem;
  }
`;

const QuestionTitle = styled.h3`
  margin-bottom: 1rem;
`;

const RangeInput = styled.input.attrs({ type: 'number', required: true })``;

const Button = styled.button`
  margin-top: 1rem;
`;
