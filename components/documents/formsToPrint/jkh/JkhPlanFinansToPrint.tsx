import React from 'react';
import { I_Contract, I_Client } from '@/interfaces/refdata';

import Typography from '@mui/material/Typography';

import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import classes from '../landscape_styles.module.scss';

export default function JkhPlanFinansToPrint({
  currentContract,
  currentClient,
  currentExecutor,
}: Readonly<{
  currentContract: I_Contract;
  currentClient: I_Client;
  currentExecutor: I_Client;
}>) {
  const contrNumber = currentContract?.contractNumber?.slice(0, 8);
  const contrDateStr = new Date(
    currentContract?.contractDate ?? ''
  ).toLocaleDateString('uk-UA', {
    year: 'numeric',
  });
  const nextYear = Number(contrDateStr) + 1;

  const totalSumFixed = currentContract?.dogovornayaSumBudjet?.toFixed(2);
  const contractDescription = currentContract?.contractDescription;
  const endMonthWorkBudjet = currentContract?.endMonthWorkBudjet;

  //@ts-ignore
  const clientTypeShort = currentClient?.firmType?.firmTypeShortName;
  const clientName = currentClient?.clientShortName;

  const clientJobTitleimen = currentClient?.jobTitle;

  const clientFIOImen = `${
    currentClient?.firstName_imen
  } ${currentClient?.lastName_imen?.toLocaleUpperCase()}`;

  const executorJobTitleimen = currentExecutor?.jobTitle;

  //@ts-ignore
  const executorTypeShort = currentExecutor?.firmType?.firmTypeShortName;
  const executorName = currentExecutor?.clientShortName;
  const executorFIOImen = `${
    currentExecutor?.firstName_imen
  } ${currentExecutor?.lastName_imen?.toLocaleUpperCase()}`;

  const widthCol_2 = '19mm';
  const widthCol_3 = '18mm';
  const widthCol_4 = '14mm';
  const widthCol_5 = '17mm';
  const widthCol_month = '14mm';
  return (
    <div className={classes['page-landscape']} id='page-landscape'>
      <TableContainer
        id='table-jkh-plan-finans-header'
        sx={{ marginBottom: 2 }}
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
              <TableCell sx={{ width: '50%' }}></TableCell>
              <TableCell sx={{ width: '50%' }}>
                <Typography
                  variant='body2'
                  className={classes['jkh-plan-finans-text']}
                  align='left'
                  pl={20}
                >
                  Додаток №____________
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ width: '50%' }}></TableCell>
              <TableCell sx={{ width: '50%' }}>
                <Typography
                  variant='body2'
                  className={classes['jkh-plan-finans-text']}
                  align='left'
                  pl={20}
                >
                  до договору підряду
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ width: '50%' }}>
                <Typography
                  variant='body2'
                  className={classes['jkh-plan-finans-text']}
                  align='left'
                >
                  <strong>Погоджено:</strong>
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '50%' }}>
                <Typography
                  variant='body2'
                  className={classes['jkh-plan-finans-text']}
                  align='left'
                  pl={20}
                >
                  № Б.{contrNumber} від «___» ________ 20__ року
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ width: '50%' }}>
                <Typography
                  variant='body2'
                  className={classes['jkh-plan-finans-text']}
                  align='left'
                >
                  Заступник директора департаменту з управління
                  житлово-комунальним господарством Запорізької міської ради
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '50%' }}></TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={2}>
                <Typography
                  variant='body2'
                  className={classes['jkh-plan-finans-text']}
                  align='left'
                  mt={2}
                >
                  _______________________Олена МАТКАЗІНА
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>
                <Typography
                  variant='body2'
                  className={classes['jkh-plan-finans-text']}
                  align='left'
                >
                  м.п.
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>
                <Typography
                  variant='body2'
                  className={classes['jkh-plan-finans-chapter']}
                  align='center'
                >
                  <strong> ПЛАН ФІНАНСУВАННЯ БУДІВНИЦТВА</strong>
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>
                <Typography
                  variant='body2'
                  className={classes['jkh-plan-finans-text']}
                  align='center'
                >
                  <strong> по об’єкту « {contractDescription} »</strong>
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>
                <Typography
                  variant='body2'
                  className={classes['jkh-plan-finans-text']}
                  align='center'
                >
                  <strong>
                    {' '}
                    за договором підряду № Б.{contrNumber} від «___»
                    _____________ 20__ року
                  </strong>
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>
                <Typography
                  variant='body2'
                  className={classes['jkh-plan-finans-text']}
                  align='center'
                >
                  Джерело фінансування: бюджет Запорізької міської
                  територіальної громади
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <TableContainer id='table-jkh-plan-finans-main' sx={{ marginBottom: 2 }}>
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
              <TableCell rowSpan={3}>
                <Typography
                  variant='body2'
                  className={classes['jkh-plan-finans-text']}
                  align='left'
                >
                  Напрями фінансування (види витрат)
                </Typography>
              </TableCell>
              <TableCell rowSpan={3} sx={{ width: widthCol_2 }}>
                <Typography
                  variant='body2'
                  className={classes['jkh-plan-finans-text']}
                  align='center'
                >
                  Всього за договором
                </Typography>
              </TableCell>
              <TableCell colSpan={15}>
                <Typography
                  variant='body2'
                  className={classes['jkh-plan-finans-text']}
                  align='center'
                >
                  За роками
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell rowSpan={2} sx={{ width: widthCol_3 }}>
                <Typography
                  variant='body2'
                  className={classes['jkh-plan-finans-text']}
                  align='center'
                >
                  {contrDateStr} р
                </Typography>
              </TableCell>
              <TableCell rowSpan={2} sx={{ width: widthCol_4 }}>
                <Typography
                  variant='body2'
                  className={classes['jkh-plan-finans-text']}
                  align='center'
                >
                  {nextYear} р
                </Typography>
              </TableCell>
              <TableCell rowSpan={2} sx={{ width: widthCol_5 }}>
                <Typography
                  variant='body2'
                  className={classes['jkh-plan-finans-text']}
                  align='center'
                >
                  {contrDateStr}р., всього
                </Typography>
              </TableCell>
              <TableCell colSpan={12}>
                <Typography
                  variant='body2'
                  className={classes['jkh-plan-finans-text']}
                  align='center'
                >
                  {contrDateStr} р. помісячно
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['jkh-plan-finans-month']}
                  align='center'
                  sx={{ width: widthCol_month }}
                >
                  січень
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['jkh-plan-finans-month']}
                  align='center'
                  sx={{ width: widthCol_month }}
                >
                  лютий
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['jkh-plan-finans-month']}
                  align='center'
                  sx={{ width: widthCol_month }}
                >
                  березень
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['jkh-plan-finans-month']}
                  align='center'
                  sx={{ width: widthCol_month }}
                >
                  квітень
                </Typography>
              </TableCell>

              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['jkh-plan-finans-month']}
                  align='center'
                  sx={{ width: widthCol_month }}
                >
                  травень
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['jkh-plan-finans-month']}
                  align='center'
                  sx={{ width: widthCol_month }}
                >
                  червень
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['jkh-plan-finans-month']}
                  align='center'
                  sx={{ width: widthCol_month }}
                >
                  липень
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['jkh-plan-finans-month']}
                  align='center'
                  sx={{ width: widthCol_month }}
                >
                  серпень
                </Typography>
              </TableCell>

              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['jkh-plan-finans-month']}
                  align='center'
                  sx={{ width: widthCol_month }}
                >
                  вересень
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['jkh-plan-finans-month']}
                  align='center'
                  sx={{ width: widthCol_month }}
                >
                  жовтень
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['jkh-plan-finans-month']}
                  align='center'
                  sx={{ width: widthCol_month }}
                >
                  листопад
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['jkh-plan-finans-month']}
                  align='center'
                  sx={{ width: widthCol_month }}
                >
                  грудень
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['jkh-plan-finans-text']}
                  align='left'
                >
                  Всього, у т.ч.:
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['jkh-plan-finans-month']}
                  align='center'
                >
                  {totalSumFixed}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['jkh-plan-finans-month']}
                  align='center'
                >
                  {totalSumFixed}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['jkh-plan-finans-month']}
                  align='center'
                >
                  0.00
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['jkh-plan-finans-month']}
                  align='center'
                >
                  {totalSumFixed}
                </Typography>
              </TableCell>

              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['jkh-plan-finans-month']}
                  align='center'
                >
                  {endMonthWorkBudjet === 'січень' ? totalSumFixed : '0.00'}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['jkh-plan-finans-month']}
                  align='center'
                >
                  {endMonthWorkBudjet === 'лютий' ? totalSumFixed : '0.00'}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['jkh-plan-finans-month']}
                  align='center'
                >
                  {endMonthWorkBudjet === 'березень' ? totalSumFixed : '0.00'}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['jkh-plan-finans-month']}
                  align='center'
                >
                  {endMonthWorkBudjet === 'квітень' ? totalSumFixed : '0.00'}
                </Typography>
              </TableCell>

              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['jkh-plan-finans-month']}
                  align='center'
                >
                  {endMonthWorkBudjet === 'травень' ? totalSumFixed : '0.00'}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['jkh-plan-finans-month']}
                  align='center'
                >
                  {endMonthWorkBudjet === 'червень' ? totalSumFixed : '0.00'}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['jkh-plan-finans-month']}
                  align='center'
                >
                  {endMonthWorkBudjet === 'липень' ? totalSumFixed : '0.00'}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['jkh-plan-finans-month']}
                  align='center'
                >
                  {endMonthWorkBudjet === 'серпень' ? totalSumFixed : '0.00'}
                </Typography>
              </TableCell>

              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['jkh-plan-finans-month']}
                  align='center'
                >
                  {endMonthWorkBudjet === 'вересень' ? totalSumFixed : '0.00'}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['jkh-plan-finans-month']}
                  align='center'
                >
                  {endMonthWorkBudjet === 'жовтень' ? totalSumFixed : '0.00'}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['jkh-plan-finans-month']}
                  align='center'
                >
                  {endMonthWorkBudjet === 'листопад' ? totalSumFixed : '0.00'}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['jkh-plan-finans-month']}
                  align='center'
                >
                  {endMonthWorkBudjet === 'грудень' ? totalSumFixed : '0.00'}
                </Typography>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['jkh-plan-finans-text']}
                  align='left'
                >
                  -витрати набудівельно-монтажні роботи
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['jkh-plan-finans-month']}
                  align='center'
                >
                  {totalSumFixed}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['jkh-plan-finans-month']}
                  align='center'
                >
                  {totalSumFixed}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['jkh-plan-finans-month']}
                  align='center'
                >
                  0.00
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['jkh-plan-finans-month']}
                  align='center'
                >
                  {totalSumFixed}
                </Typography>
              </TableCell>

              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['jkh-plan-finans-month']}
                  align='center'
                >
                  {endMonthWorkBudjet === 'січень' ? totalSumFixed : '0.00'}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['jkh-plan-finans-month']}
                  align='center'
                >
                  {endMonthWorkBudjet === 'лютий' ? totalSumFixed : '0.00'}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['jkh-plan-finans-month']}
                  align='center'
                >
                  {endMonthWorkBudjet === 'березень' ? totalSumFixed : '0.00'}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['jkh-plan-finans-month']}
                  align='center'
                >
                  {endMonthWorkBudjet === 'квітень' ? totalSumFixed : '0.00'}
                </Typography>
              </TableCell>

              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['jkh-plan-finans-month']}
                  align='center'
                >
                  {endMonthWorkBudjet === 'травень' ? totalSumFixed : '0.00'}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['jkh-plan-finans-month']}
                  align='center'
                >
                  {endMonthWorkBudjet === 'червень' ? totalSumFixed : '0.00'}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['jkh-plan-finans-month']}
                  align='center'
                >
                  {endMonthWorkBudjet === 'липень' ? totalSumFixed : '0.00'}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['jkh-plan-finans-month']}
                  align='center'
                >
                  {endMonthWorkBudjet === 'серпень' ? totalSumFixed : '0.00'}
                </Typography>
              </TableCell>

              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['jkh-plan-finans-month']}
                  align='center'
                >
                  {endMonthWorkBudjet === 'вересень' ? totalSumFixed : '0.00'}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['jkh-plan-finans-month']}
                  align='center'
                >
                  {endMonthWorkBudjet === 'жовтень' ? totalSumFixed : '0.00'}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['jkh-plan-finans-month']}
                  align='center'
                >
                  {endMonthWorkBudjet === 'листопад' ? totalSumFixed : '0.00'}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['jkh-plan-finans-month']}
                  align='center'
                >
                  {endMonthWorkBudjet === 'грудень' ? totalSumFixed : '0.00'}
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <TableContainer id='table-jkh-plan-finans-sign'>
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
                paddingRight: '2px',
              },
            }}
          >
            <TableRow>
              <TableCell sx={{ width: '50%' }}>
                <Typography
                  variant='body2'
                  className={classes['jkh-plan-finans-text']}
                  align='left'
                >
                  Підрядник:
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['jkh-plan-finans-text']}
                  align='left'
                >
                  Замовник:
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['jkh-plan-finans-text']}
                  align='left'
                >
                  {executorTypeShort} «{executorName}»{' '}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['jkh-plan-finans-text']}
                  align='left'
                >
                  {clientTypeShort} «{clientName}»{' '}
                </Typography>
              </TableCell>
            </TableRow>

            {(executorJobTitleimen !== '' || clientJobTitleimen !== '') && (
              <TableRow>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['jkh-plan-finans-text']}
                    mb={2}
                    align='left'
                  >
                    {executorJobTitleimen}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['jkh-plan-finans-text']}
                    mb={2}
                    align='left'
                  >
                    {clientJobTitleimen}
                  </Typography>
                </TableCell>
              </TableRow>
            )}

            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['jkh-plan-finans-text']}
                  align='left'
                >
                  _________________________{executorFIOImen}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['jkh-plan-finans-text']}
                  align='left'
                >
                  _________________________{clientFIOImen}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['jkh-plan-finans-text']}
                  align='left'
                >
                  м.п.
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['jkh-plan-finans-text']}
                  align='left'
                >
                  м.п.
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
