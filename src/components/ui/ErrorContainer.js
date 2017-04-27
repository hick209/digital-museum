import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import { List, ListItem } from 'material-ui/List'
import Snackbar from 'material-ui/Snackbar'
import DeleteIcon from 'material-ui/svg-icons/content/delete-sweep'
import strings from '../../strings'

export default class ErrorContainer extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			showSnackbar: (props.errors || []).length > 0,
			showDetails: false,
		}
	}

	componentWillReceiveProps(nextProps) {
		const showSnackbar = (nextProps.errors || []).length > 0
		this.setState({ showSnackbar })
	}

	snackbarAction() {
		const errorCount = (this.props.errors || []).length
		if (errorCount === 1) {
			this.dismiss(0)
		} else {
			this.setState({ showDetails: true })
		}
	}

	dismiss(errorIndex) {
		this.props.dismissError(errorIndex)
	}

	dismissAll() {
		this.props.dismissAllErrors()
		this.close()
	}

	close() {
		this.setState({
			showDetails: false,
			showSnackbar: false
		})
	}

	render() {
		const { errors = [] } = this.props
		const { showSnackbar } = this.state

		const errorCount = errors.length
		const errorCountMessage = strings.error.errorMessageCount.replace('{1}', `${errorCount}`)
		const action = errorCount === 1 ? strings.error.action.dismiss : strings.error.action.more

		let message = undefined
		if (errorCount === 0) {
			message = strings.error.noErrors
		} else if (errorCount === 1) {
			message = strings.error.errorMessage.replace('{1}', errors[0].message)
		} else {
			message = errorCountMessage
		}

		const detailActions = [
			<FlatButton
					label={ strings.error.action.dismissAll }
					primary={ true }
					onTouchTap={ () => this.dismissAll() }/>,
			<FlatButton
					label={ strings.action.ok }
					primary={ true }
					keyboardFocused={ true }
					onTouchTap={ () => this.close() }/>,
		]

		return <div>
			<Snackbar
					open={ showSnackbar }
					message={ message }
					autoHideDuration={ 0 }
					action={ action }
					onActionTouchTap={ () => this.snackbarAction() }/>
			<Dialog
					title={ errorCountMessage }
					actions={ detailActions }
					autoScrollBodyContent={ true }
					open={ this.state.showDetails }
					onRequestClose={ () => this.close() }>
				<List>
					{
						errors.map((error, index) => (
								<ListItem
										key={ index }
										primaryText={ error.message }
										rightIconButton={ <IconButton><DeleteIcon onTouchTap={ () => this.dismiss(index) }/></IconButton> }/>
						))
					}
				</List>
			</Dialog>
		</div>
	}
}
