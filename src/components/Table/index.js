import React from 'react';

import {normalizePrice} from "../../helpers/price";
import './index.css';

const Table = ({table}) => (
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
            {table && table.length > 0 &&
                table.map((item, index) => (
                    <div className="listItemWrap" key={index}>
                        <div className="listItem date">{item.date}</div>
                        <div className="listItem">{normalizePrice(item.amount)}</div>
                        <div className="listItem detail">{normalizePrice(item.percentAmount)}</div>
                        <div className="listItem detail">{normalizePrice(item.payOffAmount)}</div>
                        <div className="listItem">{normalizePrice(item.remainder)}</div>
                    </div>
                ))
            }
        </div>
    </div>
);

export default Table;
