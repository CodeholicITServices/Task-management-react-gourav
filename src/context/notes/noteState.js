import NoteContext from "./noteContext";
import { useState } from "react";
import LoadingBar from 'react-top-loading-bar';

const NoteState = (props) => {
  const [user, setUser] = useState([])
  const [progress, setProgress] = useState(0)
  // let token = localStorage.getItem("token")
  let url = process.env.REACT_APP_BACKEND_URL
  
  // Alert function
  const [alert, setAlert] = useState(null)
  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(()=>{
      setAlert(null)
    }, 7000)
  }

    // Get user details
    const getUser = async () => {
      const token = localStorage.getItem("token")
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
      setUser(json);
      // setProgress(100)
    }

  return (
    <NoteContext.Provider value={{ getUser, user, progress, setProgress, showAlert, alert }}>
      <LoadingBar color='#f11946' progress={progress} onLoaderFinished={() => setProgress(0)} />
      {props.children}
    </NoteContext.Provider>
  )

}
export default NoteState;