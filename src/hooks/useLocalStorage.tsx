'use client';
import { useState, useEffect } from 'react';

const getStorageValue = (key: string, defaultValue: any) => {
	if (typeof window !== 'undefined') {
		const savedContent = localStorage.getItem(key);

		if (savedContent) {
			const parsed = JSON.parse(savedContent);

			if (parsed.content.length === 0) {
				return defaultValue;
			}
			return parsed;
		}
		return defaultValue;
	}
};

const useLocalStorage = (key: string, defaultValue: any) => {
	const [value, setValue] = useState(() => getStorageValue(key, defaultValue));

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value));
	}, [key, value]);

	useEffect(() => {
		console.log(value);
	}, [value]);

	return [value, setValue];
};

export default useLocalStorage;
