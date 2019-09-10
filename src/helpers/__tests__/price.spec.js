import {normalizePrice} from '../price';

describe('Price', () => {
    it('Should be normalized', () => {
        expect(normalizePrice(2020)).toEqual('2 020 ₽');

    });
});

