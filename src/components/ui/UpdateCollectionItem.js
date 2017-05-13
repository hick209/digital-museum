import React from 'react'
import { Card, CardActions } from 'material-ui/Card'
import { FlatButton, Subheader, TextField } from 'material-ui'
import strings from '../../strings'
import CollectionItemDetailCover from './CollectionItemDetailCover'


class UpdateCollectionItem extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			popularName: props.item.popularName,
			cover: props.item.cover,
		}

		this.onCancel = this.onCancel.bind(this)
		this.onSave = this.onSave.bind(this)
	}

	onCancel() {
		const { history } = this.props
		history.goBack()
	}

	onSave() {
		const { onSave, history } = this.props

		const item = {
			id: this.props.item.id,
			collectionId: this.props.item.collectionId,
			popularName: this.popularName.input.value,
			simpleDescription: this.simpleDescription.input.value,
			cover: this.state.cover,
			taxonomy: {
				kingdom: this.taxonomy.kingdom.input.value,
				phylum: this.taxonomy.phylum.input.value,
				class: this.taxonomy.class.input.value,
				order: this.taxonomy.order.input.value,
				family: this.taxonomy.family.input.value,
				genus: this.taxonomy.genus.input.value,
				species: this.taxonomy.species.input.value,
			},
		}

		onSave(item)
		history.goBack()
	}

	render() {
		const { item, hasErrors } = this.props
		this.taxonomy = this.taxonomy || {}

		const cardStyle = {
			margin: 8,
			maxWidth: 560,
		}
		cardStyle.marginBottom = cardStyle.margin + (hasErrors ? 48 : 0)

		const sectionStyle = {
			marginBottom: 32,
		}
		const inputStyle = {
			paddingLeft: 16,
			paddingRight: 16,
		}


		return (
				<div style={{ display: 'flex', justifyContent: 'center' }}>
					<Card style={ cardStyle }>
						<CollectionItemDetailCover
								title={ this.state.popularName }
								cover={ this.state.cover }
								onEditCoverClick={ () => { console.log('click!') } }/>

						<div style={ sectionStyle }>
							<TextField
									style={ inputStyle }
									ref={ textField => this.popularName = textField }
									defaultValue={ item.popularName }
									onChange={ (e, newValue) => this.setState({ popularName: newValue }) }
									floatingLabelText={ strings.collectionItem.hint.popularName }
									errorText={ null }/>
							<TextField
									style={ inputStyle }
									ref={ textField => this.simpleDescription = textField }
									defaultValue={ item.simpleDescription }
									floatingLabelText={ strings.collectionItem.hint.simpleDescription }
									errorText={ null }/>
						</div>

						<div style={ sectionStyle }>
							<Subheader>Taxonomy</Subheader>
							<TextField
									style={ inputStyle }
									ref={ textField => this.taxonomy.kingdom = textField }
									defaultValue={ item.taxonomy.kingdom }
									floatingLabelText={ strings.collectionItem.hint.taxonomy.kingdom }/>
							<br/>
							<TextField
									style={ inputStyle }
									ref={ textField => this.taxonomy.phylum = textField }
									defaultValue={ item.taxonomy.phylum }
									floatingLabelText={ strings.collectionItem.hint.taxonomy.phylum }/>
							<br/>
							<TextField
									style={ inputStyle }
									ref={ textField => this.taxonomy.class = textField }
									defaultValue={ item.taxonomy.class }
									floatingLabelText={ strings.collectionItem.hint.taxonomy.class }/>
							<br/>
							<TextField
									style={ inputStyle }
									ref={ textField => this.taxonomy.order = textField }
									defaultValue={ item.taxonomy.order }
									floatingLabelText={ strings.collectionItem.hint.taxonomy.order }/>
							<br/>
							<TextField
									style={ inputStyle }
									ref={ textField => this.taxonomy.family = textField }
									defaultValue={ item.taxonomy.family }
									floatingLabelText={ strings.collectionItem.hint.taxonomy.family }/>
							<br/>
							<TextField
									style={ inputStyle }
									ref={ textField => this.taxonomy.genus = textField }
									defaultValue={ item.taxonomy.genus }
									floatingLabelText={ strings.collectionItem.hint.taxonomy.genus }/>
							<br/>
							<TextField
									style={ inputStyle }
									ref={ textField => this.taxonomy.species = textField }
									defaultValue={ item.taxonomy.species }
									floatingLabelText={ strings.collectionItem.hint.taxonomy.species }/>
						</div>

						<CardActions>
							<FlatButton
									label={ strings.collectionItem.action.cancel }
									onTouchTap={ this.onCancel }/>
							<FlatButton
									label={ strings.collectionItem.action.save }
									secondary={ true }
									onTouchTap={ this.onSave }/>
						</CardActions>
					</Card>
				</div>
		)
	}
}

//UpdateCollectionItem.propTypes = {
//	item: PropTypes.object,
//	loading: PropTypes.bool,
//	editMode: PropTypes.bool,
//}


export default UpdateCollectionItem
