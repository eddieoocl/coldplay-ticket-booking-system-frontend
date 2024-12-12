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
import "./ConcertDetails.css";

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
        <div className="modal-overlay">
            <div className="modal-container">
                <div className="modal-header">
                    <h2 className="modal-title">{concert.name} Details</h2>
                    <button onClick={onClose} className="close-button">
                        <XCircle />
                    </button>
                </div>

                <div className="grid-layout">
                    <div>
                        <h3 className="section-title-blue">
                            Basic Information
                        </h3>
                        <p className="info-text">Date: {concert.date}</p>
                        <p className="info-text">
                            Tickets Sold: {concert.ticketsSold}
                        </p>
                        <p className="info-text">
                            Ticket Revenue: ¥{concert.ticketRevenue}
                        </p>
                        <p className="info-text">
                            Merchandise Sales: ¥{concert.merchandiseSales}
                        </p>
                        <p className="info-text">
                            Charitable Sales: ¥{concert.charitableSales}
                        </p>
                    </div>

                    <div>
                        <h3 className="section-title-green">
                            Audience Age Distribution
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

                <div className="section-container">
                    <h3 className="section-title-pink">
                        Fan Distribution by Region
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

                <div className="section-container">
                    <h3 className="section-title-yellow">Sales Trend</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={concert.salesTrend}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="sales" fill="#8884d8" name="Sales" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="section-container">
                    <h3 className="section-title-pink">
                        Top Selling Merchandise
                    </h3>
                    <div className="table-container">
                        <table className="table">
                            <thead>
                                <tr className="table-header">
                                    <th className="table-cell">Item Name</th>
                                    <th className="table-cell">
                                        Quantity Sold
                                    </th>
                                    <th className="table-cell">Revenue</th>
                                </tr>
                            </thead>
                            <tbody>
                                {concert.topSellingItems.map((item, index) => (
                                    <tr key={index} className="table-row">
                                        <td className="table-cell-white">
                                            {item.name}
                                        </td>
                                        <td className="table-cell-gray">
                                            {item.quantity}
                                        </td>
                                        <td className="table-cell-gray">
                                            ¥{item.revenue}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="section-container">
                    <h3 className="section-title-yellow">
                        Charitable Merchandise Details
                    </h3>
                    <div className="charitable-grid">
                        {concert.charitableItems.map((item, index) => (
                            <div key={index} className="charitable-item">
                                <h4 className="charitable-title">
                                    {item.name}
                                </h4>
                                <p className="info-text">
                                    Quantity Sold: {item.quantity}
                                </p>
                                <p className="info-text">
                                    Revenue: ¥{item.revenue}
                                </p>
                                <p className="charitable-impact">
                                    Impact: {item.impact}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
