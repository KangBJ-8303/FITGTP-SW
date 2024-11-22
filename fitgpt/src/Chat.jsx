import React, { useState } from "react";
import styled from "styled-components";

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 400px;
  height: 100%;
  margin: 0 auto;
  background-color: #f7f7f7;
  font-family: 'Noto Sans KR', sans-serif;
  overflow: hidden;
`;

const MessageList = styled.div`
  flex: 1;
  padding: 0.5rem;
  overflow-y: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

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
  width: 100%;
  max-width: 400px;
  position: fixed;
  bottom: 60px;
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
      // 사용자 메시지 전송
      const userMessage = { text: input, isSender: true };
      setMessages([...messages, userMessage]);
      setInput("");

      try {
        // POST 요청으로 메시지 전송
        const postResponse = await fetch("http://127.0.0.1:8080/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: input }),
        });

        if (!postResponse.ok) {
          throw new Error(`POST 요청 실패: 상태 ${postResponse.status}`);
        }

        // GET 요청으로 응답 받기
        const getResponse = await fetch(
          `http://127.0.0.1:8080/api/chat?prompt=${encodeURIComponent(input)}`
        );

        if (!getResponse.ok) {
          throw new Error(`GET 요청 실패: 상태 ${getResponse.status}`);
        }

        const data = await getResponse.json();
        const aiMessage = { text: data.content, isSender: false };
        setMessages((prevMessages) => [...prevMessages, aiMessage]);
      } catch (error) {
        console.error("메시지 처리 중 오류:", error);
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
        <SendButton onClick={handleSend}>전송</SendButton>
      </InputArea>
    </ChatContainer>
  );
}

export default Chat;

