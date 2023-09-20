export const toFixed = (num: Number, decimal: number) => {
  const stringNumber = String(num);
  const [numPart, ePart] = stringNumber.split('e');
  const [realPart, decimalPart] = numPart.split('.');
  const newEPart = (ePart) ? 'e' + ePart : '';
  const newDecimalPart = (decimalPart) ? '.' + decimalPart.slice(0, decimal) : ''
  return realPart + newDecimalPart + newEPart;
}