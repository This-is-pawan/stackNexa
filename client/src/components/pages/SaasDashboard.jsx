import React from 'react'
import {useAppContext} from '../ContextApi'
const SaasDashboard = () => {
  const{theme,setBar,setOpen}=useAppContext()
  return (
    <div
    className={`w-full min-h-screen  ${
          theme === "dark"
            ? "bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-700 text-yellow-300"
            : "bg-gradient-to-tr from-black via-gray-900 to-black text-white"
        }`}
     onClick={()=>{
        setBar(false)
        setOpen(false)
      }}
    >SaasDashboard</div>
  )
}

export default SaasDashboard