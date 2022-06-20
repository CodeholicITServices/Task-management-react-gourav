import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import noteContext from '../context/notes/noteContext'
import Button from 'react-bootstrap/Button'
import jQuery from 'jquery'



const Login = (props) => {
    const { setProgress } = props
    let url = process.env.REACT_APP_BACKEND_URL
    const context = useContext(noteContext)
    const { showAlert, setIsLogin } = context;
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    let history = useNavigate();

    const toggle_pass = (event)=>{
        if(jQuery('input[name=password]')[0].type === 'password'){
            jQuery('input[name=password]')[0].type = 'text'
            event.target.classList  = 'fa fa-eye-slash'
        }
        else{
            jQuery('input[name=password]')[0].type = 'password'
            event.target.classList  = 'fa fa-eye'
        }
        console.log("CLicked")
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProgress(20)
        fetch(`${url}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        }).then((response) => {
            setProgress(50)
            if (response.ok) {
              return response.json();
            }
            // console.log("Error")
            showAlert('Invalid credentials', "Danger")
            setCredentials({ email: "", password: "" })
          })
          .then((json) => {
            setProgress(80)
            if (json.success) {
                setProgress(80)
                localStorage.setItem('token', json.token);
                setIsLogin(true)
                history("/dashboard");
                // getUser()
            }
            else {
                showAlert('Invalid credentials', "Danger")
                setCredentials({ email: "", password: "" })
            }
          })
          .catch((error) => {
            // console.log(error)
            showAlert('Invalid credentials', "Danger")
            setCredentials({ email: "", password: "" })
          });
        setProgress(100)
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (

        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Login</div>
                        <div className="card-body">
                            <form  onSubmit={handleSubmit}>
                                <div className="row mb-3">
                                    <label htmlFor="email" className="col-md-4 col-form-label text-md-right">Email</label>
                                    <div className="col-md-6">
                                        <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" autoComplete='username' name="email" aria-describedby="emailHelp" required autoFocus />
                                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <label htmlFor="password" className="col-md-4 col-form-label text-md-right">Password</label>

                                    <div className="col-md-6">
                                        <input type="password" className="form-control" value={credentials.password} onChange={onChange} style={{ paddingRight: 5 + "rem" }} name="password" id="current-password" autoComplete="current-password" required />
                                        <div className="cd_pass" ><i className="fa fa-eye"  onClick={toggle_pass}></i></div>
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col-md-6 offset-md-4">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" name="remember" id="remember" />

                                            <label className="form-check-label" htmlFor="remember">
                                                Remember me
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-0">
                                    <div className="col-md-8 offset-md-4">
                                        <Button variant="primary" type='submit' disabled={credentials.email.length < 1 || credentials.password.length < 1}>Login</Button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
