export const getDefaultDates = () => {
    const today = new Date();
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(today.getDate() - 2);

    const format = (d: Date) => d.toISOString().split("T")[0];

    return {
        start: format(twoDaysAgo),
        end: format(today),
    };
};
