import React from 'react'
import AppBar from 'material-ui/AppBar'
import RaisedButton from 'material-ui/RaisedButton'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import Theme from './Theme'
import strings from '../../strings'
import Collections from './Collections'

const App = ({ title, collections }) => (
  <Theme>
    <div>
      <AppBar title={ title }/>
      <Collections collections={ collections }/>
    </div>
  </Theme>
)

export default App
