import React from 'react'
import { Card, CardMedia, CardTitle } from 'material-ui/Card'
import { GridTile } from 'material-ui/GridList'

const Collection = ({ name, image }) => (
  <GridTile
    key={ name }
    title={ name }>
    <img src={ image } />
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
