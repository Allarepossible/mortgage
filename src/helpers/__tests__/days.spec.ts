import {DaysInYear, daysInterval} from '../days';

describe('Date', () => {
    it('Amount of days in leap year is 366', () => {
        expect(DaysInYear(2020)).toEqual(366);

        expect(DaysInYear(2024)).toEqual(366);
    });

    it('Amount of days in an usual year is 365', () => {
        expect(DaysInYear(2018)).toEqual(365);

        expect(DaysInYear(2019)).toEqual(365);
    });

    it('Interval of 2 days', () => {
        expect(daysInterval(new Date(2019, 7, 28), new Date(2019, 8, 1))).toEqual(4);

        expect(daysInterval(new Date(2019, 1, 28), new Date(2019, 2, 2))).toEqual(2);
    });
});

