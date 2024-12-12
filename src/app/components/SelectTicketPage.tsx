"use client";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/app/styles/ConfirmOrderPage.css";
import PersonalInformationPage from "@/app/components/PersonalInformationPage";
import TotalCountTicket from "@/app/components/TotalCountTicket";
import Ticket from "@/app/components/Ticket";
import Merchandise from "@/app/components/Merchandise";
import {
    useCreateOrderMutation,
    useGetMerchandiseByConcertIdQuery,
    useGetTicketTypeByIdQuery,
} from "@/lib/api/apiSlice";
import type { OrderRequest } from "@/types/model/OrderRequest";
import TotalCountMerchandise from "./TotalCountMerchandise";
import { useRouter } from "next/navigation";

const SelectTicketPage: React.FC<{
    concertId: string;
}> = ({ concertId }) => {
    const { data: ticketTypes, isLoading: isLoadingTicketType } =
        useGetTicketTypeByIdQuery({ id: concertId });
    const { data: merchandises, isLoading: isLoadingMerchandise } =
        useGetMerchandiseByConcertIdQuery({ id: concertId });
    const [createOrderMutation] = useCreateOrderMutation();

    const router = useRouter();

    const [orderRequest, setOrderRequest] = useState<OrderRequest>({
        userId: 1,
        phoneNumber: "",
        ticketInfo: [],
        merchandiseInfo: [],
    });

    const handleNext = async () => {
        const { data: order, error } = await createOrderMutation(orderRequest);
        if (error) {
            return;
        }
        router.push(`/confirm-order?orderId=${order.orderId}`);
    };

    function handleReturn() {
        router.back();
    }

    if (
        !merchandises ||
        isLoadingMerchandise ||
        !ticketTypes ||
        isLoadingTicketType
    ) {
        return <div>Loading...</div>;
    }

    return (
        <div className="confirm-order-page">
            <div className="commodity-container">
                {ticketTypes.map((ticketType) => (
                    <Ticket
                        key={ticketType.id}
                        ticketType={ticketType}
                        setOrderRequest={setOrderRequest}
                        orderRequest={orderRequest}
                    />
                ))}
                <TotalCountTicket
                    ticketTypes={ticketTypes}
                    orderRequest={orderRequest}
                />
            </div>
            <PersonalInformationPage
                ticketTypes={ticketTypes}
                orderRequest={orderRequest}
                setOrderRequest={setOrderRequest}
            />
            <div className="commodity-container">
                {merchandises.map((merchandise) => (
                    <Merchandise
                        key={merchandise.merchandiseId}
                        merchandise={merchandise}
                        setOrderRequest={setOrderRequest}
                        orderRequest={orderRequest}
                    />
                ))}
                <TotalCountMerchandise
                    merchandises={merchandises}
                    orderRequest={orderRequest}
                />
            </div>
            <div className="button-container">
                <button onClick={handleReturn}>Return</button>
                <button onClick={handleNext}>Next</button>
            </div>
        </div>
    );
};

export default SelectTicketPage;
