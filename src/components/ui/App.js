import React from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import Theme from './Theme'
import Authentication from '../container/Authentication'
import CollectionsScreen from '../CollectionsScreen'
import CollectionItems from '../container/CollectionItems'
import strings from '../../strings'
import { getUserSession } from '../../api'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.sessionObserver = null
  }

  componentWillMount() {
    this.sessionObserver = getUserSession().subscribe(
        session => this.props.onSession(session),
        error => {
          const { name, message, description, number, fileName, lineNumber, columnNumber, stack } = error
          this.props.onError(strings.error.critical, { name, message, description, number, fileName, lineNumber, columnNumber, stack })
        })
  }

  componentWillUnmount() {
    if (this.sessionsObserver) {
      this.sessionsObserver.unsubscribe()
    }
  }

  render() {
    return (
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
  }
}

export default App
