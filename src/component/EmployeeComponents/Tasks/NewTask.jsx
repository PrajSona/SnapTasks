import React, { useContext, useState, useEffect } from 'react';
import "./RemoveScroll.css";
import { Data } from "../../../Context/DataProvider";

const NewTask = ({ task }) => {
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

    const handleAccept = () => {
        let acceptedTask = { ...task, newTask: false, active: true }

        let data = currentUser.tasks.map(t => {
            if (t.taskTitle === acceptedTask.taskTitle && t.newTask !== acceptedTask.newTask) {
                currentUser.taskCounts.active++
                currentUser.taskCounts.newTask--
                return acceptedTask
            } else {
                return t
            }
        })

        let accepted = {...currentUser, tasks : data}
        setCurrentUser(accepted)
        updateUser(userId, accepted)
        window.location.reload()
    };

    const handleReject = () => {
        
        let acceptedTask = { ...task, newTask: false, failed: true }

        let data = currentUser.tasks.map(t => {
            if (t.taskTitle === acceptedTask.taskTitle && t.failed !== acceptedTask.failed) {
                currentUser.taskCounts.failed++
                currentUser.taskCounts.newTask--
                return acceptedTask
            } else {
                return t
            }
        })

        let accepted = {...currentUser, tasks : data}
        setCurrentUser(accepted)
        updateUser(userId, accepted)
        // window.location.reload()
    }

    return (
        <div className='duration-100 hover:scale-105 bg-[#20CFCF] shadow-xl text-lg h-80 rounded-md p-5 flex flex-col gap-5'>
            <div className='flex justify-between'>
                <h1>{task.category}</h1>
                <h1>{task.taskDate}</h1>
            </div>
            <div className='text-3xl'>{task.taskTitle}</div>
            <div className='text-sm overflow-auto h-1/2 text-justify'>{task.taskDescription}</div>
            <div className='flex justify-between'>
                <button onClick={handleAccept} className='px-2 rounded-md shadow-sm border-2 border-gray-700'>Accept</button>
                <button onClick={handleReject} className='px-2 rounded-md shadow-sm border-2 border-gray-700'>Reject</button>
            </div>
        </div>
    );
};

export default NewTask;
