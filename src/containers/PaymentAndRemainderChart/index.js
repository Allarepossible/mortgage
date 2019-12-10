import React from 'react';
import {connect} from 'react-redux';

import ComplexChart from '../../components/ComplexChart';
import {normalizePrice} from '../../helpers/price';
import {createTable} from "../../helpers/days";

class PaymentAndRemainderChart extends React.Component {
    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            crosshairValues: [],
            ...prevState,
            series: [
                {
                    title: 'Проценты',
                    disabled: false,
                    data: nextProps.dataPercents,
                },
                {
                    title: 'Основной долг',
                    disabled: false,
                    data: nextProps.dataPayments,
                }
            ]
        }
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
        const {payment, current, dataPayments, dataPercents} = this.props;

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

const mapStateToProps = ({current}, ownProps) => {
    const {percent, years} = current;
    const {credit, payment, startDate} = ownProps;

    const table = createTable({credit, percent, payment, years, startDate});
    const dataPercents = table.map((item, index) => ({x: index, y: item.percentAmount}));
    const dataPayments = table.map((_, index) => ({x: index, y: payment}));

console.log('------', dataPercents)
    return {
        dataPayments,
        dataPercents,
        payment,
    }
};

export default connect(mapStateToProps)(PaymentAndRemainderChart);
