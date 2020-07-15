/*


   ;For name="TEL"
   param        = tel-param
        ; Only tel parameters allowed

   value        = phone-number-value

   tel-param    = "TYPE" "=" tel-type *("," tel-type)

   tel-type     = "HOME" / "WORK" / "PREF" / "VOICE" / "FAX" / "MSG"
                / "CELL" / "PAGER" / "BBS" / "MODEM" / "CAR" / "ISDN"
                / "VIDEO" / "PCS" / iana-token / x-name
        ; Values are case insensitive



TEL;TYPE=work,voice,pref,msg:+1-213-555-1234

   TEL;TYPE=VOICE,MSG,WORK:+1-919-676-9515
   TEL;TYPE=FAX,WORK:+1-919-676-9564

- Apple examples
item2.TEL;type=pref:+1 (567) 123-4567
item2.X-ABLabel:Google Voice

TEL;type=IPHONE;type=CELL;type=VOICE:+1 123-456-7890
TEL;type=HOME;type=VOICE:+82 (0) 10-1234-5678
TEL;type=IPHONE;type=CELL;type=VOICE:1
TEL;type=WORK;type=VOICE:2

item3.TEL:3
item3.X-ABLabel:_$!<School>!$_

TEL;type=CELL;type=VOICE:4
TEL;type=MAIN:5
TEL;type=HOME;type=FAX:6
TEL;type=WORK;type=FAX:7
TEL;type=PAGER:8
TEL;type=OTHER;type=VOICE:9
TEL;type=WORK;type=VOICE:10

item4.TEL:11
item4.X-ABLabel:_$!<School>!$_


*/
import {
  encodeText,
  filterSet,
  formatAppleLabel,
  hasOwnKey,
  toPref,
  toType,
} from './util';

export enum TELType {
  HOME = 'HOME',
  WORK = 'WORK',
  PREF = 'PREF',
  VOICE = 'VOICE',
  FAX = 'FAX',
  MSG = 'MSG',
  CELL = 'CELL',
  PAGER = 'PAGER',
  BBS = 'BBS',
  MODEM = 'MODEM',
  CAR = 'CAR',
  ISDN = 'ISDN',
  VIDEO = 'VIDEO',
  PCS = 'PCS',

  OTHER = 'OTHER',
  MAIN = 'MAIN',
  IPHONE = 'IPHONE',
}

export enum TELAppleLabel {
  SCHOOL = 'School',
}

export interface ITEL {
  label?:
    | TELType
    | TELAppleLabel
    | string
    | Array<TELType | TELAppleLabel | string>
    | null;
  pref?: boolean | null;
  value: string;
}

export const TEL = ({ label, pref, value }: ITEL): string[] => {
  const labels = typeof label === 'string' ? [label] : label || [];

  const labelItems = labels.map((l) => {
    const LABEL = l ? l.toUpperCase() : null;
    const isType = hasOwnKey(TELType, LABEL);
    const isAppleLabel = hasOwnKey(TELAppleLabel, LABEL);
    const isCustomLabel = !!LABEL && !isType && !isAppleLabel;
    return {
      label: l,
      LABEL,
      isType,
      isAppleLabel,
      isCustomLabel,
    };
  });

  return filterSet([
    [
      filterSet([
        'TEL',
        ...labelItems.map((x) => x.isType && toType(x.LABEL)),
        toPref(pref),
      ]).join(';'),
      encodeText(value),
    ].join(':'),

    ...labelItems.map(
      (x) =>
        (x.isAppleLabel &&
          formatAppleLabel(
            TELAppleLabel[x.LABEL as keyof typeof TELAppleLabel]
          )) ||
        (x.isCustomLabel && `X-ABLabel:${encodeText(x.label)}`)
    ),
  ]);
};
