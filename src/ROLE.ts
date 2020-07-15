/*


   ;For name="ROLE"
   param        = text-param
        ; Only text parameters allowed

   value        = text-value


ROLE:Engineer

*/

import { encodeText } from './util';

export interface IROLE {
  value: string;
}

export const ROLE = ({ value }: IROLE): string => `ROLE:${encodeText(value)}`;
