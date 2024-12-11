import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import type { OrderRequest } from "@/types/model/OrderRequest";
import type TicketTypeResponse from "@/types/model/TicketTypeResponse";

const PersonalInformationPage: React.FC<{
    ticketTypes: TicketTypeResponse[];
    setOrderRequest: React.Dispatch<React.SetStateAction<OrderRequest>>;
    orderRequest: OrderRequest;
    readOnly?: boolean;
}> = ({ ticketTypes, setOrderRequest, orderRequest, readOnly = false }) => {
    const handleNameChange = (index: number, value: string) => {
        setOrderRequest((prev) => {
            return {
                ...prev,
                ticketInfo: prev.ticketInfo.map((ticketInfo, i) => {
                    if (i === index) {
                        return {
                            ...ticketInfo,
                            moviegoer: value,
                        };
                    }
                    return ticketInfo;
                }),
            };
        });
    };

    return (
        <div className="personal-info-container">
            <h2>Personal Information</h2>
            <div className="table-responsive">
                <table className="table table-white">
                    <thead>
                        <tr>
                            <th>Ticket Type</th>
                            <th>Moviegoer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderRequest.ticketInfo.map((ticketInfo, index) => {
                            const ticketType = ticketTypes.find(
                                (ticket) =>
                                    ticket.id === ticketInfo.ticketTypeId
                            );
                            return (
                                <tr key={index}>
                                    <td>
                                        <input
                                            type="text"
                                            value={ticketType?.name}
                                            readOnly
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            value={ticketInfo.moviegoer}
                                            readOnly={readOnly}
                                            onChange={(event) => {
                                                handleNameChange(
                                                    index,
                                                    event.target.value
                                                );
                                            }}
                                        />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default PersonalInformationPage;
