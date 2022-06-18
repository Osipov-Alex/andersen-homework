const convertNumber = () => {
  const START_STRING = 'Введите число';
  const number = Number(prompt(START_STRING, ''));
  const base = Number(prompt(START_STRING, ''));

  if (isNaN(number) || isNaN(base)) {
    console.error('Некорректный ввод!');
    return 'Некорректный ввод!';
  }
  console.log(number.toString(base));
  return number.toString(base);
}

convertNumber()