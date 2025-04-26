import React, { useState } from 'react'
import AcceptTaskDisplay from './AcceptTaskDisplay';
import TaskOverview from './TaskOverview';
import FailedTaskDisplay from "./FailedTaskDisplay"
import CompleteTaskDisplay from "./CompleteTaskDisplay"
import NewTaskDisplay from "./NewTaskDisplay"

const EmployeeDisplay = (props) => {
    const [activeTab, setActiveTab] = useState("TaskOverview")

    const renderTab = () => {
        switch (activeTab) {
            case "FailedTaskDisplay":
                return <FailedTaskDisplay userData={props.userData} />
            case "CompleteTaskDisplay":
                return <CompleteTaskDisplay userData={props.userData} />
            case "AcceptTaskDisplay":
                return <AcceptTaskDisplay userData={props.userData} />
            case "TaskOverview":
                return <TaskOverview userData={props.userData} />
            case "NewTaskDisplay":
                return <NewTaskDisplay userData={props.userData} />
        }
    }

    return (
        <div className='flex'>
            <div className='bg-[#1f262d] h-[calc(100vh_-_5rem)] w-2/12 overflow-hidden'>
                <div className={`duration-100 hover:scale-105 text-white h-16 flex items-center text-left px-8 gap-4 cursor-pointer hover:bg-[#27a9e3] ${activeTab == "TaskOverview" ? "bg-[#27a9e3] scale-105" : ""}`} onClick={() => { setActiveTab("TaskOverview") }}><img src="EmployeeOverviewTask.svg" alt="overview" />Overview Task</div>
                <div className={`duration-100 hover:scale-105 text-white h-16 flex items-center text-left px-8 gap-4 cursor-pointer hover:bg-[#27a9e3] ${activeTab == "NewTaskDisplay" ? "bg-[#27a9e3] scale-105" : ""}`} onClick={() => { setActiveTab("NewTaskDisplay") }}><img src="EmployeeNewTask.svg" alt="new" />New Task</div>
                <div className={`duration-100 hover:scale-105 text-white h-16 flex items-center text-left px-8 gap-4 cursor-pointer hover:bg-[#27a9e3] ${activeTab == "AcceptTaskDisplay" ? "bg-[#27a9e3] scale-105" : ""}`} onClick={() => { setActiveTab("AcceptTaskDisplay") }}><img src="EmployeeAcceptTask.svg" alt="accepted" />Accepted Task</div>
                <div className={`duration-100 hover:scale-105 text-white h-16 flex items-center text-left px-8 gap-4 cursor-pointer hover:bg-[#27a9e3] ${activeTab == "CompleteTaskDisplay" ? "bg-[#27a9e3] scale-105" : ""}`} onClick={() => { setActiveTab("CompleteTaskDisplay") }}><img src="EmployeeCompletedTask.svg" alt="completed" />Completed Task</div>
                <div className={`duration-100 hover:scale-105 text-white h-16 flex items-center text-left px-8 gap-4 cursor-pointer hover:bg-[#27a9e3] ${activeTab == "FailedTaskDisplay" ? "bg-[#27a9e3] scale-105" : ""}`} onClick={() => { setActiveTab("FailedTaskDisplay") }}><img src="EmployeeFailedTask.svg" alt="failed" />Failed Task</div>
            </div>
            <div className='bg-[#ebebeb] flex-1'>
                {renderTab()}
            </div>
        </div>
    )
}

export default EmployeeDisplay

