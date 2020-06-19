export function addZeroes(num) {
  const dec = num.split('.')[1];
  const len = dec && dec.length > 2 ? dec.length : 2;
  const test = Number(Number(num).toFixed(len));
  return test;
}

export function generateDigits(length: number): number {
  return Math.floor(
    Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1),
  );
}
