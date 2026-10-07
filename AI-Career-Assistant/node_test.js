const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

app.use(express.json());

app.post("/api/chat", async (req, res) => {
    try {
        const response = await fetch("https://job-platform-bxrj.onrender.com/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: req.body.message
            })
        });

        const data = await response.json();

        res.json(data);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Could not connect to Python chatbot"
        });
    }
});

app.listen(3001, () => {
    console.log("Node server running on http://localhost:3001");
})