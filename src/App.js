import React, { Component } from 'react';
import {
    XYPlot,
    XAxis,
    YAxis,
    ChartLabel,
    HorizontalGridLines,
    VerticalGridLines,
    LineSeries,
} from 'react-vis';
import './App.css';
const data = [];

for (let i = 0; i < 20; i++) {
    const series = [];
    for (let j = 0; j < 100; j++) {
        series.push({x: j, y: (i / 10 + 1) * Math.sin((Math.PI * (i + j)) / 50)});
    }
    data.push({color: i, key: i, data: series, opacity: 0.8});
}

const normalizePrice = price => String(price).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
const days = [31, 30, 31, 30, 31, 31, 28, 31, 30, 31, 30, 31];

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
            overpayment: 0,
            tables: {},
        };

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
        let len = 0;
        const {credit, percent, payment, years} = this.state;

        if (years > 0 ) {
            for (let i = 0; i < years; i++) {
                for (let j = 0; j < 12; j++) {
                    const creditRest = len === 0 ? credit : rest[len-1];
                    percents.push(Math.round(creditRest * percent/(100 * 365) * days[j]));

                    const debtOne = j === 11 && i === years - 1 ? creditRest : payment - percents[len];

                    debt.push(debtOne);
                    rest.push(creditRest - debt[len]);
                    len ++;
                }
            }
        } else {
            return;
        }
        return {rest, percents, debt}
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
        const Line = LineSeries;
        const tables = this.createTable();
        const {rest, percents, debt} = tables || {};
        const dataPercents = percents && percents.map((item, index) => ({x: index, y: item}));
        const dataPayments = rest && rest.map((_, index) => ({x: index, y: this.state.payment}));

        return (
            <div className="App">
                <div className="App-header">
                    <h2>Mortgage</h2>
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
                    </div>
                    <div className="column">
                        <span className="label-s">Ежемесячный платеж: {normalizePrice(this.state.payment)}</span>
                        <span className="label-s">Сумма кредита: {normalizePrice(this.state.credit)}</span>
                        <span className="label-s">Переплата: {normalizePrice(this.state.overpayment)}</span>
                    </div>
                    <div className="column">
                        <span>Платежи</span>
                        <div className="scroll">
                            <table>
                                <thead>
                                <tr>
                                    <th>Месяц</th>
                                    <th>Процент</th>
                                    <th>В счет долга</th>
                                    <th>Остаток</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {rest && rest.length > 0 &&
                                        rest.map((_, index) => (
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>{normalizePrice(percents[index])}</td>
                                                <td>{normalizePrice(debt[index])}</td>
                                                <td>{normalizePrice(rest[index])}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>

                <div className="Graph">
                    <XYPlot width={1200} height={400} className="inner">
                        <HorizontalGridLines />
                        <VerticalGridLines />
                        <XAxis />
                        <YAxis />
                        <ChartLabel
                            text="Месяцы"
                            className="alt-x-label"
                            includeMargin={false}
                            xPercent={0.025}
                            yPercent={1.01}
                        />

                        <ChartLabel
                            text="Платеж"
                            className="alt-y-label"
                            includeMargin={false}
                            xPercent={0.01}
                            yPercent={0.06}
                            style={{
                                transform: 'rotate(-90)',
                                textAnchor: 'end'
                            }}
                        />
                        <Line
                            curve={'curveMonotoneX'}
                            className="first-series"
                            data={dataPercents}
                        />
                        <Line
                            className="fourth-series"
                            curve={'curveMonotoneX'}
                            style={{fill: 'none'}}
                            data={dataPayments}
                        />
                    </XYPlot>
                </div>
            </div>
        );
    }
}

export default App;
