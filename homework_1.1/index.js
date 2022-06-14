const convertNumber = () => {
  const number = Number(prompt('Введите число', ''));
  const base = Number(prompt('Введите число', ''));

  if (isNaN(number) || isNaN(base)) {
    return 'Некорректный ввод!';
  }

  return number.toString(base);
}

convertNumber()