/*

   ;For name="NOTE"
   param        = text-param
        ; Only text parameters allowed
   value        = text-value


NOTE:This fax number is operational 0800 to 1715 EST\, Mon-Fri.
NOTE;CHARSET=utf-8;ENCODING=QUOTED-PRINTABLE:Hahahahah this is my vcard.=0ASuck it up hard!!!
NOTE:This is Notes

*/

import { encodeText } from './util';

export interface INOTE {
  value: string;
}

export const NOTE = ({ value }: INOTE): string => `NOTE:${encodeText(value)}`;
