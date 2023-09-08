/* eslint-disable no-restricted-globals */
import React from 'react'
import './App.css'

function App() {
	return (
		<div>
			<button onClick={() => history.pushState(null, '', 'app1')}>app1</button>
			<button onClick={() => history.pushState(null, '', 'app2')}>app2</button>
		</div>
	)
}

export default App
