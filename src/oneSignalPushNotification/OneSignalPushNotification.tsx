import { Link } from "react-router";
import styles from "./oneSignalPushNotification.module.css";

const OneSignalPushNotification = () => {
      const sendNotification = async (message: string) => {
        try {
          const response = await fetch(
            "https://onesignal.com/api/v1/notifications",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Basic ${
                  import.meta.env.VITE_ONESIGNAL_API_KEY
                }`,
              },
              body: JSON.stringify({
                app_id: import.meta.env.VITE_ONESIGNAL_APP_ID,
                included_segments: ["All"],
                headings: { en: "Hello!" },
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
    <>
      <div className={styles.container}>
        <header className={styles.heroSection}>
          <h1>📢 Stay Updated!</h1>
          <p>Receive instant notifications about our latest updates.</p>
          <button
            onClick={() => sendNotification("🚀 Welcome to our app!")}
            className={styles.notifyButton}
          >
            Send Notification
          </button>
        </header>
        <button>
          <Link to="/html-push" className={styles.linkButton}>
            Navigate to HTML Push Notification Demo
          </Link>
        </button>
      </div>
    </>
  );
}

export default OneSignalPushNotification