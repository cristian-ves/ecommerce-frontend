import type { PurchaseDTO } from "../purchase/type";

export interface LogState {
    purchases: PurchaseDTO[];
    error: string | null;
}
