const google = require('./src/google')
const http = require('./src/http')
const {
  GOOGLE_SHEETS_SHEET_ID,
  GOOGLE_SHEETS_SHEET_RANGE,
} = require('./src/settings')

exports.handler = http.function(async () => {
  const result = await google.sheets.spreadsheets.values.get({
    spreadsheetId: GOOGLE_SHEETS_SHEET_ID,
    range: GOOGLE_SHEETS_SHEET_RANGE,
  })
  const [columns, ...rowsOfCells] = result.data.values
  return {
    body: rowsOfCells
      .map(toRowObject(columns.map(toQuestionKey)))
      .map(toRowWithId),
  }
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
