"use client";

import React from "react";
import { useRouter } from "next/router";

const PaymentSuccess = () => {
    const router = useRouter();

    return (
        <div>
            <h1>Payment Successful!</h1>
            <p>Your payment has been processed successfully.</p>
            <button onClick={() => router.push("/order-details")}>View Order Details</button>
            <button onClick={() => router.push("/")}>Return to Homepage</button>
        </div>
    );
};

export default PaymentSuccess;