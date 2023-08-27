import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import UserDashboard from './components/UserDashboard';

const mockUserData = {
  username: 'JohnDoe',
  email: 'johndoe@example.com',
  memberSince: new Date('2021-01-01')
}

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  const handleLoginSuccess = (username: string) => {
      setIsLoggedIn(true);
      setCurrentUser(username);
  };

  if (isLoggedIn && currentUser) {
      // return <h1>Welcome, {currentUser}!</h1>;
      return <UserDashboard userData={mockUserData} setIsLoggedIn={setIsLoggedIn}/>
  }

    return <UserDashboard userData={mockUserData} setIsLoggedIn={setIsLoggedIn}/>
  // return <Login onLoginSuccess={handleLoginSuccess} />;
}

export default App;
