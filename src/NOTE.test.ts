import { NOTE } from './NOTE';

test('NOTE', () => {
  expect(NOTE({ value: 'this is note\nnote' })).toBe(
    'NOTE:this is note\\nnote'
  );
});
