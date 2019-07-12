import EasySheets from '../'

const {SHEET_ID, CREDS} = process.env

let easySheets: EasySheets

beforeAll(() => {
  easySheets = new EasySheets(SHEET_ID || '', CREDS || '')
})

test('clearRange, updateValues, addRow, and getValues', async () => {
  expect(await easySheets.clearRange('A1:B5000000')).toBe(true)
  expect(await easySheets.updateRange('A1:B2', [['First Name', 'Last Name'], ['Tim', 'Jones']])).toBe(true)
  expect(await easySheets.addRow(['Bob', 'Smith'])).toBe(true)
  expect(await easySheets.getRange('A1:B3')).toStrictEqual([['First Name', 'Last Name'], ['Tim', 'Jones'], ['Bob', 'Smith']])
})
