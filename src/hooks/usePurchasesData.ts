import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { loadPurchases } from "../features/purchase/purchaseSlice";

export const usePurchasesData = () => {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.auth);
    const { purchases, loading, error } = useAppSelector(
        (state) => state.purchases
    );

    useEffect(() => {
        if (user) dispatch(loadPurchases(user.id));
    }, [dispatch, user]);

    return { purchases, loading, error };
};
