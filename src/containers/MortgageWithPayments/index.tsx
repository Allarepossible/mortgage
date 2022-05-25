import React from 'react';
import {connect} from 'react-redux';

import MortgageTable from 'containers/MortgageTable';
import AddingsForm from 'containers/AddingsForm';
import MortgageForm from 'containers/MortgageForm';
import SimpleLine from 'components/SimpleLine';
import {normalizePrice} from 'helpers/price';
import {calculatePayment} from 'helpers/mortgage';

import {Row, Column, Big, Title, BigInfo, SmallInfo, Span} from './styles';

interface Props {
    credit: number;
    percent: number;
    payment: number;
    payments: [];
    fullPrice: number;
    initialFee: number;
    overpayment: number;
}

interface State {
    mortgage: {
        fullPrice: number;
        percent: number;
        initialFee: number;
        months: number;
        payments: [];
        contributions: [];
        nextId: number;
        startDate: string;
    };
}

const MortgageWithPayments: React.FC<Props> = ({
    credit,
    payment,
    overpayment,
}) => (
    <Column>
        <Row>
            <BigInfo>
                <Title>Калькулятор досрочных платежей</Title>
                <MortgageForm />
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
                <MortgageTable />
            </SmallInfo>
            <BigInfo>
                <h3>Досрочные погашения</h3>
                {/*{contributions.length > 0 && <AddingsList />}*/}
                <AddingsForm />
            </BigInfo>
        </Row>
    </Column>
);

const mapStateToProps = ({mortgage}: State): Props => {
    const {fullPrice, percent, initialFee, months, payments} = mortgage;
    const credit = fullPrice - initialFee;

    const payment = calculatePayment({months, credit, percent});

    const overpayment = Math.round(payment * months - credit);

    return {
        fullPrice,
        percent,
        initialFee,
        payment,
        credit,
        overpayment,
        payments,
    };
};

export default connect(mapStateToProps)(MortgageWithPayments);
