"use client";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/app/styles/ConfirmOrderPage.css";
import { useGetOrderByIdQuery } from "@/lib/api/apiSlice";
import { useRouter } from "next/navigation";

//todo set timer
const ConfirmOrderPage: React.FC<{ orderId: number }> = ({ orderId }) => {
    const { data: order, isLoading: isLoadingOrder } = useGetOrderByIdQuery({
        id: orderId,
    });

    const router = useRouter();

    if (!order || isLoadingOrder) {
        return <div>Loading...</div>;
    }

    const { totalPrices, orderTime, orderStatus, ticketInfo, merchandiseInfo } =
        order;

    const handleNext = async () => {
        router.push(`/payment?orderId=${order.orderId}`);
    };

    function handleReturn() {
        router.back();
    }

    return (
        <div className="confirm-order-page">
            {/*todo get order information from backend*/}
            <div className="commodity-container">
                <h1>Order Information</h1>
                <p>Order Id: {orderId}</p>
                <p>Order Time: {orderTime}</p>
                <p>Order Status: {orderStatus}</p>
                <p>Total Prices: {totalPrices}</p>
            </div>
            <div className="commodity-container">
                <h1>Ticket Information</h1>
                {ticketInfo.map((ticket) => (
                    <div key={ticket.id}>
                        <p>Ticket Type: {ticket.ticketType}</p>
                        <p>Price: {ticket.price}</p>
                        <p>Ticket Holder: {ticket.moviegoer}</p>
                    </div>
                ))}
            </div>
            <div className="commodity-container">
                <h1>Merch Information</h1>
                {merchandiseInfo.map((merchandise) => (
                    <div key={merchandise.merchandiseId}>
                        <p>Item: {merchandise.merchandiseName}</p>
                        <p>Price: {merchandise.price}</p>
                        <p>Amount: {merchandise.count}</p>
                    </div>
                ))}
            </div>
            <div className="button-container">
                <button onClick={handleReturn}>Return</button>
                <button onClick={handleNext}>Next</button>
            </div>
        </div>
    );
};

export default ConfirmOrderPage;
