import React from 'react'
import Dialog from 'material-ui/Dialog'
import Divider from 'material-ui/Divider'
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
		if (errorCount === 0) {
			this.setState({ showSnackbar: false })
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
		this.setState({ showDetails: false })
	}

	render() {
		const { errors = [], showErrorDetails = false } = this.props
		const { showSnackbar } = this.state

		const errorCount = errors.length
		const errorCountMessage = strings.error.errorMessageCount.replace('{1}', `${errorCount}`)
		const action = errorCount === 0 ? strings.error.action.dismiss : strings.error.action.more

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
					onActionTouchTap={ () => this.snackbarAction() }
					onRequestClose={ () => {
					} }/>
			<Dialog
					title={ errorCountMessage }
					actions={ detailActions }
					autoScrollBodyContent={ true }
					repositionOnUpdate={ true }
					open={ this.state.showDetails }
					onRequestClose={ () => this.close() }>
				<List>
					{
						errors.map((error, index) => (
								<div key={ index }>
									<ListItem
											disabled={ !showErrorDetails }
											primaryText={ error.message }
											primaryTogglesNestedList={ true }
											rightIconButton={
												<IconButton>
													<DeleteIcon onTouchTap={ () => this.dismiss(index) }/>
												</IconButton>
											}
											nestedItems={
												showErrorDetails ? Object.keys(error.error).map(errorKey => (
														<ListItem
																key={ errorKey }
																disabled={ true }
																primaryText={ errorKey }
																secondaryText={ JSON.stringify(error.error[errorKey]) }
																secondaryTextLines={ 2 }/>
												)) : []
											}/>
									<Divider/>
								</div>
						))
					}
				</List>
			</Dialog>
		</div>
	}
}
