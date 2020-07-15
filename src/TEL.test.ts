import { TEL } from './TEL';

test('TEL', () => {
  expect(TEL({ value: '12345678' })).toStrictEqual(['TEL:12345678']);

  expect(TEL({ pref: true, value: '12345678' })).toStrictEqual([
    'TEL;type=pref:12345678',
  ]);

  expect(
    TEL({ label: 'custom label', pref: true, value: '12345678' })
  ).toStrictEqual(['TEL;type=pref:12345678', 'X-ABLabel:custom label']);

  expect(
    TEL({ label: 'school', pref: true, value: '12345678' })
  ).toStrictEqual(['TEL;type=pref:12345678', 'X-ABLabel:_$!<School>!$_']);

  expect(TEL({ label: 'home', pref: true, value: '12345678' })).toStrictEqual([
    'TEL;type=HOME;type=pref:12345678',
  ]);

  expect(
    TEL({ label: ['home', 'voice', 'fax'], value: '12345678' })
  ).toStrictEqual(['TEL;type=HOME;type=VOICE;type=FAX:12345678']);
});
