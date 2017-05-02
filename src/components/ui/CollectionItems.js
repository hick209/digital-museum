import React from 'react'
import { Link } from 'react-router-dom'
import ContentAdd from 'material-ui/svg-icons/content/add'
import { GridList, FloatingActionButton } from 'material-ui'
import CollectionItem from './CollectionItem'

const fabStyle = (hasErrors) => ({
	margin: 0,
	top: 'auto',
	right: 16,
	bottom: 16 + (hasErrors ? 48 : 0),
	left: 'auto',
	position: 'fixed',
})

const CollectionItems = ({ collectionId, items, hasErrors, canCreateCollectionItem, history }) => (
		<div>
			<GridList
					cellHeight={240}
					cols={2}>
				{
					items.map(({ id, popularName, cover }) => (
							<Link
									key={ id }
									to={ `/collections/${collectionId}/items/${id}` }>
								<CollectionItem
										key={ id }
										popularName={ popularName }
										cover={ cover }/>
							</Link>
					))
				}
			</GridList>
			{
				canCreateCollectionItem ?
						<FloatingActionButton
								secondary={ true }
								style={ fabStyle(hasErrors) }
								onTouchTap={ () => history.push({ pathname: `/collections/${collectionId}/items/new` }) }>
							<ContentAdd/>
						</FloatingActionButton>
						: null
			}
		</div>
)


export default CollectionItems
