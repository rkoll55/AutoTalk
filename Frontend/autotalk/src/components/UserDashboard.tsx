import React, { useEffect, useRef, useState } from 'react';
import '../assets/UserDashboard.css'; // Assuming you have this CSS file created
import logo from '../assets/logo_dark.png'; // Adjust the path accordingly
import {FaUserAstronaut, FaCogs, FaSignOutAlt, FaHandSparkles, FaMedal, FaSignLanguage} from 'react-icons/fa'
import axios from 'axios'; 

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
    const [showMain, setShowMain] = useState(true);
    const [shrink, setShrink] = useState(false);
    const [countdown, setCountdown] = useState<number>(3);
    const [promptText, setPromptText] = useState<string>('');

    useEffect(() => {
        if (!showMain && countdown > 0) {
            const timer = setTimeout(() => {
                setCountdown(prevCount => prevCount - 1);
            }, 1000);
    
            return () => {
                clearTimeout(timer);
            };
        }
    }, [showMain, countdown]);

    useEffect(() => {
        axios
          .get('/api/get-prompt-text') // Replace with your API endpoint
          .then((response) => {
            // Update the prompt text state
            setPromptText(response.data.promptText);
          })
          .catch((error) => {
            console.error('Error fetching prompt text:', error);
          });
      }, []);
    

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


    const handleStart = () => {
        setShrink(true);
        
        // After the shrink completes, re-expand and then toggle the main content
        setTimeout(() => {
            setShrink(false);
            setShowMain(!showMain);
        }, 500); // This should match the transition time you set in the CSS (0.5s = 500ms)
    };

    return (
        <div className="wrapper">
            <nav className="vertical-nav">
                <div className="header-logo">
                    <img src={logo} alt="Logo" />
                </div>
                <ul>
                    <li><a href='#'><FaHandSparkles className='nav-icons'/></a></li>
                    <li><a href='#'><FaMedal className='nav-icons'/></a></li>
                    <li><a href='#'><FaUserAstronaut className='nav-icons'/></a></li>
                    <li><a href='#'><FaCogs className='nav-icons'/></a></li>
                    <li><a href='#'><FaSignOutAlt onClick={handleLogout} className='nav-icons'/></a></li>
                </ul>
            </nav>
            <div className='dashboard'>
                {showMain && (
                <main className={`main-content ${shrink ? 'shrink' : ''}`}>
                    <FaUserAstronaut className='profile-icon'/>
                    <h2>Welcome, {userData.username}</h2>
                    <p>"Welcome to SignQuest – the ultimate fusion of learning and play! Immerse yourself in a world where sign language comes alive as a game. Once you press start, you will receive prompts, express them through sign language to the camera. Get ready to embark on an exciting journey of communication and skill with SignQuest!"</p>
                    <button className="start-button" onClick={handleStart}>
                      <FaHandSparkles/>
                      <span>Start</span>
                    </button>
                </main>
                )}
                {!showMain && countdown>0 && (
                    <main className="main-countdown">
                        {countdown > 0 && <h2 className="countdown-timer">{countdown}</h2>}
                    </main>
                )}
                {!showMain && countdown==0 && (
                    <main className="main-game">
                        <h2 className='game-start'>Game starts now!</h2>
                        <p className='prompt'>{promptText}</p>
                    </main>
                )}
                <div className="main-header">
                    {/* Video Element to display the camera feed */}
                    <video ref={videoRef} autoPlay={true} className='main-camera'></video>
                </div>
            </div>
        </div>
    );
}

export default UserDashboard;
