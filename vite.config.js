import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "OSM Master Strategist",
        short_name: "OSM Tactics",
        description: "Elite tactical calculator for Online Soccer Manager",
        theme_color: "#002c62",
        background_color: "#0c1120",
        display: "standalone",
        orientation: "portrait",
        icons: [
          {
            src: "image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxOTIgMTkyIj48Y2lyY2xlIGN4PSI5NiIgY3k9Ijk2IiByPSI5NiIgZmlsbD0iIzAwMmM2MiIvPjx0ZXh0IHg9Ijk2IiB5PSIxMTAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSI4MCIgZmlsbD0iI2ZmYjQwMCIgdGV4dC1hbmNob3I9Im1pZGRsZSI+T1NNPC90ZXh0Pjwvc3ZnPg==",
            sizes: "192x192",
            type: "image/svg+xml",
            purpose: "any maskable",
          },
          {
            src: "image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48Y2lyY2xlIGN4PSIyNTYiIGN5PSIyNTYiIHI9IjI1NiIgZmlsbD0iIzAwMmM2MiIvPjx0ZXh0IHg9IjI1NiIgeT0iMzAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjAwIiBmaWxsPSIjZmZiNDAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5PU008L3RleHQ+PC9zdmc+",
            sizes: "512x512",
            type: "image/svg+xml",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-cache",
              expiration: { maxEntries: 10, maxAgeSeconds: 31536000 },
            },
          },
        ],
      },
    }),
  ],
  // 🔑 CRITICAL FIX: Proxy configuration (NO TRAILING SPACES!)
  server: {
    port: 5173,
    strictPort: true,
    proxy: {
      "/api/tactical-engine": {
        target: "https://rtzoxylddzhadwtsracs.supabase.co", // ✅ NO TRAILING SPACES
        changeOrigin: true,
        rewrite: (path) =>
          path.replace(
            /^\/api\/tactical-engine/,
            "/functions/v1/osm-counter-tactics",
          ),
        configure: (proxy) => {
          proxy.on("proxyReq", (proxyReq) => {
            const anonKey =
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ0em94eWxkZHpoYWR3dHNyYWNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAzOTkwMTQsImV4cCI6MjA4NTk3NTAxNH0.zXTYIKWJiTfACETqDs2NlvHoVF0031fiN01RhhZYCaE";
            proxyReq.setHeader("Authorization", `Bearer ${anonKey}`);
            proxyReq.setHeader("apikey", anonKey);
            proxyReq.setHeader("Content-Type", "application/json");
          });
        },
      },
    },
  },
});
