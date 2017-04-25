import React from 'react'
import LoadingIndicator from './ui/LoadingIndicator'
import Toolbar from './container/Toolbar'

const AppShell = ({ title, loading, children }) => (
  <div>
    <Toolbar title={ title }/>
    {
      loading ? <LoadingIndicator/> : children
    }
  </div>
)

export default AppShell
