import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class Square extends React.Component {
  // call super to define subclass (JS)
  render() {
    return (
      // get value into the button
      // when click button, set state of square to be {value: 'X'}
      // gets the value of the square and displays it

      // pass down two props from Board to Square (value, onClick)
      // here is to use those things at Square
      <button className="square" onClick={() => this.props.onClick()}>
        {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {
  // initialize so that the squares state is set to null
  constructor() {
    super()
    this.state = {
      squares: Array(9).fill(null)
    }
  }

  // function to deal with clicks
  handleClick(i) {
    // array of squares from state
    const squares = this.state.squares.slice()
    // neat way to select the right index and update it
    squares[i] = 'X';
    // sets the new state
    this.setState({squares: squares});
  }

  // function to use Square component render squares
  renderSquare(i) {
    // pass i into value and use Square component to render each square
    // added () around Square so doesn't have ; at the end

    //
    return (<Square
             value={this.state.squares[i]}
             onClick={() => this.handleClick(i)}
            />)
  }

  render() {
    // status is the text to show
    const status = 'Next player: X';

    // call renderSquare to render each square using Square component
    // very interesting thing way to do instead of doing < Square value=1>
    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  // component that renders everything
  // starts the chain of rendering, updating
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
