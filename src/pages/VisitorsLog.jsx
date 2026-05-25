import React from 'react';

const VisitorsLog = () => {
  const allUsers = JSON.parse(localStorage.getItem('userList')) || [];

  return (
    <div style={{ padding: '20px' }}>
      <h2>Visitors Log</h2>
      <ul>
        {allUsers.map((user, index) => (
          <li key={index}>👤 {user.username}</li>
        ))}
      </ul>
    </div>
  );
};

export default VisitorsLog;
