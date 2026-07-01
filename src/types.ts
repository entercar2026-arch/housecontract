export type LanguageMode = 'km' | 'en' | 'bilingual';

export interface PersonDetails {
  nameKh: string;
  nameEn: string;
  gender: string;
  dob: string;
  idNumber: string;
  nationality: string;
}

export interface LandlordDetails extends PersonDetails {
  address: string;
  showAddress: boolean;
}

export interface ContractDetails {
  houseAddress: string;
  rentAmount: string;
  depositMonths: string;
  depositAmount: string;
  startDate: string;
  durationMonths: string;
  waterUtility: string;
  electricityUtility: string;
  cableTvUtility: string;
  internetUtility: string;
  contractDate: string;
}

export interface AppState {
  language: LanguageMode;
  landlord: LandlordDetails;
  tenants: PersonDetails[];
  numTenants: number;
  contract: ContractDetails;
}
