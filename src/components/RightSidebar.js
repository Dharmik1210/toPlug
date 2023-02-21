import './RightSidebar.css';
import { useCollection } from '../hooks/useCollection';
import React from 'react';
import Avatar from './Avatar';

export default function RightSidebar() {
  const { isPending, error, documents } = useCollection('users');
  return (
    <div className="user-list">
      <h2>All users</h2>
      {isPending && <div>Loading Users...</div>}
      {error && <div className="error">{error}</div>}
      {documents &&
        documents.map((user) => (
          <div key={user.id} className="user-list-item">
            {user.online && <span className="online-user"></span>}
            <span>{user.displayName}</span>
            <Avatar src={user.photoURL} />
          </div>
        ))}
    </div>
  );
}
