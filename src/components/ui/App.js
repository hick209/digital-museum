import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { blueGrey500, blueGrey700, tealA400 } from 'material-ui/styles/colors'
import AppBar from 'material-ui/AppBar'
import RaisedButton from 'material-ui/RaisedButton'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import strings from '../../strings'
import Collections from './Collections'

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: blueGrey500,
    primary2Color: blueGrey700,
    // primary3Color: grey400,
    accent1Color: tealA400,
    // accent2Color: grey100,
    // accent3Color: grey500,
  },
})

const App = ({title, collections}) => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <div>
      <AppBar title={title}/>
      <Collections collections={ collections }/>
    </div>
  </MuiThemeProvider>
)

export default App
