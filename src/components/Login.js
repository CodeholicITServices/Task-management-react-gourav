import React, {useContext, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import noteContext from '../context/notes/noteContext'


const Login = (props) => {
    const {setProgress} = props
    let url = process.env.REACT_APP_BACKEND_URL
    const context = useContext(noteContext)
    const { getUser, showAlert } = context;
    const [credentials, setCredentials] = useState({email: "", password: ""}) 
    let history = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProgress(20)
        const response = await fetch(`${url}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'Accept': 'application/json'
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        });
        setProgress(50)
        const json = await response.json()
        // console.log(json);
        if (json.success){
            setProgress(80)
            await localStorage.setItem('token', json.token);
            history("/dashboard");
            getUser()
            
        }
        else{
            showAlert('Invalid credentials', "Danger")
        }
        setProgress(100)
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    return (
        <div className='my-3'>
            <form  onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" autoComplete='username' name="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="current-password" autoComplete="current-password" />
                </div>

                <button disabled={credentials.email.length < 1 || credentials.password.length < 1} type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login