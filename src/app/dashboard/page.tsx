"use client";

import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Legend,
    Line,
    LineChart,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { DollarSign, Ticket, TrendingUp, Users } from "lucide-react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "../components/databoard/card";
import { ChartContainer } from "../components/databoard/chart";

import {
    charityContributionTrend,
    charityImpactRanking,
    charityTrafficTrend,
    futureConcertProfitForecast,
    merchandisePricingAnalysis,
    merchandiseProfitShareTrend,
    merchandiseProfitTrend,
    profitShare,
    regionalFanbase,
    regionalProfitability,
    ticketPricingAnalysis,
} from "../mockdata/mockData";

const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884D8",
    "#82ca9d",
];

export default function Dashboard() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 pt-20">
            <div className="container mx-auto px-4 py-16">
                <h1 className="text-4xl font-bold mb-8 text-center text-yellow-400">
                    Dashboard
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard
                        icon={<Users />}
                        title="Total User"
                        value="50,000"
                        change="+15%"
                    />
                    <StatCard
                        icon={<DollarSign />}
                        title="Total Revenue"
                        value="$1,500,000"
                        change="+22%"
                    />
                    <StatCard
                        icon={<Ticket />}
                        title="Sold Tickets"
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

                <section id="predictions" className="mb-16">
                    <h2 className="text-3xl font-bold mb-8 text-blue-300">
                        Prediction Analysis
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <Card className="bg-gray-800 border-0">
                            <CardHeader>
                                <CardTitle className="text-white">
                                    Ticket Price and Demand Analysis
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ChartContainer
                                    config={{
                                        demand: {
                                            label: "Demand",
                                            color: "#0088FE",
                                        },
                                        revenue: {
                                            label: "Input",
                                            color: "#00C49F",
                                        },
                                    }}
                                    className="h-[300px]"
                                >
                                    <ResponsiveContainer
                                        width="100%"
                                        height={300}
                                    >
                                        <LineChart data={ticketPricingAnalysis}>
                                            <CartesianGrid
                                                strokeDasharray="3 3"
                                                vertical={false}
                                            />
                                            <XAxis
                                                dataKey="price"
                                                label={{
                                                    value: "Price ($)",
                                                    position: "insideBottom",
                                                    offset: -5,
                                                }}
                                            />
                                            <YAxis
                                                yAxisId="left"
                                                label={{
                                                    value: "Demand (Person)",
                                                    angle: -90,
                                                    position: "insideLeft",
                                                }}
                                            />
                                            <YAxis
                                                yAxisId="right"
                                                orientation="right"
                                                label={{
                                                    value: "Income ($)",
                                                    angle: 90,
                                                    position: "insideRight",
                                                }}
                                            />
                                            <Tooltip
                                                content={<CustomTooltip />}
                                            />
                                            <Line
                                                yAxisId="left"
                                                type="monotone"
                                                dataKey="demand"
                                                stroke="var(--color-demand)"
                                                name="Demand"
                                                dot={false}
                                            />
                                            <Line
                                                yAxisId="right"
                                                type="monotone"
                                                dataKey="revenue"
                                                stroke="var(--color-revenue)"
                                                name="Income"
                                                dot={false}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </ChartContainer>
                            </CardContent>
                        </Card>

                        <Card className="bg-gray-800 border-0">
                            <CardHeader>
                                <CardTitle className="text-white">
                                    Merchantise Price Analysis
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ChartContainer
                                    config={{
                                        demand: {
                                            label: "Demand",
                                            color: "#0088FE",
                                        },
                                        revenue: {
                                            label: "Input",
                                            color: "#00C49F",
                                        },
                                    }}
                                    className="h-[300px]"
                                >
                                    <ResponsiveContainer
                                        width="100%"
                                        height={300}
                                    >
                                        <LineChart
                                            data={merchandisePricingAnalysis}
                                        >
                                            <CartesianGrid
                                                strokeDasharray="3 3"
                                                vertical={false}
                                            />
                                            <XAxis
                                                dataKey="price"
                                                label={{
                                                    value: "Price ($)",
                                                    position: "insideBottom",
                                                    offset: -5,
                                                }}
                                            />
                                            <YAxis
                                                yAxisId="left"
                                                label={{
                                                    value: "Demand",
                                                    angle: -90,
                                                    position: "insideLeft",
                                                }}
                                            />
                                            <YAxis
                                                yAxisId="right"
                                                orientation="right"
                                                label={{
                                                    value: "Income ($)",
                                                    angle: 90,
                                                    position: "insideRight",
                                                }}
                                            />
                                            <Tooltip
                                                content={<CustomTooltip />}
                                            />
                                            <Line
                                                yAxisId="left"
                                                type="monotone"
                                                dataKey="demand"
                                                stroke="var(--color-demand)"
                                                name="Demand"
                                                dot={false}
                                            />
                                            <Line
                                                yAxisId="right"
                                                type="monotone"
                                                dataKey="revenue"
                                                stroke="var(--color-revenue)"
                                                name="Income"
                                                dot={false}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </ChartContainer>
                            </CardContent>
                        </Card>

                        <Card className="bg-gray-800 border-0 lg:col-span-2">
                            <CardHeader>
                                <CardTitle className="text-white">
                                    Future Concert Profit Prediction
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ChartContainer
                                    config={{
                                        profit: {
                                            label: "Predicted Profit",
                                            color: "#0088FE",
                                        },
                                    }}
                                    className="h-[300px] w-full"
                                >
                                    <ResponsiveContainer
                                        width="100%"
                                        height={300}
                                    >
                                        <BarChart
                                            data={futureConcertProfitForecast}
                                        >
                                            <CartesianGrid
                                                strokeDasharray="3 3"
                                                vertical={false}
                                            />
                                            <XAxis dataKey="concert" />
                                            <YAxis
                                                label={{
                                                    value: "Predicted Profit ($)",
                                                    angle: -90,
                                                    position: "insideLeft",
                                                }}
                                            />
                                            <Tooltip
                                                content={<CustomTooltip />}
                                            />
                                            <Bar
                                                dataKey="profit"
                                                fill="var(--color-profit)"
                                                name="Predicted Profit"
                                            />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </ChartContainer>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                <section id="merchandise" className="mb-16">
                    <h2 className="text-3xl font-bold mb-8 text-green-300">
                        Merchantise Analysis
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <Card className="bg-gray-800 border-0">
                            <CardHeader>
                                <CardTitle className="text-white">
                                    Profit Percentage
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ChartContainer
                                    config={{
                                        share: {
                                            label: "Percentage",
                                            color: "#0088FE",
                                        },
                                    }}
                                    className="h-[300px]"
                                >
                                    <ResponsiveContainer
                                        width="100%"
                                        height={300}
                                    >
                                        <PieChart>
                                            <Pie
                                                data={profitShare}
                                                cx="50%"
                                                cy="50%"
                                                outerRadius={80}
                                                fill="#8884d8"
                                                dataKey="share"
                                                label={({ name, percent }) =>
                                                    `${name} ${(percent * 100).toFixed(0)}%`
                                                }
                                            >
                                                {profitShare.map(
                                                    (entry, index) => (
                                                        <Cell
                                                            key={`cell-${index}`}
                                                            fill={
                                                                COLORS[
                                                                    index %
                                                                        COLORS.length
                                                                ]
                                                            }
                                                        />
                                                    )
                                                )}
                                            </Pie>
                                            <Tooltip
                                                content={<CustomTooltip />}
                                            />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </ChartContainer>
                            </CardContent>
                        </Card>

                        <Card className="bg-gray-800 border-0">
                            <CardHeader>
                                <CardTitle className="text-white">
                                    Merchantise Profit Trend
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ChartContainer
                                    config={{
                                        profit: {
                                            label: "Profile",
                                            color: "#0088FE",
                                        },
                                        share: {
                                            label: "Percentage",
                                            color: "#00C49F",
                                        },
                                    }}
                                    className="h-[300px]"
                                >
                                    <ResponsiveContainer
                                        width="100%"
                                        height={300}
                                    >
                                        <LineChart
                                            data={merchandiseProfitTrend}
                                        >
                                            <CartesianGrid
                                                strokeDasharray="3 3"
                                                vertical={false}
                                            />
                                            <XAxis dataKey="month" />
                                            <YAxis
                                                yAxisId="left"
                                                label={{
                                                    value: "Profit ($)",
                                                    angle: -90,
                                                    position: "insideLeft",
                                                }}
                                            />
                                            <YAxis
                                                yAxisId="right"
                                                orientation="right"
                                                label={{
                                                    value: "Percentage (%)",
                                                    angle: 90,
                                                    position: "insideRight",
                                                }}
                                            />
                                            <Tooltip
                                                content={<CustomTooltip />}
                                            />
                                            <Line
                                                yAxisId="left"
                                                type="monotone"
                                                dataKey="profit"
                                                stroke="var(--color-profit)"
                                                name="Profit"
                                                dot={false}
                                            />
                                            <Line
                                                yAxisId="right"
                                                type="monotone"
                                                dataKey="share"
                                                stroke="var(--color-share)"
                                                name="Percentage"
                                                dot={false}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </ChartContainer>
                            </CardContent>
                        </Card>

                        <Card className="bg-gray-800 border-0 col-span-full">
                            <CardHeader>
                                <CardTitle className="text-white">
                                    Each Merchantise Profit Share Trend
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="h-[500px]">
                                <ChartContainer
                                    config={{
                                        "T-shirts": {
                                            label: "T-shirts",
                                            color: "#0088FE",
                                        },
                                        Posters: {
                                            label: "Posters",
                                            color: "#00C49F",
                                        },
                                        Figurines: {
                                            label: "Figurines",
                                            color: "#FFBB28",
                                        },
                                        Keychains: {
                                            label: "Keychains",
                                            color: "#FF8042",
                                        },
                                        Other: {
                                            label: "Other",
                                            color: "#8884D8",
                                        },
                                    }}
                                    className="h-full w-full"
                                >
                                    <ResponsiveContainer
                                        width="100%"
                                        height="100%"
                                    >
                                        <AreaChart
                                            data={merchandiseProfitShareTrend}
                                        >
                                            <CartesianGrid
                                                strokeDasharray="3 3"
                                                vertical={false}
                                            />
                                            <XAxis dataKey="month" />
                                            <YAxis
                                                label={{
                                                    value: "Percentage (%)",
                                                    angle: -90,
                                                    position: "insideLeft",
                                                }}
                                            />
                                            <Tooltip
                                                content={<CustomTooltip />}
                                            />
                                            <Area
                                                type="monotone"
                                                dataKey="T-shirts"
                                                stackId="1"
                                                stroke="var(--color-T-shirts)"
                                                fill="var(--color-T-shirts)"
                                                name="T-shirts"
                                            />
                                            <Area
                                                type="monotone"
                                                dataKey="Posters"
                                                stackId="1"
                                                stroke="var(--color-Posters)"
                                                fill="var(--color-Posters)"
                                                name="Poster"
                                            />
                                            <Area
                                                type="monotone"
                                                dataKey="Figurines"
                                                stackId="1"
                                                stroke="var(--color-Figurines)"
                                                fill="var(--color-Figurines)"
                                                name="Figurines"
                                            />
                                            <Area
                                                type="monotone"
                                                dataKey="Keychains"
                                                stackId="1"
                                                stroke="var(--color-Keychains)"
                                                fill="var(--color-Keychains)"
                                                name="Keychains"
                                            />
                                            <Area
                                                type="monotone"
                                                dataKey="Other"
                                                stackId="1"
                                                stroke="var(--color-Other)"
                                                fill="var(--color-Other)"
                                                name="Others"
                                            />
                                            <Legend />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </ChartContainer>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                <section id="regional" className="mb-16">
                    <h2 className="text-3xl font-bold mb-8 text-pink-300">
                        Regional Analysis
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <Card className="bg-gray-800 border-0">
                            <CardHeader>
                                <CardTitle className="text-white">
                                    Number of fans from different regions
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ChartContainer
                                    config={{
                                        fans: {
                                            label: "Number of Fans",
                                            color: "#0088FE",
                                        },
                                    }}
                                    className="h-[300px]"
                                >
                                    <ResponsiveContainer
                                        width="100%"
                                        height={300}
                                    >
                                        <PieChart>
                                            <Pie
                                                data={regionalFanbase}
                                                cx="50%"
                                                cy="50%"
                                                outerRadius={80}
                                                fill="#8884d8"
                                                dataKey="fans"
                                                label={({ name, percent }) =>
                                                    `${name} ${(percent * 100).toFixed(0)}%`
                                                }
                                            >
                                                {regionalFanbase.map(
                                                    (entry, index) => (
                                                        <Cell
                                                            key={`cell-${index}`}
                                                            fill={
                                                                COLORS[
                                                                    index %
                                                                        COLORS.length
                                                                ]
                                                            }
                                                        />
                                                    )
                                                )}
                                            </Pie>
                                            <Tooltip
                                                content={<CustomTooltip />}
                                            />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </ChartContainer>
                            </CardContent>
                        </Card>

                        <Card className="bg-gray-800 border-0">
                            <CardHeader>
                                <CardTitle className="text-white">
                                    Each Region&apos;s Conversion Rate
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ChartContainer
                                    config={{
                                        conversionRate: {
                                            label: "Conversion Rate",
                                            color: "#0088FE",
                                        },
                                    }}
                                    className="h-[300px]"
                                >
                                    <ResponsiveContainer
                                        width="100%"
                                        height={300}
                                    >
                                        <BarChart data={regionalProfitability}>
                                            <CartesianGrid
                                                strokeDasharray="3 3"
                                                vertical={false}
                                            />
                                            <XAxis dataKey="region" />
                                            <YAxis
                                                label={{
                                                    value: "Conversion Rate",
                                                    angle: -90,
                                                    position: "insideLeft",
                                                }}
                                            />
                                            <Tooltip
                                                content={<CustomTooltip />}
                                            />
                                            <Bar
                                                dataKey="conversionRate"
                                                fill="var(--color-conversionRate)"
                                                name="Conversion Rate"
                                            />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </ChartContainer>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                <section id="charity" className="mb-16">
                    <h2 className="text-3xl font-bold mb-8 text-purple-300">
                        Charity Analysis
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <Card className="bg-gray-800 border-0">
                            <CardHeader>
                                <CardTitle className="text-white">
                                    Charity Contribution Trend
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ChartContainer
                                    config={{
                                        contribution: {
                                            label: "Total Contribution",
                                            color: "#0088FE",
                                        },
                                    }}
                                    className="h-[300px]"
                                >
                                    <ResponsiveContainer
                                        width="100%"
                                        height={300}
                                    >
                                        <LineChart
                                            data={charityContributionTrend}
                                        >
                                            <CartesianGrid
                                                strokeDasharray="3 3"
                                                vertical={false}
                                            />
                                            <XAxis dataKey="month" />
                                            <YAxis
                                                label={{
                                                    value: "Total Contribution",
                                                    angle: -90,
                                                    position: "insideLeft",
                                                }}
                                            />
                                            <Tooltip
                                                content={<CustomTooltip />}
                                            />
                                            <Line
                                                type="monotone"
                                                dataKey="contribution"
                                                stroke="var(--color-contribution)"
                                                name="Total Contribution"
                                                dot={false}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </ChartContainer>
                            </CardContent>
                        </Card>

                        <Card className="bg-gray-800 border-0">
                            <CardHeader>
                                <CardTitle className="text-white">
                                    Charity Organization Impact Ranking
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ChartContainer
                                    config={{
                                        Coldplay: {
                                            label: "Coldplay",
                                            color: "#0088FE",
                                        },
                                        WWF: {
                                            label: "WWF",
                                            color: "#00C49F",
                                        },
                                        UNICEF: {
                                            label: "UNICEF",
                                            color: "#FFBB28",
                                        },
                                        Greenpeace: {
                                            label: "Greenpeace",
                                            color: "#FF8042",
                                        },
                                        "Red Cross": {
                                            label: "Red Cross",
                                            color: "#8884D8",
                                        },
                                    }}
                                    className="h-[300px]"
                                >
                                    <ResponsiveContainer
                                        width="100%"
                                        height={300}
                                    >
                                        <LineChart data={charityImpactRanking}>
                                            <CartesianGrid
                                                strokeDasharray="3 3"
                                                vertical={false}
                                            />
                                            <XAxis dataKey="month" />
                                            <YAxis
                                                reversed
                                                label={{
                                                    value: "Rank",
                                                    angle: -90,
                                                    position: "insideLeft",
                                                }}
                                            />
                                            <Tooltip
                                                content={<CustomTooltip />}
                                            />
                                            <Line
                                                type="monotone"
                                                dataKey="Coldplay"
                                                stroke="var(--color-Coldplay)"
                                                name="Coldplay"
                                                dot={false}
                                            />
                                            <Line
                                                type="monotone"
                                                dataKey="WWF"
                                                stroke="var(--color-WWF)"
                                                name="WWF"
                                                dot={false}
                                            />
                                            <Line
                                                type="monotone"
                                                dataKey="UNICEF"
                                                stroke="var(--color-UNICEF)"
                                                name="UNICEF"
                                                dot={false}
                                            />
                                            <Line
                                                type="monotone"
                                                dataKey="Greenpeace"
                                                stroke="var(--color-Greenpeace)"
                                                name="Greenpeace"
                                                dot={false}
                                            />
                                            <Line
                                                type="monotone"
                                                dataKey="Red Cross"
                                                stroke="var(--color-Red Cross)"
                                                name="Red Cross"
                                                dot={false}
                                            />
                                            <Legend />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </ChartContainer>
                            </CardContent>
                        </Card>

                        <Card className="bg-gray-800 border-0 col-span-full">
                            <CardHeader>
                                <CardTitle className="text-white">
                                    Charity Organization Traffic Trend
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ChartContainer
                                    config={{
                                        Instagram: {
                                            label: "Instagram",
                                            color: "#0088FE",
                                        },
                                        Twitter: {
                                            label: "Twitter",
                                            color: "#00C49F",
                                        },
                                        Website: {
                                            label: "Official Website",
                                            color: "#FFBB28",
                                        },
                                    }}
                                    className="h-[300px] w-full"
                                >
                                    <ResponsiveContainer
                                        width="100%"
                                        height={300}
                                    >
                                        <AreaChart data={charityTrafficTrend}>
                                            <CartesianGrid
                                                strokeDasharray="3 3"
                                                vertical={false}
                                            />
                                            <XAxis dataKey="month" />
                                            <YAxis
                                                label={{
                                                    value: "Person",
                                                    angle: -90,
                                                    position: "insideLeft",
                                                }}
                                            />
                                            <Tooltip
                                                content={<CustomTooltip />}
                                            />
                                            <Area
                                                type="monotone"
                                                dataKey="Instagram"
                                                stackId="1"
                                                stroke="var(--color-Instagram)"
                                                fill="var(--color-Instagram)"
                                                name="Instagram"
                                            />
                                            <Area
                                                type="monotone"
                                                dataKey="Twitter"
                                                stackId="1"
                                                stroke="var(--color-Twitter)"
                                                fill="var(--color-Twitter)"
                                                name="Twitter"
                                            />
                                            <Area
                                                type="monotone"
                                                dataKey="Website"
                                                stackId="1"
                                                stroke="var(--color-Website)"
                                                fill="var(--color-Website)"
                                                name="Official Website"
                                            />
                                            <Legend />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </ChartContainer>
                            </CardContent>
                        </Card>
                    </div>
                </section>
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

function CustomTooltip({ active, payload, label }: any) {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-4 rounded shadow-lg">
                <p className="text-gray-700">{`${label}`}</p>
                {payload.map((pld: any, index: number) => (
                    <p key={index} className="text-gray-600">
                        {`${pld.name}: ${pld.value}`}
                    </p>
                ))}
            </div>
        );
    }

    return null;
}
