import React from 'react'
import Board from './board.js'
import ToggleButton from './toggle-button.js'

export default class Game extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            history: [
                {
                    squares: Array(9).fill(null),
                    position: null,
                    turn: 'X'
                }
            ],
            sortAscending: false,
            stepNumber: 0
        }
    }

    setSquare(index) {
        if (this.state.history[this.state.stepNumber].squares[index] !== null || calculateWinner(this.state.history[this.state.stepNumber].squares) !== null)
            return
        const history = this.state.history.slice(0, this.state.stepNumber + 1),
              nextBoard = {
                  squares: history[history.length - 1].squares.slice(),
                  turn: history[history.length - 1].turn
              }
        nextBoard.squares[index] = nextBoard.turn
        nextBoard.turn = nextBoard.turn === 'X' ? 'O' : 'X'
        this.setState({
            history: history.concat([{
                squares: nextBoard.squares,
                turn: nextBoard.turn,
                position: index
            }]),
            stepNumber: this.state.stepNumber + 1
        })
    }

    goToHistoryItem(i) {
        this.setState({
            stepNumber: i
        })
    }

    renderHistoryItem(i, bold) {
        if (this.state.sortAscending)
            i = this.state.history.length - i - 1
        return (
            <li className={`history-item ${bold ? 'bold' : ''}`} onClick={() => this.goToHistoryItem(i)}>
                {i === this.state.stepNumber ? 'Current' : i === 0 ? 'Restart game' : `${(this.state.history[i].position % 3 + 1)}, ${((this.state.history[i].position - (this.state.history[i].position % 3)) / 3) + 1}` }
            </li>
        )
    }

    toggleSortHistory() {
        this.setState({
            sortAscending: !this.state.sortAscending
        })
    }
    
    render() {
        const current = this.state.history[this.state.stepNumber],
              winner = calculateWinner(current.squares)
        let status
        if (winner !== null)
            status = `Winner: ${winner.symbol}!`
        else if (this.state.stepNumber === 9)
            status = 'Tie!'
        else
            status = `Next Player: ${current.turn}`

        return (
            <main>
                <div className='status'>
                    {status}
                </div>
                <section>
                    <Board squares={current.squares} setSquare={this.setSquare.bind(this)} winners={winner !== null ? winner.positions : null} />
                    <ul className='history'>
                        {this.state.history.map((item, index) => this.renderHistoryItem(index, index === (this.state.sortAscending ? this.state.history.length - this.state.stepNumber - 1 : this.state.stepNumber)))}
                        <ToggleButton title="Sort Ascending" id="sortHistory" onClick={() => this.toggleSortHistory()} />
                    </ul>
                </section>
            </main>
        )
    }
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    let result = null

    lines.forEach( (arr) => {
        const [a, b, c] = arr

        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
            result = {
                positions: arr,
                symbol: squares[a]
            }
    })

    return result
}