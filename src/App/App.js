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
    <>
      <AppContainer>
        <Image src="background.svg" alt="" aria-hidden />

        <Title>{targetConfidencePercent}% Confidence Interval</Title>

        <p>
          For each of the following questions, provide a range that you are{' '}
          <b>{targetConfidencePercent}% confident</b> includes the correct
          answer.
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
              <b>
                {correctAnswers} out of {questions.length}
              </b>{' '}
              answers are within the ranges you specified. This amounts to{' '}
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
      </AppContainer>

      <Footer>
        <div>
          credit:&nbsp;
          <ExternalLink href="https://peterattiamd.com/confidence">
            peterattiamd.com/confidence
          </ExternalLink>
        </div>

        <div>
          © {new Date().getFullYear()}&nbsp;
          <ExternalLink href="https://vdsabev.com">vlad sabev</ExternalLink>
        </div>

        <div>
          source:&nbsp;
          <ExternalLink href="https://github.com/vdsabev/95-percent">
            github.com/vdsabev/95-percent
          </ExternalLink>
        </div>
      </Footer>
    </>
  );
};

export default App;

const AppContainer = styled.div`
  max-width: 80rem;
  min-height: 80vh;
  margin: 0 auto;
  background: ${theme.neutral.lightest};
  padding: 4rem;
  margin-top: 30vmin;
`;

const Image = styled.img`
  display: block;
  width: 100%;
  min-height: 30vmin;
  margin-top: -30vmin;
`;

const Title = styled.h2`
  margin: 2em 0 0.8em 0;

  &:first-child {
    margin-top: 0;
  }
`;

const Button = styled(BaseButton)`
  width: 100%;
  margin-top: 8rem;
`;

const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  max-width: 80rem;
  margin: 0 auto 10vmin auto;
  padding: 1rem;

  color: ${theme.primary.contrast};
  font-size: 1.2rem;

  @media (min-width: 50em) {
    padding: 1rem 0;
  }
`;
