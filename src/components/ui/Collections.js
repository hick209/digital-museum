import React from 'react'
import { List } from 'material-ui/List'
import { GridList } from 'material-ui/GridList'
import Collection from './Collection'

const Collections = ({ collections }) => (
  <GridList
    cellHeight={240}
    cols={1}>
    {
      collections.map(({ name, image }) => (
          <Collection
            key={ name }
            name={ name }
            image={ image }/>
      ))
    }
  </GridList>
)

export default Collections
