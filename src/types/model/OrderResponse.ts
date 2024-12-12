interface OrderResponse {
    orderId: string;
    concertId: string;
    orderTime: string;
    totalPrices: string;
    paymentMethod: string;
    paymentStatus: string;
    ticketInfo: TicketInfo[];
    merchandiseInfo: MerchandiseInfo[];
    concertData: {
        id: string;
        name: string;
        date: string;
        time: string;
        venue: string;
        address: string;
    };
}

interface TicketInfo {
    id: string;
    ticketType: string;
    price: string;
    seat: string;
}

interface MerchandiseInfo {
    merchandiseId: string;
    merchandiseName: string;
    price: number;
    count: number;
    isCharity: boolean;
}