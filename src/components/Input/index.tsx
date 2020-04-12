import React from 'react';

import {normalizeNumber} from 'helpers/price';

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
            type={type === 'date' ? 'date' : 'string'}
            value={type === 'cost' ? normalizeNumber(value): value}
            onChange={changeInput}
            id={id}
        />
    </InputWrap>
);

export default Input;
