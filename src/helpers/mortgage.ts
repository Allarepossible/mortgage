import moment from 'moment';

interface PaymentItem {
    date: string;
    type: string;
    payment: number;
    payOffAmount: number;
    percentAmount: number;
    remainder: number;
}

// const addPeriodicIfExist = (cons, last) => {
//     const periodic = cons.filter(({periodicity}) => periodicity === 'month');
//     if (periodic.length > 0) {
//         return [...cons, ...periodic.reduce((sum, item) => {
//             const diff = last.diff(moment(item.date), 'month');
//
//             for (let i = 0; i < diff; i++) {
//                 const date = moment(item.date).add(i + 1, 'month').format();
//
//                 sum.push({
//                     date,
//                     type: 'add',
//                     amount: item.amount,
//                     id: `${item.id}-${date}`,
//                 });
//             }
//             return sum;
//         }, [])];
//     } else {
//         return cons;
//     }
// };

export const calculatePayment = ({months, percent, credit}) => {
    const dem = 1 + percent/1200;

    const pow = Math.pow(dem, months);
    const coef = pow * (dem - 1) / (pow - 1);

    return Math.round(coef * credit);
};

export const calculatePayments = ({fullPrice, initialFee, percent, months, startDate, contributions: cons}) => {
    if (fullPrice === 0 || months === 0) {
        return [];
    }
    const credit = fullPrice - initialFee;
    const payment = calculatePayment({months, percent, credit});
    // const contributions = addPeriodicIfExist(cons, moment(startDate).add(months, 'month'));
    // const consObj = contributions.reduce((sum, item) => {
    //     sum[item.id] = item;
    //
    //     return sum;
    // },{});
    // const conIds = contributions
    //     .sort(({date: dateA}, {date: dateB}) => moment(dateA).diff(moment(dateB), 'd'))
    //     .map(({id}) => id);
    const payments = [] as PaymentItem[];
    let currentDay = moment(startDate);


    for (let i = 0; i < months; i++) {
        const creditRest = i === 0 ? credit : payments[i - 1].remainder;
        const nextDay = moment(currentDay.format()).add(1, 'month');
        const paymentObj = {} as PaymentItem;

        const daysInterval = nextDay.diff(currentDay, 'd');

        // for (const id of conIds) {
        //     const conDay = moment(consObj[id].date);
        //     const conInterval = conDay.diff(currentDay, 'd');
        //     const percentInterval = nextDay.diff(conDay, 'd');
        //
        //     if (conInterval < daysInterval && conInterval > 0) {
        //         payments.push({
        //             date: conDay.format('D MMM YYYY'),
        //             adding: consObj[id].amount,
        //             remainder: payments[i + c].remainder + Number(consObj[id].amount),
        //             type: 'add',
        //             percentAmount: 0,
        //         });
        //         percentAmount += consObj[id].amount * percent/(100 * 365) * percentInterval;
        //         c++;
        //     }
        // }
        paymentObj.date = nextDay.format('D MMM YYYY');

        paymentObj.percentAmount = creditRest * percent/(100 * 365) * daysInterval;
        paymentObj.payOffAmount = i === months - 1 ? creditRest : payment - paymentObj.percentAmount;

        paymentObj.remainder = creditRest - paymentObj.payOffAmount;

        paymentObj.payment = paymentObj.percentAmount + paymentObj.payOffAmount;

        currentDay = nextDay;
        payments.push(paymentObj);
    }

    return payments;
};
