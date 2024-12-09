"use client";

import { useState } from "react";

export default function PaymentPage() {
    const [paymentMethod, setPaymentMethod] = useState("");
    const [cardDetails, setCardDetails] = useState({
        cardNumber: "",
        expiry: "",
        cvv: "",
        paypalAccount: "",
    });
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    const handlePayment = () => {
        // 模拟支付验证逻辑
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

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-10">
            <h1 className="text-2xl font-bold mb-6">Payment page</h1>
            <div className="w-full max-w-md border p-4 rounded-md shadow-md bg-white">
                {/* 订单详情 */}
                <div className="mb-4">
                    <h2 className="text-lg font-semibold">Order details</h2>
                    <p>Product: The first test product</p>
                    <p>amount of money：¥0.01</p>
                </div>

                {/* 支付方式选择 */}
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

                {/* 图片展示 - 添加 Credit Cards 和 PayPal 图片 */}
                <div className="flex gap-8 mb-4">
                    <img
                        src="/images/CreditCard.jpg"
                        alt="Credit Cards"
                        className="w-25 h-20 object-cover" // 设置图片宽高一致
                    />
                    <img
                        src="/images/PayPal.jpg"
                        alt="PayPal"
                        className="w-25 h-20 object-cover" // 设置图片宽高一致
                    />
                </div>

                {/* 支付详情输入 */}
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

                {/* 提交按钮 */}
                <button
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                    onClick={handlePayment}
                >
                    Confirm Payment
                </button>
            </div>

            {/* 支付成功弹窗 */}
            {paymentSuccess && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded shadow-md">
                        <h2 className="text-lg font-bold mb-4">pay success！</h2>
                        <p>Order No：123456789</p>
                        <p>Payment method：{paymentMethod === "creditCard" ? "Credit Cards Accepted" : "PayPal payment"}</p>
                        <p>amount of money：¥0.01</p>
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
