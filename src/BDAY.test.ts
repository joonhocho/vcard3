import { BDAY } from './BDAY';

test('BDAY', () => {
  expect(
    BDAY({
      year: 1990,
      month: 2,
      day: 4,
    })
  ).toBe('BDAY:1990-02-04');

  expect(
    BDAY({
      month: 7,
      day: 14,
    })
  ).toBe('BDAY;X-APPLE-OMIT-YEAR=1604:1604-07-14');
});
