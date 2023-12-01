import React from 'react'
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react"
import Axios from 'axios'
//import Modal from 'react-modal';


const MaintenanceRequestsMT = (props) => {
    const navigate = useNavigate();
    const [listOfRequests, setListOfRequests] = useState([]);
    const [selectedRequestId, setSelectedRequestId] = useState(null);

    const [apartmentNumberFilter, setApartmentNumberFilter] = useState(null);
    const [areaFilter, setAreaFilter] = useState(null);
    const [startDateFilter, setStartDateFilter] = useState(null);
    const [endDateFilter, setEndDateFilter] = useState(null);
    const [statusFilter, setStatusFilter] = useState(null);
    //const [modalIsOpen, setModalIsOpen] = useState(false);

    /*useEffect(() => {
        const fetchData = async () => {
            try {

                //const apartmentNumber = 14;
                //const response = await Axios.get(`http://localhost:3001/getMaintenanceRequestsByApartment/${apartmentNumber}`)
                // Make a GET request to the maintenance requests endpoint
                const response = await Axios.get('http://localhost:3001/getMaintenanceRequests/');

                // Update the state with the fetched data
                setListOfRequests(response.data);
            } catch (error) {
                // Handle error, for example, log it or show a user-friendly message
                console.error('Error fetching maintenance requests:', error);
            }
        };

        // Call the fetchData function when the component mounts
        fetchData();
    }, []);*/

    useEffect(() => {
        const fetchData = async () => {
            try {
                let url = 'http://localhost:3001/getMaintenanceRequests/';

                if (apartmentNumberFilter) {
                    url += `byApartment/${apartmentNumberFilter}`;
                } else if (areaFilter) {
                    url += `byArea/${areaFilter}`;
                } else if (startDateFilter && endDateFilter) {
                    url += `byDateRange/${startDateFilter}/${endDateFilter}`;
                } else if (statusFilter) {
                    url += `byStatus/${statusFilter}`;
                }

                const response = await Axios.get(url);
                setListOfRequests(response.data);
            } catch (error) {
                console.error('Error fetching maintenance requests:', error);
            }
        };

        fetchData();
    }, [apartmentNumberFilter, areaFilter, startDateFilter, endDateFilter, statusFilter]);



    const markAsComplete = async (id) => {
        try {
            // Send a PUT request to update the status to "Complete"
            await Axios.put(`http://localhost:3001/updateMaintenanceRequestStatus/${id}`, {
                status: 'Complete',
            });

            // Update the local state to reflect the change
            setListOfRequests((prevRequests) =>
                prevRequests.map((request) =>
                    request._id === id ? { ...request, status: 'Complete' } : request
                )
            );
        } catch (error) {
            console.error('Error marking maintenance request as complete:', error);
        }
    };

    const confirmMarkAsComplete = async () => {
        try {
            // Send a PUT request to update the status to "Complete"
            await Axios.put(`http://localhost:3001/updateMaintenanceRequestStatus/${selectedRequestId}`, {
                status: 'Complete',
            });

            // Update the local state to reflect the change
            setListOfRequests((prevRequests) =>
                prevRequests.map((request) =>
                    request._id === selectedRequestId ? { ...request, status: 'Complete' } : request
                )
            );

            // Close the modal after marking as complete
            //setModalIsOpen(false);
        } catch (error) {
            console.error('Error marking maintenance request as complete:', error);
        }
    };

    /*const closeModal = () => {
        // Close the modal without marking as complete
        setModalIsOpen(false);
    };*/

    const pendingRequests = listOfRequests.filter(
        (maintenanceRequest) => maintenanceRequest.status === 'Pending'
    );

    return (

        <div>
            <nav className='navMenu'>
                <div>
                    <a href='/MaintenanceRequestHistory'>History</a>
                    <a href='/'> Logout</a>
                </div>

            </nav>

            <h1>Here are the maintenance requests</h1>
            <div className='MaintenanceRequests'>
                <div>
                <div>
                    <label>
                        Apartment Number:
                        <input
                            type='text'
                            value={apartmentNumberFilter || ''}
                            onChange={(e) => setApartmentNumberFilter(e.target.value)}
                        />
                    </label>
                    <label>
                        Area:
                        <input
                            type='text'
                            value={areaFilter || ''}
                            onChange={(e) => setAreaFilter(e.target.value)}
                        />
                    </label>
                    <label>
                        Start Date:
                        <input
                            type='date'
                            value={startDateFilter || ''}
                            onChange={(e) => setStartDateFilter(e.target.value)}
                        />
                    </label>
                    <label>
                        End Date:
                        <input
                            type='date'
                            value={endDateFilter || ''}
                            onChange={(e) => setEndDateFilter(e.target.value)}
                        />
                    </label>
                    <label>
                        Status:
                        <input
                            type='text'
                            value={statusFilter || ''}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        />
                    </label>
                </div>
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
                                <th>Edit</th>
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
                                <td>
                                    <button onClick={() => markAsComplete(maintenanceRequest._id)}>Mark As Complete</button>
                                </td>
                            </tr>
                            ))}
                            {/*{listOfRequests.map((maintenanceRequest) => (
                                <tr key={maintenanceRequest.id}>
                                    <td>{maintenanceRequest._id}</td>
                                    <td>{maintenanceRequest.apartmentnumber}</td>
                                    <td>{maintenanceRequest.problemarea}</td>
                                    <td>{maintenanceRequest.description}</td>
                                    <td>{maintenanceRequest.datetime}</td>
                                    <td><img src='maintenanceRequest.problemimage'></img></td>
                                    <td>{maintenanceRequest.status}</td>
                                    <td>
                                        <button onClick={() => markAsComplete(maintenanceRequest._id)}>Mark As Complete</button>
                                    </td>
                                </tr>
                            ))}*/}
                        </tbody>
                       {/*} <Modal
                            isOpen={modalIsOpen}
                            onRequestClose={closeModal}
                            contentLabel="Confirm Mark as Complete"
                        >
                            <p>Are you sure you want to mark this as complete? (This action cannot be undone)</p>
                            <label>
                                <input type="checkbox" onChange={confirmMarkAsComplete} />
                                Confirm
                            </label>
                            <button onClick={confirmMarkAsComplete}>OK</button>
                            <button onClick={closeModal}>Cancel</button>
                        </Modal> */}
                    </table>
                </div>
            </div>

        </div>
    )
}

export default MaintenanceRequestsMT