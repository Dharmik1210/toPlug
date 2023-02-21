//style and images
import { NavLink } from 'react-router-dom';
import './Sidebar.css';
import Avatar from './Avatar';
import { useAuthContext } from '../hooks/useAuthContext';
import DashboardIcon from '../assets/dashboard_icon.svg';
import AddIcon from '../assets/add_icon.svg';

import React from 'react';

//Navlink is used bcoz it gives us active class which can be used in css styling
export default function Sidebar() {
  const { user } = useAuthContext();
  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <div className="user">
          <Avatar src={user.photoURL} />
          <p>Hey {user.displayName}</p>
        </div>
        <nav className="links">
          <ul>
            <li>
              <NavLink exact to="/">
                <img src={DashboardIcon} alt="dashboard icon" />
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/create">
                <img src={AddIcon} alt="add icon" />
                <span>New Project</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
