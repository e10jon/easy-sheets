import { sheets_v4 } from 'googleapis';
export default class EasySheets {
    private serviceAccountCreds;
    private sheetId;
    sheets?: sheets_v4.Sheets;
    constructor(sheetId: string, creds64: string);
    addRow: (values: any[]) => Promise<boolean>;
    authorize: () => Promise<sheets_v4.Sheets>;
    clearRange: (range: string) => Promise<boolean>;
    getRange: (range: string, opts?: {
        headerRow: boolean | "raw";
    } | undefined) => Promise<any[][] | undefined>;
    updateRange: (range: string, values: any[][]) => Promise<boolean>;
}
