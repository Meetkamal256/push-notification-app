import React from "react";
import styles from "./app.module.css";

const App: React.FC = () => {
  const sendNotification = async (message: string) => {
    try {
      const response = await fetch(
        "https://onesignal.com/api/v1/notifications",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${import.meta.env.VITE_ONESIGNAL_API_KEY}`,
          },
          body: JSON.stringify({
            app_id: import.meta.env.VITE_ONESIGNAL_APP_ID,
            included_segments: ["All"],
            headings: { en: "New Notification" },
            contents: { en: message },
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send notification");
      }

      console.log("✅ Notification sent successfully");
    } catch (error) {
      console.error("❌ Error sending notification:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>🚀 OneSignal Push Notifications</h1>
      <div className={styles.btnContainer}>
        <button onClick={() => sendNotification("New React update available!")}>
          React
        </button>
        <button onClick={() => sendNotification("Angular 17 is live!")}>
          Angular
        </button>
        <button onClick={() => sendNotification("Vue 3 has new features!")}>
          Vue
        </button>
      </div>
    </div>
  );
};

export default App;
