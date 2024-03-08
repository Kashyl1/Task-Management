import React from 'react';
import TaskFormAdd from './TaskFormAdd';
import TasksList from './TasksList';
import ProfileImage from './ProfileImage';

const DashboardPage = ({ refreshUserData, userData, shouldRefreshTasks, setShouldRefreshTasks  }) => {
  return (
    <div>
      <TaskFormAdd onSuccess={() => setShouldRefreshTasks(prev => !prev)} />
      <TasksList shouldRefreshTasks={shouldRefreshTasks} />
      <ProfileImage imageUrl={userData.profileImageUrl} firstname={userData.firstname} lastname={userData.lastname} onSuccess={refreshUserData} />
    </div>
  );
};

export default DashboardPage;
