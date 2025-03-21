import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import OneSignalPushNotification from "./oneSignalPushNotification/OneSignalPushNotification";
import HtmlPushNotifications from "./htmlPushNotification/HtmlPushNotifications";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<OneSignalPushNotification />} />
        <Route path="/html-push" element={<HtmlPushNotifications />} />
      </Routes>
    </Router>
  );
};

export default App;
