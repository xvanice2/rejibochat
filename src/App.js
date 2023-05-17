import React, { Component } from "react";
import Chatbot from "./components/ChatBot";
import axios from "axios";

class App extends Component {
  state = {
    responseMessage: "",
    connString: "http://127.0.0.1:8000/message",
  };

  sendMessage = (message) => {
    axios
      .post(`${this.state.connString}`, { text: `${message}` })
      .then((res) => {
        console.log(res.data);
        this.setState({ responseMessage: res.data });
      });
  };

  render() {
    return (
      <div className="App">
        <Chatbot
          responseMessage={this.state.responseMessage}
          sendMessage={this.sendMessage}
        />
      </div>
    );
  }
}

export default App;
