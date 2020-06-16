export function addZeroes(num) {
  const dec = num.split('.')[1];
  const len = dec && dec.length > 2 ? dec.length : 2;
  const test = Number(Number(num).toFixed(len));
  return test;
}

export function generateDigits(): number {
  return Math.floor(1000 + Math.random() * 9000);
}
