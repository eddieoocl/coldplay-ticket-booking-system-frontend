// scr/app/my-tickets/page.tsx
import Navbar from "../components/navbar/Navbar";
import "../styles/page.css";

const Page = () => {
    return (
        <div className="home-container">
            <div className="home-background"></div>
            <Navbar />
        </div>
    );
};

export default Page;
