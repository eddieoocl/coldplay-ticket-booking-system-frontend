import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/app/styles/TotalCount.css";
import type { OrderRequest } from "@/types/model/OrderRequest";
import type { Merchandise } from "@/types/model/Merchandise";

const TotalCountMerchandise: React.FC<{
    merchandises: Merchandise[];
    orderRequest: OrderRequest;
}> = ({ merchandises, orderRequest }) => {
    const totalValue = orderRequest.merchandiseInfo.reduce(
        (acc, merchandiseInfo) => {
            const unitPrice =
                merchandises.find(
                    (merchandise) =>
                        merchandise.merchandiseId ===
                        merchandiseInfo.merchandiseId
                )?.price ?? 0;

            return acc + merchandiseInfo.count * unitPrice;
        },
        0
    );

    const totalQuantity = orderRequest.merchandiseInfo
        .map((merchandiseInfo) => merchandiseInfo.count)
        .reduce((acc, count) => acc + count, 0);

    return (
        <div className="total-count-container">
            <div className="total-count-item">
                <p className="total-count-label">Total Quantity:</p>
                <p className="total-count-value">{totalQuantity}</p>
            </div>
            <div className="total-count-item">
                <p className="total-count-label">Total Value:</p>
                <p className="total-count-value">${totalValue.toFixed(2)}</p>
            </div>
        </div>
    );
};

export default TotalCountMerchandise;
