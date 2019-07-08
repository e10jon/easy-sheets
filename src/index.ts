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
  private sheets: sheets_v4.Sheets

  public constructor(sheetId: string, creds64: string) {
    this.sheetId = sheetId
    this.serviceAccountCreds = JSON.parse(Buffer.from(creds64, 'base64').toString()) as ServiceAccountCreds
  }

  public authorize = async (): Promise<boolean> => {
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

    return true
  }

  public getRange = async (range: string) => {
    const {data: {values}} = await this.sheets.spreadsheets.values.get({
      range,
      spreadsheetId: this.sheetId,
    })
    return values
  }

  public updateRange = async (range: string, values: any) => {
    await this.sheets.spreadsheets.values.update({
      range,
      requestBody: {values},
      spreadsheetId: this.sheetId,
      valueInputOption: 'RAW',
    })
    return true
  }
}