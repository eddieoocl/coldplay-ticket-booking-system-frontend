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
                <div className="navbar-user-name text-gray-300">
                    {session?.user?.name}
                </div>
                <Link href={"/logout"} className="navbar-button">
                    {t("Logout")}
                </Link>
            </div>
        );
    }

    return (
        <Link type="button" className="navbar-button" href={"/login"}>
            {t("Login")}
        </Link>
    );
};

export default Login;
