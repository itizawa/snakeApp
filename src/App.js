import React from 'react';
import './App.css';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      score: 0

    }
  }

  render() {
    return (
      <div className="App">
        <h1>Snake Game</h1>
        <p>SCORE:{this.state.score}</p>
      </div>
    );
  }
}

export default App;
