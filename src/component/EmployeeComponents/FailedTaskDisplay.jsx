import React, { useEffect, useState } from 'react'
import FailedTask from './Tasks/FailedTask'

const FailedTaskDisplay = (props) => {
  const [data, setData] = useState(null)

  useEffect(() => {
    setData(props.userData)
  }, [props.userData])

  return (
    <div className='bg-transparent w-full flex justify-center items-center py-16'>
      <div className='bg-[#ffffff] shadow-xl w-10/12 rounded-lg flex flex-col p-9 gap-8'>
        <div className='text-3xl'>Failed Tasks: {data?.taskCounts.failed}</div>
        <div className='w-full h-full grid grid-cols-3 gap-10 max-h-96 overflow-auto p-4'>
          {data?.taskCounts?.failed > 0 ? (
            data.tasks
              .filter(task => task.failed)
              .map((task, index) => (
                <div key={index}>
                  <FailedTask task={task} />
                </div>
              ))
          ) : (
            <div>Not available</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default FailedTaskDisplay