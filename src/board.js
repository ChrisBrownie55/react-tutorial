import React from 'react'
import Square from './square.js'

export default class Board extends React.Component {
    renderSquare(i) {
        return <Square value={this.props.squares[i]} onClick={() => this.props.setSquare(i)} highlighted={this.props.winners !== null && this.props.winners.includes(i)} />
    }

    renderSquares(quantity) {
        return [...Array(quantity).keys()].map(this.renderSquare.bind(this))
    }

    render() {
        return (
                <article className='board'>
                    {this.renderSquares(9)}
                </article>
        )
    }
}