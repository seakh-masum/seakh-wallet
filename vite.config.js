import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from "vite-plugin-pwa";

const manifestForPlugin = {
	registerType: "prompt",
	includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
	manifest: {
		name: "Seakh Wallet",
		short_name: "Seakh Wallet",
		description: "This app show all my card & id's details",
		icons: [
			{
				"src": "/images/icons/mstile-144x144.png",
				"sizes": "144x144",
				"type": "image/png",
				"purpose": "any"
			},
			{
				src: "/images/icons/android-chrome-192x192.png",
				sizes: "192x192",
				type: "image/png",
			},
			{
				src: "/images/icons/android-chrome-512x512.png",
				sizes: "512x512",
				type: "image/png",
			},
			{
				src: "/images/icons/apple-touch-icon.png",
				sizes: "180x180",
				type: "image/png",
				purpose: "apple touch icon",
			},
			{
				src: "/images/icons/safari-pinned-tab.svg",
				sizes: "225x225",
				type: "image/svg",
				purpose: "any maskable",
			},
		],
		"theme_color": "#6176E3",
		"background_color": "#DA38CD",
		display: "standalone",
		scope: "/",
		start_url: "/",
		orientation: "portrait",
	},
};

// https://vitejs.dev/config/
export default defineConfig({
	base: "./",
	resolve: {
		alias: {
			// '@features': '/src',
			"@features": "/src/components/features",
			"@ui": "/src/components/ui",
			"@icon": "/src/components/icon",
			"@context": "/src/contexts",
			"@hooks": "/src/hooks",
			"@layouts": "/src/layouts",
			"@pages": "/src/pages",
			"@shared": "/src/shared"
		},
	},
	plugins: [react(), VitePWA(manifestForPlugin)],
})
