import React from 'react';
import { I_Contract, I_Client } from '@/interfaces/refdata';
import { FloatToSamplesInWordsUkr } from '@/lib/helpers/myPropisUkr';

import Typography from '@mui/material/Typography';

import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Grid from '@mui/material/Grid';

import classes from '../styles.module.scss';

export default function RemsBudjetPrAndAvtAktToPrint({
  currentContract,
  currentClient,
  currentExecutor,
}: Readonly<{
  currentContract: I_Contract;
  currentClient: I_Client;
  currentExecutor: I_Client;
}>) {
  const contrDateStr = new Date(
    currentContract?.contractDate!
  ).toLocaleDateString('uk-UA', {
    year: 'numeric',
  });
  const contractDescription = currentContract?.contractDescription;

  const clientJobTitleimen = currentClient?.jobTitle;

  const clientFIOImen = `${
    currentClient?.firstName_imen
  } ${currentClient?.lastName_imen?.toLocaleUpperCase()}`;

  const clientAddres = `${currentClient?.postIndex}, ${currentClient?.address}`;

  const clientIBAN = currentClient?.iban;
  const clientEDRPO = `ЄДРПОУ: ${currentClient?.edrpou}`;

  //@ts-ignore
  const executorTypeShort = currentExecutor?.firmType?.firmTypeShortName;
  const executorName = currentExecutor?.clientShortName;

  const executorJobTitleimen = currentExecutor?.jobTitle;
  const executorFIOImen = `${
    currentExecutor?.firstName_imen
  } ${currentExecutor?.lastName_imen?.toLocaleUpperCase()}`;

  const executorAddres = `${currentExecutor?.postIndex}, ${currentExecutor?.address}`;
  const executorIBAN = currentExecutor?.iban;
  const executorEDRPO = `ЄДРПОУ: ${currentExecutor?.edrpou}`;

  const proectnSumBudjet = currentContract?.proectnSumBudjet;
  const avtorskSumBudjet = currentContract?.avtorskSumBudjet;
  const expertizaSumBudjet = currentContract?.expertizaSumBudjet;
  const expertizaSumBudjetwithoutPDV = expertizaSumBudjet / 1.2;

  const expertizaSumBudjetPDV = expertizaSumBudjet / 6;

  const totalContractSum =
    proectnSumBudjet + avtorskSumBudjet + expertizaSumBudjet;

  const [totalContractSumGrn, totalContractSumKop] =
    totalContractSum > 0
      ? totalContractSum.toFixed(2).split('.')
      : '0.00'.split('.');

  const [expertizaSumPDVSumGrn, expertizaSumPDVSumKop] =
    expertizaSumBudjetPDV > 0
      ? expertizaSumBudjetPDV.toFixed(2).split('.')
      : '0.00'.split('.');
  const totalContractSumPropis = FloatToSamplesInWordsUkr(totalContractSum);

  return (
    <div className={classes.page} id='page'>
      <TableContainer id='table-rems-budjet-pr-avt-akt-header'>
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
                  className={classes['rems-budjet-pr-avt-akt-text']}
                >
                  ЗАТВЕРДЖУЮ
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '50%' }}>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-pr-avt-akt-text']}
                >
                  ЗАТВЕРДЖУЮ
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-pr-avt-akt-text']}
                >
                  {executorJobTitleimen}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-pr-avt-akt-text']}
                >
                  {clientJobTitleimen}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-pr-avt-akt-text']}
                >
                  {executorTypeShort} « {executorName} »
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-pr-avt-akt-text']}
                >
                  КП «Запоріжремсервіс» ЗМР
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ width: '50%' }}>
                <Grid container direction={`row`}>
                  <Grid
                    item
                    sx={{ flex: 1, borderBottom: '1px solid black' }}
                  ></Grid>
                  <Grid item>
                    <Typography
                      variant='body2'
                      pr={1}
                      className={classes['rems-budjet-pr-avt-akt-text']}
                    >
                      {executorFIOImen}{' '}
                    </Typography>
                  </Grid>
                </Grid>
              </TableCell>
              <TableCell sx={{ width: '50%' }}>
                <Grid container direction={`row`}>
                  <Grid
                    item
                    sx={{ flex: 1, borderBottom: '1px solid black' }}
                  ></Grid>
                  <Grid item>
                    <Typography
                      variant='body2'
                      pr={1}
                      className={classes['rems-budjet-pr-avt-akt-text']}
                    >
                      {clientFIOImen}
                    </Typography>
                  </Grid>
                </Grid>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-pr-avt-akt-text']}
                  align='center'
                  mt={2}
                >
                  АКТ здачі-прийняття виконаних робіт (надання послуг) №
                  ____________
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-pr-avt-akt-text']}
                  align='center'
                  mb={2}
                >
                  За________________________{contrDateStr} року
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-pr-avt-akt-text']}
                >
                  м.Запоріжжя
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-pr-avt-akt-text']}
                  mb={2}
                >
                  Ми, представники Замовника {clientJobTitleimen} КП
                  «Запоріжремсервіс» ЗМР {clientFIOImen}, з одного боку, та
                  представник Виконавця {executorTypeShort} «{executorName}»{' '}
                  {executorFIOImen} , з іншого боку, склали даний акт про те, що
                  Виконавцем були проведені такі роботи (надані такі послуги)
                  згідно договору № ______________ від _____________ р. по
                  об’єкту « {contractDescription} »
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <TableContainer id='rems-budjet-pr-avt-akt-main' sx={{ marginBottom: 2 }}>
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
                border: '1px solid black',
              },
            }}
          >
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-pr-avt-akt-text']}
                >
                  Найменування роботи
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '28mm' }}>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-pr-avt-akt-text']}
                  align='center'
                >
                  Кількість
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '28mm' }}>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-pr-avt-akt-text']}
                  align='center'
                >
                  Всього , грн
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '28mm' }}>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-pr-avt-akt-text']}
                  align='center'
                >
                  ПДВ
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '28mm' }}>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-pr-avt-akt-text']}
                  align='center'
                >
                  Податок
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '28mm' }}>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-pr-avt-akt-text']}
                  align='center'
                >
                  Разом, грн
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-pr-avt-akt-text']}
                >
                  Проектні роботи
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-pr-avt-akt-text']}
                  align='center'
                >
                  1 посл.
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-pr-avt-akt-text']}
                  align='center'
                >
                  {proectnSumBudjet?.toFixed(2)}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-pr-avt-akt-text']}
                  align='center'
                >
                  -
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-pr-avt-akt-text']}
                  align='center'
                >
                  -
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-pr-avt-akt-text']}
                  align='center'
                >
                  {proectnSumBudjet?.toFixed(2)}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-pr-avt-akt-text']}
                >
                  Роботи з авторського нагляду
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-pr-avt-akt-text']}
                  align='center'
                >
                  1 посл.
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-pr-avt-akt-text']}
                  align='center'
                >
                  {avtorskSumBudjet?.toFixed(2)}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-pr-avt-akt-text']}
                  align='center'
                >
                  -
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-pr-avt-akt-text']}
                  align='center'
                >
                  -
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-pr-avt-akt-text']}
                  align='center'
                >
                  {avtorskSumBudjet?.toFixed(2)}
                </Typography>
              </TableCell>
            </TableRow>
            {expertizaSumBudjet > 0 && (
              <TableRow>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['rems-budjet-pr-avt-akt-text']}
                  >
                    Проходження експертизи
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['rems-budjet-pr-avt-akt-text']}
                    align='center'
                  >
                    1 посл.
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['rems-budjet-pr-avt-akt-text']}
                    align='center'
                  >
                    {expertizaSumBudjetwithoutPDV?.toFixed(2)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['rems-budjet-pr-avt-akt-text']}
                    align='center'
                  >
                    {expertizaSumBudjetPDV?.toFixed(2)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['rems-budjet-pr-avt-akt-text']}
                    align='center'
                  >
                    {' '}
                    -{' '}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['rems-budjet-pr-avt-akt-text']}
                    align='center'
                  >
                    {expertizaSumBudjet?.toFixed(2)}
                  </Typography>
                </TableCell>
              </TableRow>
            )}

            <TableRow>
              <TableCell colSpan={5}>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-pr-avt-akt-text']}
                >
                  Всього вартість послуг, грн
                </Typography>
              </TableCell>

              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-pr-avt-akt-text']}
                  align='center'
                >
                  {totalContractSum?.toFixed(2)}
                </Typography>
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
              <TableCell colSpan={6}>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-pr-avt-akt-text']}
                  mt={2}
                >
                  Загальна вартість виконаних робіт (послуг) становить{' '}
                  {totalContractSumGrn} грн. {totalContractSumKop} коп. ({' '}
                  {totalContractSumPropis}){' '}
                  {expertizaSumBudjetPDV > 0
                    ? `у тому числі
                  ПДВ ${expertizaSumPDVSumGrn} грн.${expertizaSumPDVSumKop} коп`
                    : `без ПДВ.`}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={6}>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-pr-avt-akt-text']}
                >
                  Сторони претензій одна до одної не мають.
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <TableContainer id='table-rems-budjet-pr-avt-akt-sign'>
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
                  className={classes['rems-budjet-pr-avt-akt-text']}
                  mb={2}
                >
                  {clientJobTitleimen}
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '50%' }}>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-pr-avt-akt-text']}
                  mb={2}
                >
                  {executorJobTitleimen}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ width: '50%' }}>
                <Grid container direction={`row`}>
                  <Grid
                    item
                    sx={{ flex: 1, borderBottom: '1px solid black' }}
                  ></Grid>
                  <Grid item>
                    <Typography
                      variant='body2'
                      pr={1}
                      className={classes['rems-budjet-pr-avt-akt-text']}
                    >
                      {executorFIOImen}{' '}
                    </Typography>
                  </Grid>
                </Grid>
              </TableCell>
              <TableCell sx={{ width: '50%' }}>
                <Grid container direction={`row`}>
                  <Grid
                    item
                    sx={{ flex: 1, borderBottom: '1px solid black' }}
                  ></Grid>
                  <Grid item>
                    <Typography
                      variant='body2'
                      pr={1}
                      className={classes['rems-budjet-pr-avt-akt-text']}
                    >
                      {clientFIOImen}
                    </Typography>
                  </Grid>
                </Grid>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-pr-avt-akt-text']}
                  mt={2}
                  pr={1}
                >
                  <strong>
                    {executorTypeShort} «{executorName}»
                  </strong>
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-pr-avt-akt-text']}
                  mt={2}
                  pr={1}
                >
                  <strong>КП «Запоріжремсервіс» ЗМР</strong>{' '}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-pr-avt-akt-text']}
                  pr={1}
                >
                  {executorAddres}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-pr-avt-akt-text']}
                  pr={1}
                >
                  {clientAddres}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-pr-avt-akt-text']}
                  pr={1}
                >
                  {executorIBAN}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-pr-avt-akt-text']}
                  pr={1}
                >
                  {clientIBAN}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-pr-avt-akt-text']}
                  pr={1}
                >
                  {executorEDRPO}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-pr-avt-akt-text']}
                  pr={1}
                >
                  {clientEDRPO}
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
