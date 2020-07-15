import { VCARD } from './VCARD';

test('VCARD', () => {
  expect(VCARD({})).toStrictEqual(
    'BEGIN:VCARD\nVERSION:3.0\nPRODID:-//Apple Inc.//iPhone OS 13.5.1//EN\nEND:VCARD'
  );

  expect(
    VCARD({
      ADR: {
        label: 'home',
        street1: 'street1',
        countryName: 'USA',
      },
      BDAY: {
        year: 2000,
        month: 1,
        day: 1,
      },
      DATE: {
        label: 'anniversary',
        year: 2000,
        month: 1,
        day: 1,
      },
      EMAIL: {
        value: 'a@b.com',
      },
      FN: {
        value: 'John Doe',
      },
      N: {
        givenName: 'John',
        familyName: 'Doe',
        prefix: 'Mr.',
      },
      NICKNAME: {
        value: 'Johnny',
      },
      NOTE: {
        value: 'this is\nnote',
      },
      ORG: {
        department: 'department',
        company: 'company',
      },
      PHOTO: {
        uri: 'https://photo/p.jpg',
      },
      RELATEDNAMES: {
        label: 'mother',
        value: 'Mom',
      },
      ROLE: {
        value: 'role',
      },
      SOCIALPROFILE: {
        service: 'google',
        user: 'john',
      },
      TEL: {
        label: ['cell', 'voice'],
        value: '123-456-7890',
      },
      TITLE: {
        value: 'title',
      },
      URL: {
        value: 'https://johndoe.com',
      },
    })
  ).toStrictEqual(`BEGIN:VCARD
VERSION:3.0
PRODID:-//Apple Inc.//iPhone OS 13.5.1//EN
N:Doe;John;;Mr.;
FN:John Doe
NICKNAME:Johnny
TITLE:title
ROLE:role
ORG:company;department
EMAIL;type=INTERNET:a@b.com
TEL;type=CELL;type=VOICE:123-456-7890
ADR;type=HOME:;;street1;;;;USA
X-SOCIALPROFILE;type=google;x-user=john:x-apple:john
URL:https://johndoe.com
BDAY:2000-01-01
PHOTO;VALUE=uri:https://photo/p.jpg
item1.X-ABDATE:2000-01-01
item1.X-ABLabel:_$!<Anniversary>!$_
item2.X-ABRELATEDNAMES:Mom
item2.X-ABLabel:_$!<Mother>!$_
NOTE:this is\\nnote
END:VCARD`);

  expect(
    VCARD({
      EMAIL: [
        {
          value: 'a@b.com',
        },
        {
          label: 'home',
          value: 'home@b.com',
        },
        {
          label: 'school',
          value: 'school@b.com',
        },
        {
          label: 'custom',
          value: 'custom@b.com',
        },
      ],
    })
  ).toStrictEqual(`BEGIN:VCARD
VERSION:3.0
PRODID:-//Apple Inc.//iPhone OS 13.5.1//EN
EMAIL;type=INTERNET:a@b.com
EMAIL;type=INTERNET;type=HOME:home@b.com
item1.EMAIL;type=INTERNET:school@b.com
item1.X-ABLabel:_$!<School>!$_
item2.EMAIL;type=INTERNET:custom@b.com
item2.X-ABLabel:custom
END:VCARD`);
});
