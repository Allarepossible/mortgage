import React, {useState} from 'react';

import InputSlider from 'components/InputSlider';

import {InputWrap, Label} from  './styles';

const Input = ({
    id,
    min,
    max,
    title,
    val,
    tags,
    changeInput,
}) => {
    const [value, setValue] = useState(val);
    const changeHandler = (e, data) => {
        let currentVal: string | number = '';
        if (data) {
            currentVal = parseInt(data.value);
        } else if (e.target.value) {
            currentVal = e.target.value > max ? max : parseInt(e.target.value);
        }
        setValue(currentVal);
        changeInput({target: currentVal});
    };

    return (
        <InputWrap>
            <Label htmlFor={id} className="label">{title}</Label>
            <InputSlider
                min={min}
                max={max}
                onChange={changeHandler}
                value={value}
                tags={tags}
            />
        </InputWrap>
    );
};

export default Input;
