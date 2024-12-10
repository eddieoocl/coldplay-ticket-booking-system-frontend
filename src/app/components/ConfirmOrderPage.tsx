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
const ConfirmOrderPage: React.FC = () => {
    const [tickets, setTickets] = useState(data.tickets);
    const [add_ons, setAddOns] = useState(data.add_ons);
    const [personal_information, setPersonalInformation] = useState(data.personal_information);
    const readyOnly=true;

    return (
        <div className="confirm-order-page">
            {/*todo get order information from backend*/}
            <div className="commodity-container">
                <h1>Order Information</h1>
                <p>Order Id:xxxx</p>
                <p>Order time:xxxx</p>
            </div>
            <div className="commodity-container">
                {tickets.map((ticket) => (
                    <Ticket key={ticket.id} commodity={ticket}  readOnly={readyOnly}/>
                ))}
                <TotalCount tickets={tickets}></TotalCount>
            </div>
            <div className="commodity-container">
                    {add_ons.map((add_on) => (
                        <AddOn key={add_on.id} commodity={add_on} setAddOns={setAddOns} readOnly={readyOnly}/>
                    ))}
                <TotalCount add_ons={add_ons}></TotalCount>
            </div>
            <PersonalInformationPage personal_information={personal_information} setPersonalInformation={setPersonalInformation} readOnly={readyOnly}/>
            <TotalCount tickets={tickets} add_ons={add_ons} />
            <div className="button-container">
                <button onClick={() => window.location.href = "/payment"}>pay now</button>
            </div>
        </div>
    );
};

export default ConfirmOrderPage;