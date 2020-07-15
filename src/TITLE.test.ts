import { TITLE } from './TITLE';

test('TITLE', () => {
  expect(TITLE({ value: 'Engineer' })).toBe('TITLE:Engineer');
});
