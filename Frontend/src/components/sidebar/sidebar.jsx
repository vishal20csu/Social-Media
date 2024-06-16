import React from 'react'
import SearchInput from './searchInput'
import Conversations from './conversations'

const Sidebar = () => {
  return (
    <div className='border -r borderr-slate-500 p-4 flex flex-col'>
        <SearchInput />
        <div className='divider px-3'></div>
         <Conversations />
        {/* <LogoutButton />  */}
    </div>
  )
}

export default Sidebar