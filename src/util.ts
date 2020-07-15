const backslashRegex = /\\/g;
const newlineRegex = /\r?\n/g;
const commaRegex = /,/g;
const semicolonRegex = /;/g;
const doublequoteRegex = /"/g;

export const hasOwnKey = (
  obj: unknown,
  key: string | null | undefined
): boolean =>
  typeof key === 'string' && Object.prototype.hasOwnProperty.call(obj, key);

export const isSet = (x: unknown): boolean => !!x;

export const filterSet = <T>(
  x: T[]
): Array<Exclude<T, undefined | null | false | '' | 0>> =>
  x.filter(isSet) as Array<Exclude<T, undefined | null | false | '' | 0>>;

export const encodeText = (text: string | null | undefined): string =>
  text
    ? text
        .replace(backslashRegex, '\\\\')
        .replace(newlineRegex, '\\n')
        .replace(commaRegex, '\\,')
        .replace(semicolonRegex, '\\;')
    : '';

export const encodeQuotedText = (text: string): string =>
  text.replace(newlineRegex, '\\n').replace(doublequoteRegex, '\\"');

export const toType = (type: string | null | undefined): string =>
  type ? `type=${type}` : '';

export const toPref = (pref: unknown): string => (pref ? 'type=pref' : '');

export const formatCustomLabel = (label: string | null | undefined): string =>
  label ? `X-ABLabel:${encodeText(label)}` : '';

export const formatAppleLabel = (label: string): string =>
  `X-ABLabel:_$!<${label}>!$_`;

export const formatPref = (pref: number): string =>
  pref > 0 ? `;PREF=${pref}` : '';

export const padStart = (
  origStr: string,
  length: number,
  padWith: string
): string => {
  let str = origStr;
  while (str.length < length) str = padWith + str;
  return str;
};
