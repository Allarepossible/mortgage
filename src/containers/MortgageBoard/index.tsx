import React from 'react';
import {connect} from 'react-redux';

import PaymentAndRemainderChart from 'containers/PaymentAndRemainderChart';
import PaymentOfYearsChart from 'containers/PaymentOfYearsChart';
import OverpaimentsChart from 'containers/OverpaimentsChart';
import PaymentTable from 'containers/PaymentTable';
import Form from 'containers/Form';
import SimpleLine from 'components/SimpleLine';
import {normalizePrice} from 'helpers/price';

import {Row, Column, Big, Title, BigInfo, SmallInfo, Span} from './styles';

interface Props {
    credit: number;
    percent: number;
    payment: number;
    fullPrice: number;
    initialFee: number;
    overpayment: number;
}

interface State {
    current: {
        fullPrice: number;
        percent: number;
        initialFee: number;
        years: number;
    };
}

const MortgageBoard: React.FC<Props> = ({
    credit,
    percent,
    payment,
    fullPrice,
    initialFee,
    overpayment,
}) => (
    <Column>
        <Row>
            <BigInfo>
                <Title>Калькулятор</Title>
                <Form />
            </BigInfo>
            <SmallInfo>
                <SimpleLine second={overpayment} first={credit} firstTitle="Кредит" secondTitle="Переплата"/>
                <h3>Результаты расчета</h3>
                <Span>Ежемесячный платеж <Big>{normalizePrice(payment)}</Big></Span>
                <Span color="#53b374">Сумма кредита <Big>{normalizePrice(credit)}</Big></Span>
                <Span color="#b32427">Переплата <Big>{normalizePrice(overpayment)}</Big></Span>
                <Span>Общая выплата <Big>{normalizePrice(credit + overpayment)}</Big></Span>
            </SmallInfo>
        </Row>
        <Row>
            <SmallInfo>
                <PaymentTable
                    startDate={new Date()}
                    credit={credit}
                    payment={payment}
                />
            </SmallInfo>
            <BigInfo>
                <h3>Выплата процентов и погашение задолженности</h3>
                <PaymentAndRemainderChart
                    startDate={new Date()}
                    credit={credit}
                    payment={payment}
                />
                <h3>Переплата от количества лет</h3>
                <OverpaimentsChart
                    fullPrice={fullPrice}
                    initialFee={initialFee}
                    percent={percent}
                />

                <h3>Ежемесячный платеж от количества лет</h3>
                <PaymentOfYearsChart
                    fullPrice={fullPrice}
                    initialFee={initialFee}
                    percent={percent}
                />
            </BigInfo>
        </Row>
    </Column>
);

const mapStateToProps = ({current}: State): Props => {
    const {fullPrice, percent, initialFee, years} = current;
    const credit = fullPrice - initialFee;

    const duration = years * 12;
    const dem = 1 + percent/1200;

    const pow = Math.pow(dem, duration);
    const coef = pow * (dem - 1) / (pow - 1);

    const payment = Math.round(coef * credit);

    const overpayment = Math.round(payment * duration - credit);

    return {
        fullPrice,
        percent,
        initialFee,
        payment,
        credit,
        overpayment,
    };
};

export default connect(mapStateToProps)(MortgageBoard);
