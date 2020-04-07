import React from 'react';
import {connect} from 'react-redux';

import {changeFullPrice, changePercent, changeInitialFee, changeYears, Target} from 'actions';
import Input from 'components/Input';
import InputWithSlider from 'components/InputWithSlider';

import {StyledForm, Row} from './styles';

interface Props {
    percent: number;
    years: number;
    fullPrice: number;
    initialFee: number;
}

interface ActionsProps {
    ChangeFullPrice: ({target}: Target) => void;
    ChangeInitialFee: ({target}: Target) => void;
    ChangePercent: ({target}: Target) => void;
    ChangeYears: ({target}: Target) => void;
}
interface State {
    current: {
        fullPrice: number;
        percent: number;
        initialFee: number;
        years: number;
    };
}

const Form: React.FC<Props & ActionsProps> = ({
    percent,
    years,
    fullPrice,
    initialFee,
    ChangeFullPrice,
    ChangeInitialFee,
    ChangePercent,
    ChangeYears,
}) => (
    <StyledForm>
        <Input
            id="fullPrice"
            value={fullPrice}
            changeInput={ChangeFullPrice}
            title="Стоимость недвижимости"
            type="cost"
        />
        <Input
            id="initialFee"
            value={initialFee}
            changeInput={ChangeInitialFee}
            title="Первоначальный взнос"
            type="cost"
        />
        <Row>
            <Input
                id="percent"
                value={percent}
                changeInput={ChangePercent}
                title="Процент"
                type="percent"
            />
            <InputWithSlider
                id="years"
                min={1}
                max={30}
                val={years}
                changeInput={ChangeYears}
                tags={[{val: 1, name: '1 год'}, {val: 15, name: '15 лет'}, {val: 30, name: '30 лет'}]}
                title="Срок погашения (полных лет)"
            />
        </Row>
    </StyledForm>
);

const mapStateToProps = ({current}: State): Props => {
    const {fullPrice, percent, initialFee, years} = current;

    return {
        fullPrice,
        percent,
        initialFee,
        years,
    };
};

const mapDispatchToProps: ActionsProps = {
    ChangeFullPrice: changeFullPrice,
    ChangePercent: changePercent,
    ChangeInitialFee: changeInitialFee,
    ChangeYears: changeYears,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
