import React from 'react'
import { GridTile } from 'material-ui/GridList'

const Collection = ({ id, name, cover }) => (
		<GridTile
				key={ id }
				title={ name }>
			<img src={ cover }/>
		</GridTile>
)

export default Collection
