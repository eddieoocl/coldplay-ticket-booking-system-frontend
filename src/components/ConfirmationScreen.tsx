// ConfirmationScreen.tsx
import React from "react";

const ConfirmationScreen: React.FC = () => {
    return (
        <div>
            <h1>Payment Successful!</h1>
            <p>Your order has been confirmed.</p>
            <button onClick={() => (window.location.href = "/order-details")}>
                View Order Details
            </button>
            <button onClick={() => (window.location.href = "/")}>
                Return to Homepage
            </button>
        </div>
    );
};

export default ConfirmationScreen;
