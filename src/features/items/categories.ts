export const CATEGORY_NAMES = [
    "Technology",
    "Home",
    "Academic",
    "Personal",
    "Decoration",
    "Other",
];

export const CATEGORY_NAME_TO_ID: Record<string, number> = {
    Technology: 1,
    Home: 2,
    Academic: 3,
    Personal: 4,
    Decoration: 5,
    Other: 6,
};

export const CATEGORY_ID_TO_NAME: Record<number, string> = Object.fromEntries(
    Object.entries(CATEGORY_NAME_TO_ID).map(([name, id]) => [id, name])
);
