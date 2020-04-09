import React from 'react';
import {connect} from 'react-redux';

import DepositTable from 'containers/DepositTable';
import DepositForm from 'containers/DepositForm';
import SimpleLine from 'components/SimpleLine';
import {normalizePrice} from 'helpers/price';

import {Row, Column, Big, Title, BigInfo, SmallInfo, Span} from './styles';

interface Props {
    initialFee: number;
    addings: number;
    allMoney: number;
    percents: number;
}

interface State {
    deposit: {
        percent: number;
        initialFee: number;
        months: number;
    };
}

const DepositBoard: React.FC<Props> = ({
    initialFee,
    addings,
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
                <Span>Сумма довложений <Big>{normalizePrice(addings)}</Big></Span>
                <Span color="#53b374">Начисленные проценты <Big>{normalizePrice(percents)}</Big></Span>
                <Span>Сумма вклада с процентами <Big>{normalizePrice(allMoney)}</Big></Span>
            </SmallInfo>
        </Row>
        <Row>
            <SmallInfo>
                <DepositTable />
            </SmallInfo>
            <BigInfo>
                <h3>Выплата процентов и погашение задолженности</h3>
                {/*<PaymentAndRemainderChart*/}
                {/*    startDate={new Date()}*/}
                {/*    credit={credit}*/}
                {/*    payment={payment}*/}
                {/*/>*/}
            </BigInfo>
        </Row>
    </Column>
);

const mapStateToProps = ({deposit}: State): Props => {
    const {percent, initialFee, months} = deposit;
    const addings = 300000;

    const dem = 1 + percent/1200;

    const pow1 = Math.pow(dem, months);
    const pow2 = Math.pow(dem, months - 4);

    const allMoney = initialFee * pow1 + addings * pow2;
    const percents = allMoney - initialFee - addings;

    return {
        initialFee,
        addings,
        allMoney,
        percents,
    };
};

export default connect(mapStateToProps)(DepositBoard);
