import React from 'react';
import {connect} from 'react-redux';

import ComplexChart from '../../components/ComplexChart';
import {normalizePrice} from '../../helpers/price';
import {createTable} from "../../helpers/days";
import './index.css';

class PaymentAndRemainderChart extends React.Component {
    render() {
        const {dates, debet, percents} = this.props;


        return (
            <div className='Chart'>
                <ComplexChart
                    dates={dates}
                    debet={debet}
                    percent={percents}
                />
            </div>
        )
    }
}

const mapStateToProps = ({current}, ownProps) => {
    const {percent, years} = current;
    const {credit, payment, startDate} = ownProps;

    const table = createTable({credit, percent, payment, years, startDate});
    const debet = table.map((item, index) => (item.percentAmount));
    const percents = table.map((item, index) => (payment - item.percentAmount));
    const dates = table.map((_, index) => (index));

    return {
        debet,
        percents,
        dates,
    }
};

export default connect(mapStateToProps)(PaymentAndRemainderChart);
