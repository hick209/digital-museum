import React from 'react'
import { Card, CardMedia, CardTitle } from 'material-ui/Card'
import { Subheader, TextField } from 'material-ui'
import ImageIcon from 'material-ui/svg-icons/image/image'
import strings from '../../strings'


export default class CollectionItemDetail extends React.Component {
	render() {
		const { item, hasErrors } = this.props

		const cardStyle = {
			margin: 8,
			maxWidth: 560,
		}
		cardStyle.marginBottom = cardStyle.margin + (hasErrors ? 48 : 0)
		const cardMediaStyle = {
			height: 240,
		}
		const cardMediaImageStyle = {
			height: 240,
			backgroundImage: `url(${item.cover})`,
			backgroundSize: 'cover',
			backgroundRepeat: 'no-repeat',
			backgroundPosition: '50% 50%',
		}
		const placeholderStyle = {
			height: 120,
			paddingTop: undefined,
			fillOpacity: 0.33,
		}
		placeholderStyle.paddingTop = (cardMediaStyle.height - placeholderStyle.height) / 2

		const sectionStyle = {
			marginBottom: 32,
		}
		const inputStyle = {
			paddingLeft: 16,
			paddingRight: 16,
			cursor: 'default',
		}
		const inputTextStyle = {
			color: null,
		}

		return (
				<div style={{ display: 'flex', justifyContent: 'center' }}>
					<Card style={ cardStyle }>
						<CardMedia
								style={ cardMediaStyle }
								overlay={ <CardTitle title={ item.popularName }/> }>
							{ item.cover ? <div style={ cardMediaImageStyle }/> : <ImageIcon style={ placeholderStyle }/> }
						</CardMedia>

						<div style={ sectionStyle }>
							<TextField
									style={ inputStyle }
									inputStyle={ inputTextStyle }
									defaultValue={ item.popularName }
									disabled={ true }
									floatingLabelText={ strings.collectionItem.hint.popularName }
									underlineShow={ false }/>
							<TextField
									style={ inputStyle }
									inputStyle={ inputTextStyle }
									defaultValue={ item.simpleDescription }
									disabled={ true }
									floatingLabelText={ strings.collectionItem.hint.simpleDescription }
									underlineShow={ false }/>
						</div>

						<div style={ sectionStyle }>
							<Subheader>Taxonomy</Subheader>
							<TextField
									style={ inputStyle }
									inputStyle={ inputTextStyle }
									defaultValue={ item.taxonomy.kingdom }
									disabled={ true }
									floatingLabelText={ strings.collectionItem.hint.taxonomy.kingdom }
									underlineShow={ false }/>
							<br/>
							<TextField
									style={ inputStyle }
									inputStyle={ inputTextStyle }
									defaultValue={ item.taxonomy.phylum }
									disabled={ true }
									floatingLabelText={ strings.collectionItem.hint.taxonomy.phylum }
									underlineShow={ false }/>
							<br/>
							<TextField
									style={ inputStyle }
									inputStyle={ inputTextStyle }
									defaultValue={ item.taxonomy.class }
									disabled={ true }
									floatingLabelText={ strings.collectionItem.hint.taxonomy.class }
									underlineShow={ false }/>
							<br/>
							<TextField
									style={ inputStyle }
									inputStyle={ inputTextStyle }
									defaultValue={ item.taxonomy.order }
									disabled={ true }
									floatingLabelText={ strings.collectionItem.hint.taxonomy.order }
									underlineShow={ false }/>
							<br/>
							<TextField
									style={ inputStyle }
									inputStyle={ inputTextStyle }
									defaultValue={ item.taxonomy.family }
									disabled={ true }
									floatingLabelText={ strings.collectionItem.hint.taxonomy.family }
									underlineShow={ false }/>
							<br/>
							<TextField
									style={ inputStyle }
									inputStyle={ inputTextStyle }
									defaultValue={ item.taxonomy.genus }
									disabled={ true }
									floatingLabelText={ strings.collectionItem.hint.taxonomy.genus }
									underlineShow={ false }/>
							<br/>
							<TextField
									style={ inputStyle }
									inputStyle={ inputTextStyle }
									defaultValue={ item.taxonomy.species }
									disabled={ true }
									floatingLabelText={ strings.collectionItem.hint.taxonomy.species }
									underlineShow={ false }/>
						</div>
					</Card>
				</div>
		)
	}
}
