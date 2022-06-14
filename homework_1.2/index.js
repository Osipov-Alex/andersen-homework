const sumAndQuotient = () => {
  const number_1 = Number(prompt('Введите число', ''));

  if (isNaN(number_1)) {
    return 'Некорректный ввод!';
  }

  const number_2 = Number(prompt('Введите число', ''));

  if (isNaN(number_2)) {
    return 'Некорректный ввод!';
  }

  return `Ответ: ${number_1 + number_2}, ${number_1 / number_2}.`;
}

sumAndQuotient()