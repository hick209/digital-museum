import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { blueGrey500, blueGrey700, lightGreenA200 } from 'material-ui/styles/colors'
import AppBar from 'material-ui/AppBar'
import RaisedButton from 'material-ui/RaisedButton'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import strings from '../../strings'

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: blueGrey500,
    primary2Color: blueGrey700,
    // primary3Color: grey400,
    accent1Color: lightGreenA200,
    // accent2Color: grey100,
    // accent3Color: grey500,
  },
});

const App = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <div>
      <AppBar title={ strings.app.appBarTitle }/>
      <h1>This is the app</h1>
      <p>With a simple message</p>
      <RaisedButton label="Default" primary={true}/>
      <FloatingActionButton/>
    </div>
  </MuiThemeProvider>
)

export default App
