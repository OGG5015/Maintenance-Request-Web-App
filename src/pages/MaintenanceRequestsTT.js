import React from 'react'
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react"
import Axios from 'axios'


const MaintenanceRequestsTT = (props) => {
    const navigate = useNavigate();
    const [listOfRequests, setListOfRequests] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {

                const apartmentNumber = 2;
                const response = await Axios.get(`http://localhost:3001/getMaintenanceRequestsByApartment/${apartmentNumber}`)
                // Make a GET request to the maintenance requests endpoint
                //const response = await Axios.get('http://localhost:3001/getMaintenanceRequests/');

                // Update the state with the fetched data
                setListOfRequests(response.data);
            } catch (error) {
                // Handle error, for example, log it or show a user-friendly message
                console.error('Error fetching maintenance requests:', error);
            }
        };

        // Call the fetchData function when the component mounts
        fetchData();
    }, []);

    return (

        <div>
            <nav className='navMenu'>
                <div>
                <a href='/CreateMaintenanceRequest'>Create Maintenance Request</a>
                    <a href='/'> Logout</a>
                </div>

            </nav>

            <h1>Here are the maintenance requests</h1>
            <div className='MaintenanceRequests'>
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
                            {listOfRequests.map((maintenanceRequest) => (
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