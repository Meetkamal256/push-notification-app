import React, { useState, useEffect } from "react";
import styles from "./htmlPushNotifications.module.css"


const HtmlPushNotifications: React.FC = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isPermissionGranted, setIsPermissionGranted] = useState(false);
  const [serviceWorkerRegistered, setServiceWorkerRegistered] = useState(false);
  
  // Request push notification permission
  const requestPermission = async () => {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      setIsPermissionGranted(true);
      subscribeUserToPushNotifications();
    }
  };
  
  // Function to subscribe the user to push notifications
  const subscribeUserToPushNotifications = async () => {
    try {
      const sw = await navigator.serviceWorker.ready;
      const subscription = await sw.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: "YOUR_VAPID_PUBLIC_KEY", // Replace with your VAPID key
      });
      
      console.log(subscription);
      setIsSubscribed(true);
    } catch (error) {
      console.error("Subscription failed", error);
    }
  };
  
  // Send a push notification
  const sendNotification = () => {
    if (isSubscribed) {
      new Notification("Test Notification", {
        body: "This is a test notification from HTML5 Push API!",
        icon: "path/to/icon.png",
      });
      console.log("Test Notification sent!");
    } else {
      console.log("User is not subscribed.");
    }
  };
  
  // Register the service worker
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then(() => {
          setServiceWorkerRegistered(true);
        })
        .catch((error) => {
          console.error("Service Worker registration failed", error);
        });
    }
  }, []);
  
  return (
    <div className={styles.container}>
      <header className={styles.heroSection}>
        <h1>📢 HTML5 Push Notifications</h1>
        <p>Receive real-time notifications using HTML5 Push API!</p>
        
        {!isPermissionGranted && (
          <button onClick={requestPermission}>Enable Push Notifications</button>
        )}
        
        {isPermissionGranted && !isSubscribed && (
          <p>Push notifications are enabled. Subscribing...</p>
        )}
        
        {isPermissionGranted && isSubscribed && (
          <>
            <button onClick={sendNotification}>Send Test Notification</button>
            <p>Push notifications are active!</p>
          </>
        )}
        
        {!serviceWorkerRegistered && <p>Registering Service Worker...</p>}
      </header>
    </div>
  );
};

export default HtmlPushNotifications;
