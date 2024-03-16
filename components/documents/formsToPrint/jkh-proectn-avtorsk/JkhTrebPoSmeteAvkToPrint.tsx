import React from 'react';
import {
  I_Contract,
  I_Client,
  I_WorkRows,
  I_LProduct,
} from '@/interfaces/refdata';

import Typography from '@mui/material/Typography';

import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import classes from '../styles.module.scss';

export default function JkhTrebPoSmeteAvkToPrint({
  currentContract,
  currentClient,
  currentExecutor,
  tableAktRows,
  tableNaklRows,
}: Readonly<{
  currentContract: I_Contract;
  currentClient: I_Client;
  currentExecutor: I_Client;
  tableAktRows: I_WorkRows[];
  tableNaklRows: I_LProduct[];
}>) {
  const contractDescription = currentContract?.contractDescription;
  const zvedeniySumBudjet = currentContract?.zvedeniySumBudjet;
  const dogovornayaSumBudjet = currentContract?.dogovornayaSumBudjet;
  const paymentSourceProectnAvt = currentContract?.paymentSourceProectnAvt;

  const totalSum =
    paymentSourceProectnAvt === 'собств'
      ? dogovornayaSumBudjet
      : zvedeniySumBudjet;

  const paymentSourceStr =
    paymentSourceProectnAvt === 'собств' ? `СОБСТВЕННЫХ` : `БЮДЖЕТНЫХ`;

  const howToDoCalc =
    paymentSourceProectnAvt === 'собств'
      ? `В договорной цене указываем ${totalSum}грн, а в Зведенный кошторис будет больше на сумму проэктных авторских и технадзор`
      : `Сумма по зведенному кошторисе состаавляет ${totalSum} грн а сумма в ДОГОВОРНОЙ ЦЕНЕ будет меньше на сумму проэктных авторских и технадзора`;
  const proectnSumBudjet = currentContract?.proectnSumBudjet;
  const avtorskSumBudjet = currentContract?.avtorskSumBudjet;
  const tehnadzorSumBudjet =
    totalSum <= 45000 && paymentSourceProectnAvt === 'собств'
      ? '675 грн'
      : '1.5%';

  //@ts-ignore
  const clientTypeShort = currentClient?.firmType?.firmTypeShortName;
  const clientName = currentClient?.clientShortName;
  const clientEDRPO = `ЄДРПОУ: ${currentClient?.edrpou}`;
  const clientJobTitleimen = currentClient?.jobTitle;
  const clientFIOImen = `${
    currentClient?.firstName_imen
  } ${currentClient?.lastName_imen?.toLocaleUpperCase()}`;

  //@ts-ignore
  const executorTypeShort = currentExecutor?.firmType?.firmTypeShortName;
  const executorName = currentExecutor?.clientShortName;
  const executorEDRPO = `ЄДРПОУ: ${currentExecutor?.edrpou}`;
  const executorJobTitleimen = currentExecutor?.jobTitle;
  const executorFIOImen = `${
    currentExecutor?.firstName_imen
  } ${currentExecutor?.lastName_imen?.toLocaleUpperCase()}`;
  return (
    <div className={classes.page} id='page'>
      <TableContainer id='table-jkh-budjet-header' sx={{ marginBottom: 2 }}>
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
              <TableCell sx={{ width: '40mm' }}>
                <Typography
                  variant='body1'
                  className={classes['jkh-trebov-smeta-text']}
                  align='center'
                >
                  Наименование объекта
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body1'
                  className={classes['jkh-trebov-smeta-text']}
                >
                  « {contractDescription} »
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body1'
                  className={classes['jkh-trebov-smeta-text']}
                  align='center'
                >
                  Сумма договора
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body1'
                  className={classes['jkh-trebov-smeta-text']}
                >
                  {totalSum} грн
                </Typography>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell rowSpan={4}>
                <Typography
                  variant='body1'
                  className={classes['jkh-trebov-smeta-text']}
                  align='center'
                >
                  Заказчик
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body1'
                  className={classes['jkh-trebov-smeta-text']}
                >
                  {clientTypeShort} « {clientName} »
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body1'
                  className={classes['jkh-trebov-smeta-text']}
                >
                  {clientEDRPO}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body1'
                  className={classes['jkh-trebov-smeta-text']}
                >
                  {clientJobTitleimen}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body1'
                  className={classes['jkh-trebov-smeta-text']}
                >
                  {clientFIOImen}
                </Typography>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell rowSpan={4}>
                <Typography
                  variant='body1'
                  className={classes['jkh-trebov-smeta-text']}
                  align='center'
                >
                  Подрядчик
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body1'
                  className={classes['jkh-trebov-smeta-text']}
                >
                  {executorTypeShort} « {executorName} »
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body1'
                  className={classes['jkh-trebov-smeta-text']}
                >
                  {executorEDRPO}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body1'
                  className={classes['jkh-trebov-smeta-text']}
                >
                  {executorJobTitleimen}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body1'
                  className={classes['jkh-trebov-smeta-text']}
                >
                  {executorFIOImen}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell rowSpan={7}>
                <Typography
                  variant='body1'
                  className={classes['jkh-trebov-smeta-text']}
                  align='center'
                >
                  Примечание
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body1'
                  className={classes['jkh-trebov-smeta-text']}
                >
                  Проэк. Работы,Авторский Надзор, тех. Надзор в смете
                  Оплачиваются из {paymentSourceStr} средств
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body1'
                  className={classes['jkh-trebov-smeta-text']}
                >
                  {howToDoCalc}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body1'
                  className={classes['jkh-trebov-smeta-text']}
                >
                  Проектные работы : {proectnSumBudjet}
                </Typography>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>
                <Typography
                  variant='body1'
                  className={classes['jkh-trebov-smeta-text']}
                >
                  Авторский надзор : {avtorskSumBudjet}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body1'
                  className={classes['jkh-trebov-smeta-text']}
                >
                  Технадзор : {tehnadzorSumBudjet}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body1'
                  className={classes['jkh-trebov-smeta-text']}
                >
                  цена ДИНАМИЧНА
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body1'
                  className={classes['jkh-trebov-smeta-text']}
                >
                  Смета без НДС.
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <TableContainer id='table-jkh-trebov-smeta-main'>
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
              <TableCell align='center'>
                <Typography
                  variant='body2'
                  className={classes['jkh-trebov-smeta-text']}
                >
                  Найменування
                </Typography>
              </TableCell>
              <TableCell align='center' sx={{ width: '20mm' }}>
                <Typography
                  variant='body2'
                  className={classes['jkh-trebov-smeta-text']}
                >
                  Од. Вимиру
                </Typography>
              </TableCell>
              <TableCell align='center' sx={{ width: '20mm' }}>
                <Typography
                  variant='body2'
                  className={classes['jkh-trebov-smeta-text']}
                >
                  Кількість
                </Typography>
              </TableCell>
            </TableRow>

            {tableAktRows && tableAktRows.length > 0 && (
              <>
                <TableRow>
                  <TableCell align='center' sx={{ paddingLeft: 1 }}>
                    <Typography
                      variant='body2'
                      className={classes['jkh-trebov-smeta-text']}
                    >
                      <strong>Робота</strong>
                    </Typography>
                  </TableCell>
                  <TableCell align='center'></TableCell>
                  <TableCell align='center'></TableCell>
                </TableRow>

                {tableAktRows &&
                  tableAktRows.length > 0 &&
                  tableAktRows.map((item) => (
                    <TableRow key={item.row_id}>
                      <TableCell align='left' sx={{ paddingLeft: 1 }}>
                        <Typography
                          variant='body2'
                          className={classes['jkh-trebov-smeta-text']}
                        >
                          {item.workName} {item.extraInformation ?? ''}
                        </Typography>
                      </TableCell>
                      <TableCell align='center'>
                        <Typography
                          variant='body2'
                          className={classes['jkh-trebov-smeta-text']}
                        >
                          {item.unit}
                        </Typography>
                      </TableCell>
                      <TableCell align='center'>
                        <Typography
                          variant='body2'
                          className={classes['jkh-trebov-smeta-text']}
                        >
                          {item.amount}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
              </>
            )}
            {tableNaklRows && tableNaklRows.length > 0 && (
              <>
                <TableRow>
                  <TableCell align='center' sx={{ paddingLeft: 1 }}>
                    <Typography
                      variant='body2'
                      className={classes['jkh-trebov-smeta-text']}
                    >
                      <strong>Будматеріал</strong>
                    </Typography>
                  </TableCell>
                  <TableCell align='center'>{` `}</TableCell>
                  <TableCell align='center'>{` `}</TableCell>
                </TableRow>

                {tableNaklRows &&
                  tableNaklRows.length > 0 &&
                  tableNaklRows.map((item) => (
                    <TableRow key={item.row_id}>
                      <TableCell align='left' sx={{ paddingLeft: 1 }}>
                        <Typography
                          variant='body2'
                          className={classes['jkh-trebov-smeta-text']}
                        >
                          {item.product} {item.extraInformation ?? ''}
                        </Typography>
                      </TableCell>
                      <TableCell align='center'>
                        <Typography
                          variant='body2'
                          className={classes['jkh-trebov-smeta-text']}
                        >
                          {item.unit}
                        </Typography>
                      </TableCell>
                      <TableCell align='center'>
                        <Typography
                          variant='body2'
                          className={classes['jkh-trebov-smeta-text']}
                        >
                          {item.amount}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
