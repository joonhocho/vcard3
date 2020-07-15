import { FN } from './FN';

test('FN', () => {
  expect(FN({ value: 'Mr John Doe' })).toBe('FN:Mr John Doe');
});
