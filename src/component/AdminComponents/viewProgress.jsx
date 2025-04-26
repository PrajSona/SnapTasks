import React, { useContext, useEffect, useState } from 'react';
import { Data } from "../../Context/DataProvider";

const viewProgress = () => {
  const { getAllData, getIdByName, getUserDetails } = useContext(Data);
  const [allData, setAllData] = useState(null);
  const [selectedMember, setSelectedMember] = useState('');
  const [memberId, setMemberId] = useState(null);
  const [userData, setUserData] = useState(null);

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

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (memberId) {
        const data = await getUserDetails(memberId);
        setUserData(data);
      }
    };
    fetchUserDetails();
  }, [memberId, getUserDetails]);

  let allNames = []
  allData?.map((e) => {
    allNames.push(e.name)
  })

  return (
    <div className='bg-transparent w-full flex justify-center items-center py-16'>
      <div className='w-2/3 rounded-lg flex flex-col gap-7'>
        <div className='flex shadow-xl bg-[#ffffff] p-7 rounded-md'>
          <div className='text-lg'>Search Employee</div>
          <select value={selectedMember} onChange={(e) => {
            setSelectedMember(e.target.value)
          }} className='w-full border border-[#c4b199] p-1.5 outline-none shadow-sm'>
            <option value="" disabled>Select a member</option>
            {
              allNames.map((e, index) => (
                <option key={index} value={e}>{e}</option>
              ))
            }

          </select>
        </div>
        {
          userData ? (
            <div className='flex flex-col gap-7 shadow-xl bg-[#ffffff] p-7 rounded-md'>
              <div className='flex flex-col gap-2'>
                <h1 className='text-2xl'>{userData?.name}</h1>
                <h1>ID: {userData?.id}</h1>
              </div>
              <div className='flex gap-4'>
                <div className='duration-100 hover:scale-105 w-1/4 shadow-xl bg-[#F4A300] text-white rounded-lg h-40 flex flex-col items-center justify-center gap-6'>
                  <div className='text-xl'>New Task</div>
                  <div className='text-3xl'>{userData?.taskCounts?.newTask}</div>
                </div>
                <div className='duration-100 hover:scale-105 w-1/4 shadow-xl bg-[#27C27D] text-white rounded-lg h-40 flex flex-col items-center justify-center gap-6'>
                  <div className='text-xl'>Completed Task</div>
                  <div className='text-3xl'>{userData?.taskCounts?.completed}</div>
                </div>
                <div className='duration-100 hover:scale-105 w-1/4 shadow-xl bg-[#20CFCF] text-white rounded-lg h-40 flex flex-col items-center justify-center gap-6'>
                  <div className='text-xl'>Accepted Task</div>
                  <div className='text-3xl'>{userData?.taskCounts?.active}</div>
                </div>
                <div className='duration-100 hover:scale-105 w-1/4 shadow-xl bg-[#F44336] text-white rounded-lg h-40 flex flex-col items-center justify-center gap-6'>
                  <div className='text-xl'>Failed Task</div>
                  <div className='text-3xl'>{userData?.taskCounts?.failed}</div>
                </div>
              </div>
            </div>
          ) : (
            <div className='text-center text-xl text-gray-500'>Select a member</div>
          )
        }

      </div>
    </div>
  )
}

export default viewProgress