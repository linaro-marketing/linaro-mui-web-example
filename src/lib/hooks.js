import { useEffect, useState } from 'react';
/**
 * A hook to help set and get the current local storage value for the provided key.
 * @param {String} key
 * @param {Object|String|Number} initialValue
 * @returns
 */
export const useLocalStorage = (key, initialValue) => {
	// Read local storage the parse stored json or return initialValue
	const readStorage = () => {
		if (typeof window === 'undefined') {
			return initialValue;
		}
		try {
			const item = window.localStorage.getItem(key);
			return item ? parseJSON(item) : initialValue;
		} catch (error) {
			console.warn(`Error reading localStorage key “${key}”:`, error);
			return initialValue;
		}
	};

	// Persists the new value to localStorage.
	const setStorage = (value) => {
		if (typeof window == 'undefined') {
			console.warn(`Tried setting localStorage key “${key}” even though environment is not a client`);
		}
		try {
			// Allow value to be a function so we have the same API as useState
			const newValue = value instanceof Function ? value(state) : value;

			// Save to local storage
			window.localStorage.setItem(key, JSON.stringify(newValue));

			// We dispatch a custom event so every useLocalStorage hook are notified
			window.dispatchEvent(new Event('local-storage'));
		} catch (error) {
			console.warn(`Error setting localStorage key “${key}”:`, error);
		}
	};

	// State to store the value
	const [state, setState] = useState(initialValue);

	// Once the component is mounted, read from localStorage and update state.
	useEffect(() => {
		setState(readStorage());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		setStorage(state);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state]);

	// this only works for other documents, not the current one
	// useEventListener('storage', handleStorageChange);

	// this is a custom event, triggered in writeValueToLocalStorage
	// See: useLocalStorage()
	// useEventListener('local-storage', handleStorageChange);

	return [state, setState];
};
