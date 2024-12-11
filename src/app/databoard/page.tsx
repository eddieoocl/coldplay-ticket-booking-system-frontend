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

// Updated mock data
const fanDistributionData = [
    { region: "华东", value: 35 },
    { region: "华北", value: 25 },
    { region: "华南", value: 20 },
    { region: "西南", value: 10 },
    { region: "其他", value: 10 },
];

const concertData = [
    {
        id: 1,
        name: "东京动漫音乐节",
        date: "2023-12-15",
        ticketsSold: 5000,
        ticketRevenue: 500000,
        merchandiseSales: 150000,
        charitableSales: 50000,
        charitableItems: [
            {
                name: "为沙漠种一颗树",
                quantity: 500,
                revenue: 25000,
                impact: "500棵树将被种植",
            },
            {
                name: "为贫困小孩买一份早餐",
                quantity: 1000,
                revenue: 25000,
                impact: "1000个孩子将获得早餐",
            },
        ],
        topSellingItems: [
            { name: "T恤", quantity: 2000, revenue: 60000 },
            { name: "海报", quantity: 1500, revenue: 30000 },
            { name: "徽章", quantity: 3000, revenue: 15000 },
        ],
        audienceDemographics: [
            { age: "18-24", percentage: 30 },
            { age: "25-34", percentage: 40 },
            { age: "35-44", percentage: 20 },
            { age: "45+", percentage: 10 },
        ],
        salesTrend: [
            { month: "7月", sales: 50000 },
            { month: "8月", sales: 75000 },
            { month: "9月", sales: 100000 },
            { month: "10月", sales: 150000 },
            { month: "11月", sales: 200000 },
            { month: "12月", sales: 250000 },
        ],
        fanDistribution: [
            { region: "华东", value: 40 },
            { region: "华北", value: 30 },
            { region: "华南", value: 15 },
            { region: "西南", value: 10 },
            { region: "其他", value: 5 },
        ],
    },
    {
        id: 2,
        name: "夏日电音派对",
        date: "2023-08-20",
        ticketsSold: 4500,
        ticketRevenue: 450000,
        merchandiseSales: 100000,
        charitableSales: 30000,
        charitableItems: [
            {
                name: "清洁海滩项目",
                quantity: 300,
                revenue: 15000,
                impact: "清理300米海滩",
            },
            {
                name: "植树造林计划",
                quantity: 600,
                revenue: 15000,
                impact: "种植600棵树",
            },
        ],
        topSellingItems: [
            { name: "荧光棒", quantity: 3000, revenue: 30000 },
            { name: "帽子", quantity: 1000, revenue: 25000 },
            { name: "手环", quantity: 2000, revenue: 10000 },
        ],
        audienceDemographics: [
            { age: "18-24", percentage: 45 },
            { age: "25-34", percentage: 35 },
            { age: "35-44", percentage: 15 },
            { age: "45+", percentage: 5 },
        ],
        salesTrend: [
            { month: "3月", sales: 30000 },
            { month: "4月", sales: 50000 },
            { month: "5月", sales: 80000 },
            { month: "6月", sales: 120000 },
            { month: "7月", sales: 180000 },
            { month: "8月", sales: 250000 },
        ],
        fanDistribution: [
            { region: "华东", value: 35 },
            { region: "华北", value: 25 },
            { region: "华南", value: 20 },
            { region: "西南", value: 15 },
            { region: "其他", value: 5 },
        ],
    },
    {
        id: 3,
        name: "摇滚音乐节",
        date: "2023-09-10",
        ticketsSold: 4200,
        ticketRevenue: 420000,
        merchandiseSales: 80000,
        charitableSales: 20000,
        charitableItems: [
            {
                name: "音乐教育基金",
                quantity: 200,
                revenue: 10000,
                impact: "资助200名学生学习音乐",
            },
            {
                name: "环保音乐设备",
                quantity: 400,
                revenue: 10000,
                impact: "为4所学校提供环保音乐设备",
            },
        ],
        topSellingItems: [
            { name: "乐队T恤", quantity: 1500, revenue: 45000 },
            { name: "吉他拨片", quantity: 2000, revenue: 10000 },
            { name: "摇滚海报", quantity: 1000, revenue: 20000 },
        ],
        audienceDemographics: [
            { age: "18-24", percentage: 25 },
            { age: "25-34", percentage: 30 },
            { age: "35-44", percentage: 30 },
            { age: "45+", percentage: 15 },
        ],
        salesTrend: [
            { month: "4月", sales: 40000 },
            { month: "5月", sales: 60000 },
            { month: "6月", sales: 90000 },
            { month: "7月", sales: 130000 },
            { month: "8月", sales: 180000 },
            { month: "9月", sales: 240000 },
        ],
        fanDistribution: [
            { region: "华东", value: 30 },
            { region: "华北", value: 20 },
            { region: "华南", value: 25 },
            { region: "西南", value: 15 },
            { region: "其他", value: 10 },
        ],
    },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

export default function Dashboard() {
    const [selectedConcert, setSelectedConcert] = useState<number | null>(null);

    return (
        <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 pt-20">
            <div className="container mx-auto px-4 py-16">
                <h1 className="text-4xl font-bold mb-8 text-center text-yellow-400">
                    业务数据看板
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard
                        icon={<Users />}
                        title="总用户数"
                        value="50,000"
                        change="+15%"
                    />
                    <StatCard
                        icon={<DollarSign />}
                        title="总收入"
                        value="¥1,500,000"
                        change="+22%"
                    />
                    <StatCard
                        icon={<Ticket />}
                        title="售出票数"
                        value="25,000"
                        change="+18%"
                    />
                    <StatCard
                        icon={<TrendingUp />}
                        title="转化率"
                        value="5.2%"
                        change="+0.8%"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    <div className="bg-gray-800 rounded-lg shadow-xl p-6">
                        <h2 className="text-2xl font-bold mb-4 text-blue-300">
                            粉丝地区分布
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
                            演唱会销售趋势
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
                                    name="销售额"
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-gray-800 rounded-lg shadow-xl p-6 mb-8">
                    <h2 className="text-2xl font-bold mb-4 text-pink-300">
                        演唱会概览
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-gray-400 border-b border-gray-700">
                                    <th className="py-3 px-4">演唱会名称</th>
                                    <th className="py-3 px-4">日期</th>
                                    <th className="py-3 px-4">售出票数</th>
                                    <th className="py-3 px-4">票务收入</th>
                                    <th className="py-3 px-4">周边收入</th>
                                    <th className="py-3 px-4">公益商品收入</th>
                                    <th className="py-3 px-4">详情</th>
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
                                                查看{" "}
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
                        公益绿色商品销售详情
                    </h2>
                    {concertData.map((concert) => (
                        <div key={concert.id} className="mb-6 last:mb-0">
                            <h3 className="text-xl font-semibold mb-2 text-blue-300">
                                {concert.name}
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                                售出数量: {item.quantity}
                                            </p>
                                            <p className="text-gray-300">
                                                收入: ¥{item.revenue}
                                            </p>
                                            <p className="text-green-400 mt-2">
                                                影响: {item.impact}
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
