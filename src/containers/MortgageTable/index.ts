import {connect} from 'react-redux';

import CommonTable from 'components/CommonTable';

const mapStateToProps = ({mortgage}) => ({
    title: 'График платежей',
    data: mortgage.payments,
    types: [
        {name: 'Дата', value: 'date', type: 'date'},
        {name: 'Платеж', value: 'payment', type: ''},
        {name: 'Проценты', value: 'percentAmount', type: 'price'},
        {name: 'Основной долг', value: 'payOffAmount', type: 'price'},
        {name: 'Остаток долга', value: 'remainder', type: ''},
    ],
});

export default connect(mapStateToProps)(CommonTable);
