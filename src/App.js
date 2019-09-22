import React, { Component } from 'react';
import DatePicker from 'react-datepicker';

import Chart from './components/Chart';
import PaymentTable from './components/PaymentTable';

import {createTable, secondsInDay} from './helpers/days';
import {normalizePrice} from './helpers/price';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullPrice: 6000000,
            percent: 9.9,
            initialFee: 2500000,
            years: 10,

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

    render() {
        const {credit, percent, payment, years, startDate} = this.state;
        const tables = createTable({credit, percent, payment, years, startDate});
        const diff = new Date() - this.state.startDate;
        const x = diff > secondsInDay ? Math.round(diff/secondsInDay/31) : 0;

        return (
            <div className="App">
                <div className="header">
                    <h2>Ипотечный калькулятор</h2>
                </div>
                <div className="flex">
                    <div className="column">
                        <div className="inputWrap">
                            <label htmlFor="fullPrice" className="label">Стоимость квартиры</label>
                            <input
                                value={this.state.fullPrice}
                                onChange={this.handleChangeFullPrice}
                                id="fullPrice"
                                className="input"
                            />
                        </div>
                        <div className="inputWrap">
                            <label htmlFor="percent" className="label">Процент</label>
                            <input
                                value={this.state.percent}
                                onChange={this.handleChangePercent}
                                id="percent"
                                className="input"
                            />
                        </div>
                        <div className="inputWrap">
                            <label htmlFor="initialFee" className="label">Первоначальный взнос</label>
                            <input
                                value={this.state.initialFee}
                                onChange={this.handleChangeInitialFee}
                                id="initialFee"
                                className="input"
                            />
                        </div>
                        <div className="inputWrap">
                            <label htmlFor="years" className="label">Количество лет</label>
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
                    {tables &&
                        <div className="column">
                            <PaymentTable
                                tables={tables}
                                payment={this.state.payment}
                            />
                        </div>
                    }
                </div>
                {tables &&
                    <Chart
                        tables={tables}
                        current={x}
                        payment={this.state.payment}
                    />
                }

            </div>
        );
    }
}

export default App;
