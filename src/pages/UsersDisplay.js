import React from 'react'
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react"
import Axios from 'axios'


const UsersDisplay = (props) => {
    const navigate = useNavigate();
    const [listOfUsers, setListOfUsers] = useState([]);

   useEffect(() => {
        const fetchData = async () => {
            try {

                // Make a GET request to the maintenance requests endpoint
                const response = await Axios.get('http://localhost:3001/getUsers/');

                // Update the state with the fetched data
                setListOfUsers(response.data);
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
                    <a href='pages/CreateTenant'>Create Tenant</a>
                    <a href='/'> Logout</a>
                </div>

            </nav>

            <h1>Here are the users</h1>
            <div className='MaintenanceRequests'>
                <div>
                    <table className="maintenanceRequestDisplay">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Phone Number</th>
                                <th>Email</th>
                                <th>Apartment Number</th>
                                <th>Check-In Date</th>
                                <th>Check-Out Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listOfUsers.map((users) => (
                                <tr key={users.id}>
                                    <td>{users._id}</td>
                                    <td>{users.name}</td>
                                    <td>{users.phonenumber}</td>
                                    <td>{users.email}</td>
                                    <td>{users.apartmentnumber}</td>
                                    <td>{users.checkindate}</td>
                                    <td>{users.checkoutdate}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )
}

export default UsersDisplay