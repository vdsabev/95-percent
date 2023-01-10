import React, { useRef, useState } from 'react'
import styled from 'styled-components'

import { brightIn, fadeIn, slideInFromBottom } from '../animations'
import theme from '../theme'
import {
  contributeFormUrl,
  numberOfQuestionsInBatch,
  targetConfidencePercent,
} from '../settings'
import system from '../system'

import { DangerButton, PrimaryButton } from '../Components/Button'
import Emoji from '../Components/Emoji'
import ExternalLink from '../Components/ExternalLink'

import HeaderImage from './HeaderImage'
import Question from './Question'
import useElementScroller from './useElementScroller'
import useIntervalValues from './useIntervalValues'
import useRandomQuestions from './useRandomQuestions'

const App = () => {
  const questions = useRandomQuestions(numberOfQuestionsInBatch)
  const [numberOfCorrectAnswers, setNumberOfCorrectAnswers] = useState(null)
  const numberOfTotalAnswers = questions.length
  const confidencePercent = Math.round(
    100 * (numberOfCorrectAnswers / numberOfTotalAnswers)
  )

  const {
    intervalValues,
    numberOfIntervalValues,
    setIntervalValue,
    resetIntervalValues,
  } = useIntervalValues()

  const startElementRef = useRef(null)
  const resultsElementRef = useRef(null)
  const elementScroller = useElementScroller({
    previousElementRef: startElementRef,
    nextElementRef: resultsElementRef,
  })

  const checkAnswers = (/** @type {React.FormEvent<HTMLFormElement>}*/ e) => {
    e.preventDefault()
    const numberOfCorrectAnswers = questions.reduce(
      (numberOfCorrectAnswers, question) => {
        const intervalValue = intervalValues[question.id]
        const answerIsWithinInterval =
          intervalValue.min <= question.answer &&
          question.answer <= intervalValue.max
        return numberOfCorrectAnswers + (answerIsWithinInterval ? 1 : 0)
      },
      0
    )
    setNumberOfCorrectAnswers(numberOfCorrectAnswers)
    elementScroller.scrollToNext()
  }

  const resetAnswers = () => {
    const affirmativeAnswer = '100%'
    const answer = system.prompt(`
Heads up!

You're about to delete ${numberOfIntervalValues} answers that you already spent time filling in.
How confident are you that you want to do this?

(type "${affirmativeAnswer}" to continue)
    `)
    if (answer !== affirmativeAnswer) return

    resetIntervalValues()
    setNumberOfCorrectAnswers(null)
    elementScroller.scrollToPrevious()
  }

  return (
    <>
      <HeaderImage />

      <AppContainer>
        <Title ref={startElementRef}>
          {targetConfidencePercent}% Confidence Interval
        </Title>

        <p>
          How accurate are you really when you think you're{' '}
          <b>almost certain</b> about something?
        </p>

        <p>
          For each of the following questions (randomly sampled from our
          collection), provide a number interval that you are{' '}
          <b>{targetConfidencePercent}% confident</b> includes the correct
          answer.
        </p>

        <p>
          Important - <b>not 100% confident</b>, but{' '}
          <b>{targetConfidencePercent}%</b>! Meaning you must leave some room
          for being wrong.
        </p>

        <p>
          This doesn't test your intelligence or trivia knowledge - it tests how
          aware you are of your limitations. The questions are intentionally
          difficult, obscure facts and figures. You're unlikely to know all of
          them, or even most of them. Try to give your best estimate and see
          where your confidence takes you.
        </p>

        <p>
          To allow you to retake the test and improve your results, the correct
          answers will not be revealed, only how many you got right. Good luck!
        </p>

        <form onSubmit={checkAnswers}>
          {questions.map((question, questionIndex) => (
            <Question
              key={question.question}
              question={`Q${questionIndex + 1}: ${question.question}`}
              min={intervalValues[question.id]?.min}
              max={intervalValues[question.id]?.max}
              setIntervalValue={setIntervalValue(question.id)}
              delay={questionIndex}
            />
          ))}

          <ButtonBar>
            <DangerButton
              type="button"
              onClick={resetAnswers}
              disabled={numberOfIntervalValues === 0}
              data-tooltip="You haven't filled in any answers yet"
            >
              Reset Answers
            </DangerButton>

            <PrimaryButton type="submit">Check Answers</PrimaryButton>
          </ButtonBar>
        </form>

        {numberOfCorrectAnswers != null && (
          <>
            <Title ref={resultsElementRef}>Results</Title>

            <p>
              <b>
                {numberOfCorrectAnswers} out of {numberOfTotalAnswers}
              </b>{' '}
              answers are within the intervals you specified. This amounts to{' '}
              <b>{confidencePercent}%</b>.
            </p>

            {confidencePercent < targetConfidencePercent ? (
              <>
                <p>
                  The goal is to get exactly <b>{targetConfidencePercent}%</b>{' '}
                  right - you were likely <b>overly confident</b> and did not
                  use large enough intervals. Hey, it happens to the best of us,
                  let alone you! No worries, we won't tell your friends.
                </p>

                <p>
                  Readjust your answers and try again <Emoji symbol="😉" />
                </p>
              </>
            ) : confidencePercent > targetConfidencePercent ? (
              <>
                <p>
                  The goal is to get exactly <b>{targetConfidencePercent}%</b>{' '}
                  right - you were likely <b>not confident enough</b> and used
                  too large intervals. Or you tried to cheat. You little rascal!
                  What would your mother say?!
                </p>

                <p>
                  Readjust your answers and try again <Emoji symbol="😉" />
                </p>
              </>
            ) : (
              <>
                <p>
                  Wow, you got it just right! You are now officially allowed to
                  work as a hedge fund manager! Just tell them a guy on the
                  Internet sent you <Emoji symbol="😉" />
                </p>

                <p>
                  I know this was a long test, so here's a potato as a reward{' '}
                  <Emoji label="potato" symbol="🥔" />
                </p>
              </>
            )}
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
  )
}

export default App

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
  padding-top: 24vmin;
`

const Title = styled.h2`
  margin: 2em 0 1em 0;

  &:first-child {
    margin-top: 0;
  }
`

const ButtonBar = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-auto-flow: row;
  margin-top: 4rem;

  @media (min-width: 50em) {
    grid-auto-flow: column;
  }
`

const Contribute = styled.p`
  margin-top: 4rem;
`

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
`

const FooterItem = styled.div`
  margin: 0.5rem 2rem;

  @media (min-width: 50em) {
    margin: 0;
  }
`
