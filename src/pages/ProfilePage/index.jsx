import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import ProfileBox from '../../components/ProfileBox';
import PTOCalendar from '../../components/PTOCalendar';

function ProfilePage() {
  const [username, setUsername] = useState('');
  return (
    <div className="h-screen flex flex-col bg-gray">
      <Navbar />
      <div className="flex flex-1 justify-center flex-col bg-gray-200">
        <div className="flex h-auto">
          <div className="flex  bg-white basis-1/2 m-10 shadow-lg">
            <ProfileBox setUsername={setUsername} username={username} />
          </div>
          <div className="bg-white basis-1/2 m-10 px-6 shadow-lg">
            <p className="text-3xl my-5 text-[#040b81] font-bold">PTO Calendar</p>
            <div className="mb-5">
              <PTOCalendar username={username} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
