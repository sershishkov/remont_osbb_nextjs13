import React from 'react';

import { FloatToSamplesInWordsUkr } from '@/lib/helpers/myPropisUkr';

import {
  I_Client,
  I_Contract,
  I_LProduct,
  I_WorkRows,
} from '@/interfaces/refdata';

import { arr__typeInvoice, arr__TypeOfOSBB } from '@/constants/constants';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';

import TableRow from '@mui/material/TableRow';

import Typography from '@mui/material/Typography';

import classes from './styles.module.scss';

function InvoiceToPrint({
  nakladnayaNumber,
  nakladnayaDate,
  ourFirmObj,
  clientObj,
  contractObj,
  typeNakl,
  naklSum,
  tableRows,
}: Readonly<{
  nakladnayaNumber: string;
  nakladnayaDate: Date;
  ourFirmObj: I_Client;
  clientObj: I_Client;
  contractObj: I_Contract;

  typeNakl: string;
  naklSum: number;
  tableRows: I_WorkRows[] | I_LProduct[];
}>) {
  const sumPropis = FloatToSamplesInWordsUkr(naklSum);
  const objTypeNakl = arr__typeInvoice.find((item) => item._id === typeNakl);
  const naklCaption =
    objTypeNakl?.caption + ' ' + objTypeNakl?.prefix + nakladnayaNumber;
  const naklDateToString = new Date(nakladnayaDate).toLocaleDateString(
    'uk-UA',
    {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }
  );
  const contractDateToString = new Date(
    contractObj?.contractDate! ?? ''
  ).toLocaleDateString('uk-UA', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  //@ts-ignore
  const ourFirm = `${ourFirmObj?.firmType!.firmTypeShortName!} « ${
    ourFirmObj?.clientShortName
  } », ${ourFirmObj?.edrpou ? `ЄДРПОУ :${ourFirmObj?.edrpou}` : ''} ${
    ourFirmObj?.inn ? `ІНН :${ourFirmObj?.inn}` : ''
  }`;

  const ourFirmAddress = `${ourFirmObj?.postIndex}, ${ourFirmObj?.address}`;

  const ourIBAN = ourFirmObj?.iban;
  //@ts-ignore
  const ourTaxationType = `${ourFirmObj?.firmType!.firmTypeShortName!} « ${
    ourFirmObj?.clientShortName
    //@ts-ignore
  } » ${ourFirmObj?.taxationType.taxationTypeName}`;

  //@ts-ignore
  const payerFirm = `${clientObj?.firmType!.firmTypeShortName!} « ${
    clientObj?.clientShortName
  } », ${clientObj?.edrpou ? `ЄДРПОУ :${clientObj?.edrpou}` : ''} ${
    clientObj?.inn ? `ІНН :${clientObj?.inn}` : ''
  }`;

  const clientFirmAddress = `${clientObj?.postIndex}, ${clientObj?.address}`;

  const clientIBAN = clientObj?.iban;

  const contractNumber = contractObj?.contractNumber;
  //@ts-ignore
  const firmType = contractObj?.client?.firmType?.firmTypeShortName;
  //@ts-ignore
  const contractType = contractObj?.contractType?.contractTypeName;
  let contractDescription;
  if (
    contractType === 'Общий' ||
    contractType === 'Общий Сумма' ||
    contractType === 'Предоплата Частичная' ||
    contractType === 'Предоплата Материал' ||
    contractType === 'Предоплата 100%' ||
    contractType === 'Кошторис Сумма' ||
    contractType === 'Кошторис Частичная Предоплата' ||
    contractType === 'Кошторис Предоплата Материал' ||
    contractType === 'Кошторис Предоплата 100%'
  ) {
    const injectPhrase = arr__TypeOfOSBB.includes(firmType)
      ? 'у житловому будинку за адресою: '
      : ' за адресою:';
    const workAddress = contractObj?.workAddress;
    contractDescription = `${contractObj?.contractDescription} ${injectPhrase} ${workAddress}`;
  } else {
    contractDescription = contractObj?.contractDescription!;
  }

  return (
    <div className={classes.page} id='page'>
      <TableContainer id='table-inv-header'>
        <Table
          padding='none'
          sx={{
            width: '100%',
            margin: 0,
            // backgroundColor: 'white',
          }}
        >
          <TableBody
            sx={{
              '& td,th': {
                border: '1px solid transparent',
              },
            }}
          >
            <TableRow>
              <TableCell align='center' colSpan={12}>
                <Typography variant='h5'>{naklCaption}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align='center' colSpan={12}>
                <Typography variant='h6'>Від {naklDateToString}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}>
                <Typography variant='body2'>Постачальник:</Typography>
              </TableCell>
              <TableCell colSpan={9}>
                <Typography variant='body2'>{ourFirm}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}>
                <Typography variant='body2'>Адреса:</Typography>
              </TableCell>
              <TableCell colSpan={9}>
                <Typography variant='body2'>{ourFirmAddress}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}>
                <Typography variant='body2'>IBAN:</Typography>
              </TableCell>
              <TableCell colSpan={9}>
                <Typography variant='body2'>{ourIBAN}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align='left' colSpan={12}>
                <Typography variant='body2'>{ourTaxationType}</Typography>
              </TableCell>
            </TableRow>
            <TableRow sx={{ height: '10px' }}>
              <TableCell align='center' sx={{ width: '7mm' }}></TableCell>
              <TableCell align='center' sx={{ width: '7mm' }}></TableCell>
              <TableCell align='center' sx={{ width: '12mm' }}></TableCell>
              <TableCell align='center' colSpan={5}></TableCell>
              <TableCell align='center' sx={{ width: '16mm' }}></TableCell>
              <TableCell align='center' sx={{ width: '18mm' }}></TableCell>
              <TableCell align='center' sx={{ width: '20mm' }}></TableCell>
              <TableCell align='center' sx={{ width: '20mm' }}></TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}>
                <Typography variant='body2'>Платник:</Typography>
              </TableCell>
              <TableCell colSpan={9}>
                <Typography variant='body2'>{payerFirm}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}>
                <Typography variant='body2'>Адреса:</Typography>
              </TableCell>
              <TableCell colSpan={9}>
                <Typography variant='body2'>{clientFirmAddress}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}>
                <Typography variant='body2'>IBAN:</Typography>
              </TableCell>
              <TableCell colSpan={9}>
                <Typography variant='body2'>{clientIBAN}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align='left' colSpan={12}>
                <Typography variant='body2'>
                  Договір № {contractNumber} від {contractDateToString}
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <TableContainer id='table-inv-main'>
        <Table
          padding='none'
          sx={{
            width: '100%',
            margin: 0,
            // backgroundColor: 'white',
          }}
        >
          <TableBody
            className={classes['table-main']}
            // sx={{
            //   '& td,th': {
            //     border: '1px solid black',
            //   },
            // }}
          >
            <TableRow sx={{ height: 0 }}>
              <TableCell align='center' sx={{ width: '7mm' }}></TableCell>
              <TableCell align='center' sx={{ width: '7mm' }}></TableCell>
              <TableCell align='center' sx={{ width: '12mm' }}></TableCell>
              <TableCell align='center' colSpan={5}></TableCell>

              <TableCell align='center' sx={{ width: '12mm' }}></TableCell>
              <TableCell align='center' sx={{ width: '16mm' }}></TableCell>
              <TableCell align='center' sx={{ width: '18mm' }}></TableCell>
              <TableCell align='center' sx={{ width: '20mm' }}></TableCell>
              <TableCell align='center' sx={{ width: '20mm' }}></TableCell>
            </TableRow>

            <TableRow>
              <TableCell align='center' sx={{ width: '7mm' }}>
                <Typography variant='body2'>№ п/п</Typography>
              </TableCell>
              <TableCell align='center' colSpan={8}>
                <Typography variant='body2'>Найменування</Typography>
              </TableCell>
              <TableCell align='center' sx={{ width: '16mm' }}>
                <Typography variant='body2'>Од. Вимиру</Typography>
              </TableCell>
              <TableCell align='center' sx={{ width: '18mm' }}>
                <Typography variant='body2'>Кількість</Typography>
              </TableCell>
              <TableCell align='center' sx={{ width: '20mm' }}>
                <Typography variant='body2'>Ціна без ПДВ,грн.</Typography>
              </TableCell>
              <TableCell align='center' sx={{ width: '20mm' }}>
                <Typography variant='body2'>Сума без ПДВ,грн</Typography>
              </TableCell>
            </TableRow>
            {tableRows &&
              tableRows.length > 0 &&
              tableRows.map((item, rowIndex) => (
                <TableRow key={item.row_id}>
                  <TableCell align='center'>
                    <Typography variant='body2'>{rowIndex + 1}</Typography>
                  </TableCell>
                  <TableCell colSpan={8} align='left' sx={{ paddingLeft: 1 }}>
                    <Typography variant='body2'>
                      {item.product} {item.extraInformation ?? ''}
                    </Typography>
                  </TableCell>
                  <TableCell align='center'>
                    <Typography variant='body2'>{item.unit}</Typography>
                  </TableCell>
                  <TableCell align='center'>
                    <Typography variant='body2'>{item.amount}</Typography>
                  </TableCell>
                  <TableCell align='center'>
                    <Typography variant='body2'>{item.price}</Typography>
                  </TableCell>
                  <TableCell align='center'>
                    <Typography variant='body2'>{item.rowSum}</Typography>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
          <TableBody
            sx={{
              '& td,th': {
                border: '1px solid transparent',
              },
            }}
          >
            {' '}
            <TableRow>
              <TableCell></TableCell>
              <TableCell colSpan={11}>
                <Typography variant='body2' sx={{ paddingLeft: 5 }}>
                  Всього без ПДВ
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant='body2' align='center'>
                  {naklSum.toFixed(2)}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell colSpan={11}>
                <Typography variant='body2' sx={{ paddingLeft: 5 }}>
                  ПДВ
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant='body2' align='center'>
                  0,00
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell colSpan={11}>
                <Typography variant='body2' sx={{ paddingLeft: 5 }}>
                  Загальна сума без ПДВ
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant='body2' align='center'>
                  {naklSum.toFixed(2)}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={13}>
                <Typography variant='body1' align='left'>
                  Всього до сплати: <strong>{sumPropis}</strong>
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={13}>
                <Typography variant='body1'>
                  Призначення платежу: <strong>{contractDescription}</strong>
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}></TableCell>
              <TableCell colSpan={10}>
                <Typography variant='body1' align='left'>
                  Керівник ____________________
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}></TableCell>
              <TableCell colSpan={10}>
                <Typography variant='body1' align='left'>
                  <strong>М.П.</strong>
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default InvoiceToPrint;
