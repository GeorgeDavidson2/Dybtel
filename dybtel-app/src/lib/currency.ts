export const fmt = (n: number) => new Intl.NumberFormat('en-GH', { style: 'currency', currency: 'GHS' }).format(n);
