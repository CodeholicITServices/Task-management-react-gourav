import NoteContext from "./noteContext";
import { useState } from "react";
import io from 'socket.io-client'

const NoteState = (props) => {
  const [user, setUser] = useState([])
  const [progress, setProgress] = useState(0)
  const [AllUsers, setAllUsers] = useState([])
  const [isLogin, setIsLogin] = useState(false)
  const [room, setRoom] = useState('')
  const token = localStorage.getItem("token")
  const [socket, setsocket] = useState('')
  const url = process.env.REACT_APP_BACKEND_URL
  const scoket_domain = process.env.REACT_APP_SOCKET_DOMAIN

  // Alert function
  const [alert, setAlert] = useState(null)
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 5000)
  }

  const getAllUsers = async () => {
    // API Call 
    // setProgress(30)
    const response = await fetch(`${url}/api/getusers`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    const json = await response.json()
    if (json.success) {
      // console.log(json.users)
      setAllUsers(json.users);
    } else {
      showAlert("Something went wrong.", "danger")
    }
    // setProgress(100)
  }

  // Get user details
  const getUser = async () => {
    // API Call 
    // setProgress(30)
    const response = await fetch(`${url}/api/user`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    const json = await response.json()
    console.log(json)
    if (json.success)
      setUser(json.user);
    localStorage.setItem('user', JSON.stringify(json.user))


    // setProgress(100)
  }

  const startSocket = (room) => {
    setsocket(io(scoket_domain + '/dynamic-' + room, {
      auth: {
        token: token
      }
    }))

    return socket
  }




  return (
    <NoteContext.Provider value={{ getUser, user, setUser, progress, setProgress, showAlert, alert, getAllUsers, AllUsers, setRoom, setIsLogin, isLogin, room, startSocket, socket }}>
      {props.children}
    </NoteContext.Provider>
  )

}
export default NoteState;
