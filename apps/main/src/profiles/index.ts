import { BankAccountInfo, FirmInfo, UserInfo, VirtualAccountInfo } from './types'

// const _cache: {
//   userInfo?: UserInfo;
//   firmInfo?: FirmInfo;
//   bankAccountInfo?: BankAccountInfo;
//   virtualAccountInfo?: VirtualAccountInfo;
// } = {
//   userInfo: undefined,
//   firmInfo: undefined,
//   bankAccountInfo: undefined,
//   virtualAccountInfo: undefined,
// };

// 接口 https://pre.xtransfer.cn/api/v1/user/user-info
export const getUserInfo = async () =>
	await new Promise<UserInfo>(rsv => {
		setTimeout(
			() =>
				rsv({
					userId: '00990100001000017122500000208',
					firmId: '00990100002000018032900000588',
					userName: '张晓琴',
					loginName: '13166133712',
					email: 'findme404@163.com',
					mobile: '13166133712',
					accountType: 'MainAccount',
					mobileInfo: 'unnecessary',
					createdTime: 1514183863000,
					userStatus: 'Active',
					crmPlatformEndDate: null,
					registerSource: 'PC_Browser',
					registerRegionSource: 'CN',
					mobileAreaCode: '86',
					languagePreference: 'CN',
					defaultPlatform: 'CRM',
					userDefaultPlatform: 'CRM',
					userPlatformAccountDetailList: [
						{
							mainAcctUserId: '00990100001000017122500000208',
							accountId: '00990100002000018032900000588',
							platformCode: 'CAPACITY',
							status: 'ACTIVE',
							loginStatus: 'ACTIVE',
							closedReason: null,
						},
						{
							mainAcctUserId: '00990100001000017122500000208',
							accountId: '00990100002000018032900000588',
							platformCode: 'CLOUD_DISK',
							status: 'ACTIVE',
							loginStatus: 'ACTIVE',
							closedReason: null,
						},
						{
							mainAcctUserId: '00990100001000017122500000208',
							accountId: '00990100002000018032900000588',
							platformCode: 'CRM',
							status: 'ACTIVE',
							loginStatus: 'ACTIVE',
							closedReason: null,
						},
						{
							mainAcctUserId: '00990100001000017122500000208',
							accountId: '00990100002000018032900000588',
							platformCode: 'FUND',
							status: 'ACTIVE',
							loginStatus: 'ACTIVE',
							closedReason: null,
						},
						{
							mainAcctUserId: '00990100001000017122500000208',
							accountId: '00990100002000018032900000588',
							platformCode: 'FUNDENGINECORE',
							status: 'ACTIVE',
							loginStatus: 'ACTIVE',
							closedReason: null,
						},
						{
							mainAcctUserId: '00990100001000017122500000208',
							accountId: '00990101059000022101201000016',
							platformCode: 'MALL',
							status: 'ACTIVE',
							loginStatus: 'ACTIVE',
							closedReason: null,
						},
						{
							mainAcctUserId: '00990100001000017122500000208',
							accountId: '00990100002000018032900000588',
							platformCode: 'WA',
							status: 'ACTIVE',
							loginStatus: 'ACTIVE',
							closedReason: null,
						},
					],
					oauth: ['wechat'],
					securePasswordStatus: 'Active',
					mfaList: ['FACE_ID'],
					releaseInfo: 'unnecessary',
				}),
			Math.floor(Math.random() * 100) / 100,
		)
	})

