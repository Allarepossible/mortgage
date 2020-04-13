import moment from 'moment';

interface DepositItem {
    date: string;
    type: string;
    adding: number;
    percentAmount: number;
    remainder: number;
}

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

    transactions.push({
        date: currentDay.format('D MMM YYYY'),
        type: 'add',
        adding: deposit,
        percentAmount: 0,
        remainder: deposit,
    });

    for (let i = 0; i < months + contributions.length; i++) {
        const nextDay = moment(currentDay.format()).add(1, 'month');
        let c = 0;
        const paymentObj = {} as DepositItem;

        const daysInterval = nextDay.diff(currentDay, 'd');

        for (const id of conIds) {
            const conDay = moment(consObj[id].date);
            const conInterval = conDay.diff(currentDay, 'd');
            const percentInterval = nextDay.diff(conDay, 'd');

            if (conInterval < daysInterval && conInterval > 0) {
                transactions.push({
                    date: conDay.format('D MMM YYYY'),
                    adding: consObj[id].amount,
                    remainder: transactions[i + c].remainder + Number(consObj[id].amount),
                    type: 'add',
                    percentAmount: 0,
                });
                percentAmount += consObj[id].amount * percent/(100 * 365) * percentInterval;
                c++;
            }
        }
        paymentObj.date = nextDay.format('D MMM YYYY');

        paymentObj.percentAmount = transactions[i].remainder * percent/(100 * 365) * daysInterval + percentAmount;

        paymentObj.adding = paymentObj.percentAmount;

        paymentObj.remainder = transactions[i + c].remainder + paymentObj.percentAmount;

        currentDay = nextDay;
        transactions.push(paymentObj);
        percentAmount = 0;
        i += c;
    }

    return transactions;
};
