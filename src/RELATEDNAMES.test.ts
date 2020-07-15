import { RELATEDNAMES } from './RELATEDNAMES';

test('RELATEDNAMES', () => {
  expect(RELATEDNAMES({ label: 'mother', value: 'a' })).toStrictEqual([
    'X-ABRELATEDNAMES:a',
    'X-ABLabel:_$!<Mother>!$_',
  ]);

  expect(RELATEDNAMES({ label: 'custom label', value: 'a' })).toStrictEqual([
    'X-ABRELATEDNAMES:a',
    'X-ABLabel:custom label',
  ]);
});
