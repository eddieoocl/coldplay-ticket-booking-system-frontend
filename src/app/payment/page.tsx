"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import "./page.css";
import {
    useGetOrderByIdQuery,
    useUpdateOrderStatusMutation,
} from "@/lib/api/apiSlice";

export default function PaymentPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const orderId = searchParams.get("orderId");

    const [paymentMethod, setPaymentMethod] = useState("");
    const [cardDetails, setCardDetails] = useState({
        cardNumber: "",
        expiry: "",
        cvv: "",
        paypalAccount: "",
    });
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    const cardNumberRegex = /^\d{16}$/;
    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/; // MM/YY
    const cvvRegex = /^\d{3}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email format

    const { data: order, isLoading: isLoadingOrder } = useGetOrderByIdQuery({
        id: Number(orderId ?? 0),
    });

    const [updateOrderStatus] = useUpdateOrderStatusMutation();

    if (!orderId) {
        return <div>Invalid order id</div>;
    }

    if (!order || isLoadingOrder) {
        return <div>Loading...</div>;
    }

    const handleUpdateOrderStatus = async (status: string) => {
        try {
            await updateOrderStatus({
                id: orderId,
                status: status,
            });
        } catch (error) {
            console.error("Failed to update order status:", error);
        }
    };

    const handlePayment = () => {
        if (paymentMethod === "creditCard") {
            if (
                cardNumberRegex.test(cardDetails.cardNumber) &&
                expiryRegex.test(cardDetails.expiry) &&
                cvvRegex.test(cardDetails.cvv)
            ) {
                handleUpdateOrderStatus("PAID");
                setPaymentSuccess(true);
            } else {
                alert("Please provide valid credit card information");
            }
        } else if (paymentMethod === "paypal") {
            if (emailRegex.test(cardDetails.paypalAccount)) {
                handleUpdateOrderStatus("PAID");
                setPaymentSuccess(true);
            } else {
                alert("Please enter a valid PayPal email address");
            }
        } else {
            alert("Please choose a payment method");
        }
    };

    const { totalPrices } = order;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-10 paymentPage">
            <h1 className="text-2xl font-bold mb-6">Payment page</h1>
            <div className="w-full max-w-md border p-4 rounded-md shadow-md bg-white">
                {/* Order details */}
                <div className="mb-4">
                    <h2 className="text-lg font-semibold">Your order</h2>
                    <p>Amount of money: ${totalPrices}</p>
                </div>

                {/* Payment method selection */}
                <div className="mb-4">
                    <h2 className="text-lg font-semibold">
                        Choose payment method
                    </h2>
                    <div className="flex gap-4">
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="creditCard"
                                checked={paymentMethod === "creditCard"}
                                onChange={(e) =>
                                    setPaymentMethod(e.target.value)
                                }
                            />
                            Credit Cards Accepted
                        </label>
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="paypal"
                                checked={paymentMethod === "paypal"}
                                onChange={(e) =>
                                    setPaymentMethod(e.target.value)
                                }
                            />
                            PayPal payment
                        </label>
                    </div>
                </div>

                {/* Image display - Add Credit Cards and PayPal images */}
                <div className="flex gap-8 mb-4">
                    <img
                        src="/image/CreditCard.jpg"
                        alt="Credit Cards"
                        className="w-25 h-20 object-cover"
                    />
                    <img
                        src="/image/PayPal.jpg"
                        alt="PayPal"
                        className="w-25 h-20 object-cover"
                    />
                </div>

                {/* Payment details input */}
                {paymentMethod === "creditCard" && (
                    <div className="mb-4">
                        <h2 className="text-lg font-semibold">
                            Enter credit card information
                        </h2>
                        <div className="flex flex-col gap-2">
                            <input
                                type="text"
                                placeholder="Card number"
                                className="border p-2 rounded"
                                value={cardDetails.cardNumber}
                                onChange={(e) =>
                                    setCardDetails({
                                        ...cardDetails,
                                        cardNumber: e.target.value,
                                    })
                                }
                            />
                            <input
                                type="text"
                                placeholder="period of validity (MM/YY)"
                                className="border p-2 rounded"
                                value={cardDetails.expiry}
                                onChange={(e) =>
                                    setCardDetails({
                                        ...cardDetails,
                                        expiry: e.target.value,
                                    })
                                }
                            />
                            <input
                                type="text"
                                placeholder="CVV"
                                className="border p-2 rounded"
                                value={cardDetails.cvv}
                                onChange={(e) =>
                                    setCardDetails({
                                        ...cardDetails,
                                        cvv: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>
                )}

                {paymentMethod === "paypal" && (
                    <div className="mb-4">
                        <h2 className="text-lg font-semibold">
                            Enter PayPal account
                        </h2>
                        <div className="flex flex-col gap-2">
                            <input
                                type="text"
                                placeholder="PayPal account"
                                className="border p-2 rounded"
                                value={cardDetails.paypalAccount}
                                onChange={(e) =>
                                    setCardDetails({
                                        ...cardDetails,
                                        paypalAccount: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>
                )}

                {/* Submit button */}
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
                    <div className="abc bg-white p-6 rounded shadow-md">
                        <h2 className="text-lg font-bold mb-4">
                            Payment successful!
                        </h2>
                        <p>Order No: {orderId}</p>
                        <p>
                            Payment method:{" "}
                            {paymentMethod === "creditCard"
                                ? "Credit Cards Accepted"
                                : "PayPal payment"}
                        </p>
                        <p>Amount of money: ${totalPrices}</p>
                        <button
                            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                            onClick={() => {
                                setPaymentSuccess(false);
                                window.open(`/order?orderId=${orderId}`);
                                router.push("/");
                            }}
                        >
                            Go to get Ticket
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
