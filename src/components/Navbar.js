import React, { useContext, useEffect } from 'react'
import { NavDropdown, Navbar } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from "react-router-dom";
import noteContext from '../context/notes/noteContext';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';


const MyNavbar = (props) => {
    const { setProgress } = props
    let url = process.env.REACT_APP_BACKEND_URL
    const context = useContext(noteContext);
    const { user, setUser, showAlert, getUser, isLogin, setIsLogin } = context;
    let location = useLocation();
    let token = localStorage.getItem("token")
    let navigate = useNavigate()
    let logout = async () => {

        setProgress(10)
        fetch(`${url}/api/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }).then((response) => {
            setProgress(50)
            if (response.ok) {
              return response.json();
            }
            // console.log("Error")
            showAlert('Something went wrong, please try again later', "Danger")
            setProgress(100)
        })
        .then((json) => {
            setProgress(80)
            if (json.success) {
                setProgress(70)
    
                setUser([])
                localStorage.removeItem("user")
    
                setIsLogin(false)
                localStorage.removeItem("token")
                setProgress(100)
                
                navigate("/")
            }
            else {
                showAlert('Something went wrong, please try again later', "Danger")
                setProgress(100)
            }
        })
        .catch((error) => {
            console.log(error)
            showAlert('Something went wrong, please try again later', "Danger")
        });
        setProgress(100)
    }

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            // console.log(token)
            setIsLogin(true)
        }
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        
        // console.log(isLogin)
        if (isLogin) {
            const localUser = localStorage.getItem("user")
            if(localUser){
                setUser(JSON.parse(localUser))

            }else{
                getUser()
            }

        }
        // eslint-disable-next-line
    }, [isLogin])

    if (isLogin) {

        return (
            // <nav className="navbar navbar-expand-md navbar-light bg-white shadow-sm fixed-top">
            <Container>
            <Navbar collapseOnSelect expand="md" bg="light" variant="light" fixed='top'>
                <Container fluid>

                    <Link className='mx-3' aria-current="page" to="/" style={{ fontSize: 1.5 + 'rem' }}>TMS</Link>

                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">

                        <Nav className="me-auto">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/dashboard" ? "active" : ""}`} aria-current="page" to="/dashboard">Dashboard</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname.includes("/chat") ? "active" : ""}`} to="/chat">Chat</Link>
                            </li>
                        </Nav>
                        <Nav className="ms-auto">
                            <NavDropdown title={user.name} id="collasible-nav-dropdown" style={{marginRight: 100+"px"}}>
                                <NavDropdown.Item href="">My Profile</NavDropdown.Item>
                                <NavDropdown.Item href="">Change Password</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={() => { logout() }}>
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            </Container>
        )
    }
    else {
        return (
            <Navbar collapseOnSelect expand="md" bg="light" variant="light" fixed='top' className="shadow-sm">
                <Container fluid>
                    <Link className='mx-3' aria-current="page" to="/" style={{ fontSize: 1.5 + 'rem' }}>TMS</Link>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ms-auto">
                            <li className="nav-item">
                                <Link className='mx-1' to="/login" role="button"><Button variant="outline-primary" size='sm'>Login</Button></Link>
                                <Link className='mx-1' to="/signup" role="button"><Button variant="outline-primary" size='sm'>Register</Button></Link>
                            </li>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )


    }
}

export default MyNavbar