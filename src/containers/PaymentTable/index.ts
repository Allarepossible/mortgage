import {connect} from 'react-redux';

import CommonTable from 'components/CommonTable';
import {createTable} from 'helpers/days';

const mapStateToProps = ({current}, ownProps) => {
    const {percent, years} = current;
    const {credit, payment, startDate} = ownProps;

    const table = createTable({credit, percent, payment, years, startDate});

    return {
        title: 'График платежей',
        data: table,
        types: [
            {name: 'Дата', value: 'date', type: 'date'},
            {name: 'Платеж', value: 'amount', type: ''},
            {name: 'Проценты', value: 'percentAmount', type: 'price'},
            {name: 'Основной долг', value: 'payOffAmount', type: 'price'},
            {name: 'Остаток долга', value: 'remainder', type: ''},
        ],
    };
};

export default connect(mapStateToProps)(CommonTable);
