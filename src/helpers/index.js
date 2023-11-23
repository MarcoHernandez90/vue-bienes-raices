export const priceProperty = (precio) =>
  Number(precio).toLocaleString('es-MX', {
    style: 'currency',
    currency: 'MXN'
  })