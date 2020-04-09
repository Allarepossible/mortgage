import React from 'react';
import {connect} from 'react-redux';

import {changeMonths, changePercent, changeInitialFee, changeDate, Target} from 'actions/deposit';
import Input from 'components/Input';
import InputWithSlider from 'components/InputWithSlider';

import {StyledForm, Row} from './styles';

interface Props {
    percent: number;
    months: number;
    startDate: Date;
    initialFee: number;
}

interface ActionsProps {
    ChangeInitialFee: ({target}: Target) => void;
    ChangePercent: ({target}: Target) => void;
    ChangeMonths: ({target}: Target) => void;
    ChangeDate: ({target}: Target) => void;
}
interface State {
    deposit: {
        percent: number;
        initialFee: number;
        startDate: Date;
        months: number;
    };
}

const Form: React.FC<Props & ActionsProps> = ({
    startDate,
    percent,
    months,
    initialFee,
    ChangeInitialFee,
    ChangePercent,
    ChangeMonths,
    ChangeDate,
}) => (
    <StyledForm>
        <Input
            id="initialFee"
            value={initialFee}
            changeInput={ChangeInitialFee}
            title="Первоначальный взнос"
            type="cost"
        />
        <Input
            id="date"
            value={startDate}
            changeInput={ChangeDate}
            title="Дата открытия вклада"
            type="date"
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
                max={24}
                val={months}
                changeInput={ChangeMonths}
                tags={[{val: 1, name: '1 мес'}, {val: 12, name: '12 мес'}, {val: 24, name: '24 мес'}]}
                title="Длительность в месяцах"
            />
        </Row>
    </StyledForm>
);

const mapStateToProps = ({deposit}: State): Props => {
    const {percent, initialFee, months, startDate} = deposit;

    return {
        startDate,
        percent,
        initialFee,
        months,
    };
};

const mapDispatchToProps: ActionsProps = {
    ChangePercent: changePercent,
    ChangeInitialFee: changeInitialFee,
    ChangeMonths: changeMonths,
    ChangeDate: changeDate,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
