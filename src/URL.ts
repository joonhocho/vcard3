/*


   ;For name="URL"
   param        = ""
        ; No parameters allowed

   value        = uri


URL:http://example.org/restaurant.french/~chezchic.html

item5.URL;type=pref:a.com
item5.X-ABLabel:_$!<HomePage>!$_
URL;type=HOME:https://talksub.com
URL;type=WORK:a
item6.URL:a
item6.X-ABLabel:_$!<School>!$_
item7.URL:a
item7.X-ABLabel:_$!<Other>!$_
item8.URL:a
item8.X-ABLabel:_$!<HomePage>!$_
item9.URL:a
item9.X-ABLabel:Xustom


*/
import {
  encodeText,
  filterSet,
  formatAppleLabel,
  hasOwnKey,
  toPref,
  toType,
} from './util';

export enum URLType {
  HOME = 'HOME',
  WORK = 'WORK',
  PREF = 'PREF',
}

export enum URLAppleLabel {
  SCHOOL = 'School',
  OTHER = 'Other',
  HOMEPAGE = 'HomePage',
}

export interface IURL {
  label?: URLType | URLAppleLabel | string | null;
  pref?: boolean | null;
  value: string;
}

export const URL = ({ label, pref, value }: IURL): string[] => {
  const LABEL = label ? label.toUpperCase() : null;
  const isType = hasOwnKey(URLType, LABEL);
  const isAppleLabel = hasOwnKey(URLAppleLabel, LABEL);
  const isCustomLabel = !!LABEL && !isType && !isAppleLabel;

  return filterSet([
    [
      filterSet(['URL', isType && toType(LABEL), toPref(pref)]).join(';'),
      encodeText(value),
    ].join(':'),

    isAppleLabel &&
      formatAppleLabel(URLAppleLabel[LABEL as keyof typeof URLAppleLabel]),

    isCustomLabel && `X-ABLabel:${encodeText(label)}`,
  ]);
};
