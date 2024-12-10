import "bootstrap/dist/css/bootstrap.min.css";
import "@/app/styles/Commodity.css";
import React from "react";

//todo addon props type is not defined
const AddOn: React.FC = (props) => {
    const { commodity, setAddOns } = props;
    const { readOnly } = props;
    const { id, name, amount, description, price } = commodity;
    const [commodityAmount, setCommodityAmount] = React.useState(amount);

    //todo the amount reduce to 0,alert ,agree then remove
    const updateAmount = (newAmount) => {
        if (newAmount < 0) {
            alert("Amount cannot be negative.");
            return;
        }
        if (newAmount === 0) {
            if (window.confirm("Amount is zero. Do you want to remove this item?")) {
                setAddOns((prevAddOns) =>
                    prevAddOns.filter((add_on) => add_on.id !== id)
                );
            }
        } else {
            setCommodityAmount(newAmount);
            setAddOns((prevAddOns) =>
                prevAddOns.map((add_on) =>
                    add_on.id === id ? { ...add_on, amount: newAmount } : add_on
                )
            );
        }
    };

    const total = (price * commodityAmount).toFixed(2);

    return (
        <div className="order-entry">
            <div className="commodity-info">
                <p className="commodity-name">{name}</p>
                <p className="commodity-description">{description}</p>
            </div>
            <div className="commodity-details">
                <p>Amount: {commodityAmount}</p>
                {/*todo currency symbol*/}
                <p>Price: ${price}</p>
                <p>Total: ${total}</p>
            </div>
            {!readOnly && (
                <div className="button-container">
                    <button
                        className="round-button"
                        onClick={() => updateAmount(commodityAmount + 1)}
                    >
                        +
                    </button>
                    <button
                        className="round-button"
                        onClick={() => updateAmount(commodityAmount - 1)}
                    >
                        -
                    </button>
                </div>
            )}
        </div>
    );
};

export default AddOn;
