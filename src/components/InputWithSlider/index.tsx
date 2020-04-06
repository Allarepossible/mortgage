import React, {useState} from 'react';

import InputSlider from 'components/InputSlider';

import {InputWrap, Label} from  './styles';

const Input = ({
    id,
    min,
    max,
    title,
    val,
    changeInput,
}) => {
    const [value, setValue] = useState(val);
    const changeHandler = (e, data) => {
        setValue(parseInt(data.value));
        changeInput({target: parseInt(data.value)});
    };

    return (
        <InputWrap>
            <Label htmlFor={id} className="label">{title}</Label>
            <InputSlider
                min={1}
                max={30}
                mask="V лет"
                lazy={false}
                blocks={{V: {mask: Number, min, max}}}
                onChange={changeHandler}
                value={value}
            >
                <InputSlider.Tag val={1}>1 год</InputSlider.Tag>
                <InputSlider.Tag val={15}>15 лет</InputSlider.Tag>
                <InputSlider.Tag val={30}>30 лет</InputSlider.Tag>
            </InputSlider>
        </InputWrap>
    );
};

export default Input;
