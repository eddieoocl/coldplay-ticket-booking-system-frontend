// src/app/profile/page.tsx
import Navigation from '../components/Navbar';
import '../styles/page.css';

const UserProfile = () => {
    return (
        <div className="home-container">
            <div className="home-background"></div>
            <Navigation />
        </div>
    );
};

export default UserProfile;