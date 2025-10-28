import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
    deliverPurchaseThunk,
    getPurchasesThunk,
    updateDeliveryDateThunk,
} from "../features/log";
import Swal from "sweetalert2";

export const useLogistics = () => {
    const dispatch = useAppDispatch();
    const { purchases } = useAppSelector((state) => state.log);

    const [openDialog, setOpenDialog] = useState(false);
    const [selectedPurchase, setSelectedPurchase] = useState<number | null>(
        null
    );
    const [newDate, setNewDate] = useState("");
    const [expanded, setExpanded] = useState<number | null>(null);

    useEffect(() => {
        dispatch(getPurchasesThunk());
    }, [dispatch]);

    const handleOpenEdit = (purchaseId: number, currentDate: Date) => {
        const dateObj = new Date(currentDate);
        setSelectedPurchase(purchaseId);
        setNewDate(dateObj.toISOString().split("T")[0]);
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
        setSelectedPurchase(null);
    };

    const handleSaveDate = async () => {
        if (!selectedPurchase || !newDate) return;

        try {
            const updated = await dispatch(
                updateDeliveryDateThunk({
                    purchaseId: selectedPurchase,
                    deliveryDate: newDate,
                })
            ).unwrap();

            Swal.fire({
                icon: "success",
                title: "Delivery date updated",
                text: `New date: ${newDate}`,
            });
        } catch (err: any) {
            Swal.fire({
                icon: "error",
                title: "Failed to update",
                text: err || "Something went wrong updating delivery date",
            });
        }

        handleClose();
    };

    const handleDeliver = async (purchaseId: number) => {
        const confirm = await Swal.fire({
            title: "Deliver this purchase?",
            text: "This will mark it as delivered.",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, deliver it",
        });

        if (!confirm.isConfirmed) return;

        try {
            const deliveredId = await dispatch(
                deliverPurchaseThunk(purchaseId)
            ).unwrap();

            Swal.fire({
                icon: "success",
                title: "Delivered!",
                text: `Purchase #${deliveredId} marked as delivered.`,
            });
        } catch (err: any) {
            Swal.fire({
                icon: "error",
                title: "Error delivering purchase",
                text: err.message || "Something went wrong",
            });
        }
    };

    const toggleExpand = (purchaseId: number) => {
        setExpanded((prev) => (prev === purchaseId ? null : purchaseId));
    };

    return {
        purchases,
        openDialog,
        newDate,
        setNewDate,
        expanded,
        selectedPurchase,
        handleOpenEdit,
        handleClose,
        handleSaveDate,
        handleDeliver,
        toggleExpand,
    };
};
