import "bootstrap/dist/css/bootstrap.min.css";
import "@/app/styles/Commodity.css";
import React from "react";
import type { OrderRequest } from "@/types/model/OrderRequest";
import type { Merchandise } from "@/types/model/Merchandise";

const Merchandise: React.FC<{
    merchandise: Merchandise;
    setOrderRequest: React.Dispatch<React.SetStateAction<OrderRequest>>;
    orderRequest: OrderRequest;
    readOnly?: boolean;
}> = ({ merchandise, setOrderRequest, orderRequest, readOnly = false }) => {
    const { merchandiseId, name, price } = merchandise;
    const amount =
        orderRequest.merchandiseInfo.find(
            (merchandise) => merchandise.merchandiseId == merchandiseId
        )?.count ?? 0;
    const total = (price * amount).toFixed(2);

    console.log(orderRequest);

    const handleIncrease = () => {
        setOrderRequest((prev) => {
            if (
                !prev.merchandiseInfo.find(
                    (item) => item.merchandiseId === merchandiseId
                )
            ) {
                return {
                    ...prev,
                    merchandiseInfo: [
                        ...prev.merchandiseInfo,
                        { merchandiseId, count: 1 },
                    ],
                };
            }

            const merchandiseInfo = prev.merchandiseInfo.map(
                (merchandiseInfo) => {
                    if (merchandiseInfo.merchandiseId === merchandiseId) {
                        return {
                            ...merchandiseInfo,
                            count: merchandiseInfo.count + 1,
                        };
                    }
                    return merchandiseInfo;
                }
            );

            return {
                ...prev,
                merchandiseInfo,
            };
        });
    };

    const handleDecrease = () => {
        setOrderRequest((prev) => {
            const merchandiseInfo = prev.merchandiseInfo
                .map((merchandiseInfo) => {
                    if (merchandiseInfo.merchandiseId === merchandiseId) {
                        const newCount = merchandiseInfo.count - 1;

                        if (newCount <= 0) {
                            return null;
                        }

                        return {
                            ...merchandiseInfo,
                            count: newCount,
                        };
                    }
                    return merchandiseInfo;
                })
                .filter((item) => item !== null);

            return {
                ...prev,
                merchandiseInfo,
            };
        });
    };

    return (
        <div className="order-entry">
            <div className="commodity-info">
                <p className="commodity-name">
                    {name && (
                        <span className="commodity-seating">
                            Merchandise: {name}
                        </span>
                    )}
                </p>
            </div>
            <div className="commodity-details">
                <p>Amount: {amount}</p>
                {/*todo currency symbol*/}
                <p>Price: ${price.toFixed(2)}</p>
                <p>Total: ${total}</p>
            </div>
            {!readOnly && (
                <div className="button-container">
                    <button className="round-button" onClick={handleIncrease}>
                        +
                    </button>
                    <button className="round-button" onClick={handleDecrease}>
                        -
                    </button>
                </div>
            )}
        </div>
    );
};

export default Merchandise;
