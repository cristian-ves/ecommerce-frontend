export interface Category {
    id: number;
    name: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
    suspended: boolean;
    role: {
        id: number;
        name: string;
    };
}

export interface Item {
    id: number;
    name: string;
    description: string;
    image: string;
    price: number;
    new: boolean;
    category: Category;
    user: User;
    stock: number;
    rating: number;
    rates: number;
    accepted: boolean;
}

export interface NewItem {
    name: string;
    description: string;
    image: string;
    price: number;
    stock: number;
    isNew: boolean;
    category: Category;
    user: User;
}

export interface ItemsState {
    items: Item[];
    myItems: Item[];
    loading: boolean;
    error: string | null;
    page: number;
    hasMore: boolean;
}
