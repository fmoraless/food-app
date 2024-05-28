export const formattedPrice = (price) => {
  const formatter = new Intl.NumberFormat('es-CL');
  return formatter.format(price);
};
