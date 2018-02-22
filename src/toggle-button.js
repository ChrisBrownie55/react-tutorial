import React from 'react'

export default function ToggleButton(props) {
    return (
        <div className='toggle-button'>
            <input id={props.id} type="checkbox" />
            <label htmlFor={props.id} onClick={props.onClick}>
            </label>
            <p>
                {props.title}
            </p>
        </div>
    )
}