import React, {useState} from 'react';
import moment from 'moment';
import {connect} from 'react-redux';

import {addContribution} from 'actions/deposit';
import Input from 'components/Input';

import {StyledForm, Add, Select} from './styles';

interface Props {
    nextId: number;
    AddContribution: (value: any) => void;
}

const Form = ({nextId, AddContribution}: Props) => {
    const today = moment(new Date()).format('YYYY-MM-DD');
    const [amount, changeAmount] = useState(100000);
    const [date, changeDate] = useState(today);
    const [periodicity, changePeriodicity] = useState('one');

    return (
        <StyledForm>
            <Input
                id="initialFee"
                value={amount}
                changeInput={({target}) => changeAmount(target.value)}
                title="Сумма"
                type="count"
            />
            <Input
                id="date"
                value={date}
                changeInput={({target}) => changeDate(target.value)}
                title="Дата"
                type="date"
            />
            <Select
                id="period"
                title="Периодичность"
                onChange={({target}) => changePeriodicity(target.value)}
                value={periodicity}
            >
                <option value="one">Единовременно</option>
                <option value="month">Ежемесячно</option>
            </Select>
            <Add onClick={() => AddContribution({amount, date, periodicity, id: nextId, type: 'add'})} >+</Add>
        </StyledForm>
    );
};


const mapStateToProps = ({deposit}: any) => ({nextId: deposit.nextId});

const mapDispatchToProps = {
    AddContribution: addContribution,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
