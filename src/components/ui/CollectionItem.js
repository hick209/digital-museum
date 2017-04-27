import React from 'react'
import { GridTile } from 'material-ui/GridList'

const CollectionItem = ({ id, popularName, cover }) => (
		<GridTile
				key={ id }
				title={ popularName }>
			<img src={ cover }/>
		</GridTile>
)

export default CollectionItem
