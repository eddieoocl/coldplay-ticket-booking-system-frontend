"use client";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/app/styles/ConfirmOrderPage.css";
import data from "../mockdata/data.json";
import PersonalInformationPage from "@/app/components/PersonalInformationPage";
import TotalCount from "@/app/components/TotalCount";
import Ticket from "@/app/components/Ticket";
import AddOn from "@/app/components/AddOn";

//todo set timer
const SelectCommodityPage: React.FC = () => {
    const [tickets, setTickets] = useState(data.ticketsType);
    const [add_ons, setAddOns] = useState(data.add_ons);
<<<<<<< HEAD
    const [personal_information, setPersonalInformation] = useState(
        data.personal_information
    );
=======
    const [personal_information, setPersonalInformation] = useState(data.personal_information);
>>>>>>> 3d9e090 ([commodity selection] feat: change commodity selection page)

    return (
        <div className="confirm-order-page">
            <div className="commodity-container">
                {tickets.map((ticket) => (
<<<<<<< HEAD
                    <Ticket
                        key={ticket.id}
                        commodity={ticket}
                        setTickets={setTickets}
                        setPersonalInformation={setPersonalInformation}
                    />
                ))}
                <TotalCount tickets={tickets}></TotalCount>
            </div>
            <PersonalInformationPage
                tickets={tickets}
                personal_information={personal_information}
                setPersonalInformation={setPersonalInformation}
            />
            <div className="commodity-container">
                <div>
                    <button
                        className="side-button"
                        onClick={() =>
                            (window.location.href = "/ConfirmLoading")
                        }
                    >
                        More Add-Ons
                    </button>
                </div>
                {add_ons.map((add_on) => (
                    <AddOn
                        key={add_on.id}
                        commodity={add_on}
                        setAddOns={setAddOns}
                    />
=======
                    <Ticket key={ticket.id} commodity={ticket} setTickets={setTickets} setPersonalInformation={setPersonalInformation}/>
                ))}
                <TotalCount tickets={tickets}></TotalCount>
            </div>
            <PersonalInformationPage tickets={tickets} personal_information={personal_information} setPersonalInformation={setPersonalInformation} />
            <div className="commodity-container">
                <div>
                    <button className="side-button" onClick={() => window.location.href = "/ConfirmLoading"}>More Add-Ons
                    </button>
                </div>
                {add_ons.map((add_on) => (
                    <AddOn key={add_on.id} commodity={add_on} setAddOns={setAddOns} />
>>>>>>> 3d9e090 ([commodity selection] feat: change commodity selection page)
                ))}

                <TotalCount add_ons={add_ons}></TotalCount>
            </div>
            <TotalCount tickets={tickets} add_ons={add_ons} />

            {/*todo commit call api*/}
            <div className="button-container">
<<<<<<< HEAD
                <button onClick={() => (window.location.href = "/concert")}>
                    Return
                </button>
                <button
                    onClick={() => (window.location.href = "/confirm-order")}
                >
                    Next
                </button>
=======
                <button onClick={() => window.location.href = "/concert"}>Return</button>
                <button onClick={() => window.location.href = "/confirm"}>Next</button>
>>>>>>> 3d9e090 ([commodity selection] feat: change commodity selection page)
            </div>
        </div>
    );
};

<<<<<<< HEAD
export default SelectCommodityPage;
=======
export default SelectCommodityPage;
>>>>>>> 3d9e090 ([commodity selection] feat: change commodity selection page)
