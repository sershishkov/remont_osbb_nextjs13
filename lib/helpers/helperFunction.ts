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
