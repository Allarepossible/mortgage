import React from 'react';

import {normalizePrice} from '../../helpers/price';

import {Input as StyledInput, InputWrap, Label} from  './styles';

const Input = ({
    id,
    value,
    changeInput,
    title,
    type,
}) => (
    <InputWrap>
        <Label htmlFor={id} className="label">{title}</Label>
        <StyledInput
            value={type === 'cost' ? normalizePrice(value): value}
            onChange={changeInput}
            id={id}
        />
    </InputWrap>
);

export default Input;
