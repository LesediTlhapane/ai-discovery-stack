/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */

import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { nitro } from "nitro/vite";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    server: { entry: "server" },
  },
  vite: {
    plugins: [
      nitro({
        preset: "vercel",
      }),
    ],
    server: {
      host: true,        // Expose to network (allows access from other devices)
      port: 7070,        // Change this to your preferred port (e.g., 5173, 8080, 3000)
      strictPort: false, // If port is taken, try next available port
    },
  },
});