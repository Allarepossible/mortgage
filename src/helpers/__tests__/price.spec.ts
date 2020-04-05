import {normalizePrice} from '../price';

describe('Price', () => {
    it('Should be normalized', () => {
        expect(normalizePrice(2020)).toEqual('2 020 ₽');
    });

    it('Should be normalized', () => {
        expect(normalizePrice(1010020)).toEqual('1 010 020 ₽');
    });
});

