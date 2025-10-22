import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { loadItems } from "../features/items";

export const ITEMS_TO_LOAD = 30;

export const useItemsLoader = () => {
    const firstLoadRef = useRef(true);
    const dispatch = useAppDispatch();
    const { items, loading, page, hasMore, error } = useAppSelector(
        (state) => state.items
    );

    useEffect(() => {
        if (firstLoadRef.current) {
            dispatch(loadItems({ page: 0, size: ITEMS_TO_LOAD }));
            firstLoadRef.current = false;
        }
    }, [dispatch]);

    const loadMore = () => {
        if (!loading && hasMore) {
            dispatch(loadItems({ page, size: ITEMS_TO_LOAD }));
        }
    };

    return { items, loading, hasMore, loadMore, error };
};
