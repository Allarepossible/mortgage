import React, {Component} from 'react';

import SimpleChart from 'components/SimpleChart';

interface Props {
    fullPrice: number;
    initialFee: number;
    percent: number;
}

interface Item {
    x: number;
    y: number;
}

interface State {
    payments: Item[];
}

class PaymentOfYearsChart extends Component<Props, State> {
    constructor(props) {
        super(props);
        const {fullPrice, initialFee, percent} = props;

        const credit = fullPrice - initialFee;
        const payments = [] as Item[];

        for (let i = 3; i < 31; i++) {
            const duration = i * 12;
            const dem = 1 + percent/1200;

            const pow = Math.pow(dem, duration);
            const coef = pow * (dem - 1) / (pow - 1);

            payments.push({x: i, y: Math.round(coef * credit)});
        }

        this.state = {
            payments,
        };
    }

    render() {
        const {payments} = this.state;

        return (
            <SimpleChart
                xLabel="Количество лет"
                yLabel="Платеж"
                data={payments}
            />
        );
    }
}

export default PaymentOfYearsChart;
