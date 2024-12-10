// src/app/profile/page.tsx
import Navbar from '../components/navbar/Navbar';
import '../styles/page.css';

const UserProfile = () => {
    return (
        <div className="home-container">
            <div className="home-background"></div>
            <Navbar />
        </div>
    );
};

export default UserProfile;