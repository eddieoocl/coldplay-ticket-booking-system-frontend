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
import { Card, CardContent, CardHeader, CardTitle } from "../components/databoard/card";
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

                <section id="predictions" className="mb-16">
                    <h2 className="text-3xl font-bold mb-8 text-blue-300">
                        预测分析
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <Card className="bg-gray-800 border-0">
                            <CardHeader>
                                <CardTitle className="text-white">
                                    票价与需求分析
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ChartContainer
                                    config={{
                                        demand: {
                                            label: "需求",
                                            color: "#0088FE",
                                        },
                                        revenue: {
                                            label: "收入",
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
                                                    value: "价格 (¥)",
                                                    position: "insideBottom",
                                                    offset: -5,
                                                }}
                                            />
                                            <YAxis
                                                yAxisId="left"
                                                label={{
                                                    value: "需求 (人数)",
                                                    angle: -90,
                                                    position: "insideLeft",
                                                }}
                                            />
                                            <YAxis
                                                yAxisId="right"
                                                orientation="right"
                                                label={{
                                                    value: "收入 (¥)",
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
                                                name="需求"
                                                dot={false}
                                            />
                                            <Line
                                                yAxisId="right"
                                                type="monotone"
                                                dataKey="revenue"
                                                stroke="var(--color-revenue)"
                                                name="收入"
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
                                    周边均价分析
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ChartContainer
                                    config={{
                                        demand: {
                                            label: "需求",
                                            color: "#0088FE",
                                        },
                                        revenue: {
                                            label: "收入",
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
                                                    value: "价格 (¥)",
                                                    position: "insideBottom",
                                                    offset: -5,
                                                }}
                                            />
                                            <YAxis
                                                yAxisId="left"
                                                label={{
                                                    value: "需求 (件数)",
                                                    angle: -90,
                                                    position: "insideLeft",
                                                }}
                                            />
                                            <YAxis
                                                yAxisId="right"
                                                orientation="right"
                                                label={{
                                                    value: "收入 (¥)",
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
                                                name="需求"
                                                dot={false}
                                            />
                                            <Line
                                                yAxisId="right"
                                                type="monotone"
                                                dataKey="revenue"
                                                stroke="var(--color-revenue)"
                                                name="收入"
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
                                    未来每场演唱会盈利预测
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ChartContainer
                                    config={{
                                        profit: {
                                            label: "预测盈利",
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
                                                    value: "预测盈利 (¥)",
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
                                                name="预测盈利"
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
                        周边分析
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <Card className="bg-gray-800 border-0">
                            <CardHeader>
                                <CardTitle className="text-white">
                                    盈利占比
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ChartContainer
                                    config={{
                                        share: {
                                            label: "占比",
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
                                    周边盈利趋势
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ChartContainer
                                    config={{
                                        profit: {
                                            label: "盈利额",
                                            color: "#0088FE",
                                        },
                                        share: {
                                            label: "占比",
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
                                                    value: "盈利额 (¥)",
                                                    angle: -90,
                                                    position: "insideLeft",
                                                }}
                                            />
                                            <YAxis
                                                yAxisId="right"
                                                orientation="right"
                                                label={{
                                                    value: "占比 (%)",
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
                                                name="盈利额"
                                                dot={false}
                                            />
                                            <Line
                                                yAxisId="right"
                                                type="monotone"
                                                dataKey="share"
                                                stroke="var(--color-share)"
                                                name="占比"
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
                                    各周边盈利占比趋势
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="h-[500px]">
                                <ChartContainer
                                    config={{
                                        "T-shirts": {
                                            label: "T恤",
                                            color: "#0088FE",
                                        },
                                        Posters: {
                                            label: "海报",
                                            color: "#00C49F",
                                        },
                                        Figurines: {
                                            label: "手办",
                                            color: "#FFBB28",
                                        },
                                        Keychains: {
                                            label: "钥匙扣",
                                            color: "#FF8042",
                                        },
                                        Other: {
                                            label: "其他",
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
                                                    value: "占比 (%)",
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
                                                name="T恤"
                                            />
                                            <Area
                                                type="monotone"
                                                dataKey="Posters"
                                                stackId="1"
                                                stroke="var(--color-Posters)"
                                                fill="var(--color-Posters)"
                                                name="海报"
                                            />
                                            <Area
                                                type="monotone"
                                                dataKey="Figurines"
                                                stackId="1"
                                                stroke="var(--color-Figurines)"
                                                fill="var(--color-Figurines)"
                                                name="手办"
                                            />
                                            <Area
                                                type="monotone"
                                                dataKey="Keychains"
                                                stackId="1"
                                                stroke="var(--color-Keychains)"
                                                fill="var(--color-Keychains)"
                                                name="钥匙扣"
                                            />
                                            <Area
                                                type="monotone"
                                                dataKey="Other"
                                                stackId="1"
                                                stroke="var(--color-Other)"
                                                fill="var(--color-Other)"
                                                name="其他"
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
                        地区分析
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <Card className="bg-gray-800 border-0">
                            <CardHeader>
                                <CardTitle className="text-white">
                                    不同地区的粉丝群体数量
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ChartContainer
                                    config={{
                                        fans: {
                                            label: "粉丝数量",
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
                                    各地区支出收入转化率
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ChartContainer
                                    config={{
                                        conversionRate: {
                                            label: "转化率",
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
                                                    value: "转化率",
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
                                                name="转化率"
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
                        公益分析
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <Card className="bg-gray-800 border-0">
                            <CardHeader>
                                <CardTitle className="text-white">
                                    公益贡献总额趋势
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ChartContainer
                                    config={{
                                        contribution: {
                                            label: "贡献总额",
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
                                                    value: "贡献总额 (¥)",
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
                                                name="贡献总额"
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
                                    公益组织影响力排名趋势
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
                                                    value: "排名",
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
                                    公益组织引流数据趋势
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
                                            label: "官网",
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
                                                    value: "引流人数",
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
                                                name="官网"
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
