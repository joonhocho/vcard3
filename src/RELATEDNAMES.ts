/*

item29.X-ABRELATEDNAMES:A
item29.X-ABLabel:_$!<Other>!$_

item30.X-ABRELATEDNAMES:A
item30.X-ABLabel:My Rel

*/
import { encodeText, filterSet, formatAppleLabel, hasOwnKey } from './util';

export enum RELATEDNAMESAppleLabel {
  FATHER = 'Father',
  MOTHER = 'Mother',
  BROTHER = 'Brother',
  PARENT = 'Parent',
  SISTER = 'Sister',
  SON = 'Son',
  DAUGHTER = 'Daughter',
  CHILD = 'Child',
  FRIEND = 'Friend',
  SPOUSE = 'Spouse',
  PARTNER = 'Partner',
  ASSISTANT = 'Assistant',
  MANAGER = 'Manager',
  YOUNGERSIBLING = 'YoungerSibling',
  ELDERSISTER = 'ElderSister',
  ELDERBROTHER = 'ElderBrother',
  WIFE = 'Wife',
  HUSBAND = 'Husband',
  GIRLFRIEND = 'Girlfriend',
  BOYFRIEND = 'Boyfriend',
  OTHER = 'Other',
}

export interface IRELATEDNAMES {
  label: RELATEDNAMESAppleLabel | string;
  value: string;
}

export const RELATEDNAMES = ({ label, value }: IRELATEDNAMES): string[] => {
  const LABEL = label ? label.toUpperCase() : null;
  const isAppleLabel = hasOwnKey(RELATEDNAMESAppleLabel, LABEL);
  const isCustomLabel = !!LABEL && !isAppleLabel;

  return filterSet([
    `X-ABRELATEDNAMES:${encodeText(value)}`,

    isAppleLabel &&
      formatAppleLabel(
        RELATEDNAMESAppleLabel[LABEL as keyof typeof RELATEDNAMESAppleLabel]
      ),

    isCustomLabel && `X-ABLabel:${encodeText(label)}`,
  ]);
};
