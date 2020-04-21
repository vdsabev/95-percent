import tabletop from 'tabletop';

const spreadsheetUrl = process.env.REACT_APP_GOOGLE_SPREADSHEET_URL;
const timestampColumnKey = 'Timestamp';

const services = {
  async getAnswers() {
    const data = await tabletop.init({
      key: spreadsheetUrl,
      simpleSheet: true,
    });

    return data.map((answers) =>
      Object.keys(answers)
        .filter((key) => key !== timestampColumnKey)
        .reduce((results, key) => [...results, { q: key, a: answers[key] }], [])
    );
  },
};

export default services;
