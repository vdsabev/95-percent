import { useMemo } from 'react'
import { usePromise } from '../hooks'
import { getQuestions } from '../services'

const useRandomQuestions = (numberOfQuestions) => {
  const allQuestions = usePromise(getQuestions) || []
  const questions = useMemo(
    () =>
      allQuestions
        .sort(() => Math.random() - 0.5) // Naïve and probably wrong. See https://blog.codinghorror.com/the-danger-of-naivete/
        .slice(0, numberOfQuestions),
    [allQuestions, numberOfQuestions]
  )

  return questions
}

export default useRandomQuestions
