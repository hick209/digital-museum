import React from 'react'
import { GridList } from 'material-ui/GridList'
import CollectionItem from './CollectionItem'


const CollectionItems = ({ items }) => (
  <GridList
    cellHeight={240}
    cols={2}>
    {
      items.map(({ id, popularName }) => (
        <CollectionItem
          key={ id }
          popularName={ popularName }/>
      ))
    }
  </GridList>
)

export default CollectionItems
