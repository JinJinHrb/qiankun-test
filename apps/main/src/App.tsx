/* eslint-disable no-restricted-globals */
import React from 'react'
import './App.css'

function App() {
	return (
		<div
			style={{
				marginLeft: '15px',
				marginTop: '15px',
			}}>
			<button onClick={() => history.pushState(null, '', 'app1')} style={{ marginLeft: '15px' }}>
				app1
			</button>
			<button onClick={() => history.pushState(null, '', 'app2')} style={{ marginLeft: '15px' }}>
				app2
			</button>
		</div>
	)
}

export default App
