"use client";

import "../../styles/page.css";
import SelectTicketPage from "@/app/components/SelectTicketPage";
import { useSearchParams } from "next/navigation";

const SelectOrder = () => {
    const searchParams = useSearchParams();

    const concertId = searchParams.get("concertId");

    if (!concertId) {
        return <div>Invalid concert id</div>;
    }

    return <SelectTicketPage concertId={concertId} />;
};

export default SelectOrder;
