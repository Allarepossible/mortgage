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
    deposit: number;
    contributionAmount: number;
    contributions: [];
    allMoney: number;
    percents: number;
}

interface State {
    deposit: {
        transactions: any;
        deposit: number;
        contributions: [];
    };
}

const DepositBoard: React.FC<Props> = ({
    deposit,
    contributions,
    contributionAmount,
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
                <SimpleLine
                    second={percents}
                    first={deposit + contributionAmount}
                    firstTitle="Вклад"
                    secondTitle="Проценты"
                />
                <h3>Результаты расчета доходности</h3>
                <Span>Сумма вклада <Big>{normalizePrice(deposit)}</Big></Span>
                <Span>Сумма довложений <Big>{normalizePrice(contributionAmount)}</Big></Span>
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
                {contributions.length > 0 && <AddingsList />}
                <AddingsForm />
            </BigInfo>
        </Row>
    </Column>
);

const mapStateToProps = ({deposit}: State): Props => {
    const {deposit: depositAmount, transactions, contributions} = deposit;
    const {contributionAmount, percents} = transactions.reduce((sum, {percentAmount, adding, type}) => {
        sum['percents'] += percentAmount;
        sum['contributionAmount'] += type === 'add' ? Number(adding) : 0;
        return sum;
    }, {percents: 0, contributionAmount: 0});
    const allMoney = contributionAmount + percents;

    return {
        deposit: depositAmount,
        contributions,
        contributionAmount: contributionAmount - depositAmount,
        allMoney,
        percents,
    };
};

export default connect(mapStateToProps)(DepositBoard);
