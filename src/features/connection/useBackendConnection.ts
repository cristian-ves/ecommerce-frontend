import { useEffect } from "react";
import { useAppDispatch } from "../../store/hooks";
import { setConnectionStatus } from "./connectionSlice";
import apiInstance from "../../api/axiosInstance";

export const useBackendConnection = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const ping = async () => {
            try {
                const res = await apiInstance.get("/api/auth/ping");
                console.log("ping response:", res.status, res.data);
                dispatch(setConnectionStatus("connected"));
            } catch (err) {
                console.log("ping error:", err);
                dispatch(setConnectionStatus("disconnected"));
                setTimeout(ping, 5000);
            }
        };

        ping();
    }, [dispatch]);
};
