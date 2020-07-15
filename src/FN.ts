/*

;For name="FN"
;This type MUST be included in a vCard object.
param        = text-param
; Text parameters allowed

value        = text-value

FN:Mr. John Q. Public\, Esq.
FN:Rene van der Harten

*/
import { encodeText } from './util';

export interface IFN {
  value: string;
}

export const FN = ({ value }: IFN): string => `FN:${encodeText(value)}`;
