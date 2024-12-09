"use client";

import React, { useState } from "react";

const PaymentForm = () => {
    const [paymentMethod, setPaymentMethod] = useState("creditCard");
    const [cardNumber, setCardNumber] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [cvv, setCvv] = useState("");
    const [error, setError] = useState("");

    const handlePaymentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Validate payment details
        if (!cardNumber || !expiryDate || !cvv) {
            setError("Please fill in all required fields.");
            return;
        }
        // Process payment securely
        try {
            // Replace with actual payment processing logic
            const response = await fetch("/api/process-payment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ paymentMethod, cardNumber, expiryDate, cvv }),
            });
            if (response.ok) {
                window.location.href = "/payment-success";
            } else {
                setError("Payment failed. Please try again.");
            }
        } catch (error) {
            setError("An error occurred. Please try again.");
        }
    };

    return (
        <form onSubmit={handlePaymentSubmit}>
            <h2>Payment Details</h2>
            <div>
                <label>
                    Payment Method:
                    <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                        <option value="creditCard">Credit Card</option>
                        <option value="paypal">PayPal</option>
                    </select>
                </label>
            </div>
            {paymentMethod === "creditCard" && (
                <>
                    <div>
                        <label>
                            Card Number:
                            <input
                                type="text"
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                                required
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Expiry Date:
                            <input
                                type="text"
                                value={expiryDate}
                                onChange={(e) => setExpiryDate(e.target.value)}
                                required
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            CVV:
                            <input
                                type="text"
                                value={cvv}
                                onChange={(e) => setCvv(e.target.value)}
                                required
                            />
                        </label>
                    </div>
                </>
            )}
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button type="submit">Submit Payment</button>
        </form>
    );
};

export default PaymentForm;