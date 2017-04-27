import React from 'react'
import LoadingIndicator from './ui/LoadingIndicator'
import ErrorContainer from './container/ErrorContainer'
import Toolbar from './container/Toolbar'


const AppShell = ({ title, loading, children }) => (
		<div>
			<Toolbar title={ title }/>
			<ErrorContainer/>
			{
				loading ? <LoadingIndicator/> : children
			}
		</div>
)

export default AppShell
