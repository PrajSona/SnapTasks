import React, { useContext, useEffect, useState } from 'react';
import { Data } from "../../Context/DataProvider";

const CreateTask = () => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [taskCategory, setTaskCategory] = useState('');
  const [selectedMember, setSelectedMember] = useState('');
  const [taskDesc, setTaskDesc] = useState('');

  const { getAllData, getIdByName, getUserDetails, createTask } = useContext(Data);

  const [allData, setAllData] = useState(null);
  const [memberId, setMemberId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getAllData();
      setAllData(result);
    };

    fetchData();
  }, [getAllData]);

  useEffect(() => {
    const fetchMemberId = async () => {
      if (selectedMember) {
        const id = await getIdByName(selectedMember);
        setMemberId(id);
      }
    };

    fetchMemberId();
  }, [selectedMember, getIdByName]);

  const allNames = allData?.map((e) => e.name) || [];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTaskDetails = {
      active: false,
      newTask: true,
      completed: false,
      failed: false,
      taskTitle: taskTitle,
      taskDescription: taskDesc,
      taskDate: taskDate,
      category: taskCategory
    };

    if (memberId) {
      createTask(memberId, newTaskDetails);
      alert("Task created successfully!");

      // Optional: reset form
      setTaskTitle('');
      setTaskDate('');
      setTaskCategory('');
      setTaskDesc('');
      setSelectedMember('');
    } else {
      alert("Please select a valid member.");
    }
  };

  return (
    <div className='bg-transparent w-full flex justify-center items-center py-16'>
      <div className='bg-[#ffffff] shadow-xl w-10/12 rounded-lg flex flex-col p-9 gap-8'>
        <div className='text-3xl'>Create Task</div>
        <form onSubmit={handleSubmit} className='flex gap-9'>
          <div className='w-1/2 flex flex-col gap-5'>
            <div>
              <h1>Task Title</h1>
              <input
                type="text"
                required
                value={taskTitle}
                onChange={e => setTaskTitle(e.target.value)}
                placeholder='Enter task Title'
                className='w-full border shadow-sm border-[#c4b199] p-1.5 outline-none'
              />
            </div>
            <div>
              <h1>Date</h1>
              <input
                type="date"
                required
                value={taskDate}
                onChange={e => setTaskDate(e.target.value)}
                className='w-full border border-[#c4b199] shadow-sm p-1.5 outline-none'
              />
            </div>
            <div>
              <h1>Assign to</h1>
              <select
                required
                value={selectedMember}
                onChange={e => setSelectedMember(e.target.value)}
                className='w-full shadow-sm border border-[#c4b199] p-1.5 outline-none'
              >
                <option value="" disabled>Select a member</option>
                {allNames.map((e, index) => (
                  <option key={index} value={e}>{e}</option>
                ))}
              </select>
            </div>
            <div>
              <h1>Category</h1>
              <input
                type="text"
                required
                value={taskCategory}
                onChange={e => setTaskCategory(e.target.value)}
                placeholder='Enter task category'
                className='w-full border shadow-sm border-[#c4b199] p-1.5 outline-none'
              />
            </div>
          </div>
          <div className='w-1/2 flex flex-col'>
            <div className='flex-1'>
              <h1>Description</h1>
              <textarea
                required
                value={taskDesc}
                onChange={e => setTaskDesc(e.target.value)}
                className='w-full h-[80%] border border-[#c4b199] p-1.5 outline-none resize-none shadow-sm'
              ></textarea>
            </div>
            <input
              type="submit"
              value="Create Task"
              className='w-full text-white rounded bg-[#28b779] p-1.5 outline-none shadow-md cursor-pointer'
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;
