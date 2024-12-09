// scr/app/my-tickets/page.tsx
import Navigation from '../components/Navbar';
import '../styles/page.css';

const Page = () => {
    return (
        <div className="home-container">
            <div className="home-background"></div>
            <Navigation />
        </div>
    );
};

export default Page;