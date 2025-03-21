import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

console.log("Loaded OneSignal APP ID:", process.env.ONESIGNAL_APP_ID);
console.log("Loaded OneSignal API Key:", process.env.ONESIGNAL_API_KEY ? "Loaded" : "Not Loaded");


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "http://localhost:5173" })); 
app.use(express.json());

// 🚀 API to Send Push Notification
app.post("/send-notification", async (req, res) => {
    const { title, message } = req.body;

    try {
        const response = await axios.post(
            "https://onesignal.com/api/v1/notifications", 
            {
                app_id: process.env.ONESIGNAL_APP_ID,
                headings: { en: title },
                contents: { en: message },
                included_segments: ["Subscribed Users"],
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Basic ${process.env.ONESIGNAL_API_KEY}`,
                },
            }
        );
        
        res.status(200).json({ success: true, data: response.data });
    } catch (error) {
        console.error("Error sending notification:", error);
        res.status(500).json({ success: false, error: error.response?.data || error.message });
    }
});

// 🌐 Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
