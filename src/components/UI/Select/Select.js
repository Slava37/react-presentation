import React from 'react'
import classes from './Select.module.css'

const Select = props => {

    const htmlFor = `${props.label}-${Math.random()}`;

    return (
        <div className={classes.Select}>
            <label htmlFor={htmlFor}>{props.label}</label>
            <select
                id={htmlFor}
                value={props.value}
                onChange={props.onChange}
            >
                {props.options.map((opt, index) => {
                    return (
                        <option
                            value={opt.value}
                            key={opt.value + index}
                        >
                            {opt.text}
                        </option>
                    )
                })}
            </select>
        </div>
    )
}

export default Select;