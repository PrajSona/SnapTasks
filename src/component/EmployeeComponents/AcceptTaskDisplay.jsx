import React, { useEffect, useState } from 'react'
import AcceptTask from './Tasks/AcceptTask'

const AcceptTaskDisplay = (props) => {
  const [data, setData] = useState(null)

  useEffect(() => {
    setData(props.userData)
  }, [props.userData])

  return (
    <div className='bg-transparent w-full flex justify-center items-center py-16'>
      <div className='bg-[#ffffff] shadow-xl w-10/12 rounded-lg flex flex-col p-9 gap-8'>
        <div className='text-3xl'>Accepted Tasks: {data?.taskCounts.active}</div>
        <div className='w-full h-full grid grid-cols-3 gap-10 max-h-96 overflow-auto p-4'>
          {data?.taskCounts?.active > 0 ? (
            data.tasks
              .filter(task => task.active)
              .map((task, index) => (
                <div key={index}>
                  <AcceptTask task={task} />
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

export default AcceptTaskDisplay