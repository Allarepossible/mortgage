import React from 'react';

import SimpleChart from "../../components/SimpleChart";

class PaymentOfYearsChart extends React.Component {
    constructor(props) {
        super(props);
        const {fullPrice, initialFee, percent} = props;

        const credit = fullPrice - initialFee;
        let payments = [];

        for (let i = 3; i < 30; i++) {
            const duration = i * 12;
            const dem = 1 + percent/1200;

            const pow = Math.pow(dem, duration);
            const coef = pow * (dem - 1) / (pow - 1);

            payments.push({x: i, y: Math.round(coef * credit)});
        }


        this.state = {
            payments,
            payment: props.payment,
            crosshairValues: [],
        }
    }

    render() {
        const {payments} = this.state;

        return (
            <SimpleChart
                xLabel="Количество лет"
                yLabel="Платеж"
                data={payments}
            />
        )
    }
}

export default PaymentOfYearsChart;
