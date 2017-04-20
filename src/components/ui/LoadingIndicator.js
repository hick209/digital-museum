import React from 'react'
import CircularProgress from 'material-ui/CircularProgress'

const LoadingIndicator = () => (
  <div className='centerGravity'>
    <CircularProgress style={{ margin: 32 }}/>
  </div>
)

export default LoadingIndicator
