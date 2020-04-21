import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import theme from '../theme';
import BaseButton from '../Components/Button';
import ExternalLink from '../Components/ExternalLink';
import Question from './Question';
import rangesStorage from './rangesStorage';

const questions = JSON.parse(process.env.REACT_APP_QUESTIONS);
const defaultRanges = new Array(questions.length).fill({});
const targetConfidencePercent = parseFloat(
  process.env.REACT_APP_TARGET_CONFIDENCE
);

const App = () => {
  const [ranges, setRanges] = useState(rangesStorage.get() || defaultRanges);
  const setRange = (index) => (key) => (e) => {
    const { value } = e.target;
    setRanges((ranges) => [
      ...ranges.slice(0, index),
      { ...ranges[index], [key]: value },
      ...ranges.slice(index + 1),
    ]);
  };

  const [correctAnswers, setCorrectAnswers] = useState(null);
  const confidencePercent = Math.round(
    100 * (correctAnswers / questions.length)
  );

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
    setRanges(defaultRanges);
    setCorrectAnswers(null);
  };

  useEffect(() => {
    if (ranges === defaultRanges) {
      rangesStorage.clear();
    } else {
      rangesStorage.set(ranges);
    }
  }, [ranges]);

  return (
    <AppContainer>
      <Title>{targetConfidencePercent}% Confidence Interval</Title>

      <p>
        For each of the following questions, provide a range that you are{' '}
        <b>{targetConfidencePercent}% confident</b> includes the correct answer.
      </p>

      <form onSubmit={checkAnswers}>
        <fieldset disabled={correctAnswers != null}>
          {questions.map((question, questionIndex) => (
            <Question
              key={question.q}
              question={question.q}
              min={ranges[questionIndex].min}
              max={ranges[questionIndex].max}
              setRange={setRange(questionIndex)}
              isFirst={questionIndex === 0}
            />
          ))}

          {correctAnswers == null && (
            <Button type="submit">Check Answers</Button>
          )}
        </fieldset>
      </form>

      {correctAnswers != null && (
        <>
          <Title>Results</Title>

          <p>
            You answered{' '}
            <b>
              {correctAnswers} out of {questions.length}
            </b>{' '}
            questions correctly. This amounts to{' '}
            <b>{confidencePercent}% confidence</b>.
          </p>

          <p>
            {confidencePercent < targetConfidencePercent ? (
              <span>
                You likely did not use a large enough range to provide{' '}
                <b>{targetConfidencePercent}% confidence</b>.
              </span>
            ) : confidencePercent > targetConfidencePercent ? (
              `You likely created too large a confidence interval.`
            ) : (
              `You got it just right!`
            )}
          </p>

          <Button type="button" onClick={resetAnswers} autoFocus>
            Reset Answers
          </Button>
        </>
      )}

      <Footer>
        <div>
          source:&nbsp;
          <ExternalLink href="https://peterattiamd.com/confidence/">
            peterattiamd.com
          </ExternalLink>
        </div>

        <div>
          code by:&nbsp;
          <ExternalLink href="https://twitter.com/vdsabev">
            @vdsabev
          </ExternalLink>
        </div>
      </Footer>
    </AppContainer>
  );
};

export default App;

const AppContainer = styled.div`
  position: relative;
  max-width: 80rem;

  --marginY: 8rem;
  min-height: calc(100vh - 2 * var(--marginY));
  margin: var(--marginY) auto;

  background-color: ${theme.neutral.lightest};
  padding: 4rem;
`;

const Title = styled.h2`
  margin: 1em 0 0.5em 0;

  &:first-child {
    margin-top: 0;
  }
`;

const Button = styled(BaseButton)`
  width: 100%;
  margin-top: 4rem;
`;

const Footer = styled.footer`
  position: absolute;
  bottom: -3rem;
  right: 0;
  left: 0;

  display: flex;
  justify-content: space-between;
  padding: 1rem;

  color: ${theme.primary.contrast};
  font-size: 1.2rem;

  @media (min-width: 50em) {
    padding: 1rem 0;
  }
`;
