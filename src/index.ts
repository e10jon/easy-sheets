import {google, sheets_v4} from 'googleapis'
import {JWTOptions} from 'google-auth-library'
import {promisify} from 'util'

interface ServiceAccountCreds {
  auth_provider_x509_cert_url: string,
  auth_uri: string,
  client_email: string,
  client_id: string,
  client_x509_cert_url: string,
  private_key: string,
  private_key_id: string,
  project_id: string,
  token_uri: string,
  type: string,
}

export default class EasySheets {
  private serviceAccountCreds: ServiceAccountCreds
  private sheetId: string

  private sheets?: sheets_v4.Sheets

  public constructor(sheetId: string, creds64: string) {
    this.sheetId = sheetId
    this.serviceAccountCreds = JSON.parse(Buffer.from(creds64, 'base64').toString()) as ServiceAccountCreds
  }

  public addRow = async (values: any[]): Promise<boolean> => {
    const sheets = await this.authorize()

    await sheets.spreadsheets.values.append({
      range: 'A1:A5000000',
      requestBody: {values: [values]},
      spreadsheetId: this.sheetId,
      valueInputOption: 'USER_ENTERED',
    })
    return true
  }

  public authorize = async (): Promise<sheets_v4.Sheets> => {
    if (!this.sheets) {
      const oauth2Client = new google.auth.JWT({
        email: this.serviceAccountCreds.client_email,
        key: this.serviceAccountCreds.private_key,
        scopes: ['https://spreadsheets.google.com/feeds'],
      } as JWTOptions)

      const authorize = promisify(oauth2Client.authorize).bind(oauth2Client)
      await authorize()

      this.sheets = google.sheets({
        auth: oauth2Client,
        version: 'v4',
      })
    }

    return this.sheets
  }

  public clearRange = async (range: string): Promise<boolean> => {
    const sheets = await this.authorize()

    await sheets.spreadsheets.values.clear({
      range,
      spreadsheetId: this.sheetId,
    })
    return true
  }

  public getRange = async (range: string): Promise<any[][] | undefined> => {
    const sheets = await this.authorize()

    const {data: {values}} = await sheets.spreadsheets.values.get({
      range,
      spreadsheetId: this.sheetId,
    })
    return values
  }

  public updateRange = async (range: string, values: any[][]): Promise<boolean> => {
    const sheets = await this.authorize()

    await sheets.spreadsheets.values.update({
      range,
      requestBody: {values},
      spreadsheetId: this.sheetId,
      valueInputOption: 'USER_ENTERED',
    })
    return true
  }
}