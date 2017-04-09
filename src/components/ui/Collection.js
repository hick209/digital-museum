import React from 'react'
import { Card, CardMedia, CardTitle } from 'material-ui/Card'
import { GridTile } from 'material-ui/GridList'

const Collection = ({ id, name, cover }) => (
  <GridTile
    key={ id }
    title={ name }>
    <img src={ cover }/>
  </GridTile>

  // <Card>
  //   <CardMedia
  //     overlay={
  //       <CardTitle title={ name }/>
  //     }>
  //     <img src={ image }/>
  //   </CardMedia>
  // </Card>
)

export default Collection
