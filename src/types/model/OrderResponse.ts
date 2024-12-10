interface OrderResponse {
    orderId: string;
    totalPrices: string;
    orderTime: string;
    orderStatus: string;
    ticketInfo: TicketInfo[];
    merchandiseInfo: MerchandiseInfo[];
}

interface TicketInfo {
    ticketType: string;
    moviegoer: string;
    ticketNumber: string;
    price: number;
}

interface MerchandiseInfo {
    merchandiseName: string;
    price: number;
    count: number;
}
