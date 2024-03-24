import React from 'react';
import { I_Contract, I_Client } from '@/interfaces/refdata';

import Typography from '@mui/material/Typography';

import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import classes from '../styles.module.scss';

export default function RemsBudjetZavdannyaToPrint({
  currentContract,
  currentExecutor,
  currentClient,
}: Readonly<{
  currentContract: I_Contract;
  currentExecutor: I_Client;
  currentClient: I_Client;
}>) {
  //@ts-ignore
  const executorTypeShort = currentExecutor?.firmType?.firmTypeShortName;
  const executorName = currentExecutor?.clientShortName?.toLocaleUpperCase();
  const proectnSumBudjet = currentContract?.proectnSumBudjet;
  const avtorskSumBudjet = currentContract?.avtorskSumBudjet;
  const salaryLevel_3_8 = currentContract?.salaryLevel_3_8;

  const contractDescription = currentContract?.contractDescription;

  const workAddress = currentContract?.workAddress;

  const executorFIOImen = `${
    currentExecutor?.firstName_imen
  } ${currentExecutor?.lastName_imen?.toLocaleUpperCase()}`;
  const clientFIOImen = `${
    currentClient?.firstName_imen
  } ${currentClient?.lastName_imen?.toLocaleUpperCase()}`;
  const executorJobTitleimen = currentExecutor?.jobTitle;
  const clientJobTitleimen = currentClient?.jobTitle;

  return (
    <div className={classes.page} id='page'>
      <Typography
        variant='body2'
        className={classes['rems-budj-zavdannya-main']}
        align='right'
      >
        ЗАТВЕРДЖУЮ
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budj-zavdannya-main']}
        align='right'
      >
        {clientJobTitleimen} КП «Запоріжремсервіс» ЗМР
      </Typography>
      <Typography
        mt={3}
        mb={3}
        variant='body2'
        className={classes['rems-budj-zavdannya-main']}
        align='right'
      >
        _____________________{clientFIOImen}
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budj-zavdannya-main']}
        align='center'
      >
        Завдання на проектування
      </Typography>
      <TableContainer id='rems-budj-zavdannya-page-1'>
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
              <TableCell sx={{ width: '50mm' }}>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-zavdannya-main']}
                  align='center'
                >
                  Перелік основних даних та вимог
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-zavdannya-main']}
                  align='center'
                >
                  Основні дані вимоги
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
                  Назва об’єкта
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-zavdannya-main']}
                >
                  « {contractDescription} »
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
                  Місцезнаходження об’єкта
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-zavdannya-main']}
                >
                  {workAddress}
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
                  Підстава на проектування
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-zavdannya-main']}
                >
                  Титульний список об&apos;єктів капітального ремонту житлового
                  фонду Запорізької міської ради на 2022 рік.
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
                  Відомості про замовника
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-zavdannya-main']}
                >
                  КП «Запоріжремсервіс» ЗМР
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
                  Стадійність проектування
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-zavdannya-main']}
                >
                  Кошторисна документація
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
                  Інженерні дослідження
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-zavdannya-main']}
                >
                  Не потрібно
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
                  Попереднє узгодження проектних рішень із зацікавленими
                  відомствами, організаціями і службами
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-zavdannya-main']}
                >
                  Згідно діючого законодавства України
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
                  Проектна організація
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-zavdannya-main']}
                >
                  {executorTypeShort} « {executorName} »
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
                  Обсяг проектних робіт. вимоги до складання.
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-zavdannya-main']}
                >
                  Кошторисна документація, розрахунок класу наслідків
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
                  Вимоги до режиму безпеки та охорони праці
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-zavdannya-main']}
                >
                  Прийняті в проекті заходи повинні забезпечувати безпеку і
                  охорону праці відповідно до діючих норм і правил.
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
                  Термін виконання проекту
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-zavdannya-main']}
                >
                  протягом 30 днів з дня укладення договору
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
                  Додаткові вимоги
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-zavdannya-main']}
                >
                  У складі кошторисної частини передбачити кошти на здійснення
                  технічного нагляду – 1,5%; врахувати вартість проектних робіт
                  в сумі {proectnSumBudjet?.toFixed(2)} грн та здійснення
                  авторського нагляду в сумі {avtorskSumBudjet?.toFixed(2)} грн,
                  прийняти рівень середньомісячної зарплати для розряду 3,8 –
                  {salaryLevel_3_8?.toFixed(2)} грн
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
                  {executorJobTitleimen} {executorTypeShort} «{executorName}»
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '50%' }}>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-zavdannya-main']}
                  align='right'
                >
                  {executorFIOImen}
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
