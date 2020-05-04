import Papa from 'papaparse'
import { questionsSpreadsheetUrl } from './settings'

/** @typedef {{ id: string, question: string, answer: number }} Question */

/** @returns {Promise<Question[]>} */
export const getQuestions = () => {
  return getCsvByUrl(questionsSpreadsheetUrl).then((questions) =>
    questions.map((question) => ({
      ...question,
      id: question.question
        .toLowerCase()
        .split(/\s+/)
        .join('_')
        .replace(/[\W,]/g, ''),
    }))
  )
}

const getCsvByUrl = (url, options) => {
  return new Promise((resolve, reject) => {
    Papa.parse(url, {
      download: true,
      dynamicTyping: true,
      header: true,
      transformHeader(header) {
        return header
          .toLowerCase()
          .split(/\s+/)
          .join('_')
      },
      complete(response) {
        if (response.errors.length > 0) {
          reject(response.errors)
        } else {
          resolve(response.data)
        }
      },
      ...options,
    })
  })
}
