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

const MessageWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  margin: 0.3rem 0;
  ${({ isSender }) => (isSender ? "flex-direction: row-reverse;" : "flex-direction: row;")}
`;

const ProfileImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  margin: 0 0.5rem;
`;

const Message = styled.div`
  max-width: 60%;
  padding: 0.3rem 0.6rem;
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
      const userMessage = { text: input, isSender: true };
      setMessages([...messages, userMessage]);
      setInput("");

      try {
        const response = await fetch(
          `https://54.180.138.98:443/api/bot/chat?prompt=${encodeURIComponent(input)}`
        );

        if (!response.ok) {
          throw new Error(`요청 실패: 상태 ${response.status}`);
        }

        const data = await response.json();
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
          <MessageWrapper key={index} isSender={msg.isSender}>
            <ProfileImage
              src={msg.isSender ? "/images/user.jpeg" : "/images/trainer.png"}
              alt={msg.isSender ? "My Profile" : "AI Profile"}
            />
            <Message isSender={msg.isSender}>{msg.text}</Message>
          </MessageWrapper>
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


