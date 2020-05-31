import {connect} from 'react-redux';

import CommonTable from 'components/CommonTable';

const mapStateToProps = ({deposit}) => ({
    title: 'Таблица выплат процентов',
    data: deposit.transactions,
    types: [
        {name: 'Дата', value: 'date', type: 'date'},
        {name: 'Сумма %', value: 'percentAmount', type: 'price'},
        {name: 'Приход на вклад', value: 'adding', type: 'price'},
        {name: 'Остаток вклада', value: 'remainder', type: ''},
    ],
});

export default connect(mapStateToProps)(CommonTable);
