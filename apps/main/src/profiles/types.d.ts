export interface UserInfo {
  userId: string;
  firmId: string;
  userName: string;
  loginName: string;
  email: string;
  mobile: string;
  accountType: string;
  mobileInfo: string;
  createdTime: number;
  userStatus: string;
  crmPlatformEndDate?: any;
  registerSource: string;
  registerRegionSource: string;
  mobileAreaCode: string;
  languagePreference: string;
  defaultPlatform: string;
  userDefaultPlatform: string;
  userPlatformAccountDetailList: UserPlatformAccountDetailList[];
  oauth: string[];
  securePasswordStatus: string;
  mfaList: string[];
  releaseInfo: string;
}

interface UserPlatformAccountDetailList {
  mainAcctUserId: string;
  accountId: string;
  platformCode: string;
  status: string;
  loginStatus: string;
  closedReason?: any;
}

export interface FirmInfo {
  userId: string;
  firmId: string;
  firmStatus: string;
  firmName: string;
  firmEnglishName: string;
  regionCode: string;
  firmSuffix: string;
  xtNumber: string;
  legalRepresentativeName: string;
  tenantIdList: any[];
  dateMap: DateMap;
  annualReviewStatus?: any;
  annualReviewLimitTime?: any;
  expectedAuditedTime?: any;
}

interface DateMap {
  Audited: number;
  AuditedDisable: number;
}

export interface VirtualAccountInfo {
  userId: string;
  firmId: string;
  normalVA: boolean;
  specialVA: any[];
  normalVAList: NormalVAList;
}

interface NormalVAList {
  dbs: string;
  scb_USD: string;
  citi: string;
  scb_EUR: string;
  cc_GB: string;
  cc_US: string;
  cc_CA: string;
}

export interface BankAccountInfo {
  userId: string;
  firmId: string;
  bankCardBand: boolean;
}
