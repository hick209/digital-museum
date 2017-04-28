import React from 'react'
import ContentAdd from 'material-ui/svg-icons/content/add'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import GridList from 'material-ui/GridList'
import CollectionItem from './CollectionItem'

const fabStyle = (hasErrors) => ({
	margin: 0,
	top: 'auto',
	right: 16,
	bottom: 16 + (hasErrors ? 48 : 0),
	left: 'auto',
	position: 'fixed',
})

const CollectionItems = ({ items, hasErrors, canCreateCollectionItem, location, history }) => (
		<div>
			<GridList
					cellHeight={240}
					cols={2}>
				{
					items.map(({ id, popularName, cover }) => (
							<CollectionItem
									key={ id }
									popularName={ popularName }
									cover={ cover }/>
					))
				}
			</GridList>
			{
				canCreateCollectionItem ?
						<FloatingActionButton
								secondary={ true }
								style={ fabStyle(hasErrors) }
								onTouchTap={ () => history.push({ pathname: `${location.pathname}/new` }) }>
							<ContentAdd/>
						</FloatingActionButton>
						: null
			}
		</div>
)


export default CollectionItems
