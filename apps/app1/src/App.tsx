import React, { useEffect, useState } from 'react'
import './App.css'
import { useStore } from 'zustand'
import { shallow } from 'zustand/shallow'
import { Button, Drawer, Input, Select } from 'antd'
import { appStore } from './appStore'

import type { SelectProps } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import _ from 'lodash'
const { Search } = Input

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

function App() {
	// step3: 接入子应用全局状态
	const [aiVisible, closeAi] = useStore(appStore!, state => [state.app1.aiVisible, state.app1.closeAi], shallow)

	const [isMainAccount, update, getProfile] = useStore(appStore!, state => [
		state.root.profile.isMainAccount,
		state.root.profile.update,
		state.root.profile.getProfile,
	])
	console.log('render', aiVisible)

	const [profileFieldOptions, setProfileFieldOptions] = useState<SelectProps['options']>()

	useEffect(() => {
		setProfileFieldOptions(
			[...userInfoKeys, ...firmInfoKeys, ...virtualAccountInfoKeys, ...bankAccountInfoKeys].map(k => {
				return { label: k, value: k }
			}),
		)
		console.log('app1 mount')
	}, [])

	const [selectedValue, setSelectedValue] = useState<String[]>()
	const handleChange = (value: string[]) => {
		console.log('#31 select change:', value)
		setSelectedValue(value)
	}
	const onSearch = async (/* value: string */) => {
		if (_.isEmpty(selectedValue)) {
			return
		}
		const data = await getProfile(selectedValue)
		console.log('onSearch:', selectedValue, 'data:', data)
	}

	return (
		<div style={{ marginLeft: '15px' }}>
			app1
			<div>isMainAccount {isMainAccount ? 'true' : 'false'}</div>
			<Button onClick={() => update(!isMainAccount)} style={{ marginTop: '5px' }}>
				update profile
			</Button>
			<div style={{ marginTop: '15px' }}>fetch patial profile</div>
			{/* <Search
				placeholder='input search text'
				onSearch={onSearch}
				enterButton
				style={{ width: '150px', marginTop: '5px' }}
				size='small'
			/> */}
			<div style={{ width: '100%', marginTop: '5px', display: 'flex', alignItems: 'center' }}>
				<div style={{ width: '150px' }}>
					<Select
						mode='multiple'
						allowClear
						placeholder='Please select'
						onChange={handleChange}
						options={profileFieldOptions}
						getPopupContainer={triggerNode => triggerNode.parentElement}
						style={{ width: '100%' }}
					/>
				</div>
				<div style={{ marginLeft: '5px' }}>
					<Button type='primary' size='middle' icon={<SearchOutlined />} onClick={onSearch} />
				</div>
			</div>
			<Drawer
				open={aiVisible}
				getContainer={
					() => document.getElementById('__qiankun_microapp_wrapper_for_app_1__')!
					// document.getElementById("sub")!
				}
				onClose={() => {
					console.log(appStore?.getState().app1)
					closeAi()
				}}>
				app1 drawer
			</Drawer>
		</div>
	)
}

export default App
