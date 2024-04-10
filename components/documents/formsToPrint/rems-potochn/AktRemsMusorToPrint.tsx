import React from 'react';
import { FloatToSamplesInWordsUkr } from '@/lib/helpers/myPropisUkr';
import { I_Client, I_RowInAktRemsMusor } from '@/interfaces/refdata';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';

import TableRow from '@mui/material/TableRow';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import classes from '../styles.module.scss';

export default function AktRemsMusorToPrint({
  currentExecutor,
  currentClient,

  aktRemsMusorNumber,
  aktRemsMusorDate,
  serviceWorks,
  totalAktRemsMusorSum,
  totalAktRemsMusorToShow,
}: Readonly<{
  currentExecutor: I_Client;
  currentClient: I_Client;

  aktRemsMusorNumber: string;
  aktRemsMusorDate: string;
  serviceWorks: I_RowInAktRemsMusor[];
  totalAktRemsMusorSum: string;
  totalAktRemsMusorToShow: string;
}>) {
  const localTotal = totalAktRemsMusorToShow || totalAktRemsMusorSum;

  const sumPropis = FloatToSamplesInWordsUkr(parseFloat(localTotal));
  //@ts-ignore
  const localExecutor = `${
    //@ts-ignore
    currentExecutor?.firmType!.firmTypeShortName!
  } « ${currentExecutor?.clientShortName} », ЄДРПОУ :${
    currentExecutor?.edrpou
  }`;
  const localClient = `${
    //@ts-ignore
    currentClient?.firmType!.firmTypeShortName!
  } « ${currentClient?.clientShortName} »,ЄДРПОУ :${currentClient?.edrpou}`;

  const localExecuterBoss = `${
    currentExecutor?.firstName_imen
  } ${currentExecutor?.lastName_imen?.toUpperCase()}`;

  const localClientBoss = `${
    currentClient?.firstName_imen
  } ${currentClient?.lastName_imen?.toUpperCase()}`;

  const executerBossLong = `${currentExecutor?.lastName_imen} ${currentExecutor?.firstName_imen} ${currentExecutor?.patronymic_imen}`;
  const clientBossLong = `${currentClient?.lastName_imen} ${currentClient?.firstName_imen} ${currentClient?.patronymic_imen}`;

  const localExecutorAddress = `Адреса: ${currentExecutor?.postIndex}, ${currentExecutor?.address}`;
  const localClientAddress = `Адреса: ${currentClient?.postIndex}, ${currentClient?.address}`;

  const localExecutorIBAN = `IBAN: ${currentExecutor?.iban}`;
  const localClientIBAN = `IBAN: ${currentClient?.iban}`;
  return (
    <div className={classes.page} id='page'>
      <TableContainer
        sx={{ margin: 0 }}
        id='table-rems-potochn-akt-musor-caption'
      >
        <Table
          padding='none'
          sx={{
            width: '100%',
            margin: 0,
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
                <Typography
                  variant='body2'
                  className={classes['rems-potochn-akt-musor-text']}
                  align='center'
                >
                  ВИКОНАВЕЦЬ
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '50%' }}>
                <Typography
                  variant='body2'
                  className={classes['rems-potochn-akt-musor-text']}
                  align='center'
                >
                  ЗАМОВНИК
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-potochn-akt-musor-text']}
                >
                  {localExecutor}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-potochn-akt-musor-text']}
                >
                  {localClient}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-potochn-akt-musor-text']}
                >
                  {localExecutorAddress}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-potochn-akt-musor-text']}
                >
                  {localClientAddress}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-potochn-akt-musor-text']}
                >
                  {localExecutorIBAN}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-potochn-akt-musor-text']}
                >
                  {localClientIBAN}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>
                <Typography
                  variant='body2'
                  className={classes['rems-potochn-akt-musor-text']}
                  align='center'
                  mt={2}
                >
                  АКТ виконаних робіт (послуг) № АВР – {aktRemsMusorNumber}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>
                <Typography
                  variant='body2'
                  className={classes['rems-potochn-akt-musor-text']}
                  align='center'
                  mb={2}
                >
                  Від « ___ » ________________ {aktRemsMusorDate} року
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-potochn-akt-musor-text']}
                >
                  Ми,що нижче підписалися, представник Замовника :
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-potochn-akt-musor-text']}
                >
                  {clientBossLong}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-potochn-akt-musor-text']}
                >
                  та представник Виконавця :
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-potochn-akt-musor-text']}
                >
                  {executerBossLong}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>
                <Typography
                  variant='body2'
                  className={classes['rems-potochn-akt-musor-text']}
                  mb={1}
                >
                  склали цей АКТ про те, що Виконавець належнім чином і в
                  повному обсязі виконав (надав), а Замовник прийняв роботи
                  (послуги):
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <TableContainer sx={{ margin: 0 }} id='table-rems-potochn-akt-musor-main'>
        <Table
          padding='none'
          sx={{
            width: '100%',
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
            {serviceWorks &&
              serviceWorks.length > 0 &&
              serviceWorks.map((item, rowIndex) => (
                <TableRow key={item.row_id}>
                  <TableCell align='center'>
                    <Typography variant='body2'>{rowIndex + 1}</Typography>
                  </TableCell>
                  <TableCell align='left' sx={{ paddingLeft: 1 }}>
                    <Typography variant='body2'>
                      {item.serviceWork} {item.extraInformation ?? ''}
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
            <TableRow>
              <TableCell align='center'>
                <Typography variant='body2'></Typography>
              </TableCell>
              <TableCell>
                <Typography variant='body2' pl={1}>
                  Разом робота
                </Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography variant='body2'></Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography variant='body2'></Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography variant='body2'></Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography variant='body2'>{localTotal}</Typography>
              </TableCell>
            </TableRow>
          </TableBody>
          <TableBody
            sx={{
              '& td,th': {
                border: '1px solid transparent',
              },
            }}
          >
            <TableRow>
              <TableCell align='center'>
                <Typography variant='body2'></Typography>
              </TableCell>
              <TableCell>
                <Typography variant='body2' pl={1} mt={2}>
                  Всього без ПДВ
                </Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography variant='body2'></Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography variant='body2'></Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography variant='body2'></Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography variant='body2' mt={2}>
                  {localTotal}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align='center'>
                <Typography variant='body2'></Typography>
              </TableCell>
              <TableCell>
                <Typography variant='body2' pl={1}>
                  ПДВ
                </Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography variant='body2'></Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography variant='body2'></Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography variant='body2'></Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography variant='body2'>0,00</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align='center'>
                <Typography variant='body2'></Typography>
              </TableCell>
              <TableCell>
                <Typography variant='body2' pl={1}>
                  Загальна сума без ПДВ
                </Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography variant='body2'></Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography variant='body2'></Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography variant='body2'></Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography variant='body2'>{localTotal}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={6}>
                <Typography variant='body2' mt={2}>
                  Загальна вартість виконаних робіт (послуг): ({sumPropis}), без
                  ПДВ.
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={6}>
                <Typography variant='body2' mb={2}>
                  Сторони одна до одної претензій не мають
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <TableContainer sx={{ margin: 0 }} id='table-rems-potochn-akt-musor-sign'>
        <Table
          padding='none'
          sx={{
            width: '100%',
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
                <Typography mb={2} variant='body2'>
                  ВИКОНАВЕЦЬ
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '50%' }}>
                <Typography variant='body2'>ЗАМОВНИК</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ width: '50%' }}>
                <Grid
                  container
                  direction={`row`}
                  sx={{ paddingRight: 2, paddingTop: 2 }}
                >
                  <Grid
                    item
                    sx={{ borderBottom: '1px solid black', flex: 1 }}
                  ></Grid>
                  <Grid item>
                    <Typography variant='body1' align='right'>
                      {localExecuterBoss}
                    </Typography>
                  </Grid>
                </Grid>
              </TableCell>
              <TableCell sx={{ width: '50%' }}>
                <Grid
                  container
                  direction={`row`}
                  sx={{ paddingRight: 2, paddingTop: 2 }}
                >
                  <Grid
                    item
                    sx={{ borderBottom: '1px solid black', flex: 1 }}
                  ></Grid>
                  <Grid item>
                    <Typography variant='body1' align='right'>
                      {localClientBoss}
                    </Typography>
                  </Grid>
                </Grid>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ width: '50%' }}>
                <Typography variant='body2'>МП</Typography>
              </TableCell>
              <TableCell sx={{ width: '50%' }}>
                <Typography variant='body2'>МП</Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
