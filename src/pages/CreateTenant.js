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
        apartmentnumber: '',
        checkindate: new Date(), 
        checkoutdate: new Date().setFullYear(new Date().getFullYear() + 1, 0, 1), // Set to one year from current date and noon
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setTenant((prevTenant) => ({ ...prevTenant, [name]: value }));
    };

    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [passwordMismatch, setPasswordMismatch] = useState(false);


    const handleCreateTenant = async (e) => {
        e.preventDefault();

        if (tenant.password === passwordConfirmation) {
            try {
                const checkOccupiedResponse = await Axios.get(
                    `http://localhost:3001/checkApartmentOccupied/${tenant.apartmentnumber}`
                );

                if (checkOccupiedResponse.data.occupied) {
                    setApartmentOccupied(true);
                } else {
                    const createTenantResponse = await Axios.post(
                        'http://localhost:3001/createTenant',
                        tenant
                    );

                    if (createTenantResponse.data.success) {
                        navigate('/UsersDisplay');
                    } else {
                        console.error(createTenantResponse.data.message);
                    }
                }
            } catch (error) {
                console.error(error);
            }
        } else {
            setPasswordMismatch(true);
        }
    };

    const handleConfirmPasswordChange = (e) => {
        const { value } = e.target;
        setPasswordConfirmation(value);
        setPasswordMismatch(false);
    };

    const [apartmentOccupied, setApartmentOccupied] = useState(false);


    return ( //EDIT TO HAVE TENANT INFORMATION, NOT MAINTENANCE
        //REQUEST INFORMATION --- change classnames, etc
        <div>
            <h1>Create a Tenant</h1>
            <form className='createTenantForm' onSubmit={handleCreateTenant}>
                <div className='nameContents'>
                    <label for='nameField'>Tenant Name: </label>
                    <input
                        className='nameField'
                        id='nameField'
                        name = "name"
                        onChange={handleChange}></input>
                </div>

                <div className='emailContents'>
                    <label for='emailField'>Tenant Email: </label>
                    <input 
                        className='emailField'
                        name = 'email'
                        onChange={handleChange}></input>
                </div>
                <div className='phoneNumberContents'>
                    <label for='phoneNumberField'>Phone Number:</label>
                    <input
                        className='phoneNumberField'
                        name = 'phonenumber'
                        onChange={handleChange}></input>
                </div>
                <div className='passwordContents'>
                    <label for='passwordInput'>Tenant Password:</label>
                    <input
                        type='password'
                        className='passwordInput'
                        onChange={handleChange}
                        name="password"
                        ></input>
                </div>
                <div className='confirmPasswordContents'>
                    <label for='confirmPasswordInput'>Confirm Tenant Password:</label>
                    <input
                        type='password'
                        className='confirmPasswordInput'
                        onChange={handleConfirmPasswordChange}></input>
                </div>

                {passwordMismatch && (
                    <p style={{ color: 'red' }}>Passwords do not match</p>
                )}

                <div className='apartmentContents'>
                    <label for='apartmentField'>Tenant Apartment Number: </label>
                    <input 
                        className='apartmentField'
                        name='apartmentnumber'
                        onChange={handleChange}></input>
                    {apartmentOccupied && (
                        <p style={{ color: 'red' }}>Apartment is already occupied</p>
                    )}
                </div>
                <button type= "submit">Submit</button>
            </form>
            <button onClick={() => navigate(-1)}>Cancel</button>
        </div>
    )
}

export default CreateTenant