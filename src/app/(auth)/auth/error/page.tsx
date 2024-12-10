"use client";

import { useSearchParams } from "next/navigation";

export default function AuthError() {
    const searchParams = useSearchParams();

    const errorCode = searchParams.get("error");

    return (
        <div>
            An error occurred while authenticating. Error code: {errorCode}
        </div>
    );
}
