import React from 'react';
import './Project.css';
import Avatar from '../../components/Avatar';
import { useFirestore } from '../../hooks/useFirestore';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useHistory } from 'react-router-dom';

export default function ProjectSummary({ project }) {
  const { deleteDocument } = useFirestore('projects');
  const history = useHistory();
  const { user } = useAuthContext();
  const handleClick = (e) => {
    deleteDocument(project.id);
    history.push('/');
  };
  return (
    <div>
      <div className="project-summary">
        <h2 className="project-title">{project.name}</h2>
        <p>By {project.createdBy.displayName}</p>
        <p className="due-date">
          Project due by {project.dueDate.toDate().toDateString()}
        </p>
        <p className="details">{project.details}</p>
        <h4>Project is assigned to:</h4>
        <div className="assigned-users">
          {project.assignedUsersList.map((user) => (
            <div key={user.id}>
              <Avatar src={user.photoURL} />
            </div>
          ))}
        </div>
      </div>
      {user.uid === project.createdBy.id && (
        <button className="btn" onClick={handleClick}>
          Mark as Complete
        </button>
      )}
    </div>
  );
}
