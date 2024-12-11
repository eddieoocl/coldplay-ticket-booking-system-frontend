import type { Concert } from "./Concert";

export interface Merchandise {
    merchandiseId: number;
    concert: Concert;
    name: string;
    description: string;
    price: number;
    quantity: number;
    availableQuantity: number;
    imageUrl: string;
}
