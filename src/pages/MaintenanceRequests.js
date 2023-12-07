import React from 'react'
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react"
import Axios from 'axios'
import { useCookies } from 'react-cookie'



const MaintenanceRequests = (props) => {
    const navigate = useNavigate();
    const [listOfRequests, setListOfRequests] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {

                //const apartmentNumber = 14;
                //const response = await Axios.get(`http://localhost:3001/getMaintenanceRequestsByApartment/${apartmentNumber}`)
                const response = await Axios.get('http://localhost:3001/getMaintenanceRequests/');

                setListOfRequests(response.data);
            } catch (error) {
                console.error('Error fetching maintenance requests:', error);
            }
        };

        fetchData();
    }, []);

    const [_, setCookies] = useCookies(["access_token"])

    const logout = () =>{
        setCookies("access_token", "")
        window.localStorage.removeItem("userID")
        navigate("/")
      }

    return (

        <div>
            <nav className='navMenu'>
                <div>
                    <a href='/MaintenanceRequestHistory'>History</a>
                    <a href='/CreateTenant'>Create a Tenant</a>
                    <a onClick = {logout} /*href='/'*/> Logout</a>
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

export default MaintenanceRequests