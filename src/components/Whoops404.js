import React from 'react'

const Whoops404 = ({ location }) => (
  <div className="whoops-404">
    <h1>Whoops, route not found</h1>
    <p>Cannot find content for { location.pathname }</p>
  </div>
)

export default Whoops404
