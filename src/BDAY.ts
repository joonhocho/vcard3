/*

3.1.5 BDAY Type Definition

   To: ietf-mime-directory@imc.org

   Subject: Registration of text/directory MIME type BDAY

   Type name: BDAY

   Type purpose: To specify the birth date of the object the vCard
   represents.

   Type encoding: 8bit

   Type value: The default is a single date value. It can also be reset
   to a single date-time value.


   ;For name="BDAY"
   param        = ("VALUE" "=" "date")
        ; Only value parameter allowed

   param        =/ ("VALUE" "=" "date-time")
        ; Only value parameter allowed

   value        = date-value
        ; Value MUST match value type

   value        =/ date-time-value
        ; Value MUST match value type

BDAY:1953-10-15T23:10:00Z
BDAY:1987-09-27T08:30:00-06:00

BDAY:1996-04-15
BDAY;X-APPLE-OMIT-YEAR=1604:1604-07-14
X-ALTBDAY;CALSCALE=chinese:007800021101

*/

import { padStart, filterSet } from './util';

export interface IBDAY {
  year?: number | null;
  month: number;
  day: number;
}

const omitYear = '1604';

export const BDAY = ({ year, month, day }: IBDAY): string =>
  filterSet([
    'BDAY',
    !year && `;X-APPLE-OMIT-YEAR=${omitYear}`,
    ':',
    [
      padStart(year ? year.toString() : omitYear, 4, '0'),
      padStart(month.toString(), 2, '0'),
      padStart(day.toString(), 2, '0'),
    ].join('-'),
  ]).join('');
