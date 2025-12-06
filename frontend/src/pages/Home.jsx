import React, { useContext, useState } from 'react'
import WithAuth from '../utils/WithAuth.jsx';
import { useNavigate } from 'react-router-dom';

import { Button, TextField } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import "../App.css";
import { AuthContext } from '../contexts/AuthContext.jsx';

function HomeComponent() {

  let navigate = useNavigate();
  const [meetingCode, setMeetingCode] = useState();

  const {addToUserHistory} = useContext(AuthContext);

  let handleJoinVideoCall = async () => {
    await addToUserHistory(meetingCode)
    
    navigate(`/${meetingCode}`);
  }

  return (
    <>

      <div className="navBar">

        <div className="navLeft" style={{ display: "flex", alignItems: "center", }}>
          <h3>VC Call</h3>
        </div>

        <div className="navRight" style={{ display: "flex", justifyContent: "center" }}>

          <Button onClick={() => {
            localStorage.removeItem("token");
            navigate("/auth");
          }}>Logout</Button>

        </div>
      </div>

      <div className="meetContainer">
        <div className="leftPanel">
          <div>
            <h2>Providing Quality video Call</h2>

            <div style={{display:"flex", gap:"10px"}}>

              <TextField onChange={(e) => setMeetingCode(e.target.value)} id='outlined-basic' label="Meeting Code" variant='outlined'></TextField>
              <Button onClick={handleJoinVideoCall} variant='contained'>Join</Button>
            </div>
          </div>
        </div>

        <div className="rightPanel">
          <img srcSet="/images/logo3.png" alt='img'/>
        </div>

      </div>
    </>
  )
}


export default WithAuth(HomeComponent);