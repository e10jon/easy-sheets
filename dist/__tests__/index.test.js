"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const { SHEET_ID, CREDS } = process.env;
let easySheets;
beforeAll(() => {
    easySheets = new index_1.default(SHEET_ID || '', CREDS || '');
});
test('clearRange, updateValues, addRow, and getValues', async () => {
    expect(await easySheets.clearRange('A1:A5000000')).toBe(true);
    expect(await easySheets.updateRange('A1:B2', [['First Name', 'Last Name'], ['Tim', 'Jones']])).toBe(true);
    expect(await easySheets.addRow(['Bob', 'Smith'])).toBe(true);
    expect(await easySheets.getRange('A1:A3')).toStrictEqual([['1'], ['2'], ['3']]);
});
