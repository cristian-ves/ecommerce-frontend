export interface IRUser {
    name: string;
    email: string;
    suspended: boolean;
}

export interface UserManager extends IRUser {
    id: number;
}

export interface ItemRequest {
    id: number;
    name: string;
    description: string;
    image: string;
    price: number;
    stock: number;
    isNew: boolean;
    accepted: boolean;
    rejected: boolean;
    user: IRUser;
}

export interface ModState {
    users: UserManager[];
    items: ItemRequest[];
    loading: boolean;
    error: string | null;
    banningId: number;
}
