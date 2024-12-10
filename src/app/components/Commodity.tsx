import "bootstrap/dist/css/bootstrap.min.css";
import "@/app/styles/Commodity.css";
import React from "react";

const Commodity: React.FC = (props) => {
    const { commodity } = props;
    const { name, price, amount, description, seating } = commodity;
    const [commodityAmount, setCommodityAmount] = React.useState(amount);
    const total = (price * commodityAmount).toFixed(2);
    return (
        <div className="order-entry">
            <div className="commodity-info">
                <p className="commodity-name">
                    {name}
                    {seating &&<span className="commodity-seating">Seating Type: {seating}</span>}
                </p>
                <p className="commodity-description">{description}</p>
            </div>
            <div className="commodity-details">
                <p>Amount: {commodityAmount}</p>
                <p>Price: {price}</p>
                <p>Total: {total}</p>
            </div>
            <div>
                <button onClick={() => setCommodityAmount(commodityAmount + 1)}>+</button>
                <button onClick={() => setCommodityAmount(commodityAmount - 1)}>-</button>
            </div>

        </div>
    );
};

export default Commodity