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
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Grid from '@mui/material/Grid';

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

  const injectPhrase = arr__TypeOfOSBB.includes(firmType)
    ? 'у житловому будинку за адресою: '
    : ' за адресою:';
  const workAddress = contractObj?.workAddress;
  const contractDescription = `${contractObj?.contractDescription} ${injectPhrase} ${workAddress}`;

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
              {naklCaption}
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
              Від {naklDateToString}
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
          <TableBody
            sx={{
              '& td,th': {
                border: '1px solid black',
              },
            }}
          >
            {tableRows &&
              tableRows.length > 0 &&
              tableRows.map((item, rowIndex) => (
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
          </TableBody>
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
                {naklSum.toFixed(2)}
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
                {naklSum.toFixed(2)}
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
                Призначення платежу: <strong>{contractDescription}</strong>
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

export default InvoiceToPrint;
