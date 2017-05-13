import React from 'react'
import { CardMedia, CardTitle } from 'material-ui/Card'
import { IconButton } from 'material-ui'
import EditIcon from 'material-ui/svg-icons/editor/mode-edit'
import ImageIcon from 'material-ui/svg-icons/image/image'


const CollectionItemDetailCover = props => {
	const cardMediaStyle = {
		height: 240,
	}
	const cardMediaImageStyle = {
		height: 240,
		backgroundImage: `url(${props.cover})`,
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

	const editCoverIconButtonStyle = {
		position: 'absolute',
		top: 0,
		bottom: 'auto',
		left: 'auto',
		right: '0',
		margin: 8,
		minWidth: 0,
		width: 48,
	}

	return (
			<CardMedia
					style={ cardMediaStyle }
					overlay={ <CardTitle title={ props.title }/> }>
				{ props.cover ?
						<div style={ cardMediaImageStyle }/> :
						<ImageIcon style={ placeholderStyle }/>
				}
				{ props.onEditCoverClick ?
						<IconButton
								style={ editCoverIconButtonStyle }
								onTouchTap={ props.onEditCoverClick }>
							<EditIcon/>
						</IconButton> :
						<div/>
				}
			</CardMedia>
	)
}

export default CollectionItemDetailCover
