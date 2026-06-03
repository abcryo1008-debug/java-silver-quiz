import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// スマホから見られるよう host:true にしてある（npm run dev でそのままLAN公開）
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // 0.0.0.0 で待ち受け = 同じWi-Fiのスマホからアクセス可能
    port: 5173,
  },
});
