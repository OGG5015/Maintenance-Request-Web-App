import React from 'react'
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react"
import Axios from 'axios'


const MaintenanceRequestsMT = (props) => {
    const navigate = useNavigate();
    const [listOfRequests, setListOfRequests] = useState([]);
    const [selectedRequestId, setSelectedRequestId] = useState(null);
    const [isConfirmationChecked, setIsConfirmationChecked] = useState(false);


    const [apartmentNumberFilter, setApartmentNumberFilter] = useState(null);
    const [areaFilter, setAreaFilter] = useState('');
    const [startDateFilter, setStartDateFilter] = useState(null);
    const [endDateFilter, setEndDateFilter] = useState(null);
    const [statusFilter, setStatusFilter] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {

                const response = await Axios.get('http://localhost:3001/getMaintenanceRequests/');

                setListOfRequests(response.data);
            } catch (error) {
                console.error('Error fetching maintenance requests:', error);
            }
        };

        fetchData();
    }, []);


    /*const markAsComplete = async (id) => {
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
    };*/
    const markAsComplete = async (id) => {
        setSelectedRequestId(id);
    };

    const handleConfirmationChange = () => {
        setIsConfirmationChecked(!isConfirmationChecked);
    };

    const confirmMarkAsComplete = async (id) => {

        const isConfirmationChecked = document.getElementById('confirmationCheckbox').checked;

        if (isConfirmationChecked) {


            try {
                await Axios.put(`http://localhost:3001/updateMaintenanceRequestStatus/${selectedRequestId}`, {
                    status: 'Complete',
                });

                setListOfRequests((prevRequests) =>
                    prevRequests.map((request) =>
                        request._id === selectedRequestId ? { ...request, status: 'Complete' } : request
                    )
                );

                setSelectedRequestId(null);
                closeConfirmModal();
            } catch (error) {
                console.error('Error marking maintenance request as complete:', error.response.data);
            }
        } else {
            console.error('Please confirm before saving changes.');
        }

    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openConfirmModal = (maintenanceRequest) => {
        setSelectedRequestId(maintenanceRequest);
        setIsModalOpen(true);
    };

    const closeConfirmModal = () => {
        setSelectedRequestId(null);
        setIsModalOpen(false);
    };

    /*const closeModal = () => {
        // Close the modal without marking as complete
        setModalIsOpen(false);
    };*/

    const pendingRequests = listOfRequests.filter(
        (maintenanceRequest) => maintenanceRequest.status === 'Pending'
    );

    /*const filteredRequests = listOfRequests.filter((maintenanceRequest) =>{
        const status = maintenanceRequest.status ==='Pending'
        const apartmentMatch = maintenanceRequest.apartmentnumber && maintenanceRequest.apartmentnumber.toString().includes(apartmentNumberFilter);
        const areaMatch = maintenanceRequest.problemarea && maintenanceRequest.problemarea.toLowerCase().includes(areaFilter);
        
        return(
            status && (apartmentMatch || areaMatch ||!apartmentNumberFilter || !areaFilter)
        );
    })*/

    const filteredRequests = pendingRequests.filter((maintenanceRequest) => {
        const apartmentMatch = maintenanceRequest.apartmentnumber && maintenanceRequest.apartmentnumber.includes(apartmentNumberFilter)
        //const areaMatch = maintenanceRequest.problemarea && maintenanceRequest.problemarea.toLowerCase().includes(areaFilter.toLowerCase())


        /*return(
            
            apartmentMatch || areaMatch || !apartmentNumberFilter || !areaFilter
        )*/

        return (
            apartmentMatch || !apartmentNumberFilter
        )
    })

    const filteredRequests2 = filteredRequests.filter((maintenanceRequest) => {
        const areaMatch = maintenanceRequest.problemarea && maintenanceRequest.problemarea.toLowerCase().includes(areaFilter.toLowerCase())


        return (
            areaMatch || !areaFilter
        )
    })

    const filteredRequests3 = filteredRequests2.filter((maintenanceRequest) => {
        const startDateMatch = !startDateFilter || maintenanceRequest.datetime >= startDateFilter;
        const endDateMatch = !endDateFilter || maintenanceRequest.datetime <= endDateFilter;
    
        return startDateMatch && endDateMatch;
    });

    const handleApartmentFilter = (event) => {
        setApartmentNumberFilter(event.target.value)
    }

    const handleAreaFilter = (event) => {
        setAreaFilter(event.target.value)
    }

    const handleEndDateFilter = (event) =>{
        setEndDateFilter(event.target.value)
    }

    const handleStartDateFilter = (event) => {
        setStartDateFilter(event.target.value)
    }

    return (

        <div>
            <nav className='navMenu'>
                <div>
                    <a href='/MaintenanceRequestHistory'>History</a>
                    <a href='/'> Logout</a>
                </div>
            </nav>

            
            <div className='MaintenanceRequests'>
            <h1>Resident Maintenance Requests</h1>
                <div>
                    <div className='request-filters'>
                        <label>
                            Apartment Number:
                            <input
                                id="apartmentNumberFilter"
                                type='text'
                                value={apartmentNumberFilter}
                                onChange={handleApartmentFilter}
                            />
                        </label>
                        <label>
                            Area:
                            <input
                                id="areaFilter"
                                type='text'
                                value={areaFilter}
                                onChange={handleAreaFilter}
                            />
                        </label>
                        <label>
                            Start Date:
                            <input
                                id="startDateFilter"
                                type='date'
                                value={startDateFilter}
                                onChange={handleStartDateFilter}
                            />
                        </label>
                        <label>
                            End Date:
                            <input
                                id="endDateFilter"
                                type='date'
                                value={endDateFilter || ''}
                                onChange={handleEndDateFilter}
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
                            {filteredRequests3.map((maintenanceRequest) => (
                                <tr key={maintenanceRequest.id}>
                                    <td>{maintenanceRequest._id}</td>
                                    <td>{maintenanceRequest.apartmentnumber}</td>
                                    <td>{maintenanceRequest.problemarea}</td>
                                    <td>{maintenanceRequest.description}</td>
                                    <td>{maintenanceRequest.datetime}</td>
                                    <td><img src='maintenanceRequest.problemimage'></img></td>
                                    <td>{maintenanceRequest.status}</td>
                                    <td>
                                        <button onClick={() => openConfirmModal(maintenanceRequest._id)}>Mark As Complete</button>

                                    </td>
                                </tr>
                            ))}

                        </tbody>

                    </table>
                </div>
            </div>
            {isModalOpen && (
                <div className="confirm-complete-modal-overlay">
                    <div className="confirm-modal">
                        <h2>Are you sure you want to confirm this request has been completed? </h2>
                        <h3>(This action cannot be undone)</h3>
                        <label>
                            Yes, Confirm
                            <input type="checkbox" id="confirmationCheckbox" checked={isConfirmationChecked} onChange={handleConfirmationChange} />
                        </label>

                        <button onClick={closeConfirmModal}>Cancel</button>
                        <button onClick={confirmMarkAsComplete}>Save Changes</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default MaintenanceRequestsMT