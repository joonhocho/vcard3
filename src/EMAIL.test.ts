import { EMAIL } from './EMAIL';

test('EMAIL', () => {
  expect(
    EMAIL({
      label: 'Custom Label',
      pref: true,
      value: 'a@b.c',
    })
  ).toStrictEqual([
    'EMAIL;type=INTERNET;type=pref:a@b.c',
    'X-ABLabel:Custom Label',
  ]);

  expect(
    EMAIL({
      label: 'school',
      pref: true,
      value: 'a@b.c',
    })
  ).toStrictEqual([
    'EMAIL;type=INTERNET;type=pref:a@b.c',
    'X-ABLabel:_$!<School>!$_',
  ]);

  expect(
    EMAIL({
      label: 'hOme',
      pref: true,
      value: 'a@b.c',
    })
  ).toStrictEqual(['EMAIL;type=INTERNET;type=HOME;type=pref:a@b.c']);

  expect(
    EMAIL({
      label: 'work',
      value: 'a@b.c',
    })
  ).toStrictEqual(['EMAIL;type=INTERNET;type=WORK:a@b.c']);

  expect(
    EMAIL({
      value: 'a@b.c',
    })
  ).toStrictEqual(['EMAIL;type=INTERNET:a@b.c']);
});
