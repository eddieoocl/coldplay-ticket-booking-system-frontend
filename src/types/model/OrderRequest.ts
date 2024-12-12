export interface OrderRequest {
    userId: number;
    ticketInfo: TicketInfo[];
    merchandiseInfo: MerchandiseInfo[];
}

interface TicketInfo {
    ticketTypeId: number;
    count: number;
}

interface MerchandiseInfo {
    merchandiseId: number;
    count: number;
}
