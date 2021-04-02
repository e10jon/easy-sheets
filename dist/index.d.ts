import { sheets_v4 } from 'googleapis';
export default class EasySheets {
    private serviceAccountCreds;
    private spreadsheetId;
    sheets?: sheets_v4.Sheets;
    constructor(spreadsheetId: string, creds64: string);
    addRow: (values: unknown[], opts?: {
        sheet?: string;
    }) => Promise<boolean>;
    addMultipleRows: (values: unknown[][], opts?: {
        sheet?: string;
    }) => Promise<boolean>;
    addSheet: (title: string) => Promise<boolean>;
    authorize: () => Promise<sheets_v4.Sheets>;
    clearRange: (range: string, opts?: {
        sheet?: string;
    }) => Promise<boolean>;
    deleteSheet: (sheetTitle: string) => Promise<boolean>;
    getRange: <T>(range: string, opts?: {
        headerRow?: boolean | 'raw';
        sheet?: string;
    }) => Promise<unknown[][] | T[] | null | undefined>;
    updateRange: (range: string, values: unknown[][], opts?: {
        sheet?: string;
    }) => Promise<boolean>;
    private getSheetId;
}
