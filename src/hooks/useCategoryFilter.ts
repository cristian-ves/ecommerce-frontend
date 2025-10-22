import { useState, useEffect } from "react";
import { useAppDispatch } from "../store/hooks";
import { loadItems } from "../features/items";
import { ITEMS_TO_LOAD } from "./useItemsLoader";

export const useCategoryFilter = (initialCategories: string[] = []) => {
    const [selectedCategories, setSelectedCategories] =
        useState<string[]>(initialCategories);
    const [userInteracted, setUserInteracted] = useState(false);
    const dispatch = useAppDispatch();

    const toggleCategory = (category: string) => {
        setUserInteracted(true);
        setSelectedCategories((prev) =>
            prev.includes(category)
                ? prev.filter((c) => c !== category)
                : [...prev, category]
        );
    };

    useEffect(() => {
        if (userInteracted && selectedCategories.length === 0) {
            dispatch(loadItems({ page: 0, size: ITEMS_TO_LOAD }));
        }
    }, [selectedCategories, userInteracted, dispatch]);

    return { selectedCategories, toggleCategory, setSelectedCategories };
};
