export interface OrderRequest {
    userId: number;
    phoneNumber: string;
    ticketInfo: TicketInfo[];
    merchandiseInfo: MerchandiseInfo[];
}

interface TicketInfo {
    ticketTypeId: number;
    moviegoer: string;
}

interface MerchandiseInfo {
    merchandiseId: number;
    count: number;
}
