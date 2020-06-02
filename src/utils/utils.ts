export function addZeroes(num) {
  const dec = num.split('.')[1];
  const len = dec && dec.length > 2 ? dec.length : 2;
  const test = Number(Number(num).toFixed(len));
  return test;
}
