/*

Cardinality: 0+ (*)

   ;For name="ORG"

   param        = text-param
        ; Only text parameters allowed

   value        = org-value

   org-value    = *(text-value ";") text-value
        ; First is Organization Name, remainder are Organization Units.


ORG:ABC\, Inc.;North American Division;Marketing


*/
import { encodeText } from './util';

export interface IORG {
  company?: string | null;
  department?: string | null;
}

export const ORG = ({ company, department }: IORG): string =>
  `ORG:${encodeText(company)};${encodeText(department)}`;
