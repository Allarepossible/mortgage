export const normalizePrice = price =>
    String(price).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ') + ' ₽';
