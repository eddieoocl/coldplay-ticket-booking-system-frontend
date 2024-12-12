"use client";

import { useState } from "react";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import {
    ChevronRight,
    DollarSign,
    Heart,
    Ticket,
    TrendingUp,
    Users,
} from "lucide-react";
import ConcertDetails from "./ConcertDetails";
import "./dashboard.css";

// Updated mock data
const fanDistributionData = [
    { region: "East China", value: 35 },
    { region: "North China", value: 25 },
    { region: "South China", value: 20 },
    { region: "Southwest China", value: 10 },
    { region: "Others", value: 10 },
];

const concertData = [
    {
        id: 1,
        name: "Tokyo Anime Music Festival",
        date: "2023-12-15",
        ticketsSold: 5000,
        ticketRevenue: 500000,
        merchandiseSales: 150000,
        charitableSales: 50000,
        charitableItems: [
            {
                name: "Plant a Tree in the Desert",
                quantity: 500,
                revenue: 25000,
                impact: "500 trees will be planted",
            },
            {
                name: "Buy Breakfast for a Poor Child",
                quantity: 1000,
                revenue: 25000,
                impact: "1000 children will receive breakfast",
            },
        ],
        topSellingItems: [
            { name: "T-shirt", quantity: 2000, revenue: 60000 },
            { name: "Poster", quantity: 1500, revenue: 30000 },
            { name: "Badge", quantity: 3000, revenue: 15000 },
        ],
        audienceDemographics: [
            { age: "18-24", percentage: 30 },
            { age: "25-34", percentage: 40 },
            { age: "35-44", percentage: 20 },
            { age: "45+", percentage: 10 },
        ],
        salesTrend: [
            { month: "July", sales: 50000 },
            { month: "August", sales: 75000 },
            { month: "September", sales: 100000 },
            { month: "October", sales: 150000 },
            { month: "November", sales: 200000 },
            { month: "December", sales: 250000 },
        ],
        fanDistribution: [
            { region: "East China", value: 40 },
            { region: "North China", value: 30 },
            { region: "South China", value: 15 },
            { region: "Southwest China", value: 10 },
            { region: "Others", value: 5 },
        ],
    },
    {
        id: 2,
        name: "Summer Electronic Music Party",
        date: "2023-08-20",
        ticketsSold: 4500,
        ticketRevenue: 450000,
        merchandiseSales: 100000,
        charitableSales: 30000,
        charitableItems: [
            {
                name: "Beach Cleaning Project",
                quantity: 300,
                revenue: 15000,
                impact: "300 meters of beach cleaned",
            },
            {
                name: "Reforestation Plan",
                quantity: 600,
                revenue: 15000,
                impact: "600 trees planted",
            },
        ],
        topSellingItems: [
            { name: "Glow Stick", quantity: 3000, revenue: 30000 },
            { name: "Hat", quantity: 1000, revenue: 25000 },
            { name: "Bracelet", quantity: 2000, revenue: 10000 },
        ],
        audienceDemographics: [
            { age: "18-24", percentage: 45 },
            { age: "25-34", percentage: 35 },
            { age: "35-44", percentage: 15 },
            { age: "45+", percentage: 5 },
        ],
        salesTrend: [
            { month: "March", sales: 30000 },
            { month: "April", sales: 50000 },
            { month: "May", sales: 80000 },
            { month: "June", sales: 120000 },
            { month: "July", sales: 180000 },
            { month: "August", sales: 250000 },
        ],
        fanDistribution: [
            { region: "East China", value: 35 },
            { region: "North China", value: 25 },
            { region: "South China", value: 20 },
            { region: "Southwest China", value: 15 },
            { region: "Others", value: 5 },
        ],
    },
    {
        id: 3,
        name: "Rock Music Festival",
        date: "2023-09-10",
        ticketsSold: 4200,
        ticketRevenue: 420000,
        merchandiseSales: 80000,
        charitableSales: 20000,
        charitableItems: [
            {
                name: "Music Education Fund",
                quantity: 200,
                revenue: 10000,
                impact: "200 students will be funded to learn music",
            },
            {
                name: "Eco-friendly Music Equipment",
                quantity: 400,
                revenue: 10000,
                impact: "4 schools will be provided with eco-friendly music equipment",
            },
        ],
        topSellingItems: [
            { name: "Band T-shirt", quantity: 1500, revenue: 45000 },
            { name: "Guitar Pick", quantity: 2000, revenue: 10000 },
            { name: "Rock Poster", quantity: 1000, revenue: 20000 },
        ],
        audienceDemographics: [
            { age: "18-24", percentage: 25 },
            { age: "25-34", percentage: 30 },
            { age: "35-44", percentage: 30 },
            { age: "45+", percentage: 15 },
        ],
        salesTrend: [
            { month: "April", sales: 40000 },
            { month: "May", sales: 60000 },
            { month: "June", sales: 90000 },
            { month: "July", sales: 130000 },
            { month: "August", sales: 180000 },
            { month: "September", sales: 240000 },
        ],
        fanDistribution: [
            { region: "East China", value: 30 },
            { region: "North China", value: 20 },
            { region: "South China", value: 25 },
            { region: "Southwest China", value: 15 },
            { region: "Others", value: 10 },
        ],
    },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

export default function Dashboard() {
    const [selectedConcert, setSelectedConcert] = useState<number | null>(null);

    return (
        <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 pt-20">
            <div className="container">
                <h1 className="text-4xl font-bold mb-8 text-center text-yellow-400">
                    Business Data Dashboard
                </h1>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard
                        icon={<Users />}
                        title="Total Users"
                        value="50,000"
                        change="+15%"
                    />
                    <StatCard
                        icon={<DollarSign />}
                        title="Total Revenue"
                        value="¥1,500,000"
                        change="+22%"
                    />
                    <StatCard
                        icon={<Ticket />}
                        title="Tickets Sold"
                        value="25,000"
                        change="+18%"
                    />
                    <StatCard
                        icon={<TrendingUp />}
                        title="Conversion Rate"
                        value="5.2%"
                        change="+0.8%"
                    />
                </div>

                <div className="grid lg:grid-cols-2 gap-8 mb-8">
                    <div className="bg-gray-800 rounded-lg shadow-xl p-6">
                        <h2 className="text-2xl font-bold mb-4 text-blue-300">
                            Fan Distribution by Region
                        </h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={fanDistributionData}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                    label={({ name, percent }) =>
                                        `${name} ${(percent * 100).toFixed(0)}%`
                                    }
                                >
                                    {fanDistributionData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS[index % COLORS.length]}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="bg-gray-800 rounded-lg shadow-xl p-6">
                        <h2 className="text-2xl font-bold mb-4 text-green-300">
                            Concert Sales Trend
                        </h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={concertData[0].salesTrend}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar
                                    dataKey="sales"
                                    fill="#8884d8"
                                    name="Sales"
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-gray-800 rounded-lg shadow-xl p-6 mb-8">
                    <h2 className="text-2xl font-bold mb-4 text-pink-300">
                        Concert Overview
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-gray-400 border-b border-gray-700">
                                    <th className="py-3 px-4">Concert Name</th>
                                    <th className="py-3 px-4">Date</th>
                                    <th className="py-3 px-4">Tickets Sold</th>
                                    <th className="py-3 px-4">
                                        Ticket Revenue
                                    </th>
                                    <th className="py-3 px-4">
                                        Merchandise Sales
                                    </th>
                                    <th className="py-3 px-4">
                                        Charitable Sales
                                    </th>
                                    <th className="py-3 px-4">Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {concertData.map((concert) => (
                                    <tr
                                        key={concert.id}
                                        className="border-b border-gray-700"
                                    >
                                        <td className="py-3 px-4 text-white">
                                            {concert.name}
                                        </td>
                                        <td className="py-3 px-4 text-gray-400">
                                            {concert.date}
                                        </td>
                                        <td className="py-3 px-4 text-gray-400">
                                            {concert.ticketsSold}
                                        </td>
                                        <td className="py-3 px-4 text-gray-400">
                                            ¥{concert.ticketRevenue}
                                        </td>
                                        <td className="py-3 px-4 text-gray-400">
                                            ¥{concert.merchandiseSales}
                                        </td>
                                        <td className="py-3 px-4 text-gray-400">
                                            ¥{concert.charitableSales}
                                        </td>
                                        <td className="py-3 px-4">
                                            <button
                                                onClick={() =>
                                                    setSelectedConcert(
                                                        concert.id
                                                    )
                                                }
                                                className="text-blue-400 hover:text-blue-300 transition-colors"
                                            >
                                                View{" "}
                                                <ChevronRight className="inline-block w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {selectedConcert && (
                    <ConcertDetails
                        concert={
                            concertData.find((c) => c.id === selectedConcert)!
                        }
                        onClose={() => setSelectedConcert(null)}
                    />
                )}

                <div className="bg-gray-800 rounded-lg shadow-xl p-6">
                    <h2 className="text-2xl font-bold mb-4 text-yellow-400">
                        Charitable Merchandise Sales Details
                    </h2>
                    {concertData.map((concert) => (
                        <div key={concert.id} className="mb-6 last:mb-0">
                            <h3 className="text-xl font-semibold mb-2 text-blue-300">
                                {concert.name}
                            </h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                {concert.charitableItems.map(
                                    (item, itemIndex) => (
                                        <div
                                            key={itemIndex}
                                            className="bg-gray-700 rounded-lg p-4"
                                        >
                                            <div className="flex items-center mb-2">
                                                <Heart className="text-pink-400 mr-2" />
                                                <h4 className="text-lg font-medium text-white">
                                                    {item.name}
                                                </h4>
                                            </div>
                                            <p className="text-gray-300">
                                                Quantity Sold: {item.quantity}
                                            </p>
                                            <p className="text-gray-300">
                                                Revenue: ¥{item.revenue}
                                            </p>
                                            <p className="text-green-400 mt-2">
                                                Impact: {item.impact}
                                            </p>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function StatCard({
    icon,
    title,
    value,
    change,
}: {
    icon: React.ReactNode;
    title: string;
    value: string;
    change: string;
}) {
    return (
        <div className="bg-gray-800 rounded-lg shadow-xl p-6">
            <div className="flex items-center justify-between">
                <div className="text-2xl text-gray-400">{icon}</div>
                <div
                    className={`text-sm font-semibold ${change.startsWith("+") ? "text-green-400" : "text-red-400"}`}
                >
                    {change}
                </div>
            </div>
            <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-300">{title}</h3>
                <p className="text-2xl font-bold text-white">{value}</p>
            </div>
        </div>
    );
}
