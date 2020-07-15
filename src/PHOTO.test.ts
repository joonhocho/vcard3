import { PHOTO } from './PHOTO';

test('PHOTO', () => {
  expect(PHOTO({ uri: 'a' })).toBe('PHOTO;VALUE=uri:a');
  expect(PHOTO({ base64: 'a' })).toBe('PHOTO;ENCODING=b:a');
});
