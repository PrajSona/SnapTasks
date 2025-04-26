import React, { useContext, useState, useEffect } from 'react';
import "./RemoveScroll.css";
import { Data } from "../../../Context/DataProvider";

const AcceptTask = ({ task }) => {
  const userId = JSON.parse(localStorage.getItem("login")).id
  const { getUserDetails, updateUser } = useContext(Data);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (userId) {
        const user = await getUserDetails(userId);
        setCurrentUser(user);
      }
    };

    fetchUserDetails();
  }, [userId, getUserDetails]);

  const handleDone = () => {
    let acceptedTask = { ...task, active: false, completed: true }

    let data = currentUser.tasks.map(t => {
      if (t.taskTitle === acceptedTask.taskTitle && t.completed !== acceptedTask.completed) {
        currentUser.taskCounts.completed++
        currentUser.taskCounts.active--
        return acceptedTask
      } else {
        return t
      }
    })

    let accepted = { ...currentUser, tasks: data }
    setCurrentUser(accepted)
    updateUser(userId, accepted)
    window.location.reload()
  };

  const handleFailed = () => {

    let acceptedTask = { ...task, active: false, failed: true }

    let data = currentUser.tasks.map(t => {
      if (t.taskTitle === acceptedTask.taskTitle && t.failed !== acceptedTask.failed) {
        currentUser.taskCounts.failed++
        currentUser.taskCounts.active--
        return acceptedTask
      } else {
        return t
      }
    })

    let accepted = { ...currentUser, tasks: data }
    setCurrentUser(accepted)
    updateUser(userId, accepted)
    window.location.reload()
  }

  return (
    <div className='duration-100 hover:scale-105 bg-[#F4A300] shadow-xl text-lg h-80 rounded-md p-5 flex flex-col gap-5'>
      <div className='flex justify-between'>
        <h1>{task.category}</h1>
        <h1>{task.taskDate}</h1>
      </div>
      <div className='text-3xl'>{task.taskTitle}</div>
      <div className='text-sm overflow-auto h-1/2 text-justify'>{task.taskDescription}</div>
      <div className='flex justify-between'>
        <button onClick={handleDone} className='px-2 rounded-md shadow-sm border-2 border-gray-700'>Done</button>
        <button onClick={handleFailed} className='px-2 rounded-md shadow-sm border-2 border-gray-700'>Failed</button>
      </div>
    </div>
  )
}

export default AcceptTask

