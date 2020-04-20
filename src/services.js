import tabletop from 'tabletop';

const spreadsheetUrl = process.env.REACT_APP_GOOGLE_SPREADSHEET_URL;

const services = {
  async getQuestions() {
    const data = await tabletop.init({
      key: spreadsheetUrl,
      simpleSheet: true,
      parseNumbers: true,
    });

    return data;
  },
};

export default services;
