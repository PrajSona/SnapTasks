import React, { useState } from 'react'
import CreateTask from './createTask';
import CreateMember from './createMember';
import ViewProgress from './viewProgress';

const AdminDisplay = () => {
    const [activeTab, setActiveTab] = useState("CreateTask")


    const renderTab = () => {
        switch (activeTab) {
            case "CreateTask":
                return <CreateTask />
            case "CreateMember":
                return <CreateMember />
            case "ViewProgress":
                return <ViewProgress />
        }
    }

    return (
        <div className='flex'>
            <div className='bg-[#1f262d] h-[calc(100vh_-_5rem)] w-2/12 overflow-hidden'>

                <div className={`duration-100 hover:scale-105 text-white h-16 flex items-center text-left px-8 gap-4 cursor-pointer shadow-inner hover:bg-[#27a9e3] ${activeTab == "CreateMember"? "bg-[#27a9e3] scale-105": ""}`} onClick={() => {setActiveTab("CreateMember")}}><img src="AdminCreateUser.svg" alt="createTask" />Add Member</div>
                <div className={`duration-100 hover:scale-105 text-white h-16 flex items-center text-left px-8 gap-4 cursor-pointer shadow-inner hover:bg-[#27a9e3] ${activeTab == "CreateTask"? "bg-[#27a9e3] scale-105": ""}`} onClick={() => {setActiveTab("CreateTask")}}><img src="AdminCreateTask.svg" alt="createTask" />Assign Task</div>
                <div className={`duration-100 hover:scale-105 text-white h-16 flex items-center text-left px-8 gap-4 cursor-pointer shadow-inner hover:bg-[#27a9e3] ${activeTab == "ViewProgress"? "bg-[#27a9e3] scale-105": ""}`} onClick={() => {setActiveTab("ViewProgress")}}><img src="AdminViewProgress.svg" alt="createTask" />View Progress</div>
            </div>
            <div className='bg-[#ebebeb] flex-1'>
                {renderTab()}
            </div>
        </div>
    )
}

export default AdminDisplay

