import React from 'react'
import { List } from 'material-ui/List'
import { GridList } from 'material-ui/GridList'
import Collection from './Collection'


const Collections = ({ collections }) => (
  <GridList
    cellHeight={240}
    cols={1}>
    {
      collections.map(({ id, name, cover }) => (
          <Collection
            key={ name }
            name={ name }
            cover={ cover }/>
      ))
    }
  </GridList>
)

export default Collections
