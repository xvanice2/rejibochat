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

function Chatbot() {
  const classes = useStyles();
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    // Scroll to the bottom of the chat container when a new message is added
    const chatContainer = document.getElementById("chat-container");
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }, [messages]);

  const handleNewMessage = (message) => {
    // Add user message to the chat
    setMessages((messages) => [...messages, { sender: "user", text: message }]);

    // Generate bot response
    const responses = [
      "I'm sorry, I didn't understand that.",
      "Can you please rephrase that?",
      "That's interesting. Tell me more.",
      "I'm not sure I agree with that.",
    ];
    const randomIndex = Math.floor(Math.random() * responses.length);
    const response = responses[randomIndex];

    // Add bot response to the chat
    setMessages((messages) => [...messages, { sender: "bot", text: response }]);
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
