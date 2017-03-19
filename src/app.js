import React from 'react'
import ReactDOM from 'react-dom'

const Message = ({ title, message }) => (
  <div>
    <h1>{ title }</h1>
    <p>{ message }</p>
  </div>
)

ReactDOM.render(
  <Message
    title="Hello World!"
    message="This is my React intro"/>,
  document.getElementById('react-container')
)
