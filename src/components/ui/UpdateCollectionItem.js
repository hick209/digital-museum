import React from 'react'
import ContentAdd from 'material-ui/svg-icons/content/add'
import FloatingActionButton from 'material-ui/FloatingActionButton'

const UpdateCollectionItem = ({ item }) => (
		<div>
			<FloatingActionButton
					secondary={ true }
					style={{
						margin: 16,
						top: 'auto',
						right: 'auto',
						bottom: 'auto',
						left: 'auto',
						position: 'fixed',
					}}>
				<ContentAdd/>
			</FloatingActionButton>
		</div>
)


export default UpdateCollectionItem
