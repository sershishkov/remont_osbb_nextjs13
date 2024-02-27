import React from 'react';
import { FloatToSamplesInWordsUkr } from '@/lib/helpers/myPropisUkr';
import {
  I_Contract,
  I_Client,
  I_WorkRows,
  I_LProduct,
} from '@/interfaces/refdata';
import { arr__typeInvoice } from '@/constants/constants';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import classes from './styles.module.scss';

export default function InviceMixToPrint({
  tableAktRows,
  tableNaklRows,
  localOurFirmObj,
  localClientObj,
  localContractObj,

  invoiceNumber,
  invoiceDate,
  naklSum,
  aktSum,
  totalInvoiceSum,
  invoiceDescription,
}: Readonly<{
  tableAktRows: I_WorkRows[];
  tableNaklRows: I_LProduct[];
  localOurFirmObj: I_Client;
  localClientObj: I_Client;
  localContractObj: I_Contract;

  invoiceNumber: string;
  invoiceDate: Date;
  naklSum: number;
  aktSum: number;
  totalInvoiceSum: number;
  invoiceDescription: string;
}>) {
  const sumPropis = FloatToSamplesInWordsUkr(
    isNaN(totalInvoiceSum) ? 0 : totalInvoiceSum
  );
  const invoiceCaption =
    arr__typeInvoice[1].caption +
    ' ' +
    arr__typeInvoice[1].prefix +
    invoiceNumber;

  const invoiceDateToString = new Date(invoiceDate).toLocaleDateString(
    'uk-UA',
    {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }
  );
  const contractDateToString = new Date(
    localContractObj?.contractDate! ?? ''
  ).toLocaleDateString('uk-UA', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  //@ts-ignore
  const ourFirm = `${localOurFirmObj?.firmType!.firmTypeShortName!} « ${
    localOurFirmObj?.clientShortName
  } », ${localOurFirmObj?.edrpou ? `ЄДРПОУ :${localOurFirmObj?.edrpou}` : ''} ${
    localOurFirmObj?.inn ? `ІНН :${localOurFirmObj?.inn}` : ''
  }`;

  const ourFirmAddress = `${localOurFirmObj?.postIndex}, ${localOurFirmObj?.address}`;

  const ourIBAN = localOurFirmObj?.iban;
  //@ts-ignore
  const ourTaxationType = `${localOurFirmObj?.firmType!.firmTypeShortName!} « ${
    localOurFirmObj?.clientShortName
    //@ts-ignore
  } » ${localOurFirmObj?.taxationType.taxationTypeName}`;

  //@ts-ignore
  const payerFirm = `${localClientObj?.firmType!.firmTypeShortName!} « ${
    localClientObj?.clientShortName
  } », ${localClientObj?.edrpou ? `ЄДРПОУ :${localClientObj?.edrpou}` : ''} ${
    localClientObj?.inn ? `ІНН :${localClientObj?.inn}` : ''
  }`;

  const clientFirmAddress = `${localClientObj?.postIndex}, ${localClientObj?.address}`;

  const clientIBAN = localClientObj?.iban;
  const contractNumber = localContractObj?.contractNumber;

  return (
    <div className={classes.page} id='page'>
      <Grid container direction={`column`} className={classes.naklHeader}>
        {/* //////////////////////////////////////// */}
        <Grid item sx={{ width: '100%' }}>
          <Grid
            container
            direction={`row`}
            justifyContent={`center`}
            alignItems={`center`}
          >
            <Typography variant='h5' sx={{ color: 'black' }}>
              {invoiceCaption}
            </Typography>
          </Grid>
        </Grid>
        <Grid item sx={{ width: '100%' }} mb={1}>
          <Grid
            container
            direction={`row`}
            justifyContent={`center`}
            alignItems={`center`}
          >
            <Typography variant='h6' sx={{ color: 'black' }}>
              Від {invoiceDateToString}
            </Typography>
          </Grid>
        </Grid>
        <Grid item sx={{ width: '100%' }}>
          <Grid container direction={`row`} alignItems={`center`}>
            <Grid item xs={2}>
              <Typography variant='body2' sx={{ color: 'black' }}>
                Постачальник:
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <Typography variant='body2' sx={{ color: 'black' }}>
                {ourFirm}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sx={{ width: '100%' }}>
          <Grid container direction={`row`} alignItems={`center`}>
            <Grid item xs={2}>
              <Typography variant='body2' sx={{ color: 'black' }}>
                {' '}
                Адреса:
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <Typography variant='body2' sx={{ color: 'black' }}>
                {ourFirmAddress}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sx={{ width: '100%' }}>
          <Grid container direction={`row`} alignItems={`center`}>
            <Grid item xs={2}>
              <Typography variant='body2' sx={{ color: 'black' }}>
                IBAN:
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <Typography variant='body2' sx={{ color: 'black' }}>
                {ourIBAN}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sx={{ width: '100%', marginBottom: 2 }}>
          <Grid
            container
            direction={`row`}
            justifyContent={`flex-start`}
            alignItems={`center`}
          >
            <Typography variant='body2' sx={{ color: 'black' }}>
              {ourTaxationType}
            </Typography>
          </Grid>
        </Grid>
        {/* //////////////////////////////////////// */}
        {/* //////////////////////////////////////// */}

        <Grid item sx={{ width: '100%' }}>
          <Grid container direction={`row`} alignItems={`center`}>
            <Grid item xs={2}>
              <Typography variant='body2' sx={{ color: 'black' }}>
                Платник:
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <Typography variant='body2' sx={{ color: 'black' }}>
                {payerFirm}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sx={{ width: '100%' }}>
          <Grid container direction={`row`} alignItems={`center`}>
            <Grid item xs={2}>
              <Typography variant='body2' sx={{ color: 'black' }}>
                {' '}
                Адреса:
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <Typography variant='body2' sx={{ color: 'black' }}>
                {clientFirmAddress}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sx={{ width: '100%' }}>
          <Grid container direction={`row`} alignItems={`center`}>
            <Grid item xs={2}>
              <Typography variant='body2' sx={{ color: 'black' }}>
                IBAN:
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <Typography variant='body2' sx={{ color: 'black' }}>
                {clientIBAN}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sx={{ width: '100%' }}>
          <Grid
            container
            direction={`row`}
            justifyContent={`flex-start`}
            alignItems={`center`}
          >
            <Typography variant='body2' sx={{ color: 'black' }}>
              Договір № {contractNumber} від {contractDateToString}
            </Typography>
          </Grid>
        </Grid>
        {/* //////////////////////////////////////// */}
      </Grid>

      <TableContainer sx={{ margin: '4px 0' }} id='table-to-save'>
        <Table
          padding='none'
          sx={{
            width: '100%',
            margin: 0,
            backgroundColor: 'white',
            '& td,th': {
              color: 'black',
            },
          }}
        >
          <TableHead
            sx={{
              '& td, th': {
                border: '1px solid black',
              },
            }}
          >
            <TableRow>
              <TableCell align='center' sx={{ width: '8mm' }}>
                № п/п
              </TableCell>
              <TableCell align='center'>Найменування</TableCell>
              <TableCell align='center' sx={{ width: '16mm' }}>
                Од. Вимиру
              </TableCell>
              <TableCell align='center' sx={{ width: '18mm' }}>
                Кількість
              </TableCell>
              <TableCell align='center' sx={{ width: '20mm' }}>
                Ціна без ПДВ,грн.
              </TableCell>
              <TableCell align='center' sx={{ width: '20mm' }}>
                Сума без ПДВ,грн
              </TableCell>
            </TableRow>
          </TableHead>
          {tableAktRows && tableAktRows.length > 0 && (
            <TableBody
              sx={{
                '& td,th': {
                  border: '1px solid black',
                },
              }}
            >
              <TableRow>
                <TableCell align='center'>{` `}</TableCell>
                <TableCell align='center' sx={{ paddingLeft: 1 }}>
                  <strong>Робота</strong>
                </TableCell>
                <TableCell align='center'>{` `}</TableCell>
                <TableCell align='center'>{` `}</TableCell>
                <TableCell align='center'>{` `}</TableCell>
                <TableCell align='center'>{` `}</TableCell>
              </TableRow>

              {tableAktRows &&
                tableAktRows.length > 0 &&
                tableAktRows.map((item, rowIndex) => (
                  <TableRow key={item.row_id}>
                    <TableCell align='center'>{rowIndex + 1}</TableCell>
                    <TableCell align='left' sx={{ paddingLeft: 1 }}>
                      {item.workName} {item.extraInformation ?? ''}
                    </TableCell>
                    <TableCell align='center'>{item.unit}</TableCell>
                    <TableCell align='center'>{item.amount}</TableCell>
                    <TableCell align='center'>{item.price}</TableCell>
                    <TableCell align='center'>{item.rowSum}</TableCell>
                  </TableRow>
                ))}
              <TableRow>
                <TableCell align='center'>{` `}</TableCell>
                <TableCell align='left' sx={{ paddingLeft: 1 }}>
                  <strong>Разом робота</strong>
                </TableCell>
                <TableCell align='center'>{` `}</TableCell>
                <TableCell align='center'>{` `}</TableCell>
                <TableCell align='center'>{` `}</TableCell>
                <TableCell align='center'>{aktSum.toFixed(2)}</TableCell>
              </TableRow>
            </TableBody>
          )}
          {tableNaklRows && tableNaklRows.length > 0 && (
            <TableBody
              sx={{
                '& td,th': {
                  border: '1px solid black',
                },
              }}
            >
              <TableRow>
                <TableCell align='center'>{` `}</TableCell>
                <TableCell align='center' sx={{ paddingLeft: 1 }}>
                  <strong>Будматеріал</strong>
                </TableCell>
                <TableCell align='center'>{` `}</TableCell>
                <TableCell align='center'>{` `}</TableCell>
                <TableCell align='center'>{` `}</TableCell>
                <TableCell align='center'>{` `}</TableCell>
              </TableRow>

              {tableNaklRows &&
                tableNaklRows.length > 0 &&
                tableNaklRows.map((item, rowIndex) => (
                  <TableRow key={item.row_id}>
                    <TableCell align='center'>{rowIndex + 1}</TableCell>
                    <TableCell align='left' sx={{ paddingLeft: 1 }}>
                      {item.product} {item.extraInformation ?? ''}
                    </TableCell>
                    <TableCell align='center'>{item.unit}</TableCell>
                    <TableCell align='center'>{item.amount}</TableCell>
                    <TableCell align='center'>{item.price}</TableCell>
                    <TableCell align='center'>{item.rowSum}</TableCell>
                  </TableRow>
                ))}
              <TableRow>
                <TableCell align='center'>{` `}</TableCell>
                <TableCell align='left' sx={{ paddingLeft: 1 }}>
                  <strong>Разом матеріали</strong>
                </TableCell>
                <TableCell align='center'>{` `}</TableCell>
                <TableCell align='center'>{` `}</TableCell>
                <TableCell align='center'>{` `}</TableCell>
                <TableCell align='center'>{naklSum.toFixed(2)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align='center'>{` `}</TableCell>
                <TableCell align='left' sx={{ paddingLeft: 1 }}>
                  <strong>Разом матеріали і робота</strong>
                </TableCell>
                <TableCell align='center'>{` `}</TableCell>
                <TableCell align='center'>{` `}</TableCell>
                <TableCell align='center'>{` `}</TableCell>
                <TableCell align='center'>
                  {totalInvoiceSum.toFixed(2)}
                </TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </TableContainer>

      <Grid container direction={`column`} className={classes.sum}>
        <Grid item sx={{ width: '100%' }}>
          <Grid container direction={`row`}>
            <Grid item xs={10}>
              <Typography
                variant='body2'
                sx={{ color: 'black', paddingLeft: 5 }}
              >
                Всього без ПДВ
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography
                variant='body2'
                align='center'
                sx={{ color: 'black' }}
              >
                {totalInvoiceSum.toFixed(2)}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sx={{ width: '100%' }}>
          <Grid container direction={`row`}>
            <Grid item xs={10}>
              <Typography
                variant='body2'
                sx={{ color: 'black', paddingLeft: 5 }}
              >
                ПДВ
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography
                variant='body2'
                align='center'
                sx={{ color: 'black' }}
              >
                0,00
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sx={{ width: '100%' }} mb={2}>
          <Grid container direction={`row`}>
            <Grid item xs={10}>
              <Typography
                variant='body2'
                sx={{ color: 'black', paddingLeft: 5 }}
              >
                Загальна сума без ПДВ
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography
                variant='body2'
                align='center'
                sx={{ color: 'black' }}
              >
                {totalInvoiceSum.toFixed(2)}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sx={{ width: '100%' }}>
          <Grid container direction={`row`}>
            <Grid item xs={12}>
              <Typography variant='body1' align='left' sx={{ color: 'black' }}>
                Всього до сплати: (<strong>{sumPropis}</strong>)
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sx={{ width: '100%' }}>
          <Grid container direction={`row`}>
            <Grid item xs={12}>
              <Typography variant='body1' align='left' sx={{ color: 'black' }}>
                Призначення платежу: <strong>{invoiceDescription}</strong>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container direction={`column`} mt={2} className={classes.sign}>
        <Grid item sx={{ width: '100%' }}>
          <Typography variant='body1' sx={{ color: 'black', paddingLeft: 15 }}>
            Керівник ____________________
          </Typography>
        </Grid>
        <Grid item sx={{ width: '100%' }}>
          <Typography variant='body1' sx={{ color: 'black', paddingLeft: 20 }}>
            <strong>М.П.</strong>
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}
