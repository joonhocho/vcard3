import { ROLE } from './ROLE';

test('ROLE', () => {
  expect(ROLE({ value: 'Engineer' })).toBe('ROLE:Engineer');
});
