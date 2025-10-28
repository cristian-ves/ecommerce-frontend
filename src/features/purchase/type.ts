export interface CardResponse {
    id: number;
    last4: string;
    userId: number;
}

export interface PurchasesState {
    cards: CardResponse[];
    purchases: PurchaseDTO[];
    loading: boolean;
    error: string | null;
}

export interface PurchaseRequest {
    userId: number;
    cardId: number;
    items: CartItemDTO[];
}

export interface CartItemDTO {
    userId: number;
    itemId: number;
    quantity: number;
}

export interface PurchaseDTO {
    purchaseId: number;
    userId: number;
    cardId: number;
    deliveryDate: Date;
    delivered: boolean;
    total: number;
    createdAt: Date;
    items: ItemPurchasedDTO[];
}

export interface ItemPurchasedDTO {
    itemId: number;
    userId: number;
    purchaseId: number;
    quantity: number;
}
