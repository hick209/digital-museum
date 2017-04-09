import React from 'react'
import Theme from './Theme'
import Toolbar from './Toolbar'
import Collections from './Collections'

const App = ({ title, collections }) => (
  <Theme>
    <div>
      <Toolbar title={ title }/>
      <Collections collections={ collections }/>
    </div>
  </Theme>
)

export default App
