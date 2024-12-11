"use client";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/app/styles/ConfirmOrderPage.css";
import { useGetOrderByIdQuery } from "@/lib/api/apiSlice";

//todo set timer
const ConfirmOrderPage: React.FC<{ orderId: number }> = ({ orderId }) => {
    const { data: order, isLoading: isLoadingOrder } = useGetOrderByIdQuery({
        id: orderId,
    });

    if (!order || isLoadingOrder) {
        return <div>Loading...</div>;
    }

    const { totalPrices, orderTime, orderStatus, ticketInfo, merchandiseInfo } =
        order;

    return (
        <div className="confirm-order-page">
            {/*todo get order information from backend*/}
            <div className="commodity-container">
                <h1>Order Information</h1>
                <p>Order Id:{orderId}</p>
                <p>Order Time:{orderTime}</p>
                <p>Order Status:{orderStatus}</p>
            </div>
        </div>
    );
};

export default ConfirmOrderPage;
