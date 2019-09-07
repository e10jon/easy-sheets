# Easy Sheets

Easy Sheets is a modern, typed javascript library to access Google Sheets. It was made for 2 reasons:
- to be able to do simple sheet operations using terse commands;
- to be able to access Google API credentials as a string (which could be set as an environment variable).

## To setup:

- Create a Google Cloud project
- Enable the Google Sheets API
- Create a service account, download the JSON credentials
- Base64 your credentials like so: `btoa(JSON.stringify(YOUR CREDENTIALS))`
- Create a Google Sheet, note the ID
- Click the sheet's "Share" button and add the service account with "edit" permissions.

## To use:

```
import EasySheets from 'easy-sheets'

const easySheets = new EasySheets(SPREADSHEET_ID, BASE64_CREDS)

# add a row
await easySheets.addRow(['this', 'was easy'])
```