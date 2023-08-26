import React from 'react';
import '../assets/UserDashboard.css'
interface UserData {
    username: string;
    email: string;
    memberSince: Date;
}

interface UserDashboardProps {
    userData: UserData;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ userData }) => {
    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Welcome, {userData.username}!</h1>
                <p>Email: {userData.email}</p>
                <p>Member since: {new Intl.DateTimeFormat('en-US').format(userData.memberSince)}</p>
            </header>

            <section className="dashboard-content">
                <h2>Your Actions</h2>
                <ul>
                    <li><a href="/profile">Edit Profile</a></li>
                    <li><a href="/settings">Settings</a></li>
                    <li><a href="/orders">View Orders</a></li>
                    <li><a href="/logout">Logout</a></li>
                </ul>
            </section>
        </div>
    );
}

export default UserDashboard;
