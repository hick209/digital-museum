import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { blueGrey500, blueGrey700, lightGreenA200 } from 'material-ui/styles/colors'
import AppBar from 'material-ui/AppBar'
import RaisedButton from 'material-ui/RaisedButton'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import strings from '../../strings'
import Collections from './Collections'

const collections = [
  {
    name: 'Flora',
    image: 'https://www.gibraltar.gov.gi/new/images/04_Page/5_0/3_Flora_Fauna_Footer_630x300.jpg'
  },
  {
    name: 'Fauna',
    image: 'https://s-media-cache-ak0.pinimg.com/originals/cb/3d/d9/cb3dd9f36ce4ae31b20a98f7eaebd846.jpg'
  }
];

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: blueGrey500,
    primary2Color: blueGrey700,
    // primary3Color: grey400,
    accent1Color: lightGreenA200,
    // accent2Color: grey100,
    // accent3Color: grey500,
  },
})

const App = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <div>
      <AppBar title={ strings.app.appBarTitle }/>
      <Collections collections={ collections }/>
    </div>
  </MuiThemeProvider>
)

export default App
