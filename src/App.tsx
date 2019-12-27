import React, {useState, Fragment} from 'react';
import {connect} from 'react-redux';

import PaymentAndRemainderChart from './containers/PaymentAndRemainderChart';
import PaymentOfYearsChart from './containers/PaymentOfYearsChart';
import OverpaimentsChart from './containers/OverpaimentsChart';
import PaymentTable from './containers/PaymentTable';
import Input from './components/Input';
import SimplePie from './components/SimplePie';

import {changeFullPrice, changePercent, changeInitialFee, changeYears} from './actions';
import {normalizePrice} from './helpers/price';
import './App.css';

interface Props {
    credit: number;
    percent: number;
    payment: number;
    years: number;
    fullPrice: number;
    initialFee: number;
    overpayment: number;
}
interface ActionsProps {
    ChangeFullPrice: () => void;
    ChangeInitialFee: () => void;
    ChangePercent: () => void;
    ChangeYears: () => void;
}

const App: React.FC<Props & ActionsProps> = ({
    credit,
    percent,
    payment,
    years,
    fullPrice,
    initialFee,
    overpayment,
    ChangeFullPrice,
    ChangeInitialFee,
    ChangePercent,
    ChangeYears,
}) => {
    const [other, setOther] = useState(false);

    return (
        <div className="App">
            <div className="header">
                <div className="container header__container">
                    <h1>Ипотечный калькулятор</h1>
                </div>
            </div>
            <div className="main">
                <div className="container">
                    <div className="column">
                        <h2 className="title">Основные параметры ипотеки</h2>
                        <Input
                            id="fullPrice"
                            value={fullPrice}
                            changeInput={ChangeFullPrice}
                            title="Стоимость недвижимости"
                            type="cost"
                        />

                        <Input
                            id="initialFee"
                            value={initialFee}
                            changeInput={ChangeInitialFee}
                            title="Первоначальный взнос"
                            type="cost"
                        />

                        <Input
                            id="percent"
                            value={percent}
                            changeInput={ChangePercent}
                            title="Процент"
                            type="percent"
                        />

                        <Input
                            id="years"
                            value={years}
                            changeInput={ChangeYears}
                            title="Срок погашения (полных лет)"
                            type="years"
                        />

                        <div className="inputWrap">
                            <label htmlFor="start" className="label">Начало ипотеки</label>

                        </div>
                        {/*<div className="inputWrap">*/}
                        {/*    <button>Внести доп платеж</button>*/}
                        {/*</div>*/}
                    </div>
                    <div className="column">
                        <span className="payment">Ежемесячный платеж: <span className="big"> {normalizePrice(payment)}</span></span>
                        <span className="total">Сумма кредита: <span className="big">{normalizePrice(credit)}</span></span>
                        <span className="overpayment">Переплата: <span className="big">{normalizePrice(overpayment)}</span></span>
                        <span className="all">Долг + проценты: <span className="big">{normalizePrice(overpayment + credit)}</span></span>
                    </div>
                    <div className="column">
                        <SimplePie overpayment={overpayment} credit={credit}/>
                    </div>
                </div>
            </div>
            <div className="container">
                <PaymentTable
                    startDate={new Date()}
                    credit={credit}
                    payment={payment}
                />
            </div>
            <div className="container column">
                <h3>Выплата процентов и погашение задолженности</h3>
                <PaymentAndRemainderChart
                    startDate={new Date()}
                    credit={credit}
                    payment={payment}
                />
            </div>
            <div className="button">
                <button onClick={() => setOther(!other)}>
                    {!other ? 'Показать другие графики' : 'Скрыть другие графики'}
                </button>
            </div>
            {
                other &&
                (
                    <Fragment>
                        <div className="container column">
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
                        </div>
                    </Fragment>

                )
            }
        </div>
    );
};

const mapStateToProps = ({current}: {current: {
        fullPrice: number, percent: number, initialFee: number, years: number
    }}): Props => {
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
        years,
        payment,
        credit,
        overpayment,
    }
};

const mapDispatchToProps: ActionsProps = {
    ChangeFullPrice: changeFullPrice,
    ChangePercent: changePercent,
    ChangeInitialFee: changeInitialFee,
    ChangeYears: changeYears
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
