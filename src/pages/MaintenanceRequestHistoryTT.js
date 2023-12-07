import React from 'react'
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react"
import Axios from 'axios'


const MaintenanceRequestHistoryTT = (props) => {
    const navigate = useNavigate();
    const [listOfRequests, setListOfRequests] = useState([]);

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
    }, []);

    const completedRequests = listOfRequests.filter(
        (maintenanceRequest) => maintenanceRequest.status === 'Complete' && maintenanceRequest.apartmentnumber === 23
    );

    return (

        <div>
            <nav className='navMenu'>
                <div>
                    <a href='/MaintenanceRequestHistory'>History</a>
                    <a href='/MaintenanceRequestsTT'> Current Maintenance Requests</a>
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
                        {completedRequests.map((maintenanceRequest) => (
                                <tr key={maintenanceRequest._id}>
                                    <td>{maintenanceRequest._id}</td>
                                    <td>{maintenanceRequest.apartmentnumber}</td>
                                    <td>{maintenanceRequest.problemarea}</td>
                                    <td>{maintenanceRequest.description}</td>
                                    <td>{maintenanceRequest.datetime}</td>
                                    <td><img src='maintenanceRequest.problemimage' alt='Problem'></img></td>
                                    <td>{maintenanceRequest.status}</td>
                                </tr>
                            /*{listOfRequests.map((maintenanceRequest) => (
                                <tr key={maintenanceRequest.id}>
                                    <td>{maintenanceRequest._id}</td>
                                    <td>{maintenanceRequest.apartmentnumber}</td>
                                    <td>{maintenanceRequest.problemarea}</td>
                                    <td>{maintenanceRequest.description}</td>
                                    <td>{maintenanceRequest.datetime}</td>
                                    <td><img src='maintenanceRequest.problemimage'></img></td>
                                    <td>{maintenanceRequest.status}</td>
                                </tr>*/
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )
}

export default MaintenanceRequestHistoryTT