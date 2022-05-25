import React from 'react';
import {connect} from 'react-redux';

import {changePeriod, changePercent, changeDeposit, changeStartDate, Target} from 'actions/deposit';
import Input from 'components/Input';
import InputWithSlider from 'components/InputWithSlider';

import {StyledForm, Row} from './styles';

interface Props {
    percent: number;
    months: number;
    startDate: Date;
    deposit: number;
}

interface ActionsProps {
    ChangeDeposit: ({target}: Target) => void;
    ChangePercent: ({target}: Target) => void;
    ChangePeriod: ({target}: Target) => void;
    ChangeDate: ({target}: Target) => void;
}
interface State {
    deposit: {
        percent: number;
        deposit: number;
        startDate: Date;
        months: number;
    };
}

const Form: React.FC<Props & ActionsProps> = ({
    startDate,
    percent,
    months,
    deposit,
    ChangeDeposit,
    ChangePercent,
    ChangePeriod,
    ChangeDate,
}) => (
    <StyledForm>
        <Input
            id="deposit"
            value={deposit}
            changeInput={ChangeDeposit}
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
                changeInput={ChangePeriod}
                tags={[{val: 1, name: '1 мес'}, {val: 12, name: '12 мес'}, {val: 24, name: '24 мес'}]}
                title="Длительность в месяцах"
            />
        </Row>
    </StyledForm>
);

const mapStateToProps = ({deposit}: State): Props => {
    const {percent, deposit: depositAmount, months, startDate} = deposit;

    return {
        startDate,
        percent,
        deposit: depositAmount,
        months,
    };
};

const mapDispatchToProps: ActionsProps = {
    ChangePercent: changePercent,
    ChangeDeposit: changeDeposit,
    ChangePeriod: changePeriod,
    ChangeDate: changeStartDate,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
