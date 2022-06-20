import React, { useContext, useEffect, useState } from 'react'
import Conversation from './Conversation'
import noteContext from '../context/notes/noteContext'
import jQuery from 'jquery'
import moment from 'moment'
// import userEvent from '@testing-library/user-event'

const Chat = (props) => {

    const [isConvo, setIsConvo] = useState(false)
    const [convUser, setConvUser] = useState("")
    const context = useContext(noteContext)
    const { getAllUsers, AllUsers, user, setRoom, socket } = context;
    const { setProgress } = props

    let camera_button = document.querySelector("#start-camera");
    let video = document.querySelector("#video");
    let click_button = document.querySelector(".click-photo");
    let canvas = document.querySelector("#canvas");
    let send = document.querySelector("#sendimg")
    let reshoot = document.querySelector("#reshoot")
    // console.log(AllUsers)
    const handleConvCLick = (name, id, room) => {
        setProgress(40)
        setIsConvo(true)
        setProgress(100)
        setConvUser(name)
        setRoom(room)

    }

    const handleCloseCam = ()=>{
        let mediaStream = video.srcObject;
        let tracks = mediaStream.getTracks();
        tracks[0].stop();
        tracks.forEach(track => track.stop())
        video.style.display = 'block';
        canvas.style.display = 'none'
    }

    const sendImg = ()=>{
        let data_url = jQuery('input[name=img_data]').val()
        if(data_url != ''){
            socket.emit('sendChatToServer', JSON.stringify({
                'message': data_url,
                'type': 'image',
                'sender':user.id,
                'created_at':moment()
            }));
        }
    }

    const capture = async()=> {
        canvas.style.display = 'block';
        send.style.display = '';
        reshoot.style.display = '';
        click_button.style.display = 'none';
        video.style.display = 'none';
        canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
        let image_data_url = canvas.toDataURL('image/jpeg');
        jQuery('input[name=img_data]').val(image_data_url)

        let mediaStream = video.srcObject;
        let tracks = mediaStream.getTracks();
        tracks[0].stop();
        tracks.forEach(track => track.stop())
    };

    const reshootFun = async()=>{
        let mediaStream = video.srcObject;
        let tracks = mediaStream.getTracks();
        tracks[0].stop();
        tracks.forEach(track => track.stop())
        let stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        video.srcObject = stream;

        video.style.display = '';
        canvas.style.display = 'none';
        reshoot.style.display = 'none'
        send.style.display = 'none';
        click_button.style.display = '';

    }

    useEffect(() => {
        setProgress(30)
        getAllUsers()
        setProgress(100)
        // eslint-disable-next-line

    }, [])


    return (
        <div>
            <div className="content">
                <button className="btn bd-sidebar-toggle d-md-none py-0 px-1 ms-3 order-3 collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#bd-docs-nav" aria-controls="bd-docs-nav" aria-expanded="false" aria-label="Toggle docs navigation">
                    <i className="bi bi-expand fa fa-angles-down"></i>
                    <i className="bi bi-collapse fa fa-angles-up"></i>
                </button>
                <div className="container-xxl bd-layout">
                    <aside className="bd-sidebar">
                        <nav className="collapse bd-links" id="bd-docs-nav" aria-label="Docs navigation">
                            <ul className="list-unstyled mb-0 py-3 pt-md-1">
                                <li className="mb-1">
                                    <button className="btn d-inline-flex align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#direct-messages" aria-expanded="false">
                                        <i className="fa fa-play"></i> &nbsp; Direct Messages
                                    </button>

                                    <div className="collapse" id="direct-messages">
                                        <ul className="list-unstyled fw-normal pb-1 small">
                                            {AllUsers ? AllUsers.map((elem) => {
                                                return <li key={elem.id}> <span onClick={() => { handleConvCLick(elem.name, elem.id, elem.room) }} className="d-inline-flex align-items-center rounded btn" aria-current="page" > <img src="default.jpg" width="25px" style={{ marginRight: 8 + "px", borderRadius: 50 + "%" }} alt="uImage" /><span className='cd_chat_username'> {elem.name} </span></span></li>
                                            }) : ''}

                                        </ul>
                                    </div>
                                </li>
                                <li className="mb-1" id="groupBtn">
                                    <button className="btn d-inline-flex align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#groups" aria-expanded="false">
                                        <i className="fa fa-play"></i> &nbsp; Groups
                                    </button>
                                    <span id="moreopt"><i className="btn fa-solid fa-ellipsis-vertical mx-4 collapsed" data-bs-toggle="collapse" data-bs-target="#opts"></i></span>
                                    <div className="collapse" id="opts">
                                        <ul className="list-unstyled fw-normal pb-1 small">
                                            <li><span id="groupCreate" className="d-inline-flex align-items-end bd-subnavbar rounded btn" style={{ marginLeft: "100px" }}>Create</span></li>
                                        </ul>
                                    </div>

                                    <div className="collapse" id="groups">
                                        <ul className="list-unstyled fw-normal pb-1 small">

                                            <li> <span className="d-inline-flex align-items-center rounded btn" aria-current="page" > <img src="default.jpg" width="25px" style={{ marginRight: 8 + "px", borderRadius: 50 + "%" }} alt="uImage" /> groupname</span></li>

                                            <li> <span className="d-inline-flex align-items-center rounded  btn" aria-current="page" > <img src="default.jpg" width="25px" style={{ marginRight: 8 + "px", borderRadius: 50 + "%" }} alt="uImage" /> groupname</span></li>

                                            <li> <span className="d-inline-flex align-items-center rounded  btn" aria-current="page" > <img src="default.jpg" width="25px" style={{ marginRight: 8 + "px", borderRadius: 50 + "%" }} alt="uImage" /> groupname</span></li>

                                        </ul>
                                    </div>
                                </li>
                                <li className="my-3 mx-4" style={{ borderTop: 1 + "px solid", color: "#ffffff" }}></li>
                                <li>
                                    <a href="/" className="btn">
                                        Settings
                                    </a>
                                </li>
                            </ul>
                        </nav>

                        <div className="modal-dialog modal-dialog-scrollable">
                            <div className="modal fade" id="groupinfo" tabIndex="-1" aria-labelledby="groupinfo" aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title">Create group</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="container-fluid">
                                                <div className="row">
                                                    <div className="col">
                                                        <label className="form-check-label">Group name</label>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col">
                                                        <input type="text" name="g_name" className="form-control" />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col">
                                                        <label className="form-check-label">Add members</label>
                                                    </div>
                                                </div>
                                                <ul className="list-unstyled">
                                                    <li><input type="checkbox" name="member[]" className="" /> All</li>
                                                    <li><input type="checkbox" name="member[]" className="" /> 2</li>
                                                    <li><input type="checkbox" name="member[]" className="" /> 3</li>
                                                    <li><input type="checkbox" name="member[]" className="" /> 4</li>
                                                    <li><input type="checkbox" name="member[]" className="" /> 5</li>
                                                    <li><input type="checkbox" name="member[]" className="" /> 6</li>
                                                    <li><input type="checkbox" name="member[]" className="" /> 7</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">cancel</button>
                                            <button type="button" className="btn btn-primary">Create</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </aside>

                    <main>
                        <div className="modal fade" id="cameraModal" tabIndex="-1" aria-labelledby="cameraModalLabel" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content bg-black">
                                    <div className="modal-header">
                                        <button type="button" className="bg-body btn-close" data-bs-dismiss="modal"  onClick={handleCloseCam} aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <input type="hidden" name="img_data" />
                                        <div className="mb-3">
                                            <video id="video" autoPlay width="400" height="300"></video>
                                            <canvas id="canvas" width="400" height="300" style={{ display: "none" }}></canvas>
                                        </div>
                                        <button id="click-photo" className="click-photo btn btn-success" onClick={capture}>Click Photo</button>
                                        <button id="reshoot" className="click-photo btn btn-danger" style={{ display: "none" }} onClick={reshootFun}>Click Again</button>
                                        <button id="sendimg" className="send" style={{ display: "none" }} data-bs-dismiss="modal" onClick={sendImg}>
                                            <div className="circle">
                                                <i className="fa fa-mail-forward"></i>
                                            </div>
                                        </button>'
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="chatArea">
                            {!isConvo ? <div className="bd-intro ps-lg-4">
                                <div className="">
                                    <h1 className="bd-title" id="content">Messages</h1>
                                </div>
                                <p className="bd-lead">Start Messaging with other users.</p>
                            </div> : <Conversation convUser={convUser} />}

                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}

export default Chat
