export const generateDocNumber = (): string => {
  const newDate = new Date();
  const fullYear = newDate.getFullYear();
  const month =
    newDate.getMonth() < 10
      ? `0${newDate.getMonth() + 1}`
      : newDate.getMonth() + 1;
  const day =
    newDate.getDate() < 10 ? `0${newDate.getDate()}` : newDate.getDate();
  const hours =
    newDate.getHours() < 10 ? `0${newDate.getHours()}` : newDate.getHours();
  const minutes =
    newDate.getMinutes() < 10
      ? `0${newDate.getMinutes()}`
      : newDate.getMinutes();

  const doc__Number = `${fullYear - 2000}.${month}.${day}.${hours}.${minutes}`;

  return doc__Number;
};
