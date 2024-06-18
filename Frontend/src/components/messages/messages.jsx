import React, { useEffect, useRef } from 'react'
import Message from './mesage'
import useGetMessage from '../../hooks/useGetMessage'
import MessageSkeleton from '../skeleton/messageSkeleton'
import useListenMessage from '../../hooks/useListenMessage'

const Messages = () => {
  const {messages,loading} = useGetMessage()
  
  useListenMessage()

  const lastMesssageRef= useRef() 

  useEffect (()=>{
    setTimeout(()=>{
      lastMesssageRef.current?.scrollIntoView({behaviour:"smooth"});
    },100)

  },[messages])
  
  return (
    <div className='px-4 flex-1 overflow-auto'>

      {!loading && messages.length > 0 && messages.map((message)=>(
        <div key={message._id}
        ref= {lastMesssageRef}>
        <Message 
        message= {message} />
        </div>


      ))}


        {loading && [...Array(3)].map((_,idx)=> <MessageSkeleton key = {idx}/> )}
        {!loading && messages.length ===0 && (
          <p className='text-center' >Send a message to start the conversation</p>
        )}
    </div>
  )
}

export default Messages