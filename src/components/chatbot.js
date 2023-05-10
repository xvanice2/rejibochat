import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2),
  },
  chatContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "400px",
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    backgroundColor: "#f5f5f5",
    borderRadius: "8px",
  },
  message: {
    margin: theme.spacing(0.5),
    padding: theme.spacing(1),
    borderRadius: "4px",
  },
  userMessage: {
    backgroundColor: "#e3f2fd",
  },
  botMessage: {
    backgroundColor: "#e0e0e0",
  },
  inputContainer: {
    display: "flex",
    alignItems: "center",
    width: "400px",
  },
  inputField: {
    flexGrow: 1,
    marginRight: theme.spacing(2),
  },
}));

function Chatbot() {
  const classes = useStyles();
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSendMessage = () => {
    if (inputText.trim() !== "") {
      // Add user message to the chat
      setMessages([...messages, { text: inputText, sender: "user" }]);
      // Call your ChatGPT API or any other chatbot logic here to get a response
      // Replace the next line with your chatbot API call
      const botResponse = "This is a placeholder response from the bot.";
      // Add bot response to the chat
      setMessages([...messages, { text: botResponse, sender: "bot" }]);
      // Clear the input field
      setInputText("");
    }
  };

  return (
    <div className={classes.container}>
      <Paper elevation={3} className={classes.chatContainer}>
        {messages.map((message, index) => (
          <Typography
            key={index}
            variant="body1"
            className={`${classes.message} ${
              message.sender === "user"
                ? classes.userMessage
                : classes.botMessage
            }`}
          >
            {message.text}
          </Typography>
        ))}
      </Paper>
      <div className={classes.inputContainer}>
        <TextField
          className={classes.inputField}
          label="Your message"
          value={inputText}
          onChange={handleInputChange}
          variant="outlined"
        />
        <Button variant="contained" color="primary" onClick={handleSendMessage}>
          Send
        </Button>
      </div>
    </div>
  );
}

export default Chatbot;
