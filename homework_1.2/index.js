const checkValue = (value) => {
  if (isNaN(value)) {
    console.error('Некорректный ввод!');
    return false;
  }
  return true;
}

const sumAndQuotient = () => {
  const startString = 'Введите число';
  const number_1 = Number(prompt(startString, ''));

  if (!checkValue(number_1)) {
    return
  }

  const number_2 = Number(prompt(startString, ''));

  if (!checkValue(number_2)) {
    return
  }

  console.log(`Ответ: ${number_1 + number_2}, ${number_1 / number_2}.`);
  return `Ответ: ${number_1 + number_2}, ${number_1 / number_2}.`;
}

sumAndQuotient()