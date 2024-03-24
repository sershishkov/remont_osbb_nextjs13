import React from 'react';
import { I_Contract, I_Client } from '@/interfaces/refdata';

import Typography from '@mui/material/Typography';

import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import classes from '../styles.module.scss';

export default function RemsBudjetVihidnyDannieToPrint({
  currentContract,
  currentClient,
}: Readonly<{
  currentContract: I_Contract;
  currentClient: I_Client;
}>) {
  const avtorskSumBudjet = currentContract?.avtorskSumBudjet;
  const salaryLevel_3_8 = currentContract?.salaryLevel_3_8;
  const planPributokSum = currentContract?.planPributokSum;
  const adminVytratySum = currentContract?.adminVytratySum;
  const salaryOneDaySum = currentContract?.salaryOneDaySum;

  const contractDescription = currentContract?.contractDescription;

  const clientFIOImen = `${
    currentClient?.firstName_imen
  } ${currentClient?.lastName_imen?.toLocaleUpperCase()}`;

  const clientJobTitleimen = currentClient?.jobTitle;
  return (
    <div className={classes.page} id='page'>
      <Typography
        variant='body2'
        className={classes['rems-budj-zavdannya-main']}
        mt={2}
      >
        ВИХІДНІ ДАНІ ДЛЯ СКЛАДАННЯ КОШТОРИСНОЇ ДОКУМЕНТАЦІЇ
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budj-zavdannya-main']}
        mb={2}
      >
        Замовник: КП «Запоріжремсервіс» ЗМР
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budj-zavdannya-main']}
        mb={2}
      >
        Найменування робочого проекту: « {contractDescription} »
      </Typography>

      <TableContainer id='rems-budj-vihidny-page-1'>
        <Table
          padding='none'
          sx={{
            width: '100%',
            marginBottom: 1,
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
              <TableCell sx={{ width: '12mm' }}>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-zavdannya-main']}
                  align='center'
                >
                  № з/п
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-zavdannya-main']}
                  align='center'
                >
                  ПИТАННЯ
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '50mm' }}>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-zavdannya-main']}
                  align='center'
                >
                  ВІДПОВІДІ
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-zavdannya-main']}
                  align='center'
                >
                  1
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-zavdannya-main']}
                >
                  Характеристика будівництва:
                </Typography>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-zavdannya-main']}
                  pl={2}
                >
                  - Нове будівництво
                </Typography>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-zavdannya-main']}
                  pl={2}
                >
                  - Реконструкція і технічне переоснащення
                </Typography>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-zavdannya-main']}
                  pl={2}
                >
                  - Капітальний ремонт
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-zavdannya-main']}
                  align='center'
                >
                  Капітальний ремонт
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-zavdannya-main']}
                  align='center'
                >
                  2
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-zavdannya-main']}
                >
                  Стадійність проектування
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-zavdannya-main']}
                  align='center'
                >
                  Робочий проект
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-zavdannya-main']}
                  align='center'
                >
                  3
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-zavdannya-main']}
                >
                  Спосіб виконання робіт:
                </Typography>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-zavdannya-main']}
                  pl={2}
                >
                  - Підрядний
                </Typography>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-zavdannya-main']}
                  pl={2}
                >
                  - Госпспосіб
                </Typography>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-zavdannya-main']}
                  pl={2}
                >
                  - Чи планується прибуток від будівельної діяльності
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-zavdannya-empty']}
                  align='center'
                >
                  777
                </Typography>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-zavdannya-main']}
                  align='center'
                >
                  Підрядний
                </Typography>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-zavdannya-empty']}
                  align='center'
                >
                  777
                </Typography>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-zavdannya-main']}
                  align='center'
                >
                  {planPributokSum?.toFixed(2)} грн/люд-год
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-zavdannya-main']}
                  align='center'
                >
                  4
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-zavdannya-main']}
                >
                  Адміністративні витрати
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-zavdannya-main']}
                  align='center'
                >
                  {adminVytratySum?.toFixed(2)} грн/люд-год
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-zavdannya-main']}
                  align='center'
                >
                  5
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-zavdannya-main']}
                >
                  Умови виконання робі, передбачені проектом
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-zavdannya-main']}
                  align='center'
                >
                  Звичайні
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-zavdannya-main']}
                  align='center'
                >
                  6
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-zavdannya-main']}
                >
                  Відстань перевезення будівельних матеріалів, виробів
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-zavdannya-main']}
                  align='center'
                >
                  -
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-zavdannya-main']}
                  align='center'
                >
                  7
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-zavdannya-main']}
                >
                  Відстань перевезення рослинного ґрунту
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-zavdannya-main']}
                  align='center'
                >
                  -
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-zavdannya-main']}
                  align='center'
                >
                  8
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-zavdannya-main']}
                >
                  Відстань перевезення будівельного сміття
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-zavdannya-main']}
                  align='center'
                >
                  -
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-zavdannya-main']}
                  align='center'
                >
                  9
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-zavdannya-main']}
                >
                  Ціни на матеріально-технічні ресурси
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-zavdannya-main']}
                  align='center'
                >
                  Згідно відомості ресурсів
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-zavdannya-main']}
                  align='center'
                >
                  10
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-zavdannya-main']}
                >
                  Середньомісячна заробітна плата, що відповідає середньому
                  розряду складності робіт – 3,8
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-zavdannya-main']}
                  align='center'
                >
                  {salaryLevel_3_8?.toFixed(2)}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-zavdannya-main']}
                  align='center'
                >
                  11
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-zavdannya-main']}
                >
                  Витрати на страхування ризиків (замовника, підрядника)
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-zavdannya-main']}
                  align='center'
                >
                  Не передбачені
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-zavdannya-main']}
                  align='center'
                >
                  12
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-zavdannya-main']}
                >
                  Формування страхового фонду документації України
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-zavdannya-main']}
                  align='center'
                >
                  Не передбачені
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-zavdannya-main']}
                  align='center'
                >
                  13
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-zavdannya-main']}
                >
                  Витрати на авторський нагляд
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-zavdannya-main']}
                  align='center'
                >
                  {salaryOneDaySum?.toFixed(2)} грн/день
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-zavdannya-main']}
                  align='center'
                >
                  14
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-zavdannya-main']}
                >
                  Витрати на інфляційні процеси
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-zavdannya-main']}
                  align='center'
                >
                  Не передбачені
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-zavdannya-main']}
                  align='center'
                >
                  15
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-zavdannya-main']}
                >
                  Витрати на зведення та розбирання тимчасових будівель та
                  споруд
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-zavdannya-main']}
                  align='center'
                >
                  Не передбачені
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-zavdannya-main']}
                  align='center'
                >
                  16
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-zavdannya-main']}
                >
                  Витрати на виконання робіт у літній період
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-zavdannya-main']}
                  align='center'
                >
                  Не передбачені
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-zavdannya-main']}
                  align='center'
                >
                  17
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-zavdannya-main']}
                >
                  Витрати на експертизу
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-zavdannya-main']}
                  align='center'
                >
                  Згідно договору
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-zavdannya-main']}
                  align='center'
                >
                  18
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-zavdannya-main']}
                >
                  Витрати на утримання служби замовника (включаючи витрати на
                  технічний нагляд)
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-zavdannya-main']}
                  align='center'
                >
                  1,5% (технічний нагляд)
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-zavdannya-main']}
                  align='center'
                >
                  19
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-zavdannya-main']}
                >
                  Витрати на виготовлення проектно-кошторисної документації
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-zavdannya-main']}
                  align='center'
                >
                  {avtorskSumBudjet?.toFixed(2)} грн без ПДВ
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-zavdannya-main']}
                  align='center'
                >
                  20
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-zavdannya-main']}
                >
                  Витрати на проведення процедури закупівлі
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-zavdannya-main']}
                  align='center'
                >
                  Не передбачені
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <TableContainer id='rems-budj-zavdannya-sign' sx={{ marginTop: '3rem' }}>
        <Table
          padding='none'
          sx={{
            width: '100%',
            marginBottom: 1,
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
                  className={classes['rems-budj-zavdannya-main']}
                  align='left'
                >
                  {clientJobTitleimen}
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '50%' }}>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-zavdannya-main']}
                  align='right'
                >
                  {clientFIOImen}
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
