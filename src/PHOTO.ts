/*

 ;For name="PHOTO"
   param        = img-inline-param
        ; Only image parameters allowed

   param        =/ img-refer-param
        ; Only image parameters allowed

   value        = img-inline-value
        ; Value and parameter MUST match

   value        =/ img-refer-value
        ; Value and parameter MUST match

   Type example:

        PHOTO;VALUE=uri:http://www.abc.com/pub/photos
         /jqpublic.gif


        PHOTO;ENCODING=b;TYPE=JPEG:MIICajCCAdOgAwIBAgICBEUwDQYJKoZIhvcN
         AQEEBQAwdzELMAkGA1UEBhMCVVMxLDAqBgNVBAoTI05ldHNjYXBlIENvbW11bm
         ljYXRpb25zIENvcnBvcmF0aW9uMRwwGgYDVQQLExNJbmZvcm1hdGlvbiBTeXN0
         <...remainder of "B" encoded binary data...>

 data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALQAAAC0CAYAAAA9zQYyAAAA...

PHOTO;ENCODING=b:iVBORw0KGgoAAAANSUhEUgAAAUAAAAFACAYAAADNkKWqAAAAAXNSR0IArs
 4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQA

*/

export interface IPHOTO {
  uri?: string | null;
  base64?: string | null;
}

export const PHOTO = ({ uri, base64 }: IPHOTO): string =>
  `PHOTO;${base64 ? `ENCODING=b:${base64}` : `VALUE=uri:${uri || ''}`}`;
