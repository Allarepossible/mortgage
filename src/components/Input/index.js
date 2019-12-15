import React from 'react';

import {normalizePrice} from '../../helpers/price';

import './index.css';

const Input = ({
    id,
    price,
    changeInput,
    title,
    type,
}) => (
    <div className="inputWrap cost">
        <label htmlFor={id} className="label">{title}</label>
        <input
            value={normalizePrice(price)}
            onChange={changeInput}
            id={id}
            className="input"
        />
    </div>
);

export default Input;
