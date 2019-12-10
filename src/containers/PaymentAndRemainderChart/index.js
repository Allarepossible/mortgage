import React from 'react';

import ComplexChart from '../../components/ComplexChart';
import {normalizePrice} from '../../helpers/price';

class PaymentAndRemainderChart extends React.Component {
    constructor(props) {
        super(props);
        const {tables} = props;

        const dataPercents = tables.map((item, index) => ({x: index, y: item.percentAmount}));
        const dataPayments = tables.map((_, index) => ({x: index, y: props.payment}));

        this.state = {
            dataPayments,
            dataPercents,
            payment: props.payment,
            crosshairValues: [],
            series: [
                {
                    title: 'Проценты',
                    disabled: false,
                    data: dataPercents,
                },
                {
                    title: 'Основной долг',
                    disabled: false,
                    data: dataPayments,
                }
            ]
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        const shouldShowPopup = nextState.crosshairValues !== this.state.crosshairValues;

        return nextProps.payment !== this.props.payment || shouldShowPopup;
    }

    _formatCrosshairItems = values => {
        const {series} = this.state;
        let percent = 0;

        return values.map((v, i) => {
            percent = i === 0 ? v.y : percent;

            return {
                title: series[i].title,
                value: normalizePrice(i === 0 ? v.y : this.props.payment - percent),
            };
        });
    };

    _formatCrosshairTitle = values => {
        return {
            title: 'Месяц',
            value: values[0].x
        };
    };

    _legendClickHandler = (item, i) => {
        const {series} = this.state;
        series[i].disabled = !series[i].disabled;
        this.setState({series});
    };

    _mouseLeaveHandler = () => {
        this.setState({crosshairValues: []});
    };

    _nearestXHandler = (value, {index}) => {
        const {series} = this.state;

        this.setState({
            crosshairValues: series.map(s => s.data[index])
        });
    };

    render() {
        const {payment, current} = this.props;
        const {dataPayments, dataPercents} = this.state;

        const {crosshairValues, series} = this.state;

        return (
            <ComplexChart
                onItemClick={this._legendClickHandler}
                onMouseLeave={this._mouseLeaveHandler}
                onNearestX={this._nearestXHandler}
                xLabel="Месяцы"
                yLabel="Платеж"
                firstData={dataPayments}
                secondData={dataPercents}
                current={current}
                itemsFormat={this._formatCrosshairItems}
                titleFormat={this._formatCrosshairTitle}
                crosshairValues={crosshairValues}
                items={series}
                payment={payment}
            />
        )
    }
}

export default PaymentAndRemainderChart;
