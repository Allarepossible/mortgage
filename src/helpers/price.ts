export const normalizeNumber = price =>
    String(Math.round(price * 100) / 100).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');

export const normalizePrice = price => normalizeNumber(price) + ' ₽';
