import React from 'react'
import { Link } from 'react-router-dom'
import { GridList } from 'material-ui/GridList'
import Collection from './Collection'


const Collections = ({ collections }) => (
		<GridList
				cellHeight={240}
				cols={1}>
			{
				collections.map(({ id, name, cover }) => (
						<Link
								key={ id }
								to={ `collections/${id}` }>
							<Collection
									name={ name }
									cover={ cover }/>
						</Link>
				))
			}
		</GridList>
)

export default Collections
