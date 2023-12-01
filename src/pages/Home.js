import React from 'react'
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


const Home = (props) =>{
    const navigate = useNavigate();
    return(
        <div>
            {/*<li><Link to = "/MaintenanceRequestHistory">Maintenance Request History</Link></li>*/}
            <h1>Admin? Login here!</h1>
            <li><Link to = "/AdminLogin">Admin Login Portal</Link></li>
            <h1>Tenant? Login here!</h1>
            <li><Link to = "/TenantLogin">Tenant Login Portal</Link></li>
            
        </div>
    )
}

export default Home