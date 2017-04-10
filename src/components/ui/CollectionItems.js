import React from 'react'
import { GridList } from 'material-ui/GridList'
import { Redirect } from 'react-router-dom'
import CollectionItem from './CollectionItem'


const CollectionItems = ({ items, invalidCollection }) => {
  if (invalidCollection) {
    return (
      <Redirect to='/'/>
    )
  }

  items = items || []

  return (
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
  )
}

export default CollectionItems
