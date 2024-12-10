import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/app/styles/TotalCount.css";

const TotalCount: React.FC = (props) => {
    const { tickets, add_ons } = props;

    const [totalQuantity, setTotalQuantity] = useState(0);
    const [totalValue, setTotalValue] = useState(0);

    const calculateTotalAmount = (items) => {
        return items.reduce((acc, item) => acc + item.amount, 0);
    };
    const calculateTotalFee = (items) => {
        return items.reduce((acc, item) => acc + item.price * item.amount, 0);
    };

    useEffect(() => {
        const calculateTotals = () => {
            var totalTicketAmount = 0;
            var totalAddOnAmount = 0;
            var totalTicketFee = 0;
            var totalAddOnFee = 0;
            if (tickets) {
                totalTicketAmount = calculateTotalAmount(tickets);
                totalTicketFee = calculateTotalFee(tickets);
            }
            if (add_ons) {
                totalAddOnAmount = calculateTotalAmount(add_ons);
                totalAddOnFee = calculateTotalFee(add_ons);
            }
            const totalAmount = totalTicketAmount + totalAddOnAmount;
            const totalVal = totalTicketFee + totalAddOnFee;
            setTotalQuantity(totalAmount);
            setTotalValue(totalVal);
        };

        calculateTotals();
    }, [tickets, add_ons]);

    return (
        <div className="total-count-container">
            <div className="total-count-item">
                <p className="total-count-label">Total Quantity:</p>
                <p className="total-count-value">{totalQuantity}</p>
            </div>
            <div className="total-count-item">
                <p className="total-count-label">Total Value:</p>
                <p className="total-count-value">${totalValue.toFixed(2)}</p>
            </div>
        </div>
    );
};

export default TotalCount;
