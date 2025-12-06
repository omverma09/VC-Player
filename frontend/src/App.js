import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landingpage from './pages/Landingpage.jsx';
import Authentication from './pages/Authentication.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import VideoMeet from './pages/VideoMeet.jsx';
import HomeComponent from './pages/Home.jsx';


function App() {
  return (
    <div className='App'>
      <Router>

        <AuthProvider>
          <Routes>

            <Route path="/" element={<Landingpage />} />
            <Route path="/auth" element={<Authentication />} />
            <Route path='/home' element={<HomeComponent/>} />
            <Route path='/:url' element={<VideoMeet/>} />

          </Routes>
        </AuthProvider>

      </Router>

    </div>
  );
}

export default App;
