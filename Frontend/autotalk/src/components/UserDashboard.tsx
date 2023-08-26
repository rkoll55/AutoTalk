import React, { useEffect, useRef } from 'react';
import '../assets/UserDashboard.css'; // Assuming you have this CSS file created
import logo from '../assets/logo_dark.png'; // Adjust the path accordingly
import {FaUserAstronaut, FaCogs, FaSignOutAlt} from 'react-icons/fa'

type UserDashboardProps = {
  userData: {
    username: string;
    email: string;
    memberSince: Date;
  },
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

const UserDashboard: React.FC<UserDashboardProps> = ({ userData, setIsLoggedIn }) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        document.body.classList.add('dashboard-page');

        // Start the video stream when the component is mounted
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then((stream) => {
                    if (videoRef.current) {
                        videoRef.current.srcObject = stream;
                    }
                })
                .catch((err) => {
                    console.log("An error occurred: " + err);
                });
        }

        // Stop the video stream when the component is unmounted
        return () => {
            document.body.classList.remove('dashboard-page');
            if (videoRef.current && videoRef.current.srcObject) {
                let tracks = (videoRef.current.srcObject as MediaStream).getTracks();
                tracks.forEach(track => track.stop());
            }
        };
    }, []);

    const handleLogout = () => {
      // Here you can add other logout related functionality if needed
      setIsLoggedIn(false);
    };

    return (
        <div className="wrapper">
            <nav className="vertical-nav">
                <div className="header-logo">
                    <img src={logo} alt="Logo" />
                </div>
                <ul>
                    <li><a href='#'><FaUserAstronaut className='nav-icons'/></a></li>
                    <li><a href='#'><FaCogs className='nav-icons'/></a></li>
                    <li><a href='#'><FaSignOutAlt onClick={handleLogout} className='nav-icons'/></a></li>
                </ul>
            </nav>
            <div className='dashboard'>

                <main className="main-content">
                    <FaUserAstronaut className='profile-icon'/>
                    <h2>Welcome, {userData.username}</h2>
                </main>
                <div className="main-header">
                    {/* Video Element to display the camera feed */}
                    <video ref={videoRef} autoPlay={true} className='main-camera'></video>
                </div>
            </div>
        </div>
    );
}

export default UserDashboard;
