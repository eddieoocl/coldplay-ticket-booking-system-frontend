"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
    Leaf,
    MinusCircleIcon,
    PlusCircleIcon,
    ShoppingBagIcon,
    Trash2Icon,
} from "lucide-react";
import InteractiveVenueSelector, {
    type Section,
} from "@/app/components/selectTicket/InteractiveVenueSelector";
import ProgressBar from "@/app/components/ProgressBar";
import {
    useCreateOrderMutation,
    useGetMerchandiseByConcertIdQuery,
} from "@/lib/api/apiSlice";
import Navbar from "@/app/components/navbar/Navbar";

type TicketSelection = {
    section: Section;
    quantity: number;
};

type Merchandise = {
    id: number;
    name: string;
    price: number;
    image: string;
    isCharity?: boolean;
};

type MerchandiseSelection = {
    item: Merchandise;
    quantity: number;
};

const steps = [
    { name: "选择门票和周边", href: "#", status: "current" as const },
    { name: "确认订单", href: "#", status: "upcoming" as const },
    { name: "支付", href: "#", status: "upcoming" as const },
    { name: "查看订单", href: "#", status: "upcoming" as const },
];

export default function TicketSelection() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const concertId = searchParams.get("concertId") || "";

    const [selectedTickets, setSelectedTickets] = useState<TicketSelection[]>(
        []
    );
    const [currentSection, setCurrentSection] = useState<Section | null>(null);
    const [selectedMerchandise, setSelectedMerchandise] = useState<
        MerchandiseSelection[]
    >([]);

    const { data: merchandiseItems = [], isLoading } =
        useGetMerchandiseByConcertIdQuery({ id: concertId });
    const [createOrder] = useCreateOrderMutation();

    const handleSectionSelect = (section: Section | null) => {
        setCurrentSection(section);
    };

    const addTicket = () => {
        if (currentSection) {
            const existingSelection = selectedTickets.find(
                (ticket) => ticket.section.id === currentSection.id
            );
            if (existingSelection) {
                setSelectedTickets(
                    selectedTickets.map((ticket) =>
                        ticket.section.id === currentSection.id
                            ? { ...ticket, quantity: ticket.quantity + 1 }
                            : ticket
                    )
                );
            } else {
                setSelectedTickets([
                    ...selectedTickets,
                    { section: currentSection, quantity: 1 },
                ]);
            }
        }
    };

    const removeTicket = (sectionId: number) => {
        setSelectedTickets(
            selectedTickets.filter((ticket) => ticket.section.id !== sectionId)
        );
    };

    const updateTicketQuantity = (sectionId: number, newQuantity: number) => {
        if (newQuantity < 1) return;
        setSelectedTickets(
            selectedTickets.map((ticket) =>
                ticket.section.id === sectionId
                    ? { ...ticket, quantity: newQuantity }
                    : ticket
            )
        );
    };

    const addMerchandise = (item: Merchandise) => {
        const existingSelection = selectedMerchandise.find(
            (merch) => merch.item.id === item.id
        );
        if (existingSelection) {
            setSelectedMerchandise(
                selectedMerchandise.map((merch) =>
                    merch.item.id === item.id
                        ? { ...merch, quantity: merch.quantity + 1 }
                        : merch
                )
            );
        } else {
            setSelectedMerchandise([
                ...selectedMerchandise,
                { item, quantity: 1 },
            ]);
        }
    };

    const removeMerchandise = (itemId: number) => {
        setSelectedMerchandise(
            selectedMerchandise.filter((merch) => merch.item.id !== itemId)
        );
    };

    const updateMerchandiseQuantity = (itemId: number, newQuantity: number) => {
        if (newQuantity < 1) return;
        setSelectedMerchandise(
            selectedMerchandise.map((merch) =>
                merch.item.id === itemId
                    ? { ...merch, quantity: newQuantity }
                    : merch
            )
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedTickets.length > 0 || selectedMerchandise.length > 0) {
            const orderData = {
                userId: 1, // todo Replace with actual user ID
                ticketInfo: selectedTickets.map((ticket) => ({
                    ticketTypeId: ticket.section.id,
                    count: ticket.quantity,
                })),
                merchandiseInfo: selectedMerchandise.map((merch) => ({
                    merchandiseId: merch.item.id,
                    count: merch.quantity,
                })),
            };

            try {
                const response = await createOrder(orderData).unwrap();
                const orderId = response.orderId;
                router.push(`/confirm-order?orderId=${orderId}`);
            } catch (error) {
                console.error("Failed to create order:", error);
            }
        } else {
            alert("请选择至少一张门票或一个周边商品");
        }
    };

    const totalPrice =
        selectedTickets.reduce(
            (sum, ticket) => sum + ticket.section.price * ticket.quantity,
            0
        ) +
        selectedMerchandise.reduce(
            (sum, merch) => sum + merch.item.price * merch.quantity,
            0
        );

    return (
        <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 pt-20">
            <Navbar/>
            <div className="container mx-auto px-4 py-16">
                <div className="mb-8">
                    <ProgressBar steps={steps} />
                </div>
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="lg:w-3/5">
                        <InteractiveVenueSelector
                            onSectionSelect={handleSectionSelect}
                            selectedTickets={selectedTickets.map((ticket) => ({
                                sectionId: ticket.section.id,
                                quantity: ticket.quantity,
                            }))}
                        />
                    </div>
                    <div className="lg:w-2/5">
                        <div className="bg-gray-800 rounded-lg shadow-xl p-8">
                            <h2 className="text-2xl font-bold mb-6 text-blue-300">
                                已选门票
                            </h2>
                            <div className="space-y-4 mb-6">
                                {selectedTickets.map((ticket) => (
                                    <div
                                        key={ticket.section.id}
                                        className="flex items-center justify-between bg-gray-700 p-4 rounded-lg"
                                    >
                                        <div>
                                            <p className="text-white font-semibold">
                                                {ticket.section.name}
                                            </p>
                                            <p className="text-sm text-gray-300">
                                                ¥{ticket.section.price} / 张
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="flex items-center bg-gray-600 rounded-lg">
                                                <button
                                                    onClick={() =>
                                                        updateTicketQuantity(
                                                            ticket.section.id,
                                                            ticket.quantity - 1
                                                        )
                                                    }
                                                    className="p-2 hover:bg-gray-500 rounded-l-lg transition-colors"
                                                >
                                                    <MinusCircleIcon className="w-4 h-4 text-white" />
                                                </button>
                                                <span className="w-12 text-center text-white">
                                                    {ticket.quantity}
                                                </span>
                                                <button
                                                    onClick={() =>
                                                        updateTicketQuantity(
                                                            ticket.section.id,
                                                            ticket.quantity + 1
                                                        )
                                                    }
                                                    className="p-2 hover:bg-gray-500 rounded-r-lg transition-colors"
                                                >
                                                    <PlusCircleIcon className="w-4 h-4 text-white" />
                                                </button>
                                            </div>
                                            <button
                                                onClick={() =>
                                                    removeTicket(
                                                        ticket.section.id
                                                    )
                                                }
                                                className="p-2 text-red-400 hover:text-red-300 transition-colors"
                                            >
                                                <Trash2Icon className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {currentSection &&
                                !selectedTickets.find(
                                    (t) => t.section.id === currentSection.id
                                ) && (
                                    <button
                                        onClick={addTicket}
                                        className="w-full bg-green-500 text-white px-4 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors mb-6"
                                    >
                                        添加 {currentSection.name} 门票
                                    </button>
                                )}

                            <h2 className="text-2xl font-bold mb-6 text-blue-300">
                                周边商品
                            </h2>
                            <div className="space-y-4 mb-6">
                                {merchandiseItems.map((item) => (
                                    <div
                                        key={item.id}
                                        className={`flex items-center justify-between ${item.isCharity ? "bg-green-700" : "bg-gray-700"} p-4 rounded-lg`}
                                    >
                                        <div className="flex items-center">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-16 h-16 object-cover rounded-md mr-4"
                                            />
                                            <div>
                                                <p className="text-white font-semibold flex items-center">
                                                    {item.name}
                                                    {item.isCharity && (
                                                        <Leaf
                                                            className="ml-2 text-green-300"
                                                            size={16}
                                                        />
                                                    )}
                                                </p>
                                                <p className="text-sm text-gray-300">
                                                    ¥{item.price}
                                                </p>
                                                {item.isCharity && (
                                                    <p className="text-xs text-green-300 mt-1">
                                                        公益产品
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => addMerchandise(item)}
                                            className={`${item.isCharity ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"} text-white px-3 py-1 rounded-lg font-semibold transition-colors`}
                                        >
                                            添加
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <h2 className="text-2xl font-bold mb-6 text-blue-300">
                                已选周边
                            </h2>
                            <div className="space-y-4 mb-6">
                                {selectedMerchandise.map((merch) => (
                                    <div
                                        key={merch.item.id}
                                        className={`flex items-center justify-between ${merch.item.isCharity ? "bg-green-700" : "bg-gray-700"} p-4 rounded-lg`}
                                    >
                                        <div>
                                            <p className="text-white font-semibold flex items-center">
                                                {merch.item.name}
                                                {merch.item.isCharity && (
                                                    <Leaf
                                                        className="ml-2 text-green-300"
                                                        size={16}
                                                    />
                                                )}
                                            </p>
                                            <p className="text-sm text-gray-300">
                                                ¥{merch.item.price} / 件
                                            </p>
                                            {merch.item.isCharity && (
                                                <p className="text-xs text-green-300 mt-1">
                                                    公益产品
                                                </p>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="flex items-center bg-gray-600 rounded-lg">
                                                <button
                                                    onClick={() =>
                                                        updateMerchandiseQuantity(
                                                            merch.item.id,
                                                            merch.quantity - 1
                                                        )
                                                    }
                                                    className="p-2 hover:bg-gray-500 rounded-l-lg transition-colors"
                                                >
                                                    <MinusCircleIcon className="w-4 h-4 text-white" />
                                                </button>
                                                <span className="w-12 text-center text-white">
                                                    {merch.quantity}
                                                </span>
                                                <button
                                                    onClick={() =>
                                                        updateMerchandiseQuantity(
                                                            merch.item.id,
                                                            merch.quantity + 1
                                                        )
                                                    }
                                                    className="p-2 hover:bg-gray-500 rounded-r-lg transition-colors"
                                                >
                                                    <PlusCircleIcon className="w-4 h-4 text-white" />
                                                </button>
                                            </div>
                                            <button
                                                onClick={() =>
                                                    removeMerchandise(
                                                        merch.item.id
                                                    )
                                                }
                                                className="p-2 text-red-400 hover:text-red-300 transition-colors"
                                            >
                                                <Trash2Icon className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="text-right mb-6">
                                <p className="text-lg text-gray-300">总价</p>
                                <p className="text-2xl font-bold text-white">
                                    ¥{totalPrice}
                                </p>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <button
                                    type="submit"
                                    disabled={
                                        selectedTickets.length === 0 &&
                                        selectedMerchandise.length === 0
                                    }
                                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <ShoppingBagIcon className="w-5 h-5 mr-2" />
                                    提交订单
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
