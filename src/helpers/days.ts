interface Item {
    date: string;
    month: string;
    percentAmount: number;
    payOffAmount: number;
    remainder: number;
    amount: number;
}

const months = (year?: number) => ([
    {rus: 'Январь', eng: 'Jan', days: 31},
    {rus: 'Февраль', eng: 'Feb', days: year && year % 4 === 0 ? 29 : 28},
    {rus: 'Март', eng: 'Mar', days: 31},
    {rus: 'Апрель', eng: 'Apr', days: 30},
    {rus: 'Май', eng: 'May', days: 31},
    {rus: 'Июнь', eng: 'Jun', days: 30},
    {rus: 'Июль', eng: 'Jul', days: 31},
    {rus: 'Август', eng: 'Aug', days: 31},
    {rus: 'Сентябрь', eng: 'Sep', days: 30},
    {rus: 'Октябрь', eng: 'Oct', days: 31},
    {rus: 'Ноябрь', eng: 'Nov', days: 30},
    {rus: 'Декабрь', eng: 'Dec', days: 31},
]);

export const secondsInDay = 60 * 60 * 24 * 1000;

export const daysInterval = (day1, day2) =>  Math.round((day2 - day1)/secondsInDay);
export const DaysInYear = (year: number) =>  year % 4 === 0 ? 366 : 365;

// const dayToStr = (day: Date) => {
//     const dayStr = day.getDate() > 9 ? day.getDate() : `0${day.getDate()}`;
//     const month = day.getMonth() > 9 ? day.getMonth() : `0${day.getMonth()}`;
//
//     return `${dayStr}.${month}.${day.getFullYear()}`;
// };

const dateForTable = (day: Date) => {
    const month = months()[day.getMonth()].rus;

    return `${month} ${day.getFullYear()}`;
};

const dayMonth = (day: Date) => {
    return `${months()[day.getMonth()].rus} ${day.getFullYear()}`;
};

export const createTable = ({credit, percent, years, startDate, payment}): Item[] => {
    if (credit === 0 || years === 0) {
        return [];
    }
    const payments = [] as Item[];

    const startDay = startDate.getDate();
    const startMonth = startDate.getMonth();
    const startYear = startDate.getFullYear();

    let currentMonth = startMonth;
    let currentYear = startYear;
    let currentDay = startDate;

    for (let i = 0; i < years * 12; i++) {
        const nextPaymentYear = currentMonth === 11 ? currentYear + 1 : currentYear;
        const nextPaymentMonth = currentMonth === 11 ? 0 : currentMonth + 1;
        const nextPaymentDay = new Date(nextPaymentYear, nextPaymentMonth, startDay);
        const paymentObj = {} as Item;

        const AmountDaysInIntervar = daysInterval(currentDay, nextPaymentDay);

        paymentObj.date = dateForTable(nextPaymentDay);
        paymentObj.month = dayMonth(nextPaymentDay);

        const creditRest = i === 0 ? credit : payments[i - 1].remainder;

        paymentObj.percentAmount = creditRest * percent/(100 * 365) * AmountDaysInIntervar;
        paymentObj.payOffAmount = i === years * 12 - 1 ? creditRest : payment - paymentObj.percentAmount;

        paymentObj.remainder = creditRest - paymentObj.payOffAmount;

        paymentObj.amount = paymentObj.percentAmount + paymentObj.payOffAmount;

        payments.push(paymentObj);

        currentMonth = nextPaymentMonth;
        currentYear = nextPaymentYear;
        currentDay = nextPaymentDay;
    }

    return payments;
};


export const getStartValue = ({fullPrice, initialFee, percent, years}) => {
    const credit = fullPrice - initialFee;

    const duration = years * 12;
    const dem = 1 + percent/1200;

    const pow = Math.pow(dem, duration);
    const coef = pow * (dem - 1) / (pow - 1);

    const payment = Math.round(coef * credit);

    const overpayment = Math.round(payment * duration - credit);

    return {
        payment,
        credit,
        duration,
        dem,
        coef,
        overpayment,
    };
};
