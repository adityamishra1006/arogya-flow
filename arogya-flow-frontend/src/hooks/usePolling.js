import { useEffect, useRef } from "react";

export default function usePolling(
    callback,
    delay = 5000,
    enabled = true
) {
    const savedCallback = useRef();

    // Always keep latest callback
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Polling effect
    useEffect(() => {
        if (!enabled || delay === null) return;

        const tick = async () => {
            if (savedCallback.current) {
                await savedCallback.current();
            }
        };

        tick(); // initial call

        const id = setInterval(tick, delay);

        return () => clearInterval(id);
    }, [delay, enabled]);
}
