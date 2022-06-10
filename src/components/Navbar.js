import React, { useContext } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";
import noteContext from '../context/notes/noteContext';


const Navbar = (props) => {
    const {setProgress} = props
    let url = process.env.REACT_APP_BACKEND_URL
    const context = useContext(noteContext);
    const { user, showAlert } = context;
    let location = useLocation();
    let token = localStorage.getItem("token")
    let homeLink = ""
    let logoutLink = ""
    let navigate =  useNavigate()
    let logout = async()=>{
        setProgress(10)
        const response = await fetch(`${url}/api/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        setProgress(30)
        const json = await response.json()
        console.log(json);
        if (json.success){
            setProgress(60)
            localStorage.removeItem("token")
            navigate("/")
        }
        else{
            showAlert('Something went wrong, please try again later', "Danger")
        }
        setProgress(100)
    }
    // useEffect(() => {
    //     if(token){
    //         getUser()
    //     }
    //         // eslint-disable-next-line
    // }, [])
    // console.log(user)
  
    if(token != null){
        homeLink = <Link className={`nav-link ${location.pathname==="/dashboard"? "active": ""}`} aria-current="page" to="/dashboard">Dashboard</Link>

        logoutLink = <><span className="navbar-text mx-2">Welcome, <b>{user.name}</b></span><form className="d-flex"><button type='button' className="btn btn-primary mx-1" onClick={()=>{logout()}}>Logout</button></form></>
    }
    else{
        homeLink = <Link className={`nav-link ${location.pathname==="/"? "active": ""}`} aria-current="page" to="/">Home</Link>

        logoutLink = <><Link className="btn btn-primary btn-sm btn-lg mx-1" to="/login" role="button">Login</Link><Link className="btn btn-primary btn-sm btn-lg mx-1" to="/signup" role="button">Signup</Link>'</>
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            {homeLink}
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname.includes("/chat")? "active": ""}`} to="/chat">Chat</Link>
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