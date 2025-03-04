const express = require('express');
const bodyParser = require('body-parser');
const { google } = require('googleapis');
const app = express();
const port = 5000;

app.use(bodyParser.json());

// Google Sheets API setup
const SPREADSHEET_ID = '1HPuLbh_0ld_eSG2doz0_PLTGi0sGxyBhsrqc8J7p8LU';
const API_KEY = 'AIzaSyCnLhMgs6gxSk1eIpCP4gm-5A8DJbY79hM';
const sheets = google.sheets({ version: 'v4', auth: new google.auth.GoogleAuth({ key: API_KEY }) });

const range = 'Sheet1!A1:E';

app.get('/api/inventory', async (req, res) => {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range,
    });
    const values = response.data.values;
    if (values.length) {
      res.json(values);
    } else {
      res.status(404).json({ message: 'No data found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/requests', async (req, res) => {
  // Handle request submission
  res.json({ message: 'Request submitted successfully' });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
