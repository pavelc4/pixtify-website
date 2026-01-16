import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { functionsMixins } from 'vite-plugin-functions-mixins';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit(), 
		functionsMixins({ deps: ['m3-svelte'] })
	]
});
