import React, { useContext, useEffect } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";
import noteContext from '../context/notes/noteContext';


const Navbar = (props) => {
    const context = useContext(noteContext);
    const { user, getUser } = context;
    let location = useLocation();
    let token = localStorage.getItem("auth-token")
    let homeLink = ""
    let logoutLink = ""
    let navigate =  useNavigate()
    let logout = ()=>{
        localStorage.removeItem("auth-token")
        navigate("/")
    }
    useEffect(() => {
        getUser(token)
        // eslint-disable-next-line
    }, [])
    // console.log(user)
  
    if(token != null){
        homeLink = <Link className={`nav-link ${location.pathname==="/dashboard"? "active": ""}`} aria-current="page" to="/dashboard">Dashboard</Link>
        logoutLink = <><span className="navbar-text mx-2">Welcome, <b>{user.name}</b></span><form className="d-flex"><button type='button' className="btn btn-primary mx-1" onClick={()=>{logout()}} role="button">Logout</button></form></>
    }
    else{
        homeLink = <Link className={`nav-link ${location.pathname==="/"? "active": ""}`} aria-current="page" to="/">Home</Link>
        logoutLink = ''
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">iNotebook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            {homeLink}
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname==="/about"? "active": ""}`} to="/about">About</Link>
                        </li>
                    </ul>
                    {logoutLink}
                </div>
            </div>
        </nav>
    )
}

export default Navbar