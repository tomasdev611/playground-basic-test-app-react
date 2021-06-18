import React, { Component } from "react";
import { getPatients } from "./services";
import Practitioner from "./components/Practitioner";

class App extends Component {
  componentDidMount() {
    getPatients().then((res) => {
      console.log(res);
    });
  }
  render() {
    return (
      <Practitioner>

      </Practitioner>
    );
  }
}

export default App;
