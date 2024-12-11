"use client";

import { useSearchParams } from "next/navigation";
import "../../styles/page.css";
import ConfirmOrderPage from "@/app/components/ConfirmOrderPage";

const ConfirmOrder = () => {
    const searchParams = useSearchParams();

    const orderId = searchParams.get("orderId");

    if (!orderId) {
        return <div>Invalid order id</div>;
    }

    return <ConfirmOrderPage orderId={Number(orderId)} />;
};

export default ConfirmOrder;
