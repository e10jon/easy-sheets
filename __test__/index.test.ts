import EasySheets from '../src/index'

const {SHEET_ID, CREDS} = process.env

test('clearRange, updateValues, addRow, and getValues', async () => {
  const easySheets = new EasySheets(SHEET_ID, CREDS)

  expect(await easySheets.clearRange('A1:A5000000')).toBe(true)
  expect(await easySheets.updateRange('A1:A2', [['1'], ['2']])).toBe(true)
  expect(await easySheets.addRow(['3'])).toBe(true)
  expect(await easySheets.getRange('A1:A3')).toStrictEqual([['1'], ['2'], ['3']])
})