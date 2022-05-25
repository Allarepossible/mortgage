import React from 'react';
import {connect} from 'react-redux';

import Input from 'components/Input';
import InputWithSlider from 'components/InputWithSlider';

import {StyledForm, Row} from './styles';

interface Props {
    percent: number;
    months: number;
    fullPrice: number;
    initialFee: number;
}

const Form: React.FC<Props> = ({
    percent,
    months,
    fullPrice,
    initialFee,
}) => (
    <StyledForm>
        <Input
            id="fullPrice"
            value={fullPrice}
            changeInput={() => {}}
            title="Стоимость недвижимости"
            type="cost"
        />
        <Input
            id="initialFee"
            value={initialFee}
            changeInput={() => {}}
            title="Первоначальный взнос"
            type="cost"
        />
        <Row>
            <Input
                id="percent"
                value={percent}
                changeInput={() => {}}
                title="Процент"
                type="percent"
            />
            <InputWithSlider
                id="months"
                min={1}
                max={240}
                val={months}
                changeInput={() => {}}
                tags={[{val: 1, name: '1 месяц'}, {val: 120, name: '120 месяцев'}, {val: 240, name: '240 месяцев'}]}
                title="Срок погашения (в месяцах)"
            />
        </Row>
    </StyledForm>
);

const mapStateToProps = ({mortgage}): Props => {
    const {fullPrice, percent, initialFee, months} = mortgage;

    return {
        fullPrice,
        percent,
        initialFee,
        months,
    };
};

export default connect(mapStateToProps)(Form);
