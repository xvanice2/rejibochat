import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  messageContainer: {
    margin: theme.spacing(0.5),
    padding: theme.spacing(1),
    borderRadius: "4px",
    display: "inline-block",
    maxWidth: "75%",
  },
  userMessage: {
    backgroundColor: "#e3f2fd",
    float: "left",
  },
  botMessage: {
    backgroundColor: "#e0e0e0",
    float: "left",
    marginLeft: "auto",
    textAlign: "right",
  },
}));

function ChatHistory(props) {
  const classes = useStyles();

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      {props.messages.map((message, index) => (
        <Typography
          style={{ wordWrap: "break-word" }}
          key={index}
          variant="body1"
          className={`${classes.messageContainer} ${
            message.sender === "user" ? classes.userMessage : classes.botMessage
          }`}
        >
          {message.text}
        </Typography>
      ))}
    </div>
  );
}

export default ChatHistory;
