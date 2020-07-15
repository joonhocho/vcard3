/*
https://www.ietf.org/rfc/rfc2426.txt

adr-param    = ("TYPE" "=" adr-type *("," adr-type))
            / (text-param)

adr-type     = "dom" / "intl" / "postal" / "parcel" / "home"
            / "work" / "pref" / iana-type / x-name

adr-value    = 0*6(text-value ";") text-value
    ; PO Box, Extended Address, Street, Locality, Region, Postal Code, Country Name

----------

;For name="ADR"
param        = adr-param / text-param
    ; Only adr and text parameters allowed

value        = adr-value

;For name="LABEL"
param        = adr-param / text-param
    ; Only adr and text parameters allowed

value        = text-value
*/
import {
  formatCustomLabel,
  encodeText,
  filterSet,
  formatAppleLabel,
  hasOwnKey,
  toPref,
  toType,
} from './util';

export enum ADRType {
  DOM = 'DOM',
  INTL = 'INTL',
  POSTAL = 'POSTAL',
  PARCEL = 'PARCEL',
  HOME = 'HOME',
  WORK = 'WORK',
  PREF = 'PREF',
}

export enum ADRAppleLabel {
  SCHOOL = 'School',
  OTHER = 'Other',
}

export interface IADR {
  label?: ADRType | ADRAppleLabel | string | null;
  pref?: boolean | null;
  pobox?: string | null; // recommended to be empty
  ext?: string | null; // recommended to be empty
  street1?: string | null;
  street2?: string | null;
  sublocality?: string | null; // city
  locality?: string | null; // city
  region?: string | null; // state
  postalCode?: string | null;
  countryName?: string | null;
  countryCode?: string | null;
}

/*
ADR;TYPE=WORK,POSTAL,PARCEL:;;6544 Battleford Drive;Raleigh;NC;27613-3502;U.S.A.

ADR;TYPE=WORK:;;501 E. Middlefield Rd.;Mountain View; CA; 94043;U.S.A.

ADR;TYPE=dom,home,postal,parcel:;;123 Main Street;Any Town;CA;91921-1234

- Apple examples
item5.ADR;type=HOME;type=pref:;;St1\nSt2;City;CA;12345;United States
item5.X-ABLabel:Custom label
item5.X-ABADR:us

item4.ADR:;;Street1\nStreet2;Prefecture City;Province;postalcode;China mainland
item4.X-ABLabel:_$!<School>!$_
item4.X-ABADR:cn
item4.X-APPLE-SUBLOCALITY:District
*/

export const ADR = ({
  label,
  pref,
  pobox,
  ext,
  street1,
  street2,
  sublocality,
  locality,
  region,
  postalCode,
  countryName,
  countryCode,
}: IADR): string[] => {
  const LABEL = label ? label.toUpperCase() : null;
  const isType = hasOwnKey(ADRType, LABEL);
  const isAppleLabel = hasOwnKey(ADRAppleLabel, LABEL);
  const isCustomLabel = !!LABEL && !isType && !isAppleLabel;

  return filterSet([
    [
      filterSet(['ADR', isType && toType(LABEL), toPref(pref)]).join(';'),
      [
        encodeText(pobox),
        encodeText(ext),
        encodeText(filterSet([street1, street2]).join('\n')),
        encodeText(locality),
        encodeText(region),
        encodeText(postalCode),
        encodeText(countryName),
      ].join(';'),
    ].join(':'),

    isAppleLabel &&
      formatAppleLabel(ADRAppleLabel[LABEL as keyof typeof ADRAppleLabel]),

    isCustomLabel && formatCustomLabel(label),

    countryCode && `X-ABADR:${countryCode.toLowerCase()}`,

    sublocality && `X-APPLE-SUBLOCALITY:${encodeText(sublocality)}`,
  ]);
};
