// Chat.jsx
import React, { useState } from "react";
import styled from "styled-components";

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 120px); /* 상단바와 하단바 높이를 제외 */
  max-width: 400px;
  margin: auto;
  background-color: #f7f7f7;
`;

const MessageList = styled.div`
  flex: 1;
  padding: 0.5rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

// Message 컴포넌트를 여기에 선언
const Message = styled.div`
  max-width: 60%;
  padding: 0.3rem 0.6rem;
  margin: 0.3rem;
  font-size: 0.9rem;
  color: ${({ isSender }) => (isSender ? "white" : "black")};
  background-color: ${({ isSender }) => (isSender ? "#3f51b5" : "#e0e0e0")};
  border-radius: 10px;
  align-self: ${({ isSender }) => (isSender ? "flex-end" : "flex-start")};
  border-top-right-radius: ${({ isSender }) => (isSender ? "0" : "10px")};
  border-top-left-radius: ${({ isSender }) => (isSender ? "10px" : "0")};
`;

const InputArea = styled.div`
  display: flex;
  padding: 0.5rem;
  background-color: #ffffff;
  border-top: 1px solid #ddd;
  position: fixed;
  bottom: 60px; /* 하단바 위 */
  max-width: 400px;
  width: 100%;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.3rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
`;

const SendButton = styled.button`
  padding: 0.3rem 0.6rem;
  margin-left: 0.3rem;
  background-color: #3f51b5;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
`;

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (input.trim()) {
      const userMessage = { text: input, isSender: true };
      setMessages([...messages, userMessage]);
      setInput("");

      try {
        const response = await fetch("https://your-ai-api.com/message", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: input }),
        });

        const data = await response.json();
        const aiMessage = { text: data.reply, isSender: false };
        setMessages((prevMessages) => [...prevMessages, aiMessage]);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  return (
    <ChatContainer>
      <MessageList>
        {messages.map((msg, index) => (
          <Message key={index} isSender={msg.isSender}>
            {msg.text}
          </Message>
        ))}
      </MessageList>
      <InputArea>
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="이렇게 말해보세요: 하체운동 어떤 게 좋아?"
        />
        <SendButton onClick={handleSend}>Send</SendButton>
      </InputArea>
    </ChatContainer>
  );
}

export default Chat;
