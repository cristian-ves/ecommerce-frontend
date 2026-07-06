import { useAppDispatch, useAppSelector } from "../store/hooks";
import { toggleCategoryId } from "../features/items";
import {
    CATEGORY_NAME_TO_ID,
    CATEGORY_ID_TO_NAME,
} from "../features/items/categories";

export const useCategoryFilter = () => {
    const dispatch = useAppDispatch();
    const categoryIds = useAppSelector(
        (state) => state.items.filters.categoryIds
    );

    const selectedCategories = categoryIds
        .map((id) => CATEGORY_ID_TO_NAME[id])
        .filter(Boolean);

    const toggleCategory = (categoryName: string) => {
        const id = CATEGORY_NAME_TO_ID[categoryName];
        dispatch(toggleCategoryId(id));
    };

    return { selectedCategories, toggleCategory };
};
