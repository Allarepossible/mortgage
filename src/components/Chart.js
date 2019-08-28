import React from 'react';
import {
    XYPlot,
    XAxis,
    YAxis,
    ChartLabel,
    HorizontalGridLines,
    VerticalBarSeries,
    DiscreteColorLegend,
    VerticalGridLines,
    LineSeries,
    Crosshair,
} from 'react-vis';

import './Chart.css';

class Chart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            crosshairValues: [],
            series: [
                {
                    title: 'Проценты',
                    disabled: false,
                    data: props.dataPercents,
                },
                {
                    title: 'Основной долг',
                    disabled: false,
                    data: props.dataPayments,
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
                value: i === 0 ? v.y : v.y - percent,
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
        const {dataPercents, dataPayments, payment, current} = this.props;
        const {crosshairValues, series} = this.state;

        return (
            <div className="Chart">
                <div className="legend">
                    <DiscreteColorLegend
                        onItemClick={this._legendClickHandler}
                        width={1200}
                        items={series}
                    />
                </div>
                <XYPlot width={1200} height={400} className="inner" onMouseLeave={this._mouseLeaveHandler}>
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
                    <VerticalBarSeries
                        cluster="2015"
                        color="#79C7E3"
                        className="fourth-series"
                        data={dataPayments}
                    />
                    <VerticalBarSeries
                        onNearestX={this._nearestXHandler}
                        cluster="2015"
                        color="#12939A"
                        className="first-series"
                        data={dataPercents}
                    />
                    <LineSeries
                        curve={'curveMonotoneX'}
                        className="first-series"
                        style={{fill: 'none'}}
                        data={[{x: current, y: 0}, {x: current, y: payment}]}
                    />
                    <Crosshair
                        itemsFormat={this._formatCrosshairItems}
                        titleFormat={this._formatCrosshairTitle}
                        values={crosshairValues}
                    />
                </XYPlot>
            </div>
        )
    }
}

export default Chart;
