import React, { useEffect } from 'react'
import './App.css'
import { useStore } from 'zustand'
import { shallow } from 'zustand/shallow'
import { Button, Drawer } from 'antd'
import { appStore } from './appStore'

function App() {
	// step3: 接入子应用全局状态
	const [aiVisible, closeAi] = useStore(appStore!, state => [state.app1.aiVisible, state.app1.closeAi], shallow)

	const [isMainAccount, update] = useStore(appStore!, state => [
		state.root.profile.isMainAccount,
		state.root.profile.update,
	])
	console.log('render', aiVisible)

	useEffect(() => {
		console.log('app1 mount')
	}, [])

	return (
		<div>
			app1
			<div>isMainAccount {isMainAccount ? 'true' : 'false'}</div>
			<Button onClick={() => update()}>update profile</Button>
			<Drawer
				open={aiVisible}
				getContainer={() => document.getElementById('__qiankun_microapp_wrapper_for_app_1__')!}
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
