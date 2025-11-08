import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export type Theme = 'fastsaas' | 'fastsaas-dark';

const defaultTheme: Theme = 'fastsaas';

const createThemeStore = () => {
	const { subscribe, set, update } = writable<Theme>(defaultTheme);

	if (browser) {
		const stored = localStorage.getItem('theme');
		if (stored === 'fastsaas' || stored === 'fastsaas-dark') {
			set(stored);
		}

		subscribe((value) => {
			// Set data-theme for DaisyUI
			document.documentElement.setAttribute('data-theme', value);

			// Set dark class for Tailwind CSS
			const isDark = value === 'fastsaas-dark';
			document.documentElement.classList.toggle('dark', isDark);

			// Set color-scheme for native elements
			document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';

			// Persist to localStorage
			localStorage.setItem('theme', value);
		});
	}

	return {
		subscribe,
		setTheme: (value: Theme) => set(value),
		toggle: () => update((current) => (current === 'fastsaas' ? 'fastsaas-dark' : 'fastsaas')),
	};
};

export const theme = createThemeStore();

const authModalInternal = writable(false);

export const authModalState = {
	subscribe: authModalInternal.subscribe,
	open: () => authModalInternal.set(true),
	close: () => authModalInternal.set(false),
	toggle: () => authModalInternal.update((value) => !value)
};
