import { sheets_v4 } from 'googleapis';
export default class EasySheets {
    private serviceAccountCreds;
    private spreadsheetId;
    sheets?: sheets_v4.Sheets;
    constructor(spreadsheetId: string, creds64: string);
    addRow: (values: any[], opts?: {
        sheet?: string;
    }) => Promise<boolean>;
    addMultipleRows: (values: any[][], opts?: {
        sheet?: string;
    }) => Promise<boolean>;
    authorize: () => Promise<sheets_v4.Sheets>;
    clearRange: (range: string, opts?: {
        sheet?: string;
    }) => Promise<boolean>;
    getRange: (range: string, opts?: {
        headerRow?: boolean | 'raw';
        sheet?: string;
    }) => Promise<any[][] | undefined | null>;
    updateRange: (range: string, values: any[][], opts?: {
        sheet?: string;
    }) => Promise<boolean>;
}
