import React from 'react'
import CircularProgress from 'material-ui/CircularProgress'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import Theme from './Theme'
import Authentication from '../container/Authentication'
import Toolbar from './Toolbar'
import Collections from '../container/Collections'
import CollectionItems from '../container/CollectionItems'
import LoadingIndicator from './LoadingIndicator'

const App = ({ title, pageLoading, signedIn }) => (
  <Router>
    <Theme>
      <div>
        <Toolbar title={ title } signedIn={ signedIn }/>
        {
          pageLoading ? (
            <LoadingIndicator/>
          ) : (
            <Switch>
              <Route exact path='/' component={ Collections }/>
              <Route exact path='/auth' component={ Authentication }/>
              <Route path='/collections/:collectionId' component={ CollectionItems }/>
              <Redirect to='/'/>
            </Switch>
          )
        }
      </div>
    </Theme>
  </Router>
)

export default App
