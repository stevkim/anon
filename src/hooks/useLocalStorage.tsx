import { useState, useEffect } from 'react';

const getStorageValue = (key: string, defaultValue: any) => {
	if (typeof window !== 'undefined') {
		const savedContent = localStorage.getItem(key);

		return savedContent ? JSON.parse(savedContent) : defaultValue;
	}
};

const useLocalStorage = (key: string, defaultValue: any) => {
	const [value, setValue] = useState(() => {
		return getStorageValue(key, defaultValue);
	});

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value));
	}, [key, value]);

	return [value, setValue];
};

export default useLocalStorage;
