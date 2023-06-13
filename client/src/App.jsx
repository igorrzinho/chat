import './App.css'
import io from 'socket.io-client'
import * as React from 'react'
const socket = io.connect("http://localhost:3001")
function App() {

  const sendMessage=()=>{
    socket.emit("send_message",{message, room}) 
  }

  const joinRoom=()=>{
    if(room !== ""){
      socket.emit("join_room",room)
    }
  }

  React.useEffect(()=>{
    socket.on("receive_message",(data)=>{
      setMessageReceived(data.message)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket])
  const [room,setRoom]= React.useState()
  const [message,setMessage]= React.useState()
  const [messageReceived,setMessageReceived]= React.useState()

  return (
    <>
    <div>
    <input type="number" placeholder='room' onChange={(e)=>setRoom(e.target.value)} />
    <button onClick={joinRoom}>join a room</button>

    </div>
    <input type="text" placeholder='message' onChange={(e)=>setMessage(e.target.value)} />
    <button onClick={sendMessage}>send a message</button>
    <h1>messages</h1>
    {messageReceived}
    </>
  )
}

export default App
