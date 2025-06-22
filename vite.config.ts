import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/QrCodeGenerator/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', '145.png'],
      manifest: {
        name: 'QR Code Generator',
        short_name: 'QR Generator',
        description: 'A QR code generator with icon embedding capabilities',
        theme_color: '#0f172a',
        background_color: '#0a0a0a',
        display: 'standalone',
        scope: '/QrCodeGenerator/',
        start_url: '/QrCodeGenerator/',
        icons: [
          {
            src: '145.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '145.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
})
