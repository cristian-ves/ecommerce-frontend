import { useCallback, useEffect, useRef } from "react";

export function useDebouncedCallback(callback: () => void, delayMs: number) {
    const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

    useEffect(() => {
        return () => clearTimeout(timeoutRef.current);
    }, []);

    return useCallback(() => {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(callback, delayMs);
    }, [callback, delayMs]);
}
