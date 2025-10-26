import { useState } from "react";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

const MySwal = withReactContent(Swal);

export const useCardForm = () => {
    const [cardData, setCardData] = useState({
        name: "",
        number: "",
        expiration: "",
        cvv: "",
    });

    const [saveCard, setSaveCard] = useState(false);

    const handleChange = (field: string, value: string) => {
        setCardData((prev) => ({ ...prev, [field]: value }));
    };

    const validateCardForm = (): boolean => {
        const { name, number, expiration, cvv } = cardData;

        if (!name || !number || !expiration || !cvv) {
            MySwal.fire({
                icon: "error",
                title: "Missing information",
                text: "Please fill in all fields.",
            });
            return false;
        }

        if (!/^[0-9]{16,19}$/.test(number)) {
            MySwal.fire({
                icon: "error",
                title: "Invalid card number",
                text: "Card number must be 16-19 digits.",
            });
            return false;
        }

        if (!/^[0-9]{3}$/.test(cvv)) {
            MySwal.fire({
                icon: "error",
                title: "Invalid CVV",
                text: "CVV must be 3 digits.",
            });
            return false;
        }

        if (!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(expiration)) {
            MySwal.fire({
                icon: "error",
                title: "Invalid expiration date",
                text: "Use MM/YY format.",
            });
            return false;
        }

        const [month, year] = expiration.split("/").map(Number);
        const now = new Date();
        const expDate = new Date(2000 + year, month);
        if (expDate < now) {
            MySwal.fire({
                icon: "error",
                title: "Expired card",
                text: "Expiration date is in the past.",
            });
            return false;
        }

        return true;
    };

    return { cardData, saveCard, setSaveCard, handleChange, validateCardForm };
};
