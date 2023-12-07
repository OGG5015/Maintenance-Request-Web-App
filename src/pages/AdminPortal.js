import React from 'react';
import { Link } from 'react-router-dom';

const AdminPortal = () => {
  return (
    <div className='admindashcontainter'>
      <h1>Admin Dashboard</h1>

      <div className='adminuserssection'>
        <h2>View Users</h2>
        <p>View and manage user accounts.</p>
        <Link to="/UsersDisplay">Go to View Users</Link>
      </div>

      <div className='adminmrsection'>
        <h2>View Maintenance Requests</h2>
        <p>View and manage maintenance requests.</p>
        <Link to="/MaintenanceRequests">Go to Maintenance Requests</Link>
      </div>

      <div className = 'adminbottomsection'>
        <h2>Not Yet Determined</h2>
        <p>This section is not yet determined.</p>
        <Link to="/admin/not-yet-determined">Explore</Link>
      </div>
    </div>
  );
};

export default AdminPortal;