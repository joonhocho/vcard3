import { SOCIALPROFILE } from './SOCIALPROFILE';

test('SOCIALPROFILE', () => {
  expect(SOCIALPROFILE({ service: 'talksub', user: 'userid' })).toBe(
    'X-SOCIALPROFILE;type=talksub;x-user=userid:x-apple:userid'
  );

  expect(
    SOCIALPROFILE({
      service: 'talksub',
      user: 'userid',
      url: 'https://talksub.com/userid',
    })
  ).toBe(
    'X-SOCIALPROFILE;type=talksub;x-user=userid:https://talksub.com/userid'
  );

  expect(
    SOCIALPROFILE({
      service: 'talksub',
      url: 'https://talksub.com/userid',
    })
  ).toBe('X-SOCIALPROFILE;type=talksub:https://talksub.com/userid');
});
