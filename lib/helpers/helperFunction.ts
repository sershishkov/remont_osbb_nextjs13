import { monthsWorkBudjet } from '@/constants/constants';

const genNumberByDate = (enteredDate: Date) => {
  const fullYear = enteredDate.getFullYear();
  const month =
    enteredDate.getMonth() < 10
      ? `0${enteredDate.getMonth() + 1}`
      : enteredDate.getMonth() + 1;
  const day =
    enteredDate.getDate() < 10
      ? `0${enteredDate.getDate()}`
      : enteredDate.getDate();
  const hours =
    enteredDate.getHours() < 10
      ? `0${enteredDate.getHours()}`
      : enteredDate.getHours();
  const minutes =
    enteredDate.getMinutes() < 10
      ? `0${enteredDate.getMinutes()}`
      : enteredDate.getMinutes();

  const doc__Number = `${fullYear - 2000}.${month}.${day}.${hours}.${minutes}`;

  return doc__Number;
};

export const generateDocNumber = (): string => {
  const newDate = new Date();
  const doc__Number = genNumberByDate(newDate);

  return doc__Number;
};

export const generateMultipleDocNumbers = () => {
  const oneMinute = 60 * 1000;
  const ms = +new Date();

  const invoiceBaseDate = new Date(ms + oneMinute);
  const invoiceNaklDate = new Date(ms + oneMinute * 2);
  const invoiceAktDate = new Date(ms + oneMinute * 3);
  const aktDate = new Date(ms + oneMinute * 4);
  const naklDate = new Date(ms + oneMinute * 5);
  const koshtorisDate = new Date(ms + oneMinute * 6);
  const contrProectAvtorskDate = new Date(ms + oneMinute * 7);
  const aktProectAvtorskDate = new Date(ms + oneMinute * 8);

  const jurnalAvtoskiyDate = new Date(ms + oneMinute * 9);
  const jurnalRabotDate = new Date(ms + oneMinute * 10);
  const prikazGipDate = new Date(ms + oneMinute * 11);
  const prikazEngineerDate = new Date(ms + oneMinute * 12);
  const prikazOhranaTrudaDate = new Date(ms + oneMinute * 13);

  const invoiceNumberBase = genNumberByDate(invoiceBaseDate);
  const invoiceNumberNakl = genNumberByDate(invoiceNaklDate);
  const invoiceNumberAkt = genNumberByDate(invoiceAktDate);
  const aktNumber = genNumberByDate(aktDate);
  const naklNumber = genNumberByDate(naklDate);
  const koshtorisNumber = genNumberByDate(koshtorisDate);
  const contrProectAvtorskNumber = genNumberByDate(contrProectAvtorskDate);
  const aktProectAvtorskNumber = genNumberByDate(aktProectAvtorskDate);

  const jurnalAvtoskiyNumber = genNumberByDate(jurnalAvtoskiyDate);
  const jurnalRabotNumber = genNumberByDate(jurnalRabotDate);
  const prikazGipNumber = genNumberByDate(prikazGipDate);
  const prikazEngineeNumber = genNumberByDate(prikazEngineerDate);
  const prikazOhranaTrudaNumber = genNumberByDate(prikazOhranaTrudaDate);

  return {
    invoiceNumberBase,
    invoiceNumberNakl,
    invoiceNumberAkt,

    aktNumber,
    naklNumber,
    koshtorisNumber,

    contrProectAvtorskNumber,
    aktProectAvtorskNumber,

    jurnalAvtoskiyNumber,
    jurnalRabotNumber,
    prikazGipNumber,
    prikazEngineeNumber,
    prikazOhranaTrudaNumber,
  };
};

export function Export22Doc(element: string, filename = '') {
  let preHtml =
    "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
  let postHtml = '</body></html>';
  //@ts-ignore
  let html = preHtml + document.getElementById(element).innerHTML + postHtml;

  let blob = new Blob(['\ufeff', html], {
    type: 'application/msword',
  });

  let url =
    'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html);

  filename = filename ? filename + '.doc' : 'document.doc';

  let downloadLink = document.createElement('a');

  document.body.appendChild(downloadLink);
  //@ts-ignore
  if (navigator.msSaveOrOpenBlob) {
    //@ts-ignore
    navigator.msSaveOrOpenBlob(blob, filename);
  } else {
    downloadLink.href = url;
    downloadLink.download = filename;
    downloadLink.click();
  }

  document.body.removeChild(downloadLink);
}

export const setDefaultMonths = () => {
  const newDate = new Date();
  const currentDate = newDate.getDate();
  const currentMonth = newDate.getMonth();

  let startMonth = '';
  let endMonth = '';

  if ((currentMonth === 10 && currentDate > 20) || currentMonth === 11) {
    startMonth = monthsWorkBudjet[11]._id;
    endMonth = monthsWorkBudjet[11]._id;
  } else if (currentDate > 20) {
    startMonth = monthsWorkBudjet[currentMonth + 1]._id;
    endMonth = monthsWorkBudjet[currentMonth + 2]._id;
  } else {
    startMonth = monthsWorkBudjet[currentMonth]._id;
    endMonth = monthsWorkBudjet[currentMonth + 1]._id;
  }
  return {
    startMonth,
    endMonth,
  };
};
