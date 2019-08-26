import React, { Component } from 'react';
import DatePicker from 'react-datepicker';

import Chart from './components/Chart';
import Chart2 from './components/Chart2';
import PaymentTable from './components/PaymentTable';

import './App.css';

const normalizePrice = price => String(price).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ') + ' ₽';

const days = (year) => ([
    {rus: 'Январь', eng: 'Jan', days: 31},
    {rus: 'Февраль', eng: 'Feb', days: year % 4 === 0 ? 29 : 28},
    {rus: 'Март', eng: 'Mar', days: 31},
    {rus: 'Апрель', eng: 'Apr', days: 30},
    {rus: 'Май', eng: 'May', days: 31},
    {rus: 'Июнь', eng: 'Jun', days: 30},
    {rus: 'Июль', eng: 'Jul', days: 31},
    {rus: 'Август', eng: 'Aug', days: 31},
    {rus: 'Сентябрь', eng: 'Sep', days: 30},
    {rus: 'Октябрь', eng: 'Oct', days: 31},
    {rus: 'Ноябрь', eng: 'Nov', days: 30},
    {rus: 'Декабрь', eng: 'Dec', days: 31}
]);

const daySeconds = 60 * 60 * 24 * 1000;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
            tables: {},
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

    createTable() {
        const rest = [];
        const percents = [];
        const debt = [];
        const dates = [];
        let len = 0;
        const {credit, percent, payment, years, startDate} = this.state;
        let [, mon, , year] = String(startDate).split(' ');
        const curDays = days(year);
        const months = curDays.map(i => i.eng);
        const index = months.indexOf(mon) + 1;

        if (years > 0 ) {
            for (let i = 0; i < years; i++) {
                for (let j = 0; j < 12; j++) {
                    const ind = j + index >= 12 ? j + index - 12 : j + index;
                    const prev = j + index > 12 ? j + index - 12 - 1 : j + index - 1;
                    const curYear = j + index >= 12 ? +year + i + 1 : +year + i;
                    const curDays = days(curYear);
                    console.log(i,j,curYear, curDays[ind].days, curDays[ind].rus)
                    dates.push({month: curDays[ind].rus, year: curYear});
                    const creditRest = len === 0 ? credit : rest[len-1];
                    percents.push(Math.round(creditRest * percent/(100 * 365) * curDays[prev].days));

                    const debtOne = j === 11 && i === years - 1 ? creditRest : payment - percents[len];

                    debt.push(debtOne);
                    rest.push(creditRest - debt[len]);
                    len ++;
                }
            }
        } else {
            return;
        }
        return {rest, percents, debt, dates}
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

    render() {
        const tables = this.createTable();
        const {rest, percents, debt, dates} = tables || {};
        const dataPercents = percents && percents.map((item, index) => ({x: index, y: item}));
        const dataPayments = rest && rest.map((_, index) => ({x: index, y: this.state.payment}));
        const diff = new Date() - this.state.startDate;
        const x = diff > daySeconds ? Math.round(diff/daySeconds/31) : 0;


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
                                onChange={this.handleChangeYears}
                                id="years"
                                className="input"
                            />
                        </div>
                        {/*<div className="inputWrap">*/}
                        {/*    <label htmlFor="start" className="label">Начало ипотеки</label>*/}
                        {/*    <DatePicker*/}
                        {/*        selected={this.state.startDate}*/}
                        {/*        onChange={this.handleChangeStartDate}*/}
                        {/*        id="start"*/}
                        {/*    />*/}
                        {/*</div>*/}
                        {/*<div className="inputWrap">*/}
                        {/*    <button>Внести доп платеж</button>*/}
                        {/*</div>*/}
                    </div>
                    <div className="column">
                        <span className="payment">Ежемесячный платеж: <span className="big"> {normalizePrice(this.state.payment)}</span></span>
                        <span className="total">Сумма кредита: <span className="big">{normalizePrice(this.state.credit)}</span></span>
                        <span className="overpayment">Переплата: <span className="big">{normalizePrice(this.state.overpayment)}</span></span>
                    </div>
                    <div className="column">
                        <PaymentTable
                            percents={percents}
                            debt={debt}
                            rest={rest}
                            dates={dates}
                            payment={this.state.payment}
                        />
                    </div>
                </div>

                <Chart
                    dataPercents={dataPercents}
                    dataPayments={dataPayments}
                    current={x}
                    payment={this.state.payment}
                />
                <Chart2 />
            </div>
        );
    }
}

export default App;
