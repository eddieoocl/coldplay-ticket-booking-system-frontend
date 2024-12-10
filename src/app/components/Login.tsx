"use client";

import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

const Login: React.FC = () => {
    const { data: session } = useSession();

    if (session) {
        return (
            <div className="flex justify-between">
                <div>{session?.user?.name}</div>
                <Link href={"/logout"}>Logout</Link>
            </div>
        );
    }

    return (
        <Link
            type="button"
            className="self-center btn btn-primary"
            href={"/login"}
        >
            Login
        </Link>
    );
};

export default Login;
