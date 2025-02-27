import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import viteTsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), viteTsconfigPaths()],
  server: {
    host: true,
  },
});
