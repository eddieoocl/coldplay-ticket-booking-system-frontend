"use client";
import { useState, useEffect } from "react";

export default function PaymentPage() {
    const [paymentMethod, setPaymentMethod] = useState("");
    const [cardDetails, setCardDetails] = useState({
        cardNumber: "",
        expiry: "",
        cvv: "",
        paypalAccount: "",
    });
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
    const [totalAmount, setTotalAmount] = useState(0); // Initialize total amount

    useEffect(() => {
        // Fetch total amount from the backend
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/payments/total-amount`)
            .then((response) => response.json())
            .then((data) => setTotalAmount(data))
            .catch((error) => console.error("Error fetching total amount:", error));

        if (timeLeft === 0) {
            window.location.reload();
        }

        const timer = setInterval(() => {
            setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    const handlePayment = () => {
        if (paymentMethod === "creditCard") {
            if (cardDetails.cardNumber && cardDetails.expiry && cardDetails.cvv) {
                setPaymentSuccess(true);
            } else {
                alert("Please provide complete credit card information");
            }
        } else if (paymentMethod === "paypal") {
            if (cardDetails.paypalAccount) {
                setPaymentSuccess(true);
            } else {
                alert("Please enter PayPal account information");
            }
        } else {
            alert("Please choose a payment method");
        }
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-10">
            <h1 className="text-2xl font-bold mb-6">Payment page</h1>
            <div className="w-full max-w-md border p-4 rounded-md shadow-md bg-white">
                {/* Order details */}
                <div className="mb-4">
                    <h2 className="text-lg font-semibold">Your order</h2>
                    <p>Amount of money: ${totalAmount ? totalAmount.toFixed(2) : "0.00"}</p>
                </div>

                {/* Payment method selection */}
                <div className="mb-4">
                    <h2 className="text-lg font-semibold">Choose payment method</h2>
                    <div className="flex gap-4">
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="creditCard"
                                checked={paymentMethod === "creditCard"}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                            Credit Cards Accepted
                        </label>
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="paypal"
                                checked={paymentMethod === "paypal"}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                            PayPal payment
                        </label>
                    </div>
                </div>

                {/* Image display - Add Credit Cards and PayPal images */}
                <div className="flex gap-8 mb-4">
                    <img
                        src="/images/CreditCard.jpg"
                        alt="Credit Cards"
                        className="w-25 h-20 object-cover"
                    />
                    <img
                        src="/images/PayPal.jpg"
                        alt="PayPal"
                        className="w-25 h-20 object-cover"
                    />
                </div>

                {/* Payment details input */}
                {paymentMethod === "creditCard" && (
                    <div className="mb-4">
                        <h2 className="text-lg font-semibold">Enter credit card information</h2>
                        <div className="flex flex-col gap-2">
                            <input
                                type="text"
                                placeholder="Card number"
                                className="border p-2 rounded"
                                value={cardDetails.cardNumber}
                                onChange={(e) =>
                                    setCardDetails({ ...cardDetails, cardNumber: e.target.value })
                                }
                            />
                            <input
                                type="text"
                                placeholder="period of validity (MM/YY)"
                                className="border p-2 rounded"
                                value={cardDetails.expiry}
                                onChange={(e) =>
                                    setCardDetails({ ...cardDetails, expiry: e.target.value })
                                }
                            />
                            <input
                                type="text"
                                placeholder="CVV"
                                className="border p-2 rounded"
                                value={cardDetails.cvv}
                                onChange={(e) =>
                                    setCardDetails({ ...cardDetails, cvv: e.target.value })
                                }
                            />
                        </div>
                    </div>
                )}

                {paymentMethod === "paypal" && (
                    <div className="mb-4">
                        <h2 className="text-lg font-semibold">Enter PayPal account</h2>
                        <div className="flex flex-col gap-2">
                            <input
                                type="text"
                                placeholder="PayPal account"
                                className="border p-2 rounded"
                                value={cardDetails.paypalAccount}
                                onChange={(e) =>
                                    setCardDetails({ ...cardDetails, paypalAccount: e.target.value })
                                }
                            />
                        </div>
                    </div>
                )}

                {/* Submit button */}
                <div className="mb-4 text-center">
                    <p>Remaining Payment Time: {formatTime(timeLeft)}</p>
                </div>
                <button
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                    onClick={handlePayment}
                >
                    Confirm Payment
                </button>
            </div>

            {/* Payment success modal */}
            {paymentSuccess && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded shadow-md">
                        <h2 className="text-lg font-bold mb-4">Payment successful!</h2>
                        <p>Order No: 123456789</p>
                        <p>Payment method: {paymentMethod === "creditCard" ? "Credit Cards Accepted" : "PayPal payment"}</p>
                        <p>Amount of money: ${totalAmount.toFixed(2)}</p>
                        <button
                            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                            onClick={() => setPaymentSuccess(false)}
                        >
                            Return to homepage
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}