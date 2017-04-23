import React from 'react'
import LoadingIndicator from './ui/LoadingIndicator'
import Toolbar from './container/Toolbar'

const AppShell = ({ title, pageLoading, children }) => (
  <div>
    <Toolbar title={ title }/>
    {
      pageLoading ? <LoadingIndicator/> : children
    }
  </div>
)

export default AppShell
