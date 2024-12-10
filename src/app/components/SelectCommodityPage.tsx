"use client";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/app/styles/ConfirmOrderPage.css";
import data from "../mockdata/data.json";
import PersonalInformationPage from "@/app/components/PersonalInformationPage";
import TotalCount from "@/app/components/TotalCount";
import Ticket from "@/app/components/Ticket";
import AddOn from "@/app/components/AddOn";
import { redirect } from "next/navigation";
import { useGetTicketTypeByIdQuery } from "@/lib/api/apiSlice";


//todo set timer
const SelectCommodityPage: React.FC = () => {
    const { data: ticketsType    ,name,price } = useGetTicketTypeByIdQuery({ id:2 as string });
    console.log("data",typeof ticketsType);
    const [tickets, setTickets] = useState([]);
    const [add_ons, setAddOns] = useState(data.add_ons);
    const [personal_information, setPersonalInformation] = useState(data.personal_information);
    console.log("Ticket",tickets);
    function handleClick() {
            redirect(`/confirm-order`);
    }
    function handleReturn() {
        redirect(`/concert/2`);
    }

    return (
        <div className="confirm-order-page">
            <div className="commodity-container">
                {
                    ticketsType && Object.keys(ticketsType).map((key) => (
                    <Ticket key={ticketsType[key].id} commodity={ticketsType[key]} setTickets={setTickets} setPersonalInformation={setPersonalInformation}/>
                    ))
                }
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
                ))}

                <TotalCount add_ons={add_ons}></TotalCount>
            </div>
            <TotalCount tickets={data.tickets} add_ons={add_ons} />

            {/*todo commit call api*/}
            <div className="button-container">
                <button onClick={handleReturn}>Return</button>
                <button onClick={handleClick}>Next</button>
            </div>
        </div>
    );
};

export default SelectCommodityPage;