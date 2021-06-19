import React, { Component } from "react";
import { getPatients } from "./services";
import Practitioner from "./components/Practitioner";
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from './components/ErrorFallback'

class App extends Component {
  componentDidMount() {
    getPatients().then((res) => {
      console.log(res);
    });
  }

  render() {
    return (
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => window.location.reload()}
      >
        <Practitioner>
        </Practitioner>
      </ErrorBoundary>
    );
  }
}

export default App;
