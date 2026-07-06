import { useAppDispatch, useAppSelector } from "../store/hooks";
import { loadItems, resetItems, searchAndFilterItems } from "../features/items";
import { ITEMS_TO_LOAD } from "./useItemsLoader";

export const useProductSearch = () => {
    const dispatch = useAppDispatch();
    const { query, categoryIds } = useAppSelector(
        (state) => state.items.filters
    );

    const runSearch = () => {
        if (!query.trim() && categoryIds.length === 0) {
            dispatch(resetItems());
            dispatch(loadItems({ page: 0, size: ITEMS_TO_LOAD }));
        } else {
            dispatch(searchAndFilterItems());
        }
    };

    return { runSearch };
};
