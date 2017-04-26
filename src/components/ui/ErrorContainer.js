import React from 'react'
import Snackbar from 'material-ui/Snackbar'
import strings from '../../strings'

class ErrorContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showSnackbar: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    const { errors=[] } = this.props
    const { newErrors=[] } = nextProps
    const { showSnackbar } = this.state

    const errorCount = errors.length
    const newErrorCount = newErrors.length

    this.setState({
      showSnackbar: showSnackbar || (newErrorCount > errorCount),
    })
  }

  snackbarAction() {
    this.setState({ showSnackbar: false })
  }

  render() {
    const { errors=[] } = this.props
    const { showSnackbar } = this.state
    const errorCount = errors.length

    let message
    if (errorCount === 0) {
      message = strings.error.noErrors
    }
    else if (errorCount === 1) {
      message = strings.error.errorMessage.replace('{1}', errors[0].message)
    }
    else {
      message = strings.error.errorMessageCount.replace('{1}', errorCount)
    }

    return (
      <Snackbar
        open={ showSnackbar }
        message={ message }
        autoHideDuration={ 0 }
        action={ 'OK' /* TODO This is a temporary action */ }
        onActionTouchTap={ () => this.snackbarAction() }
        onRequestClose={ () => {} }/>
    )
  }
}

export default ErrorContainer
