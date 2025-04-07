import http from 'cmless/client/http'
import { apiBaseUrl } from './settings'

/** @typedef {{ id: string, question: string, answer: number }} Question */

/** @returns {Promise<Question[]>} */
export const getQuestions = () => {
  return http
    .get(`${apiBaseUrl}/questions`)
    .then((response) =>
      response.questions.map((question, index) => ({
        id: index.toString(),
        ...question,
      }))
    )
}
