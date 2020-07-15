import { ADR as formatADR, IADR } from './ADR';
import { BDAY as formatBDAY, IBDAY } from './BDAY';
import { DATE as formatDATE, IDATE } from './DATE';
import { EMAIL as formatEMAIL, IEMAIL } from './EMAIL';
import { FN as formatFN, IFN } from './FN';
import { IN, N as formatN } from './N';
import { INICKNAME, NICKNAME as formatNICKNAME } from './NICKNAME';
import { INOTE, NOTE as formatNOTE } from './NOTE';
import { IORG, ORG as formatORG } from './ORG';
import { IPHOTO, PHOTO as formatPHOTO } from './PHOTO';
import {
  IRELATEDNAMES,
  RELATEDNAMES as formatRELATEDNAMES,
} from './RELATEDNAMES';
import { IROLE, ROLE as formatROLE } from './ROLE';
import {
  ISOCIALPROFILE,
  SOCIALPROFILE as formatSOCIALPROFILE,
} from './SOCIALPROFILE';
import { ITEL, TEL as formatTEL } from './TEL';
import { ITITLE, TITLE as formatTITLE } from './TITLE';
import { IURL, URL as formatURL } from './URL';

const addList = <T>(
  list: string[],
  items: T | T[] | null | undefined,
  fn: (item: T) => string | string[],
  itemIndex: number
): number => {
  let nextIndex = itemIndex;
  if (items != null) {
    const itemArray = Array.isArray(items) ? items : [items];
    if (itemArray.length) {
      itemArray.forEach((item) => {
        const res = fn(item);
        if (typeof res === 'string') {
          list.push(res);
        } else if (res.length === 1) {
          list.push(res[0]);
        } else if (res.length) {
          list.push(...res.map((x) => `item${nextIndex}.${x}`));
          nextIndex += 1;
        }
      });
    }
  }
  return nextIndex;
};

// https://tools.ietf.org/html/rfc2426

export interface IVCARD {
  ADR?: IADR | IADR[] | null;
  BDAY?: IBDAY | IBDAY[] | null;
  DATE?: IDATE | IDATE[] | null;
  EMAIL?: IEMAIL | IEMAIL[] | null;
  FN?: IFN | IFN[] | null;
  N?: IN | IN[] | null;
  NICKNAME?: INICKNAME | INICKNAME[] | null;
  NOTE?: INOTE | INOTE[] | null;
  ORG?: IORG | IORG[] | null;
  PHOTO?: IPHOTO | IPHOTO[] | null;
  RELATEDNAMES?: IRELATEDNAMES | IRELATEDNAMES[] | null;
  ROLE?: IROLE | IROLE[] | null;
  SOCIALPROFILE?: ISOCIALPROFILE | ISOCIALPROFILE[] | null;
  TEL?: ITEL | ITEL[] | null;
  TITLE?: ITITLE | ITITLE[] | null;
  URL?: IURL | IURL[] | null;
}

export const VCARD = ({
  ADR,
  BDAY,
  DATE,
  EMAIL,
  FN,
  N,
  NICKNAME,
  NOTE,
  ORG,
  PHOTO,
  RELATEDNAMES,
  ROLE,
  SOCIALPROFILE,
  TEL,
  TITLE,
  URL,
}: IVCARD): string => {
  let itemIndex = 1;

  const list = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    'PRODID:-//Apple Inc.//iPhone OS 13.5.1//EN',
  ];

  itemIndex = addList(list, N, formatN, itemIndex);
  itemIndex = addList(list, FN, formatFN, itemIndex);
  itemIndex = addList(list, NICKNAME, formatNICKNAME, itemIndex);
  itemIndex = addList(list, TITLE, formatTITLE, itemIndex);
  itemIndex = addList(list, ROLE, formatROLE, itemIndex);
  itemIndex = addList(list, ORG, formatORG, itemIndex);
  itemIndex = addList(list, EMAIL, formatEMAIL, itemIndex);
  itemIndex = addList(list, TEL, formatTEL, itemIndex);
  itemIndex = addList(list, ADR, formatADR, itemIndex);
  itemIndex = addList(list, SOCIALPROFILE, formatSOCIALPROFILE, itemIndex);
  itemIndex = addList(list, URL, formatURL, itemIndex);
  itemIndex = addList(list, BDAY, formatBDAY, itemIndex);
  itemIndex = addList(list, PHOTO, formatPHOTO, itemIndex);
  itemIndex = addList(list, DATE, formatDATE, itemIndex);
  itemIndex = addList(list, RELATEDNAMES, formatRELATEDNAMES, itemIndex);
  itemIndex = addList(list, NOTE, formatNOTE, itemIndex);

  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  itemIndex;

  list.push('END:VCARD');

  return list.join('\n');
};
