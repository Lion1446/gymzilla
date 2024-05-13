import React, { useState } from 'react';
import SearchMember from './SearchMember';
import { useNavigate } from 'react-router-dom';

export default function Modal({ members, reloadData }) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  const createAttendance = async newAttendance => {
    await fetch('/api/logs', {
      method: 'POST',
      headers: { 'Content-Type': 'applications/json' },
      body: JSON.stringify(newAttendance),
    });
    return;
  };

  const handleModalClose = log => {
    setShowModal(false);
    if (log) {
      console.log(selectedMember);
      const newAttendance = {
        idNumber: selectedMember.id,
        datetimeLogged: new Date().toISOString().slice(0, -5) + 'Z',
      };
      createAttendance(newAttendance);
      navigate(0);
    } else {
      console.log('Do nothing');
    }
  };

  const handleSelectedMember = loggedMember => {
    setSelectedMember(loggedMember);
  };

  return (
    <>
      <button
        style={{
          color: 'white',
          backgroundColor: '#D32029',
          padding: '8px 16px',
          width: '240px',
          height: '40px',
          textAlign: 'center',
        }}
        onClick={() => setShowModal(true)}
      >
        Add New Attendance
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Add New Attendance</h3>
                </div>
                {/*body*/}
                <div
                  className="relative p-6 flex-auto overflow-y-auto"
                  style={{ minHeight: '50vh', maxHeight: '80vh' }}
                >
                  <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                    To log your attendance, type in the name in the search bar.
                  </p>
                  <SearchMember
                    memberData={members}
                    onSelect={handleSelectedMember}
                  />
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-[#ACACAC] background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      handleModalClose(false);
                    }}
                  >
                    Close
                  </button>
                  <button
                    className="bg-[#D32029] text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      handleModalClose(true);
                    }}
                  >
                    Log Attendance
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
