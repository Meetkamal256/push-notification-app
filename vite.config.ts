import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  
  return {
    plugins: [react()],
    define: {
      "process.env.VITE_ONESIGNAL_APP_ID": JSON.stringify(
        env.VITE_ONESIGNAL_APP_ID
      ),
      "process.env.VITE_ONESIGNAL_API_KEY": JSON.stringify(
        env.VITE_ONESIGNAL_API_KEY
      ),
    },
  };
});


