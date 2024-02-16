import React from 'react';

import { FloatToSamplesInWordsUkr } from '@/lib/helpers/myPropisUkr';

import { I_Client, I_Contract, I_WorkRows } from '@/interfaces/refdata';

import { arr__typeAkt } from '@/constants/constants';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import classes from './styles.module.css';

function AktToPrint({
  aktOfWorkNumber,
  aktOfWorkDate,
  ourFirmObj,
  clientObj,
  contractObj,
  typeAkt,
  aktSum,
  tableRows,
}: Readonly<{
  aktOfWorkNumber: string;
  aktOfWorkDate: Date;
  ourFirmObj: I_Client;
  clientObj: I_Client;
  contractObj: I_Contract;

  typeAkt: string;
  aktSum: number;
  tableRows: I_WorkRows[];
}>) {
  const sumPropis = FloatToSamplesInWordsUkr(aktSum);
  const objTypeAkt = arr__typeAkt.find((item) => item._id === typeAkt);
  const aktCaption =
    objTypeAkt?.caption + ' ' + objTypeAkt?.prefix + aktOfWorkNumber;
  const aktDateToString = new Date(aktOfWorkDate).toLocaleDateString('uk-UA', {
    // day: '2-digit',
    // month: 'long',
    year: 'numeric',
  });
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
  const payerFirm = `${clientObj?.firmType!.firmTypeShortName!} « ${
    clientObj?.clientShortName
  } », ${clientObj?.edrpou ? `ЄДРПОУ :${clientObj?.edrpou}` : ''} ${
    clientObj?.inn ? `ІНН :${clientObj?.inn}` : ''
  }`;

  const clientFirmAddress = `${clientObj?.postIndex}, ${clientObj?.address}`;

  const clientIBAN = clientObj?.iban;

  const contractNumber = contractObj?.contractNumber;
  const ourBoss = `${
    ourFirmObj?.firstName_imen
  } ${ourFirmObj?.lastName_imen?.toUpperCase()}`;
  const ourBossLong = `${ourFirmObj?.lastName_imen} ${ourFirmObj?.firstName_imen} ${ourFirmObj?.patronymic_imen}`;

  const clientBoss = `${
    clientObj?.firstName_imen
  } ${clientObj?.lastName_imen?.toUpperCase()}`;

  const clientBossLong = `${clientObj?.lastName_imen} ${clientObj?.firstName_imen} ${clientObj?.patronymic_imen}`;

  return (
    <div className={classes.page} id='page'>
      <Grid container direction={`row`} className={classes.aktlHeader} mb={1}>
        <Grid item xs={6}>
          <Grid container direction={`column`} alignItems={`center`}>
            <Grid item>
              <Typography variant='button' sx={{ color: 'black' }}>
                Виконавець
              </Typography>
            </Grid>
            <Grid item sx={{ width: '100%' }}>
              <Typography variant='body2' sx={{ color: 'black' }}>
                {ourFirm}
              </Typography>
            </Grid>
            <Grid item sx={{ width: '100%' }}>
              <Typography variant='body2' sx={{ color: 'black' }}>
                Адреса: {ourFirmAddress}
              </Typography>
            </Grid>
            <Grid item sx={{ width: '100%' }}>
              <Typography variant='body2' sx={{ color: 'black' }}>
                IBAN: {ourIBAN}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid container direction={`column`} alignItems={`center`}>
            <Grid item>
              <Typography variant='button' sx={{ color: 'black' }}>
                ЗАМОВНИК
              </Typography>
            </Grid>
            <Grid item sx={{ width: '100%' }}>
              <Typography variant='body2' sx={{ color: 'black' }}>
                {payerFirm}
              </Typography>
            </Grid>
            <Grid item sx={{ width: '100%' }}>
              <Typography variant='body2' sx={{ color: 'black' }}>
                Адреса: {clientFirmAddress}
              </Typography>
            </Grid>
            <Grid item sx={{ width: '100%' }}>
              <Typography variant='body2' sx={{ color: 'black' }}>
                IBAN: {clientIBAN}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container direction={`column`} className={classes.aktlDescription}>
        <Grid item sx={{ width: '100%' }}>
          <Grid
            container
            direction={`row`}
            justifyContent={`center`}
            alignItems={`center`}
          >
            <Typography variant='h5' sx={{ color: 'black' }}>
              {aktCaption}
            </Typography>
          </Grid>
        </Grid>
        <Grid item sx={{ width: '100%' }}>
          <Grid
            container
            direction={`row`}
            justifyContent={`center`}
            alignItems={`center`}
          >
            <Typography variant='h6' sx={{ color: 'black' }}>
              Від &quot;___&quot; _______________{aktDateToString} р.
            </Typography>
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
        <Grid item sx={{ width: '100%' }}>
          <Grid container direction={`row`}>
            <Grid item xs={8}>
              <Typography variant='body2' sx={{ color: 'black' }}>
                Ми,що нижче підписалися, представник Замовника :
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant='body2' sx={{ color: 'black' }}>
                {ourBossLong}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sx={{ width: '100%' }}>
          <Grid container direction={`row`}>
            <Grid item xs={8}>
              <Typography variant='body2' sx={{ color: 'black' }}>
                та представник Виконавця ::
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant='body2' sx={{ color: 'black' }}>
                {clientBossLong}
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
              склали цей АКТ про те, що Виконавець належнім чином і в повному
              обсязі виконав (надав), а Замовник прийняв роботи (послуги):
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <TableContainer sx={{ margin: 0 }} id='table-to-save'>
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
                    {item.workName} {item.extraInformation ?? ''}
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
                {aktSum.toFixed(2)}
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
        <Grid item sx={{ width: '100%' }}>
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
                {aktSum.toFixed(2)}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sx={{ width: '100%' }}>
          <Grid container direction={`row`}>
            <Grid item xs={12}>
              <Typography variant='body1' align='left' sx={{ color: 'black' }}>
                Загальна вартість виконаних робіт (послуг):{' '}
                <strong>{`(${sumPropis}), без ПДВ.`}</strong>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sx={{ width: '100%' }}>
          <Grid container direction={`row`}>
            <Grid item xs={12}>
              <Typography variant='body1' align='left' sx={{ color: 'black' }}>
                Сторони одна до одної претензій не мають.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container direction={`row`} mt={2} className={classes.sign}>
        <Grid item xs={6}>
          <Grid container direction={`column`}>
            <Grid item sx={{ width: '100%' }}>
              <Typography variant='button' sx={{ color: 'black' }}>
                ВИКОНАВЕЦ
              </Typography>
            </Grid>
            <Grid item sx={{ width: '100%' }}>
              <Grid container direction={`row`} sx={{ paddingRight: 2 }}>
                <Grid
                  item
                  sx={{ borderBottom: '1px solid black', flex: 1 }}
                ></Grid>
                <Grid item>
                  <Typography variant='body1' sx={{ color: 'black' }}>
                    {ourBoss}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item sx={{ width: '100%' }}>
              <Typography variant='body2' sx={{ color: 'black' }}>
                МП
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid container direction={`column`} sx={{ paddingRight: 2 }}>
            <Grid item sx={{ width: '100%' }}>
              <Typography variant='button' sx={{ color: 'black' }}>
                ЗАМОВНИК
              </Typography>
            </Grid>
            <Grid item sx={{ width: '100%' }}>
              <Grid container direction={`row`}>
                <Grid
                  item
                  sx={{ borderBottom: '1px solid black', flex: 1 }}
                ></Grid>
                <Grid item>
                  <Typography variant='body1' sx={{ color: 'black' }}>
                    {clientBoss}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item sx={{ width: '100%' }}>
              <Typography variant='body2' sx={{ color: 'black' }}>
                МП
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default AktToPrint;
