import React, { Component, Fragment } from 'react';
import DatePicker from 'react-datepicker';

import Chart from './components/Chart';
import ChartP from './components/ChartPaymentOfYear';
import ChartD from './components/ChartOverpaiments';
import PaymentTable from './components/PaymentTable';

import {createTable, secondsInDay} from './helpers/days';
import {normalizePrice} from './helpers/price';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            other: false,
            fullPrice: 6000000,
            percent: 9.9,
            initialFee: 2500000,
            years: 15,

            payment: 0,
            credit: 0,
            duration: 0,
            dem: 0,
            coef: 0,
            startDate: new Date(),
            overpayment: 0,
        };

        this.handleChangeStartDate = this.handleChangeStartDate.bind(this);
        this.handleChangeFullPrice = this.handleChangeFullPrice.bind(this);
        this.handleChangePercent = this.handleChangePercent.bind(this);
        this.handleChangeInitialFee = this.handleChangeInitialFee.bind(this);
        this.handleChangeYears = this.handleChangeYears.bind(this);
    }

    componentDidMount() {
        this.setValue(this.state);
    }

    setValue(state) {
        const {fullPrice, initialFee, percent, years} = state;
        const credit = fullPrice - initialFee;

        const duration = years * 12;
        const dem = 1 + percent/1200;

        const pow = Math.pow(dem, duration);
        const coef = pow * (dem - 1) / (pow - 1);

        const payment = Math.round(coef * credit);

        const overpayment = Math.round(payment * duration - credit);

        this.setState({
            payment,
            credit,
            duration,
            dem,
            coef,
            overpayment,
        });
    }

    handleChangeStartDate(date) {
        this.setState({
            startDate: date
        });
    }

    handleChangeFullPrice(event) {
        const newFullPrice = event.target.value;

        this.setState(prevState => {
            const newState = prevState;
            newState.fullPrice = newFullPrice;

            this.setValue(newState);
        });
    }

    handleChangePercent(event) {
        const newPercent = event.target.value;

        this.setState(prevState => {
            const newState = prevState;
            newState.percent = newPercent;

            this.setValue(newState);
        });
    }

    handleChangeInitialFee(event) {
        const newInitialFee = event.target.value;

        this.setState(prevState => {
            const newState = prevState;
            newState.initialFee = newInitialFee;

            this.setValue(newState);
        });
    }

    handleChangeYears(event) {
        const newYears = event.target.value;

        this.setState(prevState => {
            const newState = prevState;
            newState.years = newYears;

            this.setValue(newState);
        });
    }

    handleChangeParams(event, param) {
        this.setState(prevState => {
            const newState = prevState;
            newState[param] = event.target.value;

            this.setValue(newState);
        });
    }

    handleOtherGraphs() {
        this.setState({other: !this.state.other});
    }

    render() {
        const {credit, percent, payment, years, startDate} = this.state;
        const tables = createTable({credit, percent, payment, years, startDate});
        const diff = new Date() - this.state.startDate;
        const x = diff > secondsInDay ? Math.round(diff/secondsInDay/31) : 0;

        return (
            <div className="App">
                <div className="header">
                    <h1>Ипотечный калькулятор</h1>
                </div>
                <div className="flex">
                    <div className="column">
                        <h2 className="title">Основные параметры ипотеки</h2>
                        <div className="inputWrap cost">
                            <label htmlFor="fullPrice" className="label">Стоимость недвижимости</label>
                            <input
                                value={this.state.fullPrice}
                                onChange={this.handleChangeFullPrice}
                                id="fullPrice"
                                className="input"
                            />
                        </div>

                        <div className="inputWrap cost">
                            <label htmlFor="initialFee" className="label">Первоначальный взнос</label>
                            <input
                                value={this.state.initialFee}
                                onChange={this.handleChangeInitialFee}
                                id="initialFee"
                                className="input"
                            />
                        </div>
                        <div className="inputWrap percent">
                            <label htmlFor="percent" className="label">Процентная ставка</label>
                            <input
                                value={this.state.percent}
                                onChange={this.handleChangePercent}
                                id="percent"
                                className="input"
                            />
                        </div>
                        <div className="inputWrap years">
                            <label htmlFor="years" className="label">Срок погашения (полных лет)</label>
                            <input
                                value={this.state.years}
                                onChange={e => this.handleChangeParams.bind(this, e, 'years')}
                                id="years"
                                className="input"
                            />
                        </div>
                        <div className="inputWrap">
                            <label htmlFor="start" className="label">Начало ипотеки</label>
                            <DatePicker
                                selected={this.state.startDate}
                                onChange={this.handleChangeStartDate}
                                id="start"
                            />
                        </div>
                        {/*<div className="inputWrap">*/}
                        {/*    <button>Внести доп платеж</button>*/}
                        {/*</div>*/}
                    </div>
                    <div className="column">
                        <span className="payment">Ежемесячный платеж: <span className="big"> {normalizePrice(this.state.payment)}</span></span>
                        <span className="total">Сумма кредита: <span className="big">{normalizePrice(this.state.credit)}</span></span>
                        <span className="overpayment">Переплата: <span className="big">{normalizePrice(this.state.overpayment)}</span></span>
                    </div>

                </div>
                {tables &&
                <div className="flex">
                    <PaymentTable
                        tables={tables}
                        payment={this.state.payment}
                    />
                </div>
                }
                {tables &&
                    <div>
                        <h3>Выплата процентов и погашение задолженности</h3>
                        <Chart
                            tables={tables}
                            current={x}
                            payment={this.state.payment}
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
                            <ChartP
                                fullPrice={this.state.fullPrice}
                                initialFee={this.state.initialFee}
                                percent={this.state.percent}
                            />

                            <h2>Переплата от количества лет</h2>
                            <ChartD
                                fullPrice={this.state.fullPrice}
                                initialFee={this.state.initialFee}
                                percent={this.state.percent}
                            />
                        </Fragment>

                    )
                }

            </div>
        );
    }
}

export default App;
