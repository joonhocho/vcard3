/*

   ;For name="NICKNAME"
   param        = text-param
        ; Text parameters allowed

   value        = text-list


NICKNAME:Robbie
NICKNAME:Jim,Jimmie

*/

import { encodeText } from './util';

export interface INICKNAME {
  value: string;
}

export const NICKNAME = ({ value }: INICKNAME): string =>
  `NICKNAME:${encodeText(value)}`;
