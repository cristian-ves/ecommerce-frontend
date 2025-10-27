import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { searchItemsByQuery } from "../features/items";
import { loadPurchases } from "../features/purchase/purchaseSlice";

export const usePurchasesData = () => {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.auth);
    const { purchases, loading, error } = useAppSelector(
        (state) => state.purchases
    );
    const { items } = useAppSelector((state) => state.items);

    useEffect(() => {
        dispatch(searchItemsByQuery({ query: "" }));
        if (user) dispatch(loadPurchases(user.id));
    }, [dispatch, user]);

    const getItemDetails = (id: number) => items.find((i) => i.id === id);

    return { purchases, loading, error, getItemDetails };
};
