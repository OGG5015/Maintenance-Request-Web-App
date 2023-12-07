import React from 'react'
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import Axios from 'axios';



const CreateMaintenanceRequest = (props) => {
    const [maintenanceRequest, setMaintenanceRequest] = useState([])
    const [apartmentNumber, setApartmentNumber] = useState('')
    const [problemArea, setProblemArea] = useState('')
    const [description, setDescription] = useState('')
    const [problemImage, setProblemImage] = useState('')


    const navigate = useNavigate();
    

    const handleCreateMaintenanceRequest = () => {
        //fix so that the time is displayed in the maintenance request data
        const date = new Date();
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();

        const currentDate = `${year}-${month}-${day}`

        const userID = localStorage.getItem('userID')
        Axios.post("http://localhost:3001/createMaintenanceRequest", {
            apartmentnumber: apartmentNumber,
            problemarea: problemArea,
            description: description,
            problemimage: problemImage,
            datetime: currentDate,
            status: 'Pending',
            userid: userID
        }).then((response) => {
            setMaintenanceRequest([...maintenanceRequest,
                {
                    apartmentnumber: apartmentNumber,
                    problemarea: problemArea,
                    description: description,
                    problemimage: problemImage,
                    datetime: currentDate
                }])
                //could add modal or new window to tell the user their maintenance request was successful
                //user will have to click a button to continue back to the maintenance request page
                //add error handling in this
        })
        navigate("/MaintenanceRequestsTT")
    }

    return (
        <div>
            <h1>Create a Maintenance Request</h1>
            <form className='createMRForm' onSubmit={handleCreateMaintenanceRequest}>
                <div>
                    <label for='problemAreaField'>Apartment Number: </label>
                    <input
                        className='problemAreaField'
                        onChange={(e) => setApartmentNumber(e.target.value)}
                        value={apartmentNumber}></input>
                </div>
                <div className='problemAreaContents'>
                    <label for='problemAreaField'>Problem Area: </label>
                    <input
                        className='problemAreaField'
                        onChange={(e) => setProblemArea(e.target.value)}
                        value={problemArea}></input>
                </div>

                <div className='descriptionContents'>
                    <label for='descriptionField'>Description: </label>
                    <input
                        className='descriptionField'
                        placeholder='Maintenance request description...'
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}></input>
                </div>
                <div className='imageContents'>
                    <label for='imageInput'>Image:</label>
                    <input
                        className='imageInput'
                        onChange={(e) => setProblemImage(e.target.value)}
                        value={problemImage}></input>
                </div>
                <button type='submit'>Submit</button>
                <button onClick={() => navigate(-1)}>Cancel</button>
            </form>
            
        </div>
    )
}

export default CreateMaintenanceRequest