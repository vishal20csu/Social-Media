import React, { useEffect } from 'react'
import Messages from './messages'
import MessageInput from './messageInput'
import {TiMessages} from 'react-icons/ti'
import useConversation from '../../zustand/useConversations'
import { useAuthContext } from '../../context/authContext'

const MessageContainer = () => {
    const {selectedConversation, setSelectedConversation}= useConversation()

    useEffect(()=>{
      // cleanup function  
      return () =>setSelectedConversation(null)
    },[setSelectedConversation])

  return (
    <div className='md:min-w-[450px] flex flex-col'>
       {!selectedConversation ? ( <NoChatSelected /> ): (
        <>
  
        <div className='bg-slate-500 px-4 py-2 mb-2'>
         <span className='label-text'>To:</span> <span className='text-gray-900 font bold'> {selectedConversation.fullName}</span>
        </div>
        <Messages />
         <MessageInput /> 
        </>
       )}
       </div>
  )
}

export default MessageContainer

const NoChatSelected =()=>{
  const {authUser} = useAuthContext()
    return (
        <div className='flex items-center justify-center w-full h-full'>
            <div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font semibold flex flex-col items-center'>
                <p>Welcome 👋 {authUser.fullName}</p>
                <p> Ping your friends 😉 </p>
                <TiMessages className='text-3xl md:text-6xl text-center' />
            </div>
        </div>
    )
}


/*Starter code 
import React from 'react'
import Messages from './messages'
import MessageInput from './messageInput'

const MessageContainer = () => {
  return (
    <div className='md:min-w-[450px] flex flex-col'>
       <>
       <div className='bg-slate-500 px-4 py-2 mb-2'>
        <span className='label-text'>To:</span> <span className='text-gray-900 font bold'> Vishal Yadav</span>
       </div>
       <Messages />
        <MessageInput /> 
       </>
       </div>
  )
}

export default MessageContainer
*/