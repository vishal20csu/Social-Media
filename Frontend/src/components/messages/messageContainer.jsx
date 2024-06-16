import React from 'react'
import Messages from './messages'
import MessageInput from './messageInput'
import {TiMessages} from 'react-icons/ti'

const MessageContainer = () => {
    const nochatselected=true;
  return (
    <div className='md:min-w-[450px] flex flex-col'>
       {nochatselected ? <NoChatSelected /> : (
        <>
        <div className='bg-slate-500 px-4 py-2 mb-2'>
         <span className='label-text'>To:</span> <span className='text-gray-900 font bold'> Vishal Yadav</span>
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
    return (
        <div className='flex items-center justify-center w-full h-full'>
            <div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font semibold flex flex-col items-center'>
                <p>Start Chatting Vishal</p>
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