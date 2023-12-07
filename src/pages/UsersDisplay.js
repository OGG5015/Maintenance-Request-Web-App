import React from 'react'
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react"
import Axios from 'axios'


const UsersDisplay = (props) => {
    const navigate = useNavigate();
    const [listOfUsers, setListOfUsers] = useState([]);


    const fetchData = async () => {
        try {
          const response = await Axios.get('http://localhost:3001/getUsers/');
          setListOfUsers(response.data);
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      };

    useEffect(() => {
        fetchData();
      }, []);


    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isTerminateModalOpen, setIsTerminateModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isConfirmationChecked, setIsConfirmationChecked] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Axios.get('http://localhost:3001/getUsers/');
                setListOfUsers(response.data);
            } catch (error) {
                console.error('Error fetching maintenance requests:', error);
            }
        };

        fetchData();
    }, []);

    const openEditModal = (user) => {
        setSelectedUser(user);
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setSelectedUser(null);
        setIsEditModalOpen(false);
    };

    const openTerminateModal = (user) => {
        setSelectedUser(user);
        setIsTerminateModalOpen(true);
    };

    const closeTerminateModal = () => {
        setSelectedUser(null);
        setIsTerminateModalOpen(false);
    };

    const handleConfirmationChange = () => {
        setIsConfirmationChecked(!isConfirmationChecked);
    };

    const terminateUser = async () => {
        if (isConfirmationChecked) {
            try {
                await Axios.delete(`http://localhost:3001/deleteUser/${selectedUser._id}`);
                fetchData();
                closeTerminateModal();
            } catch (error) {
                console.error('Error terminating user:', error);
            }
        } else {
            console.error('Please confirm before terminating the user.');
        }
    };


    const [editedPhoneNumber, setEditedPhoneNumber] = useState('');
    const [editedEmail, setEditedEmail] = useState('');
    const [editedApartmentNumber, setEditedApartmentNumber] = useState('');

    const handlePhoneNumberChange = (event) => {
        setEditedPhoneNumber(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEditedEmail(event.target.value);
    };

    const handleApartmentNumberChange = (event) => {
        setEditedApartmentNumber(event.target.value);
    };

    /*const saveChanges = async () => {
        try {
            await Axios.put(`http://localhost:3001/updateUser/${selectedUser._id}`, {
                phonenumber: editedPhoneNumber,
                email: editedEmail,
                apartmentnumber: editedApartmentNumber,
            });

            // Refresh the list of users after updating
            fetchData();
            closeEditModal();
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };*/

    const saveChanges = async () => {
        try {
            const updatedUser = {};
            
            if (editedPhoneNumber !== '') {
                updatedUser.phonenumber = editedPhoneNumber;
            }

            if (editedEmail !== '') {
                updatedUser.email = editedEmail;
            }

            if (editedApartmentNumber !== '') {
                updatedUser.apartmentnumber = editedApartmentNumber;
            }

            await Axios.put(`http://localhost:3001/updateUser/${selectedUser._id}`, updatedUser);

            fetchData();
            closeEditModal();
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return (

        <div className='users-page'>
            <nav className='navMenu'>
                <div>
                    <a href='/CreateTenant'>Create Tenant Account</a>
                    {/*<a href='/CreateTenant'>Create Tenant</a>*/}
                    <a href='/'> Logout</a>
                </div>

            </nav>

            
            <div className='display-table'>
            <h1>Here are the users</h1>
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
                                {/*<th>User type</th>*/}
                                <th>Functions</th>
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
                                    {/*<td>{users.usertype}</td>*/}
                                    <td>
                                        <button onClick={() => openEditModal(users)}>Edit</button>
                                        <button onClick={() => openTerminateModal(users)}>Terminate User</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>


            {isEditModalOpen && (
                <div className="edit-modal-overlay">
                    <div className="edit-modal">
                        <h2>Edit User</h2>
                        <p>ID: {selectedUser._id}</p>
                        <label>
                            Phone Number:
                            <input
                                type="text"
                                placeholder={selectedUser.phonenumber}
                                value={editedPhoneNumber}
                                onChange={handlePhoneNumberChange}
                            />
                        </label>
                        <label>
                            Email:
                            <input
                                type="text"
                                placeholder={selectedUser.email}
                                value={editedEmail}
                                onChange={handleEmailChange}                            />
                        </label>
                        <label>
                            Apartment Number:
                            <input
                                type="text"
                                placeholder={selectedUser.apartmentnumber}
                                value={editedApartmentNumber}
                                onChange={handleApartmentNumberChange}                            />
                        </label>
                        <button onClick={closeEditModal}>Cancel</button>
                        <button onClick = {saveChanges}>Save Changes</button>
                    </div>
                </div>
            )}

            {isTerminateModalOpen && (
                <div className="edit-modal-overlay">
                    <div className="edit-modal">
                        <h2>Terminate User</h2>
                        <p>ID: {selectedUser._id}</p>
                        <label>
                            Yes, Confirm
                            <input type="checkbox" checked={isConfirmationChecked} onChange={handleConfirmationChange} />
                        </label>
                        <button onClick={closeTerminateModal}>Cancel</button>
                        <button onClick={terminateUser}>Terminate</button>
                    </div>
                </div>
            )}


        </div>
    )
}

export default UsersDisplay