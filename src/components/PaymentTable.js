import React from 'react';

import './PaymentTable.css';

const normalizePrice = price => String(price).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');

const PaymentTable = ({rest, percents, debt}) => (
    <div className="scroll">
        <table>
            <thead>
            <tr>
                <th>Месяц</th>
                <th>Процент</th>
                <th>В счет долга</th>
                <th>Остаток</th>
            </tr>
            </thead>
            <tbody>
            {rest && rest.length > 0 &&
            rest.map((_, index) => (
                <tr>
                    <td>{index + 1}</td>
                    <td>{normalizePrice(percents[index])}</td>
                    <td>{normalizePrice(debt[index])}</td>
                    <td>{normalizePrice(rest[index])}</td>
                </tr>
            ))
            }
            </tbody>
        </table>
    </div>
);

export default PaymentTable;
