import React from 'react'

const EmptyComponent = ({
  text = 'There is no data yet'
}) => {
  return (
    <div>{text}</div>
  )
}

export default EmptyComponent