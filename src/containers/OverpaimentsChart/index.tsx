import React, {Component} from 'react';

import SimpleChart from 'components/SimpleChart';

interface Props {
    fullPrice: number;
    initialFee: number;
    percent: number;
}

interface Data {
    x: number;
    y: number;
}

interface State {
    over: Data[];
}

class OverpaimentsChart extends Component<Props, State> {
    constructor(props) {
        super(props);
        const {fullPrice, initialFee, percent} = props;

        const credit = fullPrice - initialFee;
        const over = [] as Data[];

        for (let i = 3; i < 31; i++) {
            const duration = i * 12;
            const dem = 1 + percent/1200;

            const pow = Math.pow(dem, duration);
            const coef = pow * (dem - 1) / (pow - 1);
            const pay = Math.round(coef * credit);

            over.push({
                x: i,
                y: Math.round(pay * duration - credit),
            });
        }

        this.state = {
            over,
        };
    }

    render() {
        const {over} = this.state;

        return (
            <SimpleChart
                xLabel="Количество лет"
                yLabel="Переплата"
                data={over}
            />
        );
    }
}

export default OverpaimentsChart;
