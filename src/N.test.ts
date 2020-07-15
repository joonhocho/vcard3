import { N } from './N';

test('N', () => {
  expect(
    N({
      prefix: 'Mr',
      givenName: 'John',
      middleName: 'Mid',
      familyName: 'Doe',
      suffix: 'II',
    })
  ).toBe('N:Doe;John;Mid;Mr;II');

  expect(
    N({
      givenName: 'John',
    })
  ).toBe('N:;John;;;');
});
