import jQuery from 'jquery'
import moment from 'moment'
import React, { useContext, useEffect } from 'react'
import noteContext from '../context/notes/noteContext'


const Conversation = (props) => {
    const context = useContext(noteContext)
    const { user, room, startSocket, socket } = context;
    const token = localStorage.getItem("token")
    let url = process.env.REACT_APP_BACKEND_URL
    let localMsg = JSON.parse(sessionStorage.getItem('messages[' + room + ']'))
    const { convUser } = props

    const buildMessage = (messages, room_id) => {
        // console.log(Object.values(messages))
        if (messages) {
            messages.map((message) => {
                // console.log(message)
                let html = "";
                let created_at = new Date(message.created_at).toLocaleTimeString();
                if (user.id === message.sender) {
                    // side='sent'
                    if (message.message_type === 'text') {
                        html = '' +
                            '<div class="message sent">' +
                            message.message +
                            '<span class="metadata">' +
                            '<span class="time">' + created_at + '</span>' +
                            '<span class="tick">' +
                            '<i class="fa fa-check-double fa-sm"></i>' +
                            '</span>' +
                            '</span>' +
                            '</div>' +
                            '';
                    }
                    else if (message.message_type === 'image') {
                        html = '' +
                            '<div class="message message-image sent">' +
                            '<img src="{% static "Code_CMS/chats/" %}' + message.message + '" style="width:50%; height:50%;"><br>' +
                            '<span class="metadata">' +
                            '<span class="time">' + created_at + '</span>' +
                            '<span class="tick"> <i class="fa fa-check-double fa-sm"></i> </span>' +
                            '</span>' +
                            '</div>' +
                            '';
                    }
                }
                else {
                    // side='received'
                    if (message.message_type === 'text') {
                        html = '' +
                            '<div class="message received">' +
                            '<span class="sender">' +
                            message.sender +
                            '</span>' +
                            message.message +
                            '<span class="metadata">' +
                            '<span class="time">' + created_at + '</span>' +
                            '</span>' +
                            '</div>' +
                            '';
                    }
                    else if (message.mesage_type === 'image') {
                        html = '' +
                            '<div class="message message-image received">' +
                            '<span class="sender">' +
                            message.sender +
                            '</span>' +
                            '<img src="{% static "Code_CMS/chats/" %}' + message.message + '" style="width:50%; height:50%;"><br>' +
                            '<span class="metadata">' +
                            '<span class="time">' + created_at + '</span>' +
                            '</span>' +
                            '</div>' +
                            '';
                    }
                }
                jQuery('.conversation-container').append(html);
                return html
            })
            jQuery('.conversation-container').scrollTop(jQuery('.conversation-container')[0].scrollHeight);
        }
    }

    const getMessages = async () => {
        // console.log(room)
        if (localMsg === null) {
            console.log("Getting messages from server.")
            fetch(`${url}/api/getmessages`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ 'room_id': room })

            })
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    }
                    console.log("Error")
                })
                .then((json) => {
                    if (json.success) {
                        // console.log(json)
                        if (json.messages) {
                            buildMessage(json.messages, room)
                            localMsg = JSON.stringify(json.messages)
                            sessionStorage.setItem('messages[' + room + ']', localMsg);
                        }
                    }
                    else {
                        console.log("Success not found")
                    }
                })
                .catch((error) => {
                    console.log(error)
                });
        }
        else {
            console.log("Getting messages from sesionStorage.")
            if (localMsg !== []) {

                buildMessage(Object.values(localMsg), room)
            }
        }

    }

    const sendChatToServer = (message) => {
        socket.emit('sendChatToServer', JSON.stringify(message));
    }

    const handleCamera = async () => {
        let video = document.querySelector("#video");
        let stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        video.srcObject = stream;
    }

    useEffect(() => {
        const addMessages = (data) => {
            var element = document.createElement('div');
            let created_at = new Date(data.created_at).toLocaleTimeString();
            let innerHTML = ''

            if (data.sender === user.id) {
                /* Send message */
                element.classList.add('message', 'sent');
                if (data.type === 'image') {
                    /* Image message */
                    element.classList.add('message-image');
                    innerHTML += '' +
                        '<img src="' + data.message + '" style="width:50%; height:50%;">'
                }
                else {
                    /* Text message */
                    innerHTML += data.message
                }


                innerHTML += '' +
                    '<span class="metadata">' +
                    '<span class="time">' + created_at + '</span>' +
                    '<span class="tick">' +
                    '<i class="fa fa-check-double fa-sm"></i>' +
                    '</span>' +
                    '</span>';
            }
            else {
                /* Recieved message */
                element.classList.add('message', 'received');
                if (data.type === 'image') {
                    /* Image message */
                    element.classList.add('message-image');
                    innerHTML += '' +
                        '<span class="sender">' + data.sender + '</span>' +
                        '<img src="' + data.message + '" style="width:50%; height:50%;">'
                }
                else {
                    /* Text message */
                    innerHTML += '<span class="sender">' + data.sender + '</span>' + data.message
                }


                innerHTML += '' +
                    '<span class="metadata">' +
                    '<span class="time">' + created_at + '</span>' +
                    '</span>';
            }

            element.innerHTML = innerHTML;
            return element;
        }
        try {
            socket.on('sendChatToClient', (res) => {
                console.log("recieved message from server")
                // var localMessages = JSON.parse(sessionStorage.getItem('messages[' + room + ']'))
                // var newMessage = { ...localMessages, res }
                // sessionStorage.setItem('messages[' + room + ']', JSON.stringify(newMessage))

                var data = JSON.parse(res);
                if (data.message) {
                    // console.log('I am running');
                    var message = addMessages(data);
                    let conversation = jQuery('.conversation-container')
                    conversation.append(message);
                    conversation.scrollTop(conversation[0].scrollHeight);

                    var messages;
                    if (typeof (Storage) !== "undefined") {
                        var lastind = 0
                        messages = JSON.parse(sessionStorage.getItem('messages[' + room + ']'));
                        if (messages === null) {
                            messages = []
                            lastind = 0
                        }
                        else {
                            console.log("messages are not null")
                            lastind = Object.keys(messages).length
                        }
                        console.log(messages)
                        messages[lastind] = data
                        // console.log(messages)
                        sessionStorage.setItem('messages[' + room + ']', JSON.stringify(messages));
                    }
                }
            });

            socket.on('disconnect', () => {
                console.log("Disconnected socket.")
                sessionStorage.clear()
            })
        } catch (error) {
            console.log(error)
        } //eslint-disable-next-line
    }, [socket])

    useEffect(() => {
        getMessages()
        startSocket(room)
        // eslint-disable-next-line
    }, [room])

    const handleMsg = (e) => {
        e.preventDefault()
        var input = e.target.input;
        if (input && input.value) {
            // console.log(room)
            var message = {
                'message': input.value,
                "sender": user.id,
                "created_at": moment(),
                "type": "text",
                "token": token,
                "domain": url,
                "room": room
            }
            sendChatToServer(message)
            input.value = '';
        }
    };

    const galleryClick = () => {
        jQuery('input[type=file]').click()
    }
    return (
        <div>
            <div className="page">
                <div className="marvel-device nexus5">
                    <div className="screen">
                        <div className="screen-container">
                            <div className="chat">
                                <div className="chat-container">
                                    <div className="user-bar">
                                        <div className="back">
                                            <i className="fa fa-arrow-left"></i>
                                        </div>
                                        <div className="avatar">
                                            <img src="default.jpg" alt="default" />
                                        </div>
                                        <div className="name">
                                            <span> {convUser} </span>
                                            <span className="status">Online</span>
                                        </div>
                                        <div className="actions more">
                                            <i className="fa fa-ellipsis-v"></i>
                                        </div>
                                    </div>
                                    <div className="conversation">
                                        <div className="conversation-container">  </div>
                                        <div className="conversation-compose">
                                            <form className="conversation-compose" encType="multipart/form-data" onSubmit={handleMsg}>
                                                <div className="emoji">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" id="smiley" x="3147" y="3209">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M9.153 11.603c.795 0 1.44-.88 1.44-1.962s-.645-1.96-1.44-1.96c-.795 0-1.44.88-1.44 1.96s.645 1.965 1.44 1.965zM5.95 12.965c-.027-.307-.132 5.218 6.062 5.55 6.066-.25 6.066-5.55 6.066-5.55-6.078 1.416-12.13 0-12.13 0zm11.362 1.108s-.67 1.96-5.05 1.96c-3.506 0-5.39-1.165-5.608-1.96 0 0 5.912 1.055 10.658 0zM11.804 1.01C5.61 1.01.978 6.034.978 12.23s4.826 10.76 11.02 10.76S23.02 18.424 23.02 12.23c0-6.197-5.02-11.22-11.216-11.22zM12 21.355c-5.273 0-9.38-3.886-9.38-9.16 0-5.272 3.94-9.547 9.214-9.547a9.548 9.548 0 0 1 9.548 9.548c0 5.272-4.11 9.16-9.382 9.16zm3.108-9.75c.795 0 1.44-.88 1.44-1.963s-.645-1.96-1.44-1.96c-.795 0-1.44.878-1.44 1.96s.645 1.963 1.44 1.963z" fill="#7d8489" />
                                                    </svg>
                                                </div>
                                                <input className="input-msg" onKeyUp={(e) => { if (e.which === 13 && !e.shiftKey) { handleMsg(e) } }} name="input" placeholder="Type a message" autoComplete="off" />
                                                <div className="photo">
                                                    <i className="fa fa-paperclip" onClick={galleryClick}></i>
                                                    <input type="file" name="img" style={{ display: "none" }} />
                                                </div>
                                                <div className="photo">
                                                    <i className="fa fa-camera" onClick={handleCamera} data-bs-toggle="modal" data-bs-target="#cameraModal"></i>
                                                </div>
                                                <button className="send" type='submit'>
                                                    <div className="circle">
                                                        <i className="fa fa-mail-forward"></i>
                                                    </div>
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Conversation
