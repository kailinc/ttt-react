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

  // function to use Square component render squares
  renderSquare(i) {
    // pass i into value and use Square component to render each square
    // added () around Square so doesn't have ; at the end

    //
    return (<Square
             value={this.props.squares[i]}
             onClick={() => this.props.onClick(i)}
            />)
  }

  render() {
    // call renderSquare to render each square using Square component
    // very interesting thing way to do instead of doing < Square value=1>
    return (
      <div>
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
  constructor() {
    super()
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
    }
  }

  // function to deal with clicks
  handleClick(i) {
    // thinking history as immutable makes this possible
    const history = this.state.history.slice(0, this.state.stepNumber + 1)
    const current = history[history.length - 1]

    // array of squares of that place in history
    const squares = current.squares.slice()

    // error handling for winner or not existant
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    // neat way to determine which state is Next based on value of xIsNext
    squares[i] = this.state.xIsNext ? 'X' : 'O'

    // sets the new state
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      stepNumber: history.length,
      // resets for next iteration
      xIsNext: !this.state.xIsNext
    });
  }

  // sets current state to be the place in history you want it to be
  // changes xIsNext based on the steps
  // history is unchanged
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    })
  }

  // component that renders everything
  // starts the chain of rendering, updating
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    // generate the link
    // has a neat way of displaying move or game start
    const moves = history.map((step, move) => {
      // this determines the text of the link
      const desc = move ? 'Move #' + move : 'Game start';
      return (
        <li key={move}>
          <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
        </li>
      )
    })


    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}/>
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// very clever way to calculate the winner
function calculateWinner(squares) {
  // combination of wins in index combo
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // loops to check each combo
  for (let i = 0; i < lines.length; i++) {
    // const [a,b,c] will be the array based of lines[i]
    const [a, b, c] = lines[i];
    // checks to see if mark is placed there
    // checks to see the combo
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      // returns the winning combo
      return squares[a]
    }
  }
  return null;
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
