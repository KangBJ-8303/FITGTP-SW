import React, { useState } from "react";
import styled from "styled-components";

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 400px; /* 모바일 규격에 맞춘 너비 설정 */
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
  bottom: 60px; /* 하단바 바로 위 */
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
        // API 호출하여 AI 응답 받기
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer YOUR_OPENAI_API_KEY`  // 실제 API 키를 여기에 넣어야 합니다
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",  // OpenAI 모델 선택
            messages: [{ role: "user", content: input }],
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP 오류! 상태: ${response.status}`);
        }

        const data = await response.json();
        const aiMessage = { text: data.choices[0].message.content, isSender: false };
        setMessages((prevMessages) => [...prevMessages, aiMessage]);
      } catch (error) {
        console.error("메시지 전송 오류:", error);
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
