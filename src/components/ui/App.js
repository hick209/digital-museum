import React from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch, IndexRoute } from 'react-router-dom'
import Theme from './Theme'
import Toolbar from './Toolbar'
import Collections from '../Collections'
import CollectionItems from '../CollectionItems'
import Whoops404 from '../Whoops404'

const App = ({ title, children }) => (
  <Router>
    <Theme>
      <div>
        <Toolbar title={ title }/>
        <Switch>
          <Route exact path='/' component={ Collections }/>
          <Route path='/collections/:collectionId' component={ CollectionItems }/>
          <Redirect to='/'/>
        </Switch>
      </div>
    </Theme>
  </Router>
)

export default App
