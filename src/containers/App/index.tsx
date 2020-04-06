import React, {useState, Fragment} from 'react';
import {connect} from 'react-redux';

import PaymentAndRemainderChart from 'containers/PaymentAndRemainderChart';
import PaymentOfYearsChart from 'containers/PaymentOfYearsChart';
import OverpaimentsChart from 'containers/OverpaimentsChart';
import PaymentTable from 'containers/PaymentTable';
import Form from 'containers/Form';
// import SimplePie from 'components/SimplePie';
import {normalizePrice} from 'helpers/price';

import {Row, Column, Big, Overpayment, Payment, Title, Total, All, Info} from './styles';

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

const Index: React.FC<Props> = ({
    credit,
    percent,
    payment,
    fullPrice,
    initialFee,
    overpayment,
}) => {
    const [other, setOther] = useState(false);

    return (
        <Column>
            <Row>
                <Info>
                    <Title>Калькулятор</Title>
                    <Form />
                </Info>
                <Info>
                    {/*<SimplePie overpayment={overpayment} credit={credit}/>*/}
                    <Payment>Ежемесячный платеж:
                        <Big> {normalizePrice(payment)}</Big>
                    </Payment>
                    <Total>Сумма кредита:
                        <Big>{normalizePrice(credit)}</Big>
                    </Total>
                    <Overpayment>Переплата:
                        <Big>{normalizePrice(overpayment)}</Big>
                    </Overpayment>
                    <All>Долг + проценты:
                        <Big>{normalizePrice(overpayment + credit)}</Big>
                    </All>
                </Info>
            </Row>
            <Row>
                <Info>
                    <PaymentTable
                        startDate={new Date()}
                        credit={credit}
                        payment={payment}
                    />
                </Info>
                <Info>
                    <h3>Выплата процентов и погашение задолженности</h3>
                    <PaymentAndRemainderChart
                        startDate={new Date()}
                        credit={credit}
                        payment={payment}
                    />
                    <div className="button">
                        <button onClick={() => setOther(!other)}>
                            {!other ? 'Показать другие графики' : 'Скрыть другие графики'}
                        </button>
                    </div>
                    {
                        other &&
                        (
                            <Fragment>
                                <Column>
                                    <h2>Ежемесячный платеж от количества лет</h2>
                                    <OverpaimentsChart
                                        fullPrice={fullPrice}
                                        initialFee={initialFee}
                                        percent={percent}
                                    />

                                    <h2>Переплата от количества лет</h2>
                                    <PaymentOfYearsChart
                                        fullPrice={fullPrice}
                                        initialFee={initialFee}
                                        percent={percent}
                                    />
                                </Column>
                            </Fragment>

                        )
                    }
                </Info>
            </Row>
        </Column>
    );
};

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

export default connect(mapStateToProps)(Index);
