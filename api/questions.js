const { getData } = require('cmless/server')

exports.handler = (request, context) => {
  return getData(
    {
      ...request,
      queryStringParameters: {
        questions: {
          url: `https://docs.google.com/spreadsheets/d/${process.env.GOOGLE_SHEETS_SHEET_ID}`,
          options: {
            range: process.env.GOOGLE_SHEETS_SHEET_RANGE,
            columns: {
              Question: 'question',
              Answer: 'answer',
            },
          },
        },
      },
    },
    context
  )
}
