import React from 'react';

import './PaymentTable.css';

const normalizePrice = price => String(price).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ') + ' ₽';

const PaymentTable = ({rest, percents, debt, dates, payment}) => (
    <div className="table">
        <h3>График платежей</h3>
        <div className="headline">
            <div className="headlineItem date">Месяц/год</div>
            <div className="headlineItem">Платеж</div>
            <div className="headlineItem">Проценты</div>
            <div className="headlineItem">Основной долг</div>
            <div className="headlineItem">Остаток долга</div>
        </div>
        <div className="list">
            {rest && rest.length > 0 &&
                rest.map((_, index) => (
                    <div className="listItemWrap">
                        <div className="listItem date">{dates[index].month} <span className="year">{dates[index].year}</span></div>
                        <div className="listItem">{normalizePrice(payment)}</div>
                        <div className="listItem detail">{normalizePrice(percents[index])}</div>
                        <div className="listItem detail">{normalizePrice(debt[index])}</div>
                        <div className="listItem">{normalizePrice(rest[index])}</div>
                    </div>
                ))
            }
        </div>
    </div>
);

export default PaymentTable;
