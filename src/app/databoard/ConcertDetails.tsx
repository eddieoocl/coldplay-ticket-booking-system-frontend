import { XCircle } from "lucide-react";
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

interface ConcertDetailsProps {
    concert: {
        id: number;
        name: string;
        date: string;
        ticketsSold: number;
        ticketRevenue: number;
        merchandiseSales: number;
        charitableSales: number;
        charitableItems: Array<{
            name: string;
            quantity: number;
            revenue: number;
            impact: string;
        }>;
        topSellingItems: Array<{
            name: string;
            quantity: number;
            revenue: number;
        }>;
        audienceDemographics: Array<{
            age: string;
            percentage: number;
        }>;
        salesTrend: Array<{
            month: string;
            sales: number;
        }>;
        fanDistribution: Array<{
            region: string;
            value: number;
        }>;
    };
    onClose: () => void;
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

export default function ConcertDetails({
    concert,
    onClose,
}: ConcertDetailsProps) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-lg shadow-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-yellow-400">
                        {concert.name} 详情
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white"
                    >
                        <XCircle />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="text-xl font-semibold mb-2 text-blue-300">
                            基本信息
                        </h3>
                        <p className="text-gray-300">日期: {concert.date}</p>
                        <p className="text-gray-300">
                            售出票数: {concert.ticketsSold}
                        </p>
                        <p className="text-gray-300">
                            票务收入: ¥{concert.ticketRevenue}
                        </p>
                        <p className="text-gray-300">
                            周边收入: ¥{concert.merchandiseSales}
                        </p>
                        <p className="text-gray-300">
                            公益商品收入: ¥{concert.charitableSales}
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-2 text-green-300">
                            观众年龄分布
                        </h3>
                        <ResponsiveContainer width="100%" height={200}>
                            <PieChart>
                                <Pie
                                    data={concert.audienceDemographics}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="percentage"
                                    label={({ name, percent }) =>
                                        `${name} ${(percent * 100).toFixed(0)}%`
                                    }
                                >
                                    {concert.audienceDemographics.map(
                                        (entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={
                                                    COLORS[
                                                        index % COLORS.length
                                                    ]
                                                }
                                            />
                                        )
                                    )}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-2 text-pink-300">
                        粉丝地区分布
                    </h3>
                    <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                            <Pie
                                data={concert.fanDistribution}
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                                label={({ name, percent }) =>
                                    `${name} ${(percent * 100).toFixed(0)}%`
                                }
                            >
                                {concert.fanDistribution.map((entry, index) => (
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

                <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-2 text-yellow-400">
                        销售趋势
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={concert.salesTrend}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="sales" fill="#8884d8" name="销售额" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-2 text-pink-300">
                        热销周边
                    </h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-gray-400 border-b border-gray-700">
                                    <th className="py-2 px-4">商品名称</th>
                                    <th className="py-2 px-4">售出数量</th>
                                    <th className="py-2 px-4">收入</th>
                                </tr>
                            </thead>
                            <tbody>
                                {concert.topSellingItems.map((item, index) => (
                                    <tr
                                        key={index}
                                        className="border-b border-gray-700"
                                    >
                                        <td className="py-2 px-4 text-white">
                                            {item.name}
                                        </td>
                                        <td className="py-2 px-4 text-gray-400">
                                            {item.quantity}
                                        </td>
                                        <td className="py-2 px-4 text-gray-400">
                                            ¥{item.revenue}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-2 text-yellow-400">
                        公益绿色商品详情
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {concert.charitableItems.map((item, index) => (
                            <div
                                key={index}
                                className="bg-gray-700 rounded-lg p-4"
                            >
                                <h4 className="text-lg font-medium text-white mb-2">
                                    {item.name}
                                </h4>
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
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
