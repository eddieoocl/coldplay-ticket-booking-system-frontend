import Navigation from "../components/Navbar";
import "../styles/page.css";
import ConcertList from "@/app/components/ConcertList";

const Concert = () => {
    return (
        <div className="home-container">
            <ConcertList />
            <Navigation />
        </div>
    );
};

export default Concert;
