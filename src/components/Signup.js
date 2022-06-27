import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import noteContext from '../context/notes/noteContext'

const Signup = (props) => {
  const { setProgress } = props
  const url = process.env.REACT_APP_BACKEND_URL
  const AppURL = process.env.REACT_APP_URL
  const context = useContext(noteContext)
  const { getUser, showAlert } = context;
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;
    setProgress(20)
    const response = await fetch(`${url}/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    });
    setProgress(50)
    const json = await response.json()
    // console.log(json)
    if (json.success) {
      setProgress(80)
      sessionStorage.setItem('token', json.token);
      navigate(`${AppURL}/dashboard`);
      getUser()
    }
    else {
      showAlert('Something went wrong', 'danger')
    }
    setProgress(100)
  }

  const onChange = async (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })

  }

  return (
    <div className="mt-2">
      <h2>Create an account to use Task management System</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" autoComplete='off' id="name" name="name" onChange={onChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" autoComplete='off' id="email" name="email" aria-describedby="emailHelp" onChange={onChange} required />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" autoComplete='off' id="password" name="password" onChange={onChange} minLength={5} required />
          <div id="passwordHelp" className="form-text">Password should be more than 5 five characters long.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className={`form-control ${credentials.password !== credentials.cpassword ? 'is-invalid' : ''}`} autoComplete='' id="cpassword" name="cpassword" onChange={onChange} minLength={5} required />
          {credentials.password !== credentials.cpassword ? <div id="cpasswordHelp" className="form-text">Password and confirm password not matched.</div> : ''}
        </div>
        <button disabled={credentials.name.length < 5 || credentials.password.length < 5 || credentials.password !== credentials.cpassword} type="submit" className="btn btn-primary">Submit</button>
        <Link to={`${AppURL}/login`} className="btn btn-link"> Already have an account? </Link>
      </form>
    </div>
  )
}

export default Signup