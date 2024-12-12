"use client";

import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useTranslation } from "react-i18next";

const Login: React.FC = () => {
    const { data: session } = useSession();

    const { t } = useTranslation();

    if (session) {
        return (
            <div className="flex justify-between items-center">
                <div className="text-gray-300">{session?.user?.name}</div>
                <Link
                    href={"/logout"}
                    className="text-gray-400 hover:text-gray-200 transition-colors"
                >
                    {t("Logout")}
                </Link>
            </div>
        );
    }

    return (
        <Link
            type="button"
            className="self-center bg-gradient-to-r from-gray-700 to-gray-900 text-white px-6 py-2 rounded-full text-lg font-semibold hover:from-gray-600 hover:to-gray-800 transition-all duration-300 transform hover:scale-105"
            href={"/login"}
        >
            {t("Login")}
        </Link>
    );
};

export default Login;
