interface OrderResponse {
    orderId: number;
    totalPrices: string;
    orderTime: string;
    orderStatus: string;
    ticketInfo: TicketInfo[];
    merchandiseInfo: MerchandiseInfo[];
}

interface TicketInfo {
    id: number;
    ticketType: string;
    moviegoer: string;
    ticketNumber: string;
    price: number;
}

interface MerchandiseInfo {
    merchandiseId: number;
    merchandiseName: string;
    price: number;
    count: number;
}
