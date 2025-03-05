const express = require('express');
const bodyParser = require('body-parser');
const { google } = require('googleapis');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

// Google Sheets API setup
const SPREADSHEET_ID = process.env.SPREADSHEET_ID;
const API_KEY = process.env.API_KEY;
const sheets = google.sheets({ version: 'v4', auth: new google.auth.GoogleAuth({ key: API_KEY }) });

const inventoryRange = 'Sheet1!A1:E';
const requestsRange = 'Requests!A1:F';

app.get('/api/inventory', async (req, res) => {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: inventoryRange,
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
  const { itemName, requiredQuantity, trainSetNumber, carNumber, ncrNumber } = req.body;
  const request = [itemName, requiredQuantity, trainSetNumber, carNumber, ncrNumber, new Date().toISOString()];

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: requestsRange,
      valueInputOption: 'RAW',
      resource: { values: [request] },
    });
    res.json({ message: 'Request submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/requests', async (req, res) => {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: requestsRange,
    });
    const values = response.data.values;
    if (values.length) {
      res.json(values);
    } else {
      res.status(404).json({ message: 'No requests found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put('/api/requests/:id', async (req, res) => {
  const { id } = req.params;
  const { status, healthySerials, faultySerials, reason } = req.body;
  const updatedRequest = [status, healthySerials, faultySerials, reason, new Date().toISOString()];

  try {
    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: `${requestsRange}!${id}:${id}`,
      valueInputOption: 'RAW',
      resource: { values: [updatedRequest] },
    });
    res.json({ message: 'Request updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
