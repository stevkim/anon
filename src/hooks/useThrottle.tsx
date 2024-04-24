import { useCallback, useEffect, useRef } from 'react';

// calculate remaining time from last invocation
const remainingTime = (last: number, delay: number) => {
	const elapsed = Date.now() - last;
	const remaining = delay - elapsed;

	return remaining < 0 ? 0 : remaining;
};

const useThrottle = (fn: (...args: any) => void, delay: number) => {
	const lastTriggered = useRef<number>(Date.now());
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	const cancel = useCallback(() => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
			timeoutRef.current = null;
		}
	}, []);

	const throttledFn = useCallback(
		(...args: any) => {
			let remaining = remainingTime(lastTriggered.current, delay);

			if (remaining === 0) {
				lastTriggered.current = Date.now();
				fn();
				cancel();
			} else if (!timeoutRef.current) {
				timeoutRef.current = setTimeout(() => {
					remaining = remainingTime(lastTriggered.current, delay);

					if (remaining === 0) {
						lastTriggered.current = Date.now();
						fn(...args);
						cancel();
					}
				}, remaining);
			}
		},
		[fn, cancel, delay]
	);

	// invoke cancel and refresh is this hook is recalled
	useEffect(() => cancel, [cancel]);

	return throttledFn;
};

export default useThrottle;
