const express = require("express")
const cors = require("cors")
require("dotenv").config()

const { GoogleGenAI } = require("@google/genai")

const app = express()

app.use(cors())
app.use(express.json())

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
})

app.get("/", (req, res) => {
  res.send("THIS IS THE NEW DUBAK SERVER 🚀")
})

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body

    console.log("Dubak received a message:", message)

    if (!message || message.trim() === "") {
      return res.status(400).json({
        reply: "Please enter a message."
      })
    }

    const interaction = await ai.interactions.create({
      model: "gemini-3.6-flash",
      input: message
    })

    console.log("Gemini responded successfully.")

    res.json({
      reply: interaction.output_text
    })

  } catch (error) {
    console.error("===== GEMINI ERROR =====")
    console.error(error)
    console.error("========================")

    res.status(500).json({
      reply: "Sorry, Dubak ran into an error."
    })
  }
})

const PORT = 3001

app.listen(PORT, () => {
  console.log(`Dubak server running on http://localhost:${PORT}`)
})