import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';


export const Alert = () => {
    const context = useContext(noteContext);
    const { alert } = context;
    // const capitalize = (word)=>{
    //     const lower = word.toLowerCase()
    //     return lower;
    // }
    if(alert){
        return (
            <div className='m-3'>
                <div className={`alert alert-${alert.type.toLowerCase()} alert-dismissible fade show`} role="alert">
                    <strong>{alert.type}</strong> : {alert.msg}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            </div>
        )
    }
    else{
        return(<></>)
    }
}