export interface ICountry {
  alpha2: string;
  alpha3: string;
  callingCodes?: string[];
  currencies?: string[];
  emoji: string;
  fullName?: string;
  ioc?: string;
  languages?: ILanguage[];
  numeric: string;
  shortName: string;
  territory?: string;
}

export interface ILanguage {
  alpha2: string;
  alpha3: string;
}
