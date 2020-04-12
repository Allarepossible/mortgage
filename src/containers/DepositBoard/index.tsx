import React from 'react';
import {connect} from 'react-redux';

import DepositTable from 'containers/DepositTable';
import DepositForm from 'containers/DepositForm';
import AddingsForm from 'containers/AddingsForm';
import AddingsList from 'containers/AddingsList';
import SimpleLine from 'components/SimpleLine';
import {normalizePrice} from 'helpers/price';

import {Row, Column, Big, Title, BigInfo, SmallInfo, Span} from './styles';

interface Props {
    initialFee: number;
    contributions: number;
    allMoney: number;
    percents: number;
}

interface State {
    deposit: {
        transactions: any;
        initialFee: number;
    };
}

const DepositBoard: React.FC<Props> = ({
    initialFee,
    contributions,
    allMoney,
    percents,
}) => (
    <Column>
        <Row>
            <BigInfo>
                <Title>Калькулятор вклада</Title>
                <DepositForm />
            </BigInfo>
            <SmallInfo>
                <SimpleLine second={percents} first={initialFee} firstTitle="Вклад" secondTitle="Проценты"/>
                <h3>Результаты расчета доходности</h3>
                <Span>Сумма вклада <Big>{normalizePrice(initialFee)}</Big></Span>
                <Span>Сумма довложений <Big>{normalizePrice(contributions)}</Big></Span>
                <Span color="#53b374">Начисленные проценты <Big>{normalizePrice(percents)}</Big></Span>
                <Span>Сумма вклада с процентами <Big>{normalizePrice(allMoney)}</Big></Span>
            </SmallInfo>
        </Row>
        <Row>
            <SmallInfo>
                <DepositTable />
            </SmallInfo>
            <BigInfo>
                <h3>Пополнения вклада</h3>
                <AddingsList />
                <AddingsForm />
            </BigInfo>
        </Row>
    </Column>
);

const mapStateToProps = ({deposit}: State): Props => {
    const {initialFee, transactions} = deposit;
    const {contributions, percents} = transactions.reduce((sum, {percentAmount, adding, type}) => {
        sum['percents'] += percentAmount;
        sum['contributions'] += type === 'add' ? Number(adding) : 0;
        return sum;
    }, {percents: 0, contributions: 0});
    const allMoney = contributions + percents;

    return {
        initialFee,
        contributions: contributions - initialFee,
        allMoney,
        percents,
    };
};

export default connect(mapStateToProps)(DepositBoard);
