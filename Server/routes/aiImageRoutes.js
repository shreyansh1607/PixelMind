import express from "express";
import * as dotenv from "dotenv";
import fetch from "node-fetch"; // 👈 important for Node.js

dotenv.config();
const router = express.Router();

const HF_MODEL_URL = "https://router.huggingface.co/fal-ai/fal-ai/fast-sdxl";

// Simple GET route
router.get("/", (req, res) => {
  res.status(200).json({ message: "Hello from Fast SDXL (fal-ai)!" });
});

// POST route for image generation
router.post("/", async (req, res) => {
  try {
    const { prompt } = req.body;

    // Build request payload
    const payload = {
      sync_mode: true,
      prompt: prompt,
    };

    // Make the request to Hugging Face router
    const response = await fetch(HF_MODEL_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HF_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error(`Error ${response.status}: ${text}`);
      return res.status(500).send("Model request failed. Check logs.");
    }

    // Parse the JSON response from Hugging Face
    const responseData = await response.json();
    
    console.log("Response structure:", JSON.stringify(responseData, null, 2));
    
    // Extract the base64 image from the images array
    const base64Image = responseData.images[0].url;
    
    // Remove the data URL prefix if it exists
    const cleanBase64 = base64Image.replace(/^data:image\/[a-z]+;base64,/, '');

    // Send back as JSON
    res.status(200).json({ photo: cleanBase64 });
  } catch (error) {
    console.error("Full Error Response:");
    console.error(error.message);
    res.status(500).send("Image generation failed. Try again later.");
  }
});

export default router;



// import express, { Router } from "express";
// import * as dotenv from "dotenv";
// import { Configuration, OpenAIApi } from "openai";

// dotenv.config();
// const router = express.Router();
// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// const openai = new OpenAIApi(configuration);
// router.route("/").get((req, res) => {
//   res.status(200).json({ message: "Hello from DALL-E!" });
// });

// router.route("/").post(async (req, res) => {
//   try {
//     const { prompt } = req.body;

//     const aiResponse = await openai.createImage({
//       prompt,
//       n: 1,
//       size: "1024x1024",
//       response_format: "b64_json",
//     });

//     const image = aiResponse.data.data[0].b64_json;
//     res.status(200).json({ photo: image });
//   } catch (error) {
//     console.error(error);
//     res
//       .status(500)
//       .send(error?.response.data.error.message || "Something went wrong");
//   }
// });

// export default router;
