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
    const mapStyle={
      gridSize: '10',
      display: 'grid',
      gridTemplateColumns: 'repeat(10, 30px)',  /* 10列 幅30px */
      gridTemplateRows: 'repeat(10, 30px)', /* 10行 高さ30px */
      margin: '0 auto',
      width: '300px'
    }

    return (
      <div className="App">
        <h1>Snake Game</h1>
        <p>SCORE:{this.state.score}</p>
        <div id='map' style={mapStyle}>
        </div>
      </div >
    );
  }
}

export default App;
