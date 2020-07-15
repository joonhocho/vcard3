import { DATE } from './DATE';

test('DATE', () => {
  expect(
    DATE({
      year: 1990,
      month: 2,
      day: 4,
    })
  ).toStrictEqual(['X-ABDATE:1990-02-04']);

  expect(
    DATE({
      month: 7,
      day: 14,
    })
  ).toStrictEqual(['X-ABDATE;X-APPLE-OMIT-YEAR=1604:1604-07-14']);

  expect(
    DATE({
      label: 'custom label',
      year: 1990,
      month: 2,
      day: 4,
    })
  ).toStrictEqual(['X-ABDATE:1990-02-04', 'X-ABLabel:custom label']);

  expect(
    DATE({
      label: 'anniversary',
      year: 1990,
      month: 2,
      day: 4,
    })
  ).toStrictEqual(['X-ABDATE:1990-02-04', 'X-ABLabel:_$!<Anniversary>!$_']);
});
