import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import { brightIn, fadeIn, slideInFromBottom } from '../animations';
import { usePromise } from '../hooks';
import { getQuestions } from '../services';
import theme from '../theme';
import BaseButton from '../Components/Button';
import ExternalLink from '../Components/ExternalLink';
import {
  contributeFormUrl,
  numberOfQuestionsInBatch,
  targetConfidencePercent,
} from '../settings';

import HeaderImage from './HeaderImage';
import Question from './Question';
import intervalValuesStorage from './intervalValuesStorage';

const defaultIntervalValues = {};

const App = () => {
  const questions = useRandomQuestions(numberOfQuestionsInBatch);

  const [intervalValues, setIntervalValues] = useState(
    intervalValuesStorage.get() || defaultIntervalValues
  );
  const setIntervalValue = (key) => (field) => (e) => {
    const { value } = e.target;
    setIntervalValues((intervalValues) => ({
      ...intervalValues,
      [key]: { ...intervalValues[key], [field]: value },
    }));
  };

  const [correctAnswers, setCorrectAnswers] = useState(null);
  const confidencePercent = Math.round(
    100 * (correctAnswers / questions.length)
  );

  const checkAnswers = (e) => {
    e.preventDefault();
    const correctAnswers = questions.reduce((correctAnswers, question) => {
      const intervalValue = intervalValues[question.id];
      const answerIsWithinInterval =
        intervalValue.min <= question.answer &&
        question.answer <= intervalValue.max;
      return correctAnswers + (answerIsWithinInterval ? 1 : 0);
    }, 0);
    setCorrectAnswers(correctAnswers);
  };

  const resetAnswers = () => {
    setIntervalValues(defaultIntervalValues);
    setCorrectAnswers(null);
  };

  useEffect(() => {
    if (intervalValues === defaultIntervalValues) {
      intervalValuesStorage.clear();
    } else {
      intervalValuesStorage.set(intervalValues);
    }
  }, [intervalValues]);

  return (
    <>
      <HeaderImage />

      <AppContainer>
        <Title>{targetConfidencePercent}% Confidence Interval</Title>

        <p>
          How accurately can you estimate your own confidence about unfamiliar
          facts and figures?
        </p>

        <p>
          For each of the following questions (randomly sampled from our
          collection), provide an interval that you are{' '}
          <b>{targetConfidencePercent}% confident</b> includes the correct
          answer.
        </p>

        <form onSubmit={checkAnswers}>
          {questions.map((question, questionIndex) => (
            <Question
              key={question.question}
              question={`Q${questionIndex + 1}: ${question.question}`}
              min={intervalValues[question.id]?.min}
              max={intervalValues[question.id]?.max}
              setIntervalValue={setIntervalValue(question.id)}
            />
          ))}

          {correctAnswers == null && (
            <Button type="submit">Check Answers</Button>
          )}
        </form>

        {correctAnswers != null && (
          <>
            <Title>Results</Title>

            <p>
              <b>
                {correctAnswers} out of {questions.length}
              </b>{' '}
              answers are within the intervals you specified. This amounts to{' '}
              <b>{confidencePercent}%</b>.
            </p>

            <p>
              {confidencePercent < targetConfidencePercent ? (
                <span>
                  The goal is to get exactly <b>{targetConfidencePercent}%</b>{' '}
                  right - you were likely <b>overly confident</b> and did not
                  use large enough intervals.
                </span>
              ) : confidencePercent > targetConfidencePercent ? (
                <span>
                  The goal is to get exactly <b>{targetConfidencePercent}%</b>{' '}
                  right - you were likely <b>not confident enough</b> and used
                  too large intervals.
                </span>
              ) : (
                <span>Wow, you got it just right!</span>
              )}
            </p>

            <p>Want another go?</p>

            <Button type="button" onClick={resetAnswers} autoFocus>
              Reset Answers
            </Button>
          </>
        )}

        <Contribute>
          Want to contribute?{' '}
          <ExternalLink href={contributeFormUrl}>
            Submit your own question here
          </ExternalLink>
        </Contribute>
      </AppContainer>

      <Footer>
        <FooterItem>
          original idea:{' '}
          <ExternalLink href="https://peterattiamd.com/confidence">
            peterattiamd.com/confidence
          </ExternalLink>
        </FooterItem>

        <FooterItem>
          code:{' '}
          <ExternalLink href="https://github.com/vdsabev/95-percent">
            github.com/vdsabev/95-percent
          </ExternalLink>
        </FooterItem>
      </Footer>
    </>
  );
};

export default App;

const useRandomQuestions = (numberOfQuestions) => {
  const allQuestions = usePromise(getQuestions) || [];
  const questions = useMemo(
    () =>
      allQuestions
        .sort(() => Math.random() - 0.5) // Naïve and probably wrong. See https://blog.codinghorror.com/the-danger-of-naivete/
        .slice(0, numberOfQuestions),
    [allQuestions, numberOfQuestions]
  );

  return questions;
};

const AppContainer = styled.div`
  animation: ${fadeIn} ${theme.durations.short}ms,
    ${brightIn} ${theme.durations.long}ms,
    ${slideInFromBottom} ${theme.durations.long}ms
      ${theme.transitions.easeInOut};
  animation-fill-mode: forwards;

  max-width: 80rem;
  min-height: 80vh;
  margin: 0 auto;
  background: ${theme.neutral.lightest};
  padding: 5vmin;
  padding-top: 30vmin;
`;

const Title = styled.h2`
  margin: 2em 0 1em 0;

  &:first-child {
    margin-top: 0;
  }
`;

const Button = styled(BaseButton)`
  width: 100%;
  margin-top: 4rem;
`;

const Contribute = styled.p`
  margin-top: 4rem;
`;

const Footer = styled.footer`
  display: flex;
  gap: 1rem;
  flex-direction: column;
  justify-content: space-between;
  max-width: 80rem;
  margin: 0 auto 10vmin auto;
  padding: 1rem;

  color: ${theme.primary.contrast};
  font-size: 1.2rem;

  @media (min-width: 50em) {
    flex-direction: row;
    padding: 1rem 0;
  }
`;

const FooterItem = styled.div`
  margin: 0.5rem 2rem;

  @media (min-width: 50em) {
    margin: 0;
  }
`;
