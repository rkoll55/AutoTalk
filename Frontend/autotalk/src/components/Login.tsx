// Login.tsx
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import '../assets/Login.css'; // Importing the CSS file
import logo from '../assets/logo_dark.png'; // Adjust the path accordingly

interface LoginProps {
    onLoginSuccess: (username: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (username && password) {
            onLoginSuccess(username);
        } else {
            setError('Please provide both username and password.');
        }
    };

    useEffect(() => {
        document.body.classList.add('login-page');

        return () => {
            document.body.classList.remove('login-page');
        };
    }, []);

    return (
        <div className="login-container">
            <div className="logo">
                <img src={logo} alt="Logo" />
            </div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                {error && <div className="error">{error}</div>}
                <div className="input-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Login</button>
                <div className="signup-link">
                or <a href="/signup">Sign up today</a>
            </div>
            </form>
        </div>
    );
}

export default Login;
