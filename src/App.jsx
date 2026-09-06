import { useState } from "react"

function App() {
  const [showDubak, setShowDubak] = useState(false)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)

  async function sendMessage() {
    if (message.trim() === "" || loading) return

    const userMessage = message

    setMessages([
      ...messages,
      { sender: "You", text: userMessage }
    ])

    setMessage("")
    setLoading(true)

    try {
      const response = await fetch("http://localhost:3001/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: userMessage
        })
      })

      const data = await response.json()

      setMessages((currentMessages) => [
        ...currentMessages,
        {
          sender: "Dubak",
          text: data.reply
        }
      ])
    } catch (error) {
      setMessages((currentMessages) => [
        ...currentMessages,
        {
          sender: "Dubak",
          text: "I couldn't connect to the Dubak server."
        }
      ])
    }

    setLoading(false)
  }

  if (showDubak) {
    return (
      <div className="dubak-page">
        <nav>
          <div className="logo">Rado</div>

          <button onClick={() => setShowDubak(false)}>
            ← Back
          </button>
        </nav>

        <main className="chat">
          <h1>Dubak AI</h1>
          <p>Your AI assistant, built by Rado.</p>

          <div className="messages">
            {messages.map((msg, index) => (
              <div key={index} className="message">
                <strong>{msg.sender}:</strong> {msg.text}
              </div>
            ))}

            {loading && (
              <div className="message">
                <strong>Dubak:</strong> Thinking...
              </div>
            )}
          </div>

          <div className="chat-box">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage()
                }
              }}
              placeholder="Ask Dubak anything..."
            />

            <button onClick={sendMessage}>
              Send
            </button>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div>
      <nav>
        <div className="logo">Rado</div>

        <div className="nav-links">
          <a href="#">Home</a>
          <a href="#dubak">Dubak AI</a>
          <a href="#">About</a>
        </div>
      </nav>

      <main>
        <section className="hero">
          <h1>Rado</h1>
          <p>Technology for everyone.</p>
          <button>Explore Rado</button>
        </section>

        <section className="dubak" id="dubak">
          <h2>Dubak AI</h2>
          <p>An intelligent AI tool built by Rado.</p>

          <button onClick={() => setShowDubak(true)}>
            Try Dubak AI
          </button>
        </section>
      </main>
    </div>
  )
}

export default App