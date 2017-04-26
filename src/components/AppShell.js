import React from 'react'
import LoadingIndicator from './ui/LoadingIndicator'
import Toolbar from './container/Toolbar'
import ErrorContainer from './container/ErrorContainer'

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
