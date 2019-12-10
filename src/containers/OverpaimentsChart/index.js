import React from 'react';

import SimpleChart from '../../components/SimpleChart';

class OverpaimentsChart extends React.Component {
    constructor(props) {
        super(props);
        const {fullPrice, initialFee, percent} = props;

        const credit = fullPrice - initialFee;
        let overpayments = [];

        for (let i = 3; i < 30; i++) {
            const duration = i * 12;
            const dem = 1 + percent/1200;

            const pow = Math.pow(dem, duration);
            const coef = pow * (dem - 1) / (pow - 1);
            const payment = Math.round(coef * credit);

            overpayments.push({x: i, y: Math.round(payment * duration - credit)});
        }


        this.state = {
            overpayments,
            payment: props.payment,
            crosshairValues: [],
        }
    }

    render() {
        const {overpayments} = this.state;

        return (
            <SimpleChart
                xLabel="Количество лет"
                yLabel="Переплата"
                data={overpayments}
            />
        )
    }
}

export default OverpaimentsChart;
