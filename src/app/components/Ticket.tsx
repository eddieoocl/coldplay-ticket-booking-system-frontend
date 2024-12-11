import "bootstrap/dist/css/bootstrap.min.css";
import "@/app/styles/Commodity.css";
import type TicketTypeResponse from "../../types/model/TicketTypeResponse";
import React from "react";
import type { OrderRequest } from "@/types/model/OrderRequest";

const Ticket: React.FC<{
    ticketType: TicketTypeResponse;
    setOrderRequest: React.Dispatch<React.SetStateAction<OrderRequest>>;
    orderRequest: OrderRequest;
    readOnly?: boolean;
}> = ({ ticketType, setOrderRequest, orderRequest, readOnly = false }) => {
    const { id, name, price } = ticketType;
    const amount = orderRequest?.ticketInfo.filter(
        (ticketInfo) => ticketInfo.ticketTypeId == id
    ).length;
    const total = (price * amount).toFixed(2);

    const handleIncrease = () => {
        setOrderRequest((prev) => {
            return {
                ...prev,
                ticketInfo: [
                    ...prev.ticketInfo,
                    {
                        ticketTypeId: id,
                        moviegoer: "",
                    },
                ],
            };
        });
    };

    const handleDecrease = () => {
        setOrderRequest((prev) => {
            const ticketInfo = [...prev.ticketInfo];
            const index = ticketInfo
                .map((item) => item.ticketTypeId)
                .lastIndexOf(id);
            if (index !== -1) {
                ticketInfo.splice(index, 1);
            }
            return {
                ...prev,
                ticketInfo,
            };
        });
    };

    return (
        <div className="order-entry">
            <div className="commodity-info">
                <p className="commodity-name">
                    {name && (
                        <span className="commodity-seating">
                            Seating Type: {name}
                        </span>
                    )}
                </p>
            </div>
            <div className="commodity-details">
                <p>Amount: {amount}</p>
                {/*todo currency symbol*/}
                <p>Price: ${price.toFixed(2)}</p>
                <p>Total: ${total}</p>
            </div>
            {!readOnly && (
                <div className="button-container">
                    <button className="round-button" onClick={handleIncrease}>
                        +
                    </button>
                    <button className="round-button" onClick={handleDecrease}>
                        -
                    </button>
                </div>
            )}
        </div>
    );
};

export default Ticket;
