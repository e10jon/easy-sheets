'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const googleapis_1 = require('googleapis')
const lodash_1 = require('lodash')
const util_1 = require('util')
const buildRange = (range, sheet) => (sheet ? `${sheet}!${range}` : range)
class EasySheets {
  constructor(spreadsheetId, creds64) {
    this.addRow = async (values, opts = {}) => {
      const sheets = await this.authorize()
      await sheets.spreadsheets.values.append({
        range: buildRange('A1:A5000000', opts.sheet),
        requestBody: { values: [values] },
        spreadsheetId: this.spreadsheetId,
        valueInputOption: 'USER_ENTERED',
      })
      return true
    }
    this.authorize = async () => {
      if (!this.sheets) {
        const oauth2Client = new googleapis_1.google.auth.JWT({
          email: this.serviceAccountCreds.client_email,
          key: this.serviceAccountCreds.private_key,
          scopes: ['https://spreadsheets.google.com/feeds'],
        })
        const authorize = util_1.promisify(oauth2Client.authorize).bind(oauth2Client)
        await authorize()
        this.sheets = googleapis_1.google.sheets({
          auth: oauth2Client,
          version: 'v4',
        })
      }
      return this.sheets
    }
    this.clearRange = async (range, opts = {}) => {
      const sheets = await this.authorize()
      await sheets.spreadsheets.values.clear({
        range: buildRange(range, opts.sheet),
        spreadsheetId: this.spreadsheetId,
      })
      return true
    }
    this.getRange = async (range, opts = {}) => {
      const sheets = await this.authorize()
      const {
        data: { values },
      } = await sheets.spreadsheets.values.get({
        range: buildRange(range, opts.sheet),
        spreadsheetId: this.spreadsheetId,
      })
      if (opts.headerRow && values) {
        const headerKeys = opts.headerRow === 'raw' ? values[0] : values[0].map(lodash_1.camelCase)
        return values.slice(1).map((row) => {
          return headerKeys.reduce((obj, header, i) => {
            obj[header] = row[i]
            return obj
          }, {})
        })
      } else {
        return values
      }
    }
    this.updateRange = async (range, values, opts = {}) => {
      const sheets = await this.authorize()
      await sheets.spreadsheets.values.update({
        range: buildRange(range, opts.sheet),
        requestBody: { values },
        spreadsheetId: this.spreadsheetId,
        valueInputOption: 'USER_ENTERED',
      })
      return true
    }
    this.spreadsheetId = spreadsheetId
    this.serviceAccountCreds = JSON.parse(Buffer.from(creds64, 'base64').toString())
  }
}
exports.default = EasySheets
