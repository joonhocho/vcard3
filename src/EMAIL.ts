/*

   ;For name="EMAIL"
   param        = email-param
        ; Only email parameters allowed

   value        = text-value

   email-param  = "TYPE" "=" email-type ["," "PREF"]
        ; Value is case insensitive

   email-type   = "INTERNET" / "X400" / iana-token / "X-" word
        ; Values are case insensitive


EMAIL;TYPE=INTERNET,PREF:Frank_Dawson@Lotus.com
EMAIL;TYPE=INTERNET:fdawson@earthlink.net
EMAIL;TYPE=internet,pref:jane_doe@abc.com

- Apple examples
EMAIL;type=INTERNET;type=HOME;type=pref:abc@gmail.com
EMAIL;type=INTERNET;type=WORK:abc@gmail.com
EMAIL;type=INTERNET:abc@me.com
item1.EMAIL;type=INTERNET:abc@cmu.edu
item1.X-ABLabel:_$!<School>!$_

*/
import {
  encodeText,
  filterSet,
  formatAppleLabel,
  hasOwnKey,
  toPref,
  toType,
} from './util';

export enum EMAILType {
  INTERNET = 'INTERNET',
  X400 = 'X400',
  HOME = 'HOME',
  WORK = 'WORK',
  PREF = 'PREF',
}

export enum EMAILAppleLabel {
  SCHOOL = 'School',
  OTHER = 'Other',
}

export interface IEMAIL {
  label?: EMAILType | EMAILAppleLabel | string | null;
  pref?: boolean | null;
  value: string;
}

export const EMAIL = ({ label, pref, value }: IEMAIL): string[] => {
  const LABEL = label ? label.toUpperCase() : null;
  const isType = hasOwnKey(EMAILType, LABEL);
  const isAppleLabel = hasOwnKey(EMAILAppleLabel, LABEL);
  const isCustomLabel = !!LABEL && !isType && !isAppleLabel;

  return filterSet([
    [
      filterSet([
        'EMAIL;type=INTERNET',
        isType && toType(LABEL),
        toPref(pref),
      ]).join(';'),
      encodeText(value),
    ].join(':'),

    isAppleLabel &&
      formatAppleLabel(EMAILAppleLabel[LABEL as keyof typeof EMAILAppleLabel]),

    isCustomLabel && `X-ABLabel:${encodeText(label)}`,
  ]);
};
