import React, { useEffect } from 'react'
import './App.css'
import { useStore } from 'zustand'
import { shallow } from 'zustand/shallow'
import { Button, Drawer, Input } from 'antd'
import { appStore } from './appStore'

const { Search } = Input

function App() {
	// step3: 接入子应用全局状态
	const [aiVisible, closeAi] = useStore(appStore!, state => [state.app1.aiVisible, state.app1.closeAi], shallow)

	const [isMainAccount, update, getProfile] = useStore(appStore!, state => [
		state.root.profile.isMainAccount,
		state.root.profile.update,
		state.root.profile.getProfile,
	])
	console.log('render', aiVisible)

	useEffect(() => {
		console.log('app1 mount')
	}, [])

	const onSearch = async (value: string) => {
		const data = await getProfile(value)
		console.log('onSearch:', value, 'data:', data)
	}

	return (
		<div style={{ marginLeft: '15px' }}>
			app1
			<div>isMainAccount {isMainAccount ? 'true' : 'false'}</div>
			<Button onClick={() => update(!isMainAccount)} style={{ marginTop: '5px' }}>
				update profile
			</Button>
			<div style={{ marginTop: '15px' }}>fetch patial profile</div>
			<Search
				placeholder='input search text'
				onSearch={onSearch}
				enterButton
				style={{ width: '150px', marginTop: '5px' }}
				size='small'
			/>
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
