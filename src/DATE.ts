/*

3.1.5 X-ABDATE Type Definition

X-ABDATE:1953-10-15T23:10:00Z
X-ABDATE:1987-09-27T08:30:00-06:00

X-ABDATE:1996-04-15
X-ABDATE;X-APPLE-OMIT-YEAR=1604:1604-07-14
X-ALTBDAY;CALSCALE=chinese:007800021101

*/

import {
  encodeText,
  filterSet,
  formatAppleLabel,
  hasOwnKey,
  padStart,
} from './util';

export enum DATEAppleLabel {
  ANNIVERSARY = 'Anniversary',
  OTHER = 'Other',
}

export interface IDATE {
  label?: DATEAppleLabel | string | null;
  year?: number | null;
  month: number;
  day: number;
}

const omitYear = '1604';

export const DATE = ({ label, year, month, day }: IDATE): string[] => {
  const LABEL = label ? label.toUpperCase() : null;
  const isAppleLabel = hasOwnKey(DATEAppleLabel, LABEL);
  const isCustomLabel = !!LABEL && !isAppleLabel;

  return filterSet([
    filterSet([
      'X-ABDATE',
      !year && `;X-APPLE-OMIT-YEAR=${omitYear}`,
      ':',
      [
        padStart(year ? year.toString() : omitYear, 4, '0'),
        padStart(month.toString(), 2, '0'),
        padStart(day.toString(), 2, '0'),
      ].join('-'),
    ]).join(''),

    isAppleLabel &&
      formatAppleLabel(DATEAppleLabel[LABEL as keyof typeof DATEAppleLabel]),

    isCustomLabel && `X-ABLabel:${encodeText(label)}`,
  ]);
};
