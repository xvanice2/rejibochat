import React, { useState, useEffect } from "react";
import ChatHistory from "./ChatHistory";
import ChatInput from "./ChatInput";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100vh",
  },
  chatContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "400px",
    height: "calc(100vh - 120px)",
    overflowY: "scroll",
    padding: theme.spacing(2),
    backgroundColor: "#f5f5f5",
    borderRadius: "8px",
  },
}));

function Chatbot({ responseMessage, sendMessage }) {
  const classes = useStyles();
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    // Scroll to the bottom of the chat container when a new message is added
    const chatContainer = document.getElementById("chat-container");
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }, [messages]);

  useEffect(() => {
    // Add bot response to the chat
    if (responseMessage !== "") {
      setMessages((messages) => [
        ...messages,
        { sender: "bot", text: responseMessage },
      ]);
    }
  }, [responseMessage]);

  const handleNewMessage = (message) => {
    // Add user message to the chat
    setMessages((messages) => [...messages, { sender: "user", text: message }]);

    sendMessage(message);
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSendMessage = () => {
    if (inputText.trim() !== "") {
      // Add user message to the chat
      handleNewMessage(inputText);
      // Clear the input field
      setInputText("");
    }
  };

  return (
    <div className={classes.container}>
      <Paper
        elevation={3}
        className={classes.chatContainer}
        id="chat-container"
        style={{
          margin: "15px",
        }}
      >
        <ChatHistory messages={messages} />
        <div style={{ clear: "both" }}></div>
      </Paper>
      <ChatInput
        inputText={inputText}
        handleInputChange={handleInputChange}
        handleSendMessage={handleSendMessage}
      />
    </div>
  );
}

export default Chatbot;
