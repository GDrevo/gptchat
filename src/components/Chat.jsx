import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Message from './Message'

const Chat = () => {
  // STATE
  const [newQuestion, setNewQuestion] = useState("")
  const [messageList, setMessageList] = useState([])

  const instance = axios.create({
    baseURL: "https://api.openai.com/v1",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer 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`,
    },
  });

  const askGPT = async (question) => {
    const response = await instance.post("/chat/completions", {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: question }],
    });

    return response.data.choices[0].message.content;
  }


  // BEHAVIOUR
  const handleSubmit = async () => {
    const prompt = "Peux-tu me résumer en environ 200 mots le livre : " + newQuestion
    const answer = await askGPT(prompt)
    setMessageList([
      {
        question: newQuestion,
        answer
      },
      ...messageList
    ])
    setNewQuestion("")
  }



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
            Résumer...
          </button>
        </div>
      </div>
    </div>
  )
}

export default Chat
