"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../");
const { SPREADSHEET_ID, CREDS } = process.env;
let easySheets;
beforeAll(() => {
    easySheets = new __1.default(SPREADSHEET_ID || '', CREDS || '');
});
test('all operations', async () => {
    // multisheet
    for (const sheet of [undefined, 'Sheet2']) {
        // clearRange
        expect(await easySheets.clearRange('A1:B5000000', { sheet })).toBe(true);
        // updateRange
        expect(await easySheets.updateRange('A1:B2', [
            ['First Name', 'Last Name'],
            ['Tim', 'Jones'],
        ], { sheet })).toBe(true);
        // addRow
        expect(await easySheets.addRow(['Bob', 'Smith'], { sheet })).toBe(true);
        // add multiple rows
        expect(await easySheets.addMultipleRows([
            ['Bob', 'Smith'],
            ['John', 'Doe'],
        ], { sheet })).toBe(true);
        // getRange
        expect(await easySheets.getRange('A1:B3', { sheet })).toStrictEqual([
            ['First Name', 'Last Name'],
            ['Tim', 'Jones'],
            ['Bob', 'Smith'],
        ]);
        // getRange with headerRow raw
        expect(await easySheets.getRange('A1:B3', { headerRow: 'raw', sheet })).toStrictEqual([
            { 'First Name': 'Tim', 'Last Name': 'Jones' },
            { 'First Name': 'Bob', 'Last Name': 'Smith' },
        ]);
        // getRange with headerRow
        expect(await easySheets.getRange('A1:B3', { headerRow: true, sheet })).toStrictEqual([
            { firstName: 'Tim', lastName: 'Jones' },
            { firstName: 'Bob', lastName: 'Smith' },
        ]);
    }
}, 60000);
