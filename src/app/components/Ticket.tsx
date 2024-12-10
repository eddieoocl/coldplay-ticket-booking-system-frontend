import "bootstrap/dist/css/bootstrap.min.css";
import "@/app/styles/Commodity.css";
import TicketTypeResponse from "../../types/model/TicketTypeResponse";
import React from "react";

const Ticket: React.FC<{ commodity: TicketTypeResponse }> = (props) => {
    const { commodity, setTickets, setPersonalInformation } = props;
    const { readOnly } = props;
    const { name,id, typeName, typeId, amount, price, description, seating } =
        props.commodity;
    const [commodityAmount, setCommodityAmount] = React.useState<number>(0);
    const total = (price * commodityAmount).toFixed(2);

    const updateAmount = (newAmount) => {
        if (newAmount < 0) {
            (preTickets) => preTickets.filter((ticket) => ticket.id !== id);
        } else {
            if (newAmount > commodityAmount) {
                setPersonalInformation((prevInfo) => [
                    ...prevInfo,
                    {
                        typeId: id,
                        ticket_type: name,
                        first_name: "",
                        last_name: "",
                        phone: "",
                        email: "",
                    },
                ]);
            } else {
                setPersonalInformation((prevInfo) =>
                    prevInfo.filter((info) => info.id !== id)
                );
            }
            setCommodityAmount(newAmount);
            setTickets((prevTickets) => {
                console.log("prevTickets", prevTickets);
                if (prevTickets.length === 0 || !prevTickets.some(ticket => ticket.id === id)) {
                    return [...prevTickets, { ...commodity, amount: newAmount }];
                }
                return prevTickets.map((ticket) =>
                    ticket.id === id ? { ...ticket, amount: newAmount } : ticket
            );
            });
        }
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

export default Ticket;
