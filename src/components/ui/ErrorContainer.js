import React from 'react'
import Snackbar from 'material-ui/Snackbar'
import strings from '../../strings'

export default class ErrorContainer extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			showSnackbar: (props.errors || []).length > 0,
		}
	}

	componentWillReceiveProps(nextProps) {
		const errorCount = (nextProps.errors || []).length
		this.setState({
			showSnackbar: errorCount > 0,
		})
	}

	snackbarAction() {
		this.props.dismissError(0)
	}

	render() {
		const { errors = [] } = this.props
		const { showSnackbar } = this.state
		const errorCount = errors.length

		let message
		if (errorCount === 0) {
			message = strings.error.noErrors
		} else {
			message = strings.error.errorMessage.replace('{1}', errors[0].message)
		}

		return (
				<Snackbar
						open={ showSnackbar }
						message={ message }
						autoHideDuration={ 0 }
						action={ strings.error.action.dismiss }
						onActionTouchTap={ () => this.snackbarAction() }
						onRequestClose={ () => {} }/>
		)
	}
}
