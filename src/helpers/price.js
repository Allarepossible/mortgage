export const normalizePrice = price =>
    String(Math.round(price * 100) / 100).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ') + ' ₽';
