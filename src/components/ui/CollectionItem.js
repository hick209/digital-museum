import React from 'react'
import { Card, CardMedia, CardTitle } from 'material-ui/Card'
import { GridTile } from 'material-ui/GridList'

const CollectionItem = ({ id, popularName }) => (
  <GridTile
    key={ id }
    title={ popularName }>
  </GridTile>
)

export default CollectionItem
