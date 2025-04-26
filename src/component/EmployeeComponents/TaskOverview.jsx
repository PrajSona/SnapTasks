import React, { useEffect, useState } from 'react'

const TaskOverview = (props) => {
  const [data, setData] = useState(null)

  useEffect(() => {
    setData(props.userData)
  }, [props.userData])

  return (
    <div className='bg-transparent w-full flex justify-center items-center py-16'>
      <div className='w-2/3 rounded-lg flex flex-col gap-7'>
        <div className='flex flex-col gap-7 bg-[#ffffff] shadow-xl p-7 rounded-md'>
          <div className='grid grid-cols-2 gap-5'>
            <div className='cursor-pointer duration-100 hover:scale-105 shadow-xl bg-[#20CFCF] text-white rounded-lg h-40 flex flex-col items-center justify-center gap-6'>
              <div className='text-xl'>New Task</div>
              <div className='text-5xl'>{data?.taskCounts.newTask}</div>
            </div>
            <div className='cursor-pointer duration-100 hover:scale-105 shadow-xl bg-[#27C27D] text-white rounded-lg h-40 flex flex-col items-center justify-center gap-6'>
              <div className='text-xl'>Completed Task</div>
              <div className='text-5xl'>{data?.taskCounts.completed}</div>
            </div>
            <div className='cursor-pointer duration-100 hover:scale-105 shadow-xl bg-[#F4A300] text-white rounded-lg h-40 flex flex-col items-center justify-center gap-6'>
              <div className='text-xl'>Accepted Task</div>
              <div className='text-5xl'>{data?.taskCounts.active}</div>
            </div>
            <div className='cursor-pointer duration-100 hover:scale-105 shadow-xl bg-[#F44336] text-white rounded-lg h-40 flex flex-col items-center justify-center gap-6'>
              <div className='text-xl'>Failed Task</div>
              <div className='text-5xl'>{data?.taskCounts.failed}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskOverview