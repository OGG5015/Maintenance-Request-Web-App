import React from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react"
import Axios from 'axios'
import { useParams } from "react-router-dom";


const MaintenanceRequestsTT = (props) => {
    const navigate = useNavigate();
    const [listOfRequests, setListOfRequests] = useState([]);
    const location = useLocation();

      useEffect(() => {
        const fetchData = async () => {
          try {
            const userID = localStorage.getItem('userID');
    
            if (!userID) {
              navigate('/');
              return;
            }
            
    
            const response = await Axios.get(`http://localhost:3001/getMaintenanceRequestsByUserid/${userID}`);
    
            setListOfRequests(response.data);
          } catch (error) {
            console.error('Error fetching maintenance requests:', error);
          }
        };
    
        fetchData();
      }, [navigate]);

      const pendingRequests = listOfRequests.filter(
        (maintenanceRequest) => maintenanceRequest.status === 'Pending'
    );

    return (

        <div>
            <nav className='navMenu'>
                <div>
                    <a href='/CreateMaintenanceRequest'>Create Maintenance Request</a>
                    <a href = '/MaintenanceRequestHistoryTT'>Maintenance Request History</a>
                    <a href='/'> Logout</a>
                </div>

            </nav>

            
            <div className='MaintenanceRequests'>
            <h1>Here are the maintenance requests</h1>
                <div>
                    <table className="maintenanceRequestDisplay">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Apartment Number</th>
                                <th>Problem Area</th>
                                <th>Description</th>
                                <th>Date and Time</th>
                                <th>Problem Image</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pendingRequests.map((maintenanceRequest) => (
                                <tr key={maintenanceRequest.id}>
                                    <td>{maintenanceRequest._id}</td>
                                    <td>{maintenanceRequest.apartmentnumber}</td>
                                    <td>{maintenanceRequest.problemarea}</td>
                                    <td>{maintenanceRequest.description}</td>
                                    <td>{maintenanceRequest.datetime}</td>
                                    <td><img src='maintenanceRequest.problemimage'></img></td>
                                    <td>{maintenanceRequest.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )
}

export default MaintenanceRequestsTT