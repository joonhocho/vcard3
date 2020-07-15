import { NICKNAME } from './NICKNAME';

test('NICKNAME', () => {
  expect(NICKNAME({ value: 'Mr John Doe' })).toBe('NICKNAME:Mr John Doe');
});
