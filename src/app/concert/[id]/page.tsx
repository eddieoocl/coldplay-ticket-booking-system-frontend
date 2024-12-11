"use client";

import Link from "next/link";
import Image from "next/image";
import { CalendarDays, MapPin, Music, Ticket } from "lucide-react";
import { useParams } from "next/navigation";
import { useGetConcertByIdQuery } from "@/lib/api/apiSlice";
import Navbar from "@/app/components/navbar/Navbar";

export default function ConcertDetails() {
    const { id } = useParams();
    const { data: concert } = useGetConcertByIdQuery({ id: id as string });

    if (!concert) return null;

    return (
        <div>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 pt-20">
                <div className="container mx-auto px-4 py-16">
                    <div className="bg-gray-800 rounded-lg shadow-2xl overflow-hidden">
                        <div className="relative h-96">
                            <Image
                                src="https://ita-ticket.oss-cn-guangzhou.aliyuncs.com/img_mv_pc.jpg"
                                alt={concert.name ?? ""}
                                layout="fill"
                                objectFit="cover"
                                className="transition-transform duration-500 hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                <h1 className="text-5xl font-bold text-white text-center px-4">
                                    {concert.name}
                                </h1>
                            </div>
                        </div>

                        <div className="p-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div className="flex items-center text-blue-300">
                                        <CalendarDays className="w-6 h-6 mr-2" />
                                        <p className="text-xl">
                                            {concert.date} at {concert.date}
                                        </p>
                                    </div>
                                    <div className="flex items-center text-green-300">
                                        <MapPin className="w-6 h-6 mr-2" />
                                        <div>
                                            <p className="text-xl">
                                                {concert.venue}
                                            </p>
                                            <p className="text-sm text-gray-400">
                                                {concert.location}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-700 rounded-lg p-6">
                                    <h2 className="text-2xl font-bold mb-4 text-yellow-400 flex items-center">
                                        <Music className="w-6 h-6 mr-2" />
                                        演出阵容
                                    </h2>
                                    <ul className="space-y-2">
                                        <li className="text-white hover:text-pink-300 transition-colors">
                                            Coldplay
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="mt-8">
                                <h2 className="text-2xl font-bold mb-4 text-yellow-400">
                                    活动详情
                                </h2>
                                <p className="text-gray-300 leading-relaxed">
                                    {concert.description}
                                </p>
                            </div>

                            <div className="mt-8 flex justify-center">
                                <Link
                                    href={`/select-order/${concert.concertId}`}
                                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 flex items-center"
                                >
                                    <Ticket className="w-5 h-5 mr-2" />
                                    立即购票
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
