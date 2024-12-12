// src/app/layout.tsx
"use client";

import localFont from "next/font/local";
import "./globals.css";
import StoreProvider from "./providers/StoreProvider";
import { SessionProvider, useSession } from "next-auth/react";
import AudioPlayer from "./components/AudioPlayer";
import { useState, createContext, useEffect, Suspense } from "react";
import { usePathname } from "next/navigation";
import Footer from "@/app/components/Footer";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

interface Song {
    id: number;
    title: string;
    album: string;
    year: string;
    duration: string;
    imageUrl: string;
    audioUrl: string;
}

interface RootLayoutContextType {
    setCurrentSong: React.Dispatch<React.SetStateAction<Song | null>>;
}

export const RootLayoutContext = createContext<
    RootLayoutContextType | undefined
>(undefined);

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [currentSong, setCurrentSong] = useState<Song | null>(null);
    const pathname = usePathname(); // 添加這行

    // 添加這個 useEffect
    useEffect(() => {
        setCurrentSong(null); // 當路徑改變時，將 currentSong 設為 null
    }, [pathname]);

    return (
        <StoreProvider>
            <SessionProvider>
                <RootLayoutContext.Provider value={{ setCurrentSong }}>
                    <html lang="en">
                        <head>
                            <link
                                rel="stylesheet"
                                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
                            />
                        </head>
                        <body
                            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
                        >
                            <Suspense>
                                <InnerLayout
                                    currentSong={currentSong}
                                    setCurrentSong={setCurrentSong}
                                >
                                    {children}
                                </InnerLayout>
                            </Suspense>
                        </body>
                    </html>
                </RootLayoutContext.Provider>
            </SessionProvider>
        </StoreProvider>
    );
}

function InnerLayout({
    children,
    currentSong,
    setCurrentSong,
}: {
    children: React.ReactNode;
    currentSong: Song | null;
    setCurrentSong: React.Dispatch<React.SetStateAction<Song | null>>;
}) {
    const { data: session } = useSession();

    return (
        <>
            {children}
            {currentSong && <AudioPlayer currentSong={currentSong} />}
        </>
    );
}
