import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	base: "/num-orixas-react/",
	server: {
		watch: {
			usePolling: true,
		},
	},
})
