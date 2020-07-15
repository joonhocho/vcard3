import { ORG } from './ORG';

test('ORG', () => {
  expect(ORG({ company: 'Google Inc', department: 'Search' })).toBe(
    'ORG:Google Inc;Search'
  );

  expect(ORG({ company: 'Google Inc' })).toBe('ORG:Google Inc;');
  expect(ORG({ department: 'Search' })).toBe('ORG:;Search');
});
