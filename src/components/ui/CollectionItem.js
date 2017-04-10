import React from 'react'
import { Card, CardMedia, CardTitle } from 'material-ui/Card'
import { GridTile } from 'material-ui/GridList'

const CollectionItem = ({ id, popularName, cover }) => (
  <GridTile
    key={ id }
    title={ popularName }>
    <img src={ cover }/>
  </GridTile>
)

export default CollectionItem
