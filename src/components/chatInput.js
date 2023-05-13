import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  container: {
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    padding: theme.spacing(2),
    borderTop: "1px solid #e0e0e0",
  },
  inputContainer: {
    display: "flex",
    alignItems: "center",
    width: "80%",
  },
  inputField: {
    flexGrow: 1,
    marginRight: theme.spacing(2),
  },
  sendButton: {
    marginLeft: theme.spacing(2),
  },
}));

function ChatInput(props) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.inputContainer}>
        <TextField
          className={classes.inputField}
          label="Your message"
          value={props.inputText}
          onChange={props.handleInputChange}
          variant="outlined"
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              props.handleSendMessage();
            }
          }}
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.sendButton}
          onClick={props.handleSendMessage}
        >
          Send
        </Button>
      </div>
    </div>
  );
}

export default ChatInput;
