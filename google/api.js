const { google } = require('googleapis')

module.exports.ssId = [
  '1JaT9eFslOitKwk8cnceoCr1fOkxqjhzSfVRg5BXvp8M'
]

async function authGoogle() {

  const auth = await new google.auth.GoogleAuth({
    keyFile: 'src/google/keys.json',
    scopes: 'https://www.googleapis.com/auth/spreadsheets',
  })

  // Create client instance for auth
  // const client = await auth.getClient()
  await auth.getClient()

  // Instance of Google Sheets API
  const googleSheets = google.sheets({
    version: 'v4',
    client: 'auth'
  })

  return {
    auth,
    googleSheets
  }

}

module.exports.readGoogleSheet = async function ({ spreadsheetId, sheetName }) {
  const { auth, googleSheets } = await authGoogle()

  // Read rows from spreadsheet
  return await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: `${sheetName}!A:G`,
  })

}

module.exports.appendGoogleSheet = async function ({ spreadsheetId, sheetName, values }) {
  const { auth, googleSheets } = await authGoogle()

  if (values.length === 0) return

  await googleSheets.spreadsheets.values.append({
    auth,
    spreadsheetId,
    range: `${sheetName}!A1:O`,
    insertDataOption: 'INSERT_ROWS',
    valueInputOption: 'RAW',
    resource: { values }
  })

}

module.exports.clearGoogleSheet = async function ({ spreadsheetId, sheetName }) {
  const { auth, googleSheets } = await authGoogle()

  await googleSheets.spreadsheets.values.clear({
    auth,
    spreadsheetId,
    range: `${sheetName}!A1:O`,
  })

}
