export const backslashRegex = /\\/g;
export const newlineRegex = /\r?\n/g;
export const commaRegex = /,/g;
export const semicolonRegex = /;/g;
export const doublequoteRegex = /"/g;

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

export const encodeTextList = (
  text: string | string[],
  delimiter = ','
): string => {
  if (!text || !text.length) {
    return '';
  }
  if (typeof text === 'string') {
    return encodeText(text);
  }
  // array
  return text.map(encodeText).join(delimiter);
};

export const encodeQuotedText = (text: string): string =>
  text.replace(newlineRegex, '\\n').replace(doublequoteRegex, '\\"');

export const toType = (type: string | null | undefined): string =>
  type ? `type=${type}` : '';

export const toPref = (pref: unknown): string => (pref ? 'type=pref' : '');

export const customLabel = (label: string | null | undefined): string =>
  label ? `X-ABLabel:${encodeText(label)}` : '';

export const formatAppleLabel = (label: string): string =>
  `X-ABLabel:_$!<${label}>!$_`;

export const formatPref = (pref: number): string =>
  pref > 0 ? `;PREF=${pref}` : '';

export const formatTypeValue = (type: string | string[]): string => {
  if (!type || !type.length) {
    return '';
  }
  if (typeof type === 'string') {
    return encodeText(type);
  }
  // array
  return `"${type.map(encodeText).join(',')}"`;
};

export const formatType = (type: string): string => {
  const value = formatTypeValue(type);
  return value && `;TYPE=${value}`;
};

export const padStart = (
  origStr: string,
  length: number,
  padWith: string
): string => {
  let str = origStr;
  while (str.length < length) str = padWith + str;
  return str;
};

export const formatGender = (gender: string): string => {
  switch (gender.toUpperCase()) {
    case 'M':
    case 'MALE':
      return 'M';
    case 'F':
    case 'FEMALE':
      return 'F';
    case 'O':
    case 'OTHER':
      return 'O';
    case 'N':
    case 'NONE':
      return 'N';
    case 'U':
    case 'UNKNOWN':
      return 'U';
    default:
      return `O;${encodeText(gender)}`;
  }
};
