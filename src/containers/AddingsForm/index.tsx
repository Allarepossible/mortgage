import React from 'react';
import moment from 'moment';
import {connect} from 'react-redux';

import {changeMonths, changePercent, changeInitialFee, changeDate, Target} from 'actions/deposit';
import Input from 'components/Input';

import {StyledForm, Add, Select} from './styles';

interface Props {
    percent: number;
    months: number;
    today: string;
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
        startDate: string;
        months: number;
    };
}

const Form: React.FC<Props & ActionsProps> = ({
    today,
    initialFee,
    ChangeInitialFee,
    ChangeDate,
}) => (
    <StyledForm>
        <Input
            id="initialFee"
            value={initialFee}
            changeInput={ChangeInitialFee}
            title="Сумма"
            type="cost"
        />
        <Input
            id="date"
            value={today}
            changeInput={ChangeDate}
            title="Дата"
            type="date"
        />
        <Select
            id="period"
            title="Периодичность"
            onChange={ChangeDate}
            value="one"
        >
            <option value="one">Единовременно</option>
            <option value="month">Ежемесячно</option>
        </Select>
        <Add onClick={() => {}} >+</Add>
    </StyledForm>
);

const mapStateToProps = ({deposit}: State): Props => {
    const {percent, initialFee, months} = deposit;

    return {
        today: moment(new Date()).format('YYYY-MM-DD'),
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
