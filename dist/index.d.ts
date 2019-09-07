import { sheets_v4 } from 'googleapis';
export default class EasySheets {
    private serviceAccountCreds;
    private spreadsheetId;
    sheets?: sheets_v4.Sheets;
    constructor(spreadsheetId: string, creds64: string);
    addRow: (values: any[], opts?: {
        sheet?: string | undefined;
    }) => Promise<boolean>;
    authorize: () => Promise<sheets_v4.Sheets>;
    clearRange: (range: string, opts?: {
        sheet?: string | undefined;
    }) => Promise<boolean>;
    getRange: (range: string, opts?: {
        headerRow?: boolean | "raw" | undefined;
        sheet?: string | undefined;
    }) => Promise<any[][] | undefined>;
    updateRange: (range: string, values: any[][], opts?: {
        sheet?: string | undefined;
    }) => Promise<boolean>;
}
