import React, { useEffect, useRef, useState } from 'react';
import '../assets/UserDashboard.css'; // Assuming you have this CSS file created
import logo from '../assets/logo_dark.png'; // Adjust the path accordingly
import {FaUserAstronaut, FaCogs, FaSignOutAlt, FaHandSparkles, FaMedal, FaSignLanguage, FaThumbsUp} from 'react-icons/fa'
import axios from 'axios'; 

type UserDashboardProps = {
  userName: string; // Change the type to string
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  
};

const UserDashboard: React.FC<UserDashboardProps> = ({ userName, setIsLoggedIn }) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [showMain, setShowMain] = useState(true);
    const [shrink, setShrink] = useState(false);
    const [countdown, setCountdown] = useState<number>(3);
    const [splitPhrases, setSplitPhrases] = useState<JSX.Element[]>([]);
    const [promptText, setPromptText] = useState<string>('');
    const [activePhraseIndex, setActivePhraseIndex] = useState<number>(-1); // Initialize to -1

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

      // Simulate API response
  const dummyApiResponse = {
    promptText: "Why ! are you ! here?"
  };

  useEffect(() => {
    // Simulate API call
    // Replace this with your actual API call if needed
    const simulateApiCall = () => {
      return new Promise<{ promptText: string }>((resolve) => {
        setTimeout(() => {
          resolve(dummyApiResponse);
        }, 1000);
      });
    };

    simulateApiCall()
    .then((response) => {
        const promptText = response.promptText;
        const phrases = promptText.split('!').map((phrase: string, index: number) => (
          <span
            key={index}
            className={index <= activePhraseIndex ? 'active-text' : 'inactive-text'}
            onClick={() => handlePhraseClick(index)}
          >
            {phrase.trim()}
            {index !== promptText.split('!').length - 1 && ' '} {/* Add space except for the last phrase */}
          </span>
        ));
        setSplitPhrases(phrases);
      })
      .catch((error) => {
        console.error('Error fetching prompt text:', error);
      });
  }, [activePhraseIndex]);
    

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


    const handlePhraseClick = (index: number) => {
        setActivePhraseIndex(index);
        const updatedPhrases = splitPhrases.map((phrase, i) => (
        <span
            key={i}
            className={i <= index ? 'green-text' : 'grey-text'}
            onClick={() => handlePhraseClick(i)}
        >
            {phrase.props.children}
        </span>
        ));
        setSplitPhrases(updatedPhrases);
    };

    const handleStart = () => {
        setShrink(true);
        
        // After the shrink completes, re-expand and then toggle the main content
        setTimeout(() => {
            setShrink(false);
            setShowMain(!showMain);
        }, 500); // This should match the transition time you set in the CSS (0.5s = 500ms)
    };
    const handleGameStartClick = () => {
        setActivePhraseIndex(prevIndex => prevIndex + 1);
    };
    const isEntirePromptActive = activePhraseIndex === splitPhrases.length - 1;

    

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
                    <h2>Welcome, {userName}</h2>
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
                        <h2 onClick={handleGameStartClick} className='game-start'>Game starts now!</h2>
                        {/* <p className='prompt'>{promptText}</p> */}
                        <p className="prompt">
                            {splitPhrases.map((phrase, index) => (
                                <span
                                    key={index}
                                    className="grey-text"
                                    onClick={() => handlePhraseClick(index)}
                                >
                                    {phrase}
                                </span>
                            ))}
                        </p>
                        {isEntirePromptActive && (
                            <div className='finished-line'>
                                <FaThumbsUp className='icon-done'/>
                                <p className='prompt-done'>Congratulations</p>
                            </div>
                        )}
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
