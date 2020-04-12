import moment from 'moment';

interface Item {
    date: string;
    month: string;
    percentAmount: number;
    payOffAmount: number;
    remainder: number;
    amount: number;
}
interface DepositItem {
    date: string;
    type: string;
    adding: number;
    percentAmount: number;
    remainder: number;
}

export const createTable = ({credit, percent, years, startDate, payment}): Item[] => {
    if (credit === 0 || years === 0) {
        return [];
    }
    const payments = [] as Item[];

    let currentDay = moment(startDate);

    for (let i = 0; i < years * 12; i++) {
        const nextPaymentDay = moment(currentDay.format()).add(1, 'month');
        const paymentObj = {} as Item;

        const daysInterval = nextPaymentDay.diff(currentDay, 'd');

        paymentObj.date = nextPaymentDay.format('D MMM YYYY');
        paymentObj.month = nextPaymentDay.format('MMM YYYY');

        const creditRest = i === 0 ? credit : payments[i - 1].remainder;

        paymentObj.percentAmount = creditRest * percent/(100 * 365) * daysInterval;
        paymentObj.payOffAmount = i === years * 12 - 1 ? creditRest : payment - paymentObj.percentAmount;

        paymentObj.remainder = creditRest - paymentObj.payOffAmount;

        paymentObj.amount = paymentObj.percentAmount + paymentObj.payOffAmount;

        payments.push(paymentObj);

        currentDay = nextPaymentDay;
    }

    return payments;
};

export const calculateTransactions = ({deposit, percent, months, startDate, contributions}) => {
    if (deposit === 0 || months === 0) {
        return [];
    }
    const consObj = contributions.reduce((sum, item) => {
        sum[item.id] = item;

        return sum;
    },{});
    const conIds = contributions
        .sort(({date: dateA}, {date: dateB}) => moment(dateA).diff(moment(dateB), 'd'))
        .map(({id}) => id);
    const transactions = [] as DepositItem[];
    let currentDay = moment(startDate);
    let percentAmount = 0;
    let daysIntervalWithCons;

    transactions.push({
        date: currentDay.format('D MMM YYYY'),
        type: 'add',
        adding: deposit,
        percentAmount: 0,
        remainder: deposit,
    });

    for (let i = 0; i < months + contributions.length; i++) {
        const nextDay = moment(currentDay.format()).add(1, 'month');
        const paymentObj = {} as DepositItem;

        const daysInterval = nextDay.diff(currentDay, 'd');

        for (const conId of conIds) {
            const conDay = moment(consObj[conId].date);
            const conInterval = conDay.diff(currentDay, 'd');
            if (conInterval < daysInterval) {
                transactions.push({
                    date: conDay.format('D MMM YYYY'),
                    adding: consObj[conId].amount,
                    remainder: transactions[i].remainder + Number(consObj[conId].amount),
                    type: 'add',
                    percentAmount: 0,
                });
                conIds.splice(conIds.indexOf(conId), 1);
                percentAmount += (transactions[i].remainder + consObj[conId].amount)
                    * percent/(100 * 365) * conInterval;
                daysIntervalWithCons = daysInterval - conInterval;
                i++;
            }
        }
        paymentObj.date = nextDay.format('D MMM YYYY');

        const creditRest = transactions[i].remainder;
        const days = daysIntervalWithCons ? daysIntervalWithCons : daysInterval;

        paymentObj.percentAmount = creditRest * percent/(100 * 365) * days + percentAmount;

        paymentObj.adding = paymentObj.percentAmount;

        paymentObj.remainder = creditRest + paymentObj.percentAmount;

        currentDay = nextDay;
        transactions.push(paymentObj);
        percentAmount = 0;
        daysIntervalWithCons = undefined;
    }

    return transactions;
};
