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

  const invoiceBaseDate = new Date(ms);
  const invoiceNaklDate = new Date(ms + oneMinute);
  const invoiceAktDate = new Date(ms + oneMinute * 2);
  const aktDate = new Date(ms + oneMinute * 3);
  const naklDate = new Date(ms + oneMinute * 4);
  const koshtorisDate = new Date(ms + oneMinute * 5);
  const contrProectAvtorskDate = new Date(ms + oneMinute * 6);
  const aktProectAvtorskDate = new Date(ms + oneMinute * 7);

  const invoiceNumberBase = genNumberByDate(invoiceBaseDate);
  const invoiceNumberNakl = genNumberByDate(invoiceNaklDate);
  const invoiceNumberAkt = genNumberByDate(invoiceAktDate);
  const aktNumber = genNumberByDate(aktDate);
  const naklNumber = genNumberByDate(naklDate);
  const koshtorisNumber = genNumberByDate(koshtorisDate);
  const contrProectAvtorskNumber = genNumberByDate(contrProectAvtorskDate);
  const aktProectAvtorskNumber = genNumberByDate(aktProectAvtorskDate);

  return {
    invoiceNumberBase,
    invoiceNumberNakl,
    invoiceNumberAkt,
    aktNumber,
    naklNumber,
    koshtorisNumber,
    contrProectAvtorskNumber,
    aktProectAvtorskNumber,
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
