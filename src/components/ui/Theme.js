import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { blueGrey500, blueGrey700, tealA400 } from 'material-ui/styles/colors'


const appTheme = getMuiTheme({
  palette: {
    primary1Color: blueGrey500,
    primary2Color: blueGrey700,
    // primary3Color: grey400,
    accent1Color: tealA400,
    // accent2Color: grey100,
    // accent3Color: grey500,
  },
})

const Theme = ({ children }) => (
  <MuiThemeProvider muiTheme={ appTheme }>
    { children }
  </MuiThemeProvider>
)

export default Theme