// 接口 https://pre.xtransfer.cn/api/v1/user/firm-info
export const getUserFirmInfo = async () =>
	await new Promise<FirmInfo>(rsv => {
		setTimeout(
			() =>
				rsv({
					userId: '00990100001000017122500000208',
					firmId: '00990100002000018032900000588',
					firmStatus: 'AuditedDisable',
					firmName: '上海夺汇网络技术有限公司测 试专用',
					firmEnglishName: 'TEST-PENNY  XT COPERATION LIMITED',
					regionCode: 'CN',
					firmSuffix: 'asdd',
					xtNumber: 'XCN2670081',
					legalRepresentativeName: '张晓琴',
					tenantIdList: [],
					dateMap: {
						Audited: 1690943645000,
						AuditedDisable: 1694173187000,
					},
					annualReviewStatus: null,
					annualReviewLimitTime: null,
					expectedAuditedTime: null,
				}),
			Math.floor(Math.random() * 100) / 100,
		)
	})

// 接口 https://pre.xtransfer.cn/api/v1/user/virtual-account-info
export const getUserVirtualAccountInfo = async () =>
	await new Promise<VirtualAccountInfo>(rsv => {
		setTimeout(
			() =>
				rsv({
					userId: '00990100001000017122500000208',
					firmId: '00990100002000018032900000588',
					normalVA: true,
					specialVA: [],
					normalVAList: {
						dbs: 'Inactive',
						scb_USD: 'Closed',
						citi: 'Inactive',
						scb_EUR: 'Closed',
						cc_GB: 'Inactive',
						cc_US: 'Inactive',
						cc_CA: 'Inactive',
					},
				}),
			Math.floor(Math.random() * 100) / 100,
		)
	})

// 接口 https://pre.xtransfer.cn/api/v1/user/bank-account-info
export const getUserBankAccountInfo = async () =>
	await new Promise<BankAccountInfo>(rsv => {
		setTimeout(
			() =>
				rsv({
					userId: '00990100001000017122500000208',
					firmId: '00990100002000018032900000588',
					bankCardBand: true,
				}),
			Math.floor(Math.random() * 100) / 100,
		)
	})

export const keyDomainMap = new Map<string, 'bankAccountInfo' | 'firmInfo' | 'userInfo' | 'virtualAccountInfo'>()

export const keyGetterMap = new Map<string, () => Promise<BankAccountInfo | FirmInfo | UserInfo | VirtualAccountInfo>>()

export const userInfoKeys = [
	'userId',
	'firmId',
	'userName',
	'loginName',
	'email',
	'mobile',
	'accountType',
	'mobileInfo',
	'createdTime',
	'userStatus',
	'crmPlatformEndDate',
	'registerSource',
	'registerRegionSource',
	'mobileAreaCode',
	'languagePreference',
	'defaultPlatform',
	'userDefaultPlatform',
	'userPlatformAccountDetailList',
	'oauth',
	'securePasswordStatus',
	'mfaList',
	'releaseInfo',
]

export const firmInfoKeys = [
	'firmStatus',
	'firmName',
	'firmEnglishName',
	'regionCode',
	'firmSuffix',
	'xtNumber',
	'legalRepresentativeName',
	'tenantIdList',
	'dateMap',
	'annualReviewStatus',
	'annualReviewLimitTime',
	'expectedAuditedTime',
]

export const virtualAccountInfoKeys = ['normalVA', 'specialVA', 'normalVAList']

export const bankAccountInfoKeys = ['bankCardBand']

userInfoKeys.forEach(k => {
	keyDomainMap.set(k, 'userInfo')
	keyGetterMap.set(k, getUserInfo)
})

firmInfoKeys.forEach(k => {
	keyDomainMap.set(k, 'firmInfo')
	keyGetterMap.set(k, getUserFirmInfo)
})

virtualAccountInfoKeys.forEach(k => {
	keyDomainMap.set(k, 'virtualAccountInfo')
	keyGetterMap.set(k, getUserVirtualAccountInfo)
})

bankAccountInfoKeys.forEach(k => {
	keyDomainMap.set(k, 'bankAccountInfo')
	keyGetterMap.set(k, getUserBankAccountInfo)
})

// export const clearCache = () => {
//   const keys = Object.keys(_cache);
//   keys.forEach((k) => {
//     _cache[k as keyof typeof _cache] = undefined;
//   });
// };
