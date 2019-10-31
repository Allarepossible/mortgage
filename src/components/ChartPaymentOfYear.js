import React from 'react';
import {
    XYPlot,
    XAxis,
    YAxis,
    ChartLabel,
    HorizontalGridLines,
    VerticalBarSeries,
} from 'react-vis';

import './Chart.css';

class Chart extends React.Component {
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
            <div className="Chart" key={2}>
                <XYPlot width={1000} height={400} className="inner">
                    <HorizontalGridLines />
                    <XAxis />
                    <YAxis />
                    <ChartLabel
                        text="Количество лет"
                        className="alt-x-label"
                        includeMargin={false}
                        xPercent={0.01}
                        yPercent={1.13}
                    />

                    <ChartLabel
                        text="Платеж"
                        className="alt-y-label"
                        includeMargin={false}
                        xPercent={-0.06}
                        yPercent={0.06}
                        style={{
                            transform: 'rotate(-90)',
                            textAnchor: 'end'
                        }}
                    />
                    <VerticalBarSeries color="#12939A" className="first-series" data={payments} />
                </XYPlot>
            </div>
        )
    }
}

export default Chart;
