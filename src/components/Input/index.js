import React from 'react';

import {normalizePrice} from '../../helpers/price';

import './index.css';

const Input = ({
    id,
    value,
    changeInput,
    title,
    type,
}) => (
    <div className="inputWrap cost">
        <label htmlFor={id} className="label">{title}</label>
        <input
            value={type === 'cost' ? normalizePrice(value): value}
            onChange={changeInput}
            id={id}
            className="input"
        />
    </div>
);

export default Input;
