"use client";

import React from "react";
import { CreditCard, Leaf, Package, Ticket } from "lucide-react";
import ProgressBar from "@/app/components/ProgressBar";
import { useRouter, useSearchParams } from "next/navigation";
import { useGetOrderByIdQuery } from "@/lib/api/apiSlice";
import Navbar from "@/app/components/navbar/Navbar";


const steps = [
    { name: "选择门票和周边", href: "#", status: "complete" as const },
    { name: "购票成功", href: "#", status: "current" as const },
    { name: "支付", href: "#", status: "upcoming" as const },
    { name: "查看订单", href: "#", status: "upcoming" as const },
];

export default function OrderConfirmation() {
    const router = useRouter();
    const params = useSearchParams();
    const orderId = params.get("orderId");
    const { data: order, isLoading: isLoadingOrder } = useGetOrderByIdQuery({
        id: orderId ? Number(orderId) : 0,
    });

    if (!order || isLoadingOrder) {
        return <div>Loading...</div>;
    }

    const handlePayment = () => {
        // Payment logic
        router.push(`/payment?orderId=${orderId}`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 pt-20">
            <Navbar />
            <div className="container mx-auto px-4 py-16">
                <ProgressBar steps={steps} />
                <h1 className="text-4xl font-bold mb-8 text-center text-yellow-400">
                    订单确认
                </h1>

                <div className="bg-gray-800 rounded-lg shadow-xl p-8 mb-8">
                    <h2 className="text-2xl font-bold mb-4 text-blue-300 flex items-center">
                        <CreditCard className="mr-2" /> 订单信息
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <p className="text-white">
                            <span className="text-gray-400">订单号:</span>{" "}
                            {order.orderId}
                        </p>
                        <p className="text-white">
                            <span className="text-gray-400">日期:</span>{" "}
                            {order.orderTime}
                        </p>
                        <p className="text-white">
                            <span className="text-gray-400">总价:</span> ¥
                            {order.totalPrices}
                        </p>
                        <p className="text-white">
                            <span className="text-gray-400">活动:</span>{" "}
                            {order.concertData.name}
                        </p>
                        <p className="text-white">
                            <span className="text-gray-400">支付方式:</span>{" "}
                            {order.paymentMethod}
                        </p>
                        <p className="text-white">
                            <span className="text-gray-400">支付状态:</span>{" "}
                            {order.paymentStatus}
                        </p>
                    </div>
                    <div className="mt-4 bg-gray-700 p-4 rounded-lg">
                        <h3 className="text-xl font-semibold mb-2 text-yellow-400">
                            演唱会详情
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <p className="text-white">
                                <span className="text-gray-400">日期:</span>{" "}
                                {order.concertData.date}
                            </p>
                            <p className="text-white">
                                <span className="text-gray-400">时间:</span>{" "}
                                {order.concertData.time}
                            </p>
                            <p className="text-white">
                                <span className="text-gray-400">地点:</span>{" "}
                                {order.concertData.venue}
                            </p>
                        </div>
                        <p className="text-white mt-2">
                            <span className="text-gray-400">地址:</span>{" "}
                            {order.concertData.address}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-gray-800 rounded-lg shadow-xl p-8">
                        <h2 className="text-2xl font-bold mb-4 text-green-300 flex items-center">
                            <Ticket className="mr-2" /> 门票信息
                        </h2>
                        {order.ticketInfo.map((ticket) => (
                            <div
                                key={ticket.id}
                                className="mb-6 last:mb-0 bg-gray-700 rounded-lg p-4 flex justify-between items-center"
                            >
                                <div>
                                    <p className="text-lg font-semibold text-white">
                                        {ticket.ticketType} 票
                                    </p>
                                    <p className="text-sm text-gray-300">
                                        座位: 等待支付后分配
                                    </p>
                                    <p className="text-sm text-gray-300">
                                        价格: ¥{ticket.price}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-gray-800 rounded-lg shadow-xl p-8">
                        <h2 className="text-2xl font-bold mb-4 text-pink-300 flex items-center">
                            <Package className="mr-2" /> 周边商品
                        </h2>
                        {order.merchandiseInfo.map((item) => (
                            <div
                                key={item.merchandiseId}
                                className={`mb-4 last:mb-0 rounded-lg p-4 ${item.isCharity ? "bg-green-700" : "bg-gray-700"} flex justify-between items-center`}
                            >
                                <div>
                                    <p className="text-lg font-semibold text-white flex items-center">
                                        {item.merchandiseName}
                                        {item.isCharity && (
                                            <Leaf
                                                className="ml-2 text-green-300"
                                                size={16}
                                            />
                                        )}
                                    </p>
                                    <p className="text-sm text-gray-300">
                                        数量: {item.count}
                                    </p>
                                    <p className="text-sm text-gray-300">
                                        单价: ¥{item.price}
                                    </p>
                                    <p className="text-sm font-semibold text-white">
                                        总价: ¥{item.price * item.count}
                                    </p>
                                    {item.isCharity && (
                                        <p className="text-xs text-green-300 mt-1">
                                            公益产品
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <button onClick={handlePayment} className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105">
                        支付
                    </button>
                </div>
            </div>
        </div>
    );
}
