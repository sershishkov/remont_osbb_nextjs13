import React from 'react';

import { FloatToSamplesInWordsUkr } from '@/lib/helpers/myPropisUkr';

import { I_Client, I_Contract, I_WorkRows } from '@/interfaces/refdata';

import { arr__typeAkt } from '@/constants/constants';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';

import TableRow from '@mui/material/TableRow';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import classes from './styles.module.scss';

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
      <TableContainer sx={{ margin: 0 }} id='table-caption-1'>
        <Table
          padding='none'
          sx={{
            width: '100%',
            margin: 0,
            backgroundColor: 'white',
            // '& td,th': {
            //   color: 'black',
            // },
          }}
        >
          <TableBody
            sx={{
              '& td,th,': {
                border: '1px solid transparent',
              },
            }}
          >
            <TableRow>
              <TableCell align='center' sx={{ width: '50%' }}>
                <Typography variant='button' sx={{ color: 'black' }}>
                  Виконавець
                </Typography>
              </TableCell>
              <TableCell align='center' sx={{ width: '50%' }}>
                <Typography variant='button' sx={{ color: 'black' }}>
                  ЗАМОВНИК
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ width: '50%' }}>
                <Typography variant='body2' sx={{ color: 'black' }}>
                  {ourFirm}
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '50%' }}>
                <Typography variant='body2' sx={{ color: 'black' }}>
                  {payerFirm}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ width: '50%' }}>
                <Typography variant='body2'>
                  Адреса: {ourFirmAddress}
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '50%' }}>
                <Typography variant='body2'>
                  Адреса: {clientFirmAddress}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ width: '50%' }}>
                <Typography variant='body2'>IBAN: {ourIBAN}</Typography>
              </TableCell>
              <TableCell sx={{ width: '50%' }}>
                <Typography variant='body2'>IBAN: {clientIBAN}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>
                <Typography variant='h5' align='center'>
                  {aktCaption}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>
                <Typography variant='h6' align='center'>
                  Від &quot;___&quot; _______________{aktDateToString} р.
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <TableContainer sx={{ margin: 0 }} id='table-caption-2'>
        <Table
          padding='none'
          sx={{
            width: '100%',
            margin: 0,
            backgroundColor: 'white',
            // '& td,th': {
            //   color: 'black',
            // },
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
              <TableCell colSpan={2}>
                <Typography variant='body2'>
                  Договір № {contractNumber} від {contractDateToString}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ width: '60%' }}>
                <Typography variant='body2'>
                  Ми,що нижче підписалися, представник Замовника:
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '40%' }}>
                <Typography variant='body2'>{ourBossLong}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ width: '60%' }}>
                <Typography variant='body2'>
                  та представник Виконавця:
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '40%' }}>
                <Typography variant='body2'>{clientBossLong}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>
                <Typography variant='body2'>
                  склали цей АКТ про те, що Виконавець належнім чином і в
                  повному обсязі виконав (надав), а Замовник прийняв роботи
                  (послуги):
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <TableContainer sx={{ margin: 0 }} id='table-main'>
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
          <TableBody
            sx={{
              '& td,th': {
                border: '1px solid black',
              },
            }}
          >
            <TableRow>
              <TableCell align='center' sx={{ width: '7mm' }}>
                <Typography variant='body2'>№ п/п</Typography>
              </TableCell>
              <TableCell align='center'>
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
                  <TableCell align='left' sx={{ paddingLeft: 1 }}>
                    <Typography variant='body2'>
                      {item.workName} {item.extraInformation ?? ''}
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
            <TableRow>
              <TableCell></TableCell>
              <TableCell colSpan={4}>
                <Typography
                  variant='body2'
                  sx={{ color: 'black', paddingLeft: 5 }}
                >
                  Всього без ПДВ
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  align='center'
                  sx={{ color: 'black' }}
                >
                  {aktSum.toFixed(2)}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell colSpan={4}>
                <Typography
                  variant='body2'
                  sx={{ color: 'black', paddingLeft: 5 }}
                >
                  ПДВ
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  align='center'
                  sx={{ color: 'black' }}
                >
                  0,00
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell colSpan={4}>
                <Typography
                  variant='body2'
                  sx={{ color: 'black', paddingLeft: 5 }}
                >
                  Загальна сума без ПДВ
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  align='center'
                  sx={{ color: 'black' }}
                >
                  {aktSum.toFixed(2)}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={7}>
                <Typography
                  variant='body1'
                  align='left'
                  sx={{ color: 'black' }}
                >
                  Загальна вартість виконаних робіт (послуг):{' '}
                  <strong>{`(${sumPropis}), без ПДВ.`}</strong>
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={7}>
                <Typography
                  variant='body1'
                  align='left'
                  sx={{ color: 'black' }}
                >
                  Сторони одна до одної претензій не мають.
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <TableContainer sx={{ margin: '1rem 0' }} id='table-sign'>
        <Table
          padding='none'
          sx={{
            width: '100%',
            margin: 0,
            backgroundColor: 'white',
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
              <TableCell sx={{ width: '50%' }}>
                <Typography mb={2} variant='button' sx={{ color: 'black' }}>
                  ВИКОНАВЕЦ
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '50%' }}>
                <Typography variant='button' sx={{ color: 'black' }}>
                  ЗАМОВНИК
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ width: '50%' }}>
                <Grid
                  container
                  direction={`row`}
                  sx={{ paddingRight: 2, paddingTop: 3 }}
                >
                  <Grid
                    item
                    sx={{ borderBottom: '1px solid black', flex: 1 }}
                  ></Grid>
                  <Grid item>
                    <Typography
                      variant='body1'
                      align='right'
                      sx={{ color: 'black' }}
                    >
                      {ourBoss}
                    </Typography>
                  </Grid>
                </Grid>
              </TableCell>
              <TableCell sx={{ width: '50%' }}>
                <Grid
                  container
                  direction={`row`}
                  sx={{ paddingRight: 2, paddingTop: 3 }}
                >
                  <Grid
                    item
                    sx={{ borderBottom: '1px solid black', flex: 1 }}
                  ></Grid>
                  <Grid item>
                    <Typography
                      variant='body1'
                      align='right'
                      sx={{ color: 'black' }}
                    >
                      {clientBoss}
                    </Typography>
                  </Grid>
                </Grid>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ width: '50%' }}>
                <Typography variant='body2' sx={{ color: 'black' }}>
                  МП
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '50%' }}>
                <Typography variant='body2' sx={{ color: 'black' }}>
                  МП
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default AktToPrint;
