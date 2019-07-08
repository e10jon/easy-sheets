export default class EasySheets {
    private serviceAccountCreds;
    private sheetId;
    private sheets;
    constructor(sheetId: string, creds64: string);
    addRow: (values: any[]) => Promise<boolean>;
    authorize: () => Promise<boolean>;
    clearRange: (range: string) => Promise<boolean>;
    getRange: (range: string) => Promise<any[][]>;
    updateRange: (range: string, values: any[][]) => Promise<boolean>;
}
