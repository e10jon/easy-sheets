import EasySheets from '../'

const {SPREADSHEET_ID, CREDS} = process.env

let easySheets: EasySheets

beforeAll(() => {
  easySheets = new EasySheets(SPREADSHEET_ID || '', CREDS || '')
})

test('all operations', async () => {
  // clearRange
  expect(await easySheets.clearRange('A1:B5000000')).toBe(true)

  // updateRange
  expect(await easySheets.updateRange('A1:B2', [['First Name', 'Last Name'], ['Tim', 'Jones']])).toBe(true)

  // addRow
  expect(await easySheets.addRow(['Bob', 'Smith'])).toBe(true)

  // getRange
  expect(await easySheets.getRange('A1:B3')).toStrictEqual([['First Name', 'Last Name'], ['Tim', 'Jones'], ['Bob', 'Smith']])

  // getRange with headerRow raw
  expect(await easySheets.getRange('A1:B3', {headerRow: 'raw'})).toStrictEqual([{'First Name': 'Tim', 'Last Name': 'Jones'}, {'First Name': 'Bob', 'Last Name': 'Smith'}])

  // getRange with headerRow
  expect(await easySheets.getRange('A1:B3', {headerRow: true})).toStrictEqual([{firstName: 'Tim', lastName: 'Jones'}, {firstName: 'Bob', lastName: 'Smith'}])
})
