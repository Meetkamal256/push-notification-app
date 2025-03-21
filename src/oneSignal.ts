import OneSignal from "react-onesignal";

export const initializeOneSignal = async () => {
  try {
    await OneSignal.init({ appId: import.meta.env.VITE_ONESIGNAL_APP_ID });
    console.log("OneSignal initialized");
  } catch (error) {
    console.error("OneSignal initialization error:", error);
  }
};
