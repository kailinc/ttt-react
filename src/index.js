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
      // this.props.onClick() click handler defined in parent
      // this.props.value is the value passed down from the parent
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

    // calls on the Square Component
    // value would be the value of the parent props.square[i]
    // onclick would run the onClick of the parents this.props.onClick(i)
    // which is defined in the top level( Game)
    return (<Square
             value={this.props.squares[i]}
             onClick={() => this.props.onClick(i)}
            />)
  }

  render() {
    // call renderSquare to render each square using Square component
    // very interesting thing way to do instead of doing < Square value=1>
    // returns the board
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
    // state has history array of objects
    this.state = {
      // neat way to do array of objects
      history: [{
        squares: Array(9).fill(null),
      }],
      // number of steps recorded
      stepNumber: 0,
      // determine whos next
      xIsNext: true,
    }
  }

  // function to deal with clicks,
  // if there is a winner, prevent clicking
  // resets state if do time travel
  handleClick(i) {
    // thinking history as immutable makes this possible
    const history = this.state.history.slice(0, this.state.stepNumber + 1)
    // current place
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
  // history starts at where you jump to
  // is like undoing a move
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
    // x or o
    const winner = calculateWinner(current.squares);


    // generate the link
    // has a neat way of displaying move or game start
    // its a function that generates the lists
    // very clever way of implementing
    const moves = history.map((step, move) => {
      // neat way to determines the text of the link
      // if there is no history, the first one will be game start
      // if there is game history, it will be move #1, 2
      const desc = move ? 'Move #' + move : 'Game start';
      // return link within li
      // when clicked will invoke jumpTo(move) function
      return (
        <li key={move}>
          <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
        </li>
      )
    })


    // initiate empty var
    let status;
    // determine stats via winner var, which is determined via calculateWinner
    // will auto run when history, squares change cuz React
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    // part 1:
    // use Board Component to generate html
    // set onClick for children to be handleClick, which prevent clicking after winner
    // also resets history, squares if time travel
    // set squares to be current state of the game (array)

    // part 2:
    // status updates according to winner
    // moves updates according to moves function that generate li of history
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
