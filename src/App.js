import React, {Component, Fragment} from 'react';
import {Pie} from 'react-chartjs-2';
import {connect} from 'react-redux';

import PaymentAndRemainderChart from './containers/PaymentAndRemainderChart';
import PaymentOfYearsChart from './containers/PaymentOfYearsChart';
import OverpaimentsChart from './containers/OverpaimentsChart';
import PaymentTable from './components/PaymentTable';
import Input from './components/Input';

import {changeFullPrice, changePercent, changeInitialFee, changeYears} from './actions';
import {createTable} from './helpers/days';
import {normalizePrice} from './helpers/price';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            other: false,
        };
    }

    handleOtherGraphs() {
        this.setState({other: !this.state.other});
    }

    render() {
        const {credit, percent, payment, years, startDate, fullPrice, ChangeFullPrice, initialFee, ChangeInitialFee, ChangePercent, ChangeYears, overpayment} = this.props;
        const tables = createTable({credit, percent, payment, years, startDate});

        return (
            <div className="App">
                <div className="header">
                    <h1>Ипотечный калькулятор</h1>
                </div>
                <div className="flex">
                    <div className="column">
                        <h2 className="title">Основные параметры ипотеки</h2>
                        <Input
                            id="fullPrice"
                            price={fullPrice}
                            changeInput={ChangeFullPrice}
                            title="Стоимость недвижимости"
                            type="cost"
                        />

                        <Input
                            id="initialFee"
                            price={initialFee}
                            changeInput={ChangeInitialFee}
                            title="Первоначальный взнос"
                            type="cost"
                        />

                        <div className="inputWrap percent">
                            <label htmlFor="percent" className="label">Процентная ставка</label>
                            <input
                                value={percent}
                                onChange={ChangePercent}
                                id="percent"
                                className="input"
                            />
                        </div>
                        <div className="inputWrap years">
                            <label htmlFor="years" className="label">Срок погашения (полных лет)</label>
                            <input
                                value={years}
                                onChange={ChangeYears}
                                id="years"
                                className="input"
                            />
                        </div>
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
                        <Pie data={{
                            labels: [
                                'Сумма кредита',
                                'Сумма переплаты'
                            ],
                            datasets: [{
                                data: [credit, overpayment],
                                backgroundColor: [
                                    '#53b374',
                                    '#fad16a',
                                ],
                                hoverBackgroundColor: [
                                    '#53b374',
                                    '#fad16a',
                                ]
                            }]
                        }} options={{
                            responsive: true,
                            legend: {
                                position: 'top',
                                reverse: true,
                            },
                            tooltips: {
                                callbacks: {
                                    label: (tooltipItem, data) => {
                                        const money = data.datasets[0].data[tooltipItem.index];

                                        return ` ${data.labels[tooltipItem.index]}: ${normalizePrice(money)}`;
                                    },
                                    afterLabel: (tooltipItem, data) => {
                                        const money = data.datasets[0].data[tooltipItem.index];

                                        return `\n${Math.round(money * 100/(overpayment + credit))} % от всей суммы`;
                                    }

                                },
                                width: '100px',
                            },
                        }}/>
                    </div>
                </div>
                {tables &&
                <div className="flex">
                    <PaymentTable
                        tables={tables}
                        payment={payment}
                    />
                </div>
                }
                {tables &&
                <div className="flex">
                        <h3>Выплата процентов и погашение задолженности</h3>
                        <PaymentAndRemainderChart
                            startDate={startDate}
                            credit={credit}
                            payment={payment}
                        />
                    </div>
                }
                <div className="button">
                    <button onClick={this.handleOtherGraphs.bind(this)}>
                        {!this.state.other ? 'Показать другие графики' : 'Скрыть другие графики'}
                    </button>
                </div>
                {
                    this.state.other &&
                    (
                        <Fragment>
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
                        </Fragment>

                    )
                }

            </div>
        );
    }
}

const mapStateToProps = ({current}) => {
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
        duration,
        dem,
        coef,
        overpayment,
        startDate: new Date(),
    }
};
const mapDispatchToProps = {
    ChangeFullPrice: changeFullPrice,
    ChangePercent: changePercent,
    ChangeInitialFee: changeInitialFee,
    ChangeYears: changeYears
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
