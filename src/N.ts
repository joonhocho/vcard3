/* eslint-disable @typescript-eslint/naming-convention */
/*


   ;For name="N"
   ;This type MUST be included in a vCard object.

   param        = text-param
        ; Text parameters allowed

   value        = n-value

   n-value      = 0*4(text-value *("," text-value) ";")
                  text-value *("," text-value)
        ; Family; Given; Middle; Prefix; Suffix.
        ; Example: Public;John;Quincy,Adams;Reverend Dr. III

   Type example:

        N:Public;John;Quinlan;Mr.;Esq.

        N:Stevenson;John;Philip,Paul;Dr.;Jr.,M.D.,A.C.P.

*/
import { encodeText } from './util';

export interface IN {
  givenName?: string | null;
  middleName?: string | null;
  familyName?: string | null;
  prefix?: string | null;
  suffix?: string | null;
}

export const N = ({
  givenName,
  middleName,
  familyName,
  prefix,
  suffix,
}: IN): string =>
  [
    'N',
    ':',
    [
      encodeText(familyName),
      encodeText(givenName),
      encodeText(middleName),
      encodeText(prefix),
      encodeText(suffix),
    ].join(';'),
  ].join('');
