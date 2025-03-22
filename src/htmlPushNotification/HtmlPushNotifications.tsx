import React, { useState, useEffect } from "react";
import styles from "./htmlPushNotifications.module.css";
import { Link } from "react-router";

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
      // Check for existing subscription
      const existingSubscription = await sw.pushManager.getSubscription();
      
      // If there's an existing subscription, unsubscribe it
      if (existingSubscription) {
        await existingSubscription.unsubscribe();
        console.log("Previous subscription unsubscribed.");
      }
      
      // Now, subscribe with the new applicationServerKey
      const subscription = await sw.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey:
          "BPoiAobogYWNuxI00BqH77WOJ7h0MTGnmD6pTg23WLWBT0gIKrHLRAQ9NJQUQtScdDdbLU-4HsAN8Li7Lb52UZ8", // Replace with your VAPID key
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
      new Notification("New Message Received", {
        body: "You have a new message from your friend. Check it out now!",
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
        <h1>📲 Stay Connected with Push Notifications!</h1>
        <p>
          Get notified instantly about important updates, messages, or alerts
          directly on your browser.
        </p>
        <p>
          Allow push notifications, and we'll keep you informed even when you're
          not actively browsing.
        </p>

        {!isPermissionGranted && (
          <button className={styles.notifyButton} onClick={requestPermission}>
            Enable Push Notifications
          </button>
        )}

        {isPermissionGranted && !isSubscribed && (
          <p>
            We’re setting up your notifications. You’ll be ready to receive
            real-time alerts shortly.
          </p>
        )}

        {isPermissionGranted && isSubscribed && (
          <>
            <button className={styles.notifyButton} onClick={sendNotification}>
              Send Test Notification
            </button>
            <p>
              You're all set! Notifications are active and ready to notify you
              with updates.
            </p>
          </>
        )}

        {!serviceWorkerRegistered && (
          <p>Registering Service Worker... Please wait...</p>
        )}
      </header>
      <button>
        <Link to="/" className={styles.linkButton}>
          Navigate to oneSignal push Notification Demo
        </Link>
      </button>
    </div>
  );
};

export default HtmlPushNotifications;
