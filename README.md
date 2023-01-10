<h1 align="center">
  95% Confidence Interval 🎯
</h1>

<p align="center">
  How accurate are you really when you think you have 95% confidence in something?
</p>

# Setup

1. Create a Google Form with fields "Question" and "Answer", then export results to a spreadsheet.
2. Publish spreadsheet as CSV following the instructions here: https://github.com/jsoma/tabletop#like-how-easy
3. Set up required environment variables by creating a `.env` file locally or configuring your hosting provider:
   ```
   GOOGLE_API_KEY=[THE SUPER SECRET SERVICE ACCOUNT JSON YOU CREATE IN THE GOOGLE API CONSOLE]
   GOOGLE_SHEETS_SHEET_ID=[ID OF THE GOOGLE SHEET FOUND IN THE URL]
   GOOGLE_SHEETS_SHEET_RANGE=Form Responses 1!B:C
   VITE_CONTRIBUTE_FORM_URL=https://docs.google.com/forms/d/e/YOUR_FORM_URL_HERE/viewform
   VITE_NUMBER_OF_QUESTIONS_IN_BATCH=20
   VITE_TARGET_CONFIDENCE=95
   ```
4. `npm start`
5. Open http://localhost:3000

# Inspiration
Original idea: https://peterattiamd.com/confidence
