import { ADR } from './ADR';

test('ADR', () => {
  expect(
    ADR({
      label: 'Custom Label',
      pref: true,
      pobox: 'pobox',
      ext: 'ext',
      street1: 'street1',
      street2: 'street2',
      sublocality: 'sublocality',
      locality: 'locality',
      region: 'region',
      postalCode: 'postalCode',
      countryName: 'countryName',
      countryCode: 'countryCode',
    })
  ).toStrictEqual([
    'ADR;type=pref:pobox;ext;street1\\nstreet2;locality;region;postalCode;countryName',
    'X-ABLabel:Custom Label',
    'X-ABADR:countrycode',
    'X-APPLE-SUBLOCALITY:sublocality',
  ]);

  expect(
    ADR({
      label: 'home',
      street1: 'street1',
      locality: 'locality',
      region: 'region',
      postalCode: 'postalCode',
      countryName: 'countryName',
    })
  ).toStrictEqual([
    'ADR;type=HOME:;;street1;locality;region;postalCode;countryName',
  ]);

  expect(
    ADR({
      label: 'school',
      street1: 'street1',
      locality: 'locality',
      region: 'region',
      postalCode: 'postalCode',
      countryName: 'countryName',
    })
  ).toStrictEqual([
    'ADR:;;street1;locality;region;postalCode;countryName',
    'X-ABLabel:_$!<School>!$_',
  ]);
});
