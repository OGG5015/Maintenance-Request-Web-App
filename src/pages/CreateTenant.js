import React from 'react'
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react"
import Axios from 'axios'


const CreateTenant = (props) => {
    const navigate = useNavigate();
    const [tenant, setTenant] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        apartmentNumber: '',
    });

    const handleCreateTenant = async (e) => {
        e.preventDefault();

        try {
            const response = await Axios.post('http://localhost:3001/createTenant', tenant);

            if (response.data.success) {
                // Successfully created the tenant, navigate to the appropriate page
                navigate('/Tenants'); // Change this to the correct path
            } else {
                // Handle error response
                console.error(response.data.message);
            }
        } catch (error) {
            // Handle network or server errors
            console.error(error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTenant((prevTenant) => ({ ...prevTenant, [name]: value }));
    };

    return ( //EDIT TO HAVE TENANT INFORMATION, NOT MAINTENANCE
            //REQUEST INFORMATION --- change classnames, etc
        <div> 
            <h1>Create a Tenant</h1>
            <form className='createMRForm' onSubmit={handleCreateTenant}>
                <div className='problemAreaContents'>
                    <label for='problemAreaField'>Tenant Name: </label>
                    <input 
                        className= 'problemAreaField'
                        id = 'nameField'></input>
                </div>

                <div className='descriptionContents'>
                    <label for = 'descriptionField'>Tenant Email: </label>
                    <input className = 'descriptionField'></input>
                </div>
                <div className='imageContents'>
                    <label for = 'imageInput'>Tenant Password:</label>
                    <input className='imageInput'></input>
                </div>
                <div className='imageContents'>
                    <label for = 'imageInput'>Confirm Tenant Password:</label>
                    <input className='imageInput'></input>
                </div>
                <div className='problemAreaContents'>
                    <label for='problemAreaField'>Tenant Apartment Number: </label>
                    <input className= 'problemAreaField'></input>
                </div>
                <button onSubmit={handleCreateTenant}>Submit</button>
            </form>
            <button onClick={() => navigate(-1)}>Cancel</button>
        </div>
    )
}

export default CreateTenant