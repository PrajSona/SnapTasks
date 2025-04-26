import React from 'react'
import "./RemoveScroll.css"

const FailedTask = ({ task }) => {
  return (
    <div className='duration-100 hover:scale-105 bg-[#F44336] text-white shadow-xl text-lg h-80 rounded-md p-5 flex flex-col gap-5'>
        <div className='flex justify-between'>
                <h1>{task.category}</h1>
                <h1>{task.taskDate}</h1>
            </div>
            <div className='text-3xl'>{task.taskTitle}</div>
            <div className='text-sm overflow-auto h-1/2 text-justify'>{task.taskDescription}</div>
    </div>
  )
}

export default FailedTask