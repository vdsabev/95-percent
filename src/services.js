import { apiBaseUrl } from './settings'

/** @typedef {{ id: string, question: string, answer: number }} Question */

/** @returns {Promise<Question[]>} */
export const getQuestions = () => {
  return fetchJson(`${apiBaseUrl}/questions`)
}

const fetchJson = (
  /** @type {RequestInfo} */ input,
  /** @type {RequestInit?} */ init
) => {
  return fetch(input, init).then((response) => {
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`)
    }
    return response.json()
  })
}
