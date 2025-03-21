self.addEventListener('push', function (event) {
    const options = {
        body: event.data ? event.data.text() : 'No payload',
    };
    
    event.waitUntil(
        self.registration.showNotification('New Push Notification', options)
    );
});

self.addEventListener('notificationclick', function (event) {
    event.notification.close();
    
    // Handle click events, e.g., navigate to a URL
    event.waitUntil(
        clients.openWindow('http://localhost:5173')
    );
});
