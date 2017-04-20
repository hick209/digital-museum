import React from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import Theme from './Theme'
import Authentication from '../container/Authentication'
import CollectionsScreen from '../CollectionsScreen'
import CollectionItems from '../container/CollectionItems'

const App = ({ title, pageLoading }) => (
  <Router>
    <Theme>
      <Switch>
        <Route exact path='/' component={ CollectionsScreen }/>
        <Route exact path='/auth' component={ Authentication }/>
        <Route path='/collections/:collectionId' component={ CollectionItems }/>
        <Redirect to='/'/>
      </Switch>
    </Theme>
  </Router>
)

export default App
