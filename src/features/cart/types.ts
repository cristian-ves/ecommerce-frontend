import type { Item } from "../items";

export interface CartItem {
    quantity: number;
    item: Item;
}

export interface CartState {
    items: CartItem[];
    error: string | null;
    loading: boolean;
}
