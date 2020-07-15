import { URL } from './URL';

test('URL', () => {
  expect(
    URL({
      label: 'Custom Label',
      pref: true,
      value: 'a@b.c',
    })
  ).toStrictEqual(['URL;type=pref:a@b.c', 'X-ABLabel:Custom Label']);

  expect(
    URL({
      label: 'school',
      pref: true,
      value: 'a@b.c',
    })
  ).toStrictEqual(['URL;type=pref:a@b.c', 'X-ABLabel:_$!<School>!$_']);

  expect(
    URL({
      label: 'hOme',
      pref: true,
      value: 'a@b.c',
    })
  ).toStrictEqual(['URL;type=HOME;type=pref:a@b.c']);

  expect(
    URL({
      label: 'work',
      value: 'a@b.c',
    })
  ).toStrictEqual(['URL;type=WORK:a@b.c']);

  expect(
    URL({
      value: 'a@b.c',
    })
  ).toStrictEqual(['URL:a@b.c']);
});
