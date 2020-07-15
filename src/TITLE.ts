/*


   ;For name="TITLE"
   param        = text-param
        ; Only text parameters allowed

   value        = text-value


TITLE:Engineer

*/

import { encodeText } from './util';

export interface ITITLE {
  value: string;
}

export const TITLE = ({ value }: ITITLE): string =>
  `TITLE:${encodeText(value)}`;
