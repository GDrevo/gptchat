import React, { useState } from 'react'
import axios from 'axios'
import Message from './Message'

const Chat = () => {
  // STATE
  const [newQuestion, setNewQuestion] = useState("")
  const [messageList, setMessageList] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const instance = axios.create({
    baseURL: "https://api.openai.com/v1",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
    },
  });

  const askGPT = async (question) => {
    setIsLoading(true)
    const response = await instance.post("/chat/completions", {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: question }],
    });
    setIsLoading(false)
    return response.data.choices[0].message.content;
  }


  // BEHAVIOUR
  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get(`http://localhost:8000/messages/${newQuestion}`)
      // console.log(response)
      const answer = response.data.answer
      console.log("NEXT ONE")
      console.log(answer)
      setMessageList([
        {
          question: newQuestion,
          answer
        },
        ...messageList
      ])
      console.log("setMessageList done")
      setNewQuestion("")
    } catch (error) {
      console.error(error)
    }
    setIsLoading(false)
  }

const loader = <img className='loader' src="loader.png" alt="loader" />

  // RENDER
  return (
    <div className="chat-container">
      <div className="chat-header">
        <h1>Résume-moi Chat</h1>
      </div>
      <div className="chat-chatbox">
        {messageList.map((value, id) => {
          return (
            <Message
              question = {value.question}
              answer = {value.answer}
              key = {id}
            />
          )
        })}
      </div>
      <div className="new-message">
        <div className="new-message-message">
          <input
            className="new-message-input"
            type="text"
            placeholder="Entrer le nom d'un livre"
            value={newQuestion}
            onChange={(e) => {
              setNewQuestion(e.target.value)
            }}
          />
          <button
            onClick={(e) => {
              handleSubmit(e)
            }}
            className='message-button'
          >
            {isLoading ? loader : "Résumer"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Chat
