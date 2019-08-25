import React from 'react';

const normalizePrice = price => String(price).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');

const AdditionalPaymentsTable = ({additional}) => (
    <div className="scroll">
        <table>
            <thead>
            <tr>
                <th>Дата</th>
                <th>Сумма</th>
                <th>Изменение платежа</th>
                <th>Текущий платеж</th>
            </tr>
            </thead>
            <tbody>
            { additional.length > 0 &&
                additional.map(item => (
                    <tr>
                        <td>{item.date}</td>
                        <td>{normalizePrice(item.summ)}</td>
                        <td>{normalizePrice(item.change)}</td>
                        <td>{normalizePrice(item.current)}</td>

                    </tr>
                ))
            }
            </tbody>
        </table>
    </div>
);

export default AdditionalPaymentsTable;
