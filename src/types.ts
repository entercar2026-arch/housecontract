export type LanguageMode = 'km' | 'en' | 'bilingual' | 'km-zh' | 'km-ja' | 'km-ko' | 'km-ru';

export interface PersonDetails {
  nameKh: string;
  nameEn: string;
  gender: string;
  dob: string;
  idNumber: string;
  idIssueDate?: string;
  idExpiryDate?: string;
  nationality: string;
  isScanned?: boolean;
}

export interface LandlordDetails extends PersonDetails {
  address: string;
  showAddress: boolean;
}

export interface ContractDetails {
  carModel?: string;
  carColorKh?: string;
  carColorEn?: string;
  carYear?: string;
  carPlateNoKh?: string;
  carPlateNoEn?: string;
  carCompensation?: string;
  carFrameNo?: string;
  carEngineNo?: string;
  carPurpose?: string;
  carRentalArea?: string;
  unitNoKh: string;
  unitNoEn: string;
  showUnitNo: boolean;
  houseNoKh: string;
  houseNoEn: string;
  showHouseNo: boolean;
  streetKh: string;
  streetEn: string;
  showStreet: boolean;
  phumKh: string;
  phumEn: string;
  showPhum: boolean;
  sangkatKh: string;
  sangkatEn: string;
  showSangkat: boolean;
  khanKh: string;
  khanEn: string;
  showKhan: boolean;
  cityKh: string;
  cityEn: string;
  showCity: boolean;
  rentAmount: string;
  depositMonths: string;
  depositAmount: string;
  startDate: string;
  durationMonths: string;
  waterUtility: string;
  electricityUtility: string;
  cableTvUtility: string;
  internetUtility: string;
  otherUtility1Enabled?: boolean;
  otherUtility1Name?: string;
  otherUtility1Price?: string;
  otherUtility2Enabled?: boolean;
  otherUtility2Name?: string;
  otherUtility2Price?: string;
  contractDate: string;
}

export interface AppState {
  contractType: 'house' | 'car';
  language: LanguageMode;
  landlord: LandlordDetails;
  tenants: PersonDetails[];
  numTenants: number;
  contract: ContractDetails;
}
