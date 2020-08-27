const { google } = require('googleapis')
const http = require('./src/http')
const {
  GOOGLE_SHEETS_API_KEY,
  GOOGLE_SHEETS_SHEET_ID,
  GOOGLE_SHEETS_SHEET_RANGE,
} = require('./src/settings')

exports.handler = http.function({
  method: 'GET',
  async handler(request, context) {
    const sheets = google.sheets({ version: 'v4', auth: GOOGLE_SHEETS_API_KEY })
    try {
      const result = await sheets.spreadsheets.values.get({
        spreadsheetId: GOOGLE_SHEETS_SHEET_ID,
        range: GOOGLE_SHEETS_SHEET_RANGE,
      })
      const [columns, ...rowsOfCells] = result.data.values
      return http.json(
        rowsOfCells
          .map(toRowObject(columns.map(toQuestionKey)))
          .map(toRowWithId)
      )
    } catch (error) {
      return http.error(502, error)
    }
  },
})

const toRowObject = (/** @type {string[]} */ columns) => (
  /** @type {string[]} */ cells
) => {
  return columns.reduce(
    (row, column, index) => ({ ...row, [column]: parseValue(cells[index]) }),
    {}
  )
}

const parseValue = (value) => {
  const valueAsNumber = Number(value)
  return isNaN(valueAsNumber) ? value : valueAsNumber
}

const toRowWithId = (row) => ({
  ...row,
  id: toQuestionKey(row.question).replace(/[\W,]/g, ''),
})

const toQuestionKey = (/** @type {string} */ column) => {
  return column.toLowerCase().split(/\s+/).join('_')
}
