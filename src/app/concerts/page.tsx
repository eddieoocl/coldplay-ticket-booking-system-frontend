import Navbar from "../components/navbar/Navbar";
import "../styles/page.css";
import ConcertList from "@/app/components/ConcertList";

const Concert = () => {
    return (
        <div className="concert-container">
            <Navbar />
            <ConcertList />
        </div>
    );
};

export default Concert;
