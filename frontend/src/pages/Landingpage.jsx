import React from 'react';
import "../App.css";
import { Link, useNavigate } from 'react-router-dom';

import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';

export default function Landingpage() {

  const router = useNavigate();

  return (
    <div className='landingpageContainer'>
      <nav>

        <div className='navHeader'>
          <h2>VC player</h2>
        </div>

        <div className='navList'>
          <p onClick={() => {
            router("/jsldjf23");
          }}>Join as Guest</p>

          <p onClick={() => {
            router("/auth");
          }}>Register</p>
          
          <div role='button' onClick={() => {
            router("/auth");
          }}>
            <p>Login</p>
          </div>
        </div>

      </nav>

      <div className="landingMainContainer">
        <div>
          <h1><span style={{ color: "orange" }}>Connect</span> with your loved Once</h1>

          <p>Cover a distance by VC Player</p>
          <div role='button' className='getStarted'>
            <Link to={"/auth"}>Get Started</Link>
          </div>

          <div style={{ display: 'flex', gap: '20px', fontSize: '40px', marginTop:'2rem' }}>
            <WhatsAppIcon className="icon" style={{ color: 'green', fontSize: 30 }} />
            <FacebookIcon className="icon" style={{ color: '#1877F2', fontSize: 30 }} />
            <LinkedInIcon className="icon" style={{ color: '#0077B5', fontSize: 30 }} />
            <TwitterIcon className="icon" style={{ color: '#1DA1F2', fontSize: 30 }} />
          </div>

        </div>

        <div>
          <img src="/images/mobile.png" alt="mobile png" />
        </div>
      </div>
    </div>
  );
}
