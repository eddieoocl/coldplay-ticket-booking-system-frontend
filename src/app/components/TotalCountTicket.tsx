import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/app/styles/TotalCount.css";
import type { OrderRequest } from "@/types/model/OrderRequest";
import type TicketTypeResponse from "@/types/model/TicketTypeResponse";

const TotalCountTicket: React.FC<{
    ticketTypes: TicketTypeResponse[];
    orderRequest: OrderRequest;
}> = ({ ticketTypes, orderRequest }) => {
    const totalValue = orderRequest.ticketInfo.reduce((acc, ticketInfo) => {
        const unitPrice =
            ticketTypes.find(
                (ticketType) => ticketType.id === ticketInfo.ticketTypeId
            )?.price ?? 0;

        return acc + unitPrice;
    }, 0);

    return (
        <div className="total-count-container">
            <div className="total-count-item">
                <p className="total-count-label">Total Quantity:</p>
                <p className="total-count-value">
                    {orderRequest.ticketInfo.length}
                </p>
            </div>
            <div className="total-count-item">
                <p className="total-count-label">Total Value:</p>
                <p className="total-count-value">${totalValue.toFixed(2)}</p>
            </div>
        </div>
    );
};

export default TotalCountTicket;
