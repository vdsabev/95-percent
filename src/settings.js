export const apiBaseUrl = '/.netlify/functions'

export const contributeFormUrl = import.meta.env.VITE_CONTRIBUTE_FORM_URL

export const numberOfQuestionsInBatch = parseInt(
  import.meta.env.VITE_NUMBER_OF_QUESTIONS_IN_BATCH
)

export const targetConfidencePercent = parseFloat(
  import.meta.env.VITE_TARGET_CONFIDENCE
)
