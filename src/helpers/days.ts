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

export const createDepositTable = ({deposit, percent, months, startDate}) => {
    if (deposit === 0 || months === 0) {
        return [];
    }
    const payments = [] as DepositItem[];
    let currentDay = moment(startDate);

    for (let i = 0; i < months; i++) {
        const next = moment(currentDay.format()).add(1, 'month');
        const paymentObj = {} as DepositItem;

        const daysInterval = next.diff(currentDay, 'd');

        paymentObj.date = next.format('D MMM YYYY');

        const creditRest = i === 0 ? deposit : payments[i - 1].remainder;

        paymentObj.percentAmount = creditRest * percent/(100 * 365) * daysInterval;
        paymentObj.adding = paymentObj.percentAmount;

        paymentObj.remainder = creditRest + paymentObj.percentAmount;

        currentDay = next;
        payments.push(paymentObj);
    }

    return payments;
};
