import React from 'react'

function MessageSelf({props}) {
  return (
    <div className='self-message-container'>
      <div className='message-box'>
        <p style={{color: "black"}}>{props.content}</p>
      </div>
    </div>
  )
}

export default MessageSelf;
