"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const googleapis_1 = require("googleapis");
const util_1 = require("util");
class EasySheets {
    constructor(sheetId, creds64) {
        this.addRow = async (values) => {
            await this.sheets.spreadsheets.values.append({
                range: 'A1:A5000000',
                requestBody: { values: [values] },
                spreadsheetId: this.sheetId,
                valueInputOption: 'RAW',
            });
            return true;
        };
        this.authorize = async () => {
            const oauth2Client = new googleapis_1.google.auth.JWT({
                email: this.serviceAccountCreds.client_email,
                key: this.serviceAccountCreds.private_key,
                scopes: ['https://spreadsheets.google.com/feeds'],
            });
            const authorize = util_1.promisify(oauth2Client.authorize).bind(oauth2Client);
            await authorize();
            this.sheets = googleapis_1.google.sheets({
                auth: oauth2Client,
                version: 'v4',
            });
            return true;
        };
        this.clearRange = async (range) => {
            await this.sheets.spreadsheets.values.clear({
                range,
                spreadsheetId: this.sheetId,
            });
            return true;
        };
        this.getRange = async (range) => {
            const { data: { values } } = await this.sheets.spreadsheets.values.get({
                range,
                spreadsheetId: this.sheetId,
            });
            return values;
        };
        this.updateRange = async (range, values) => {
            await this.sheets.spreadsheets.values.update({
                range,
                requestBody: { values },
                spreadsheetId: this.sheetId,
                valueInputOption: 'RAW',
            });
            return true;
        };
        this.sheetId = sheetId;
        this.serviceAccountCreds = JSON.parse(Buffer.from(creds64, 'base64').toString());
    }
}
exports.default = EasySheets;
