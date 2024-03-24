import React from 'react';
import { I_Contract, I_Client } from '@/interfaces/refdata';

import Typography from '@mui/material/Typography';

import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import classes from '../styles.module.scss';

export default function RemsBudjetJurnalAvtorskToPrint({
  currentContract,
  currentExecutor,
  currentClient,
}: Readonly<{
  currentContract: I_Contract;
  currentExecutor: I_Client;
  currentClient: I_Client;
}>) {
  const contrDateStr = new Date(
    currentContract?.contractDate!
  ).toLocaleDateString('uk-UA', {
    year: 'numeric',
  });

  const nakazDateStr = new Date(
    currentContract?.contractDate!
  ).toLocaleDateString('uk-UA', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  //@ts-ignore
  const executorTypeShort = currentExecutor?.firmType?.firmTypeShortName;
  const executorName = currentExecutor?.clientShortName;
  const jurnalAvtoskiyNumber = currentContract?.jurnalAvtoskiyNumber;
  const prikazGipNumber = currentContract?.prikazGipNumber;
  const contractDescription = currentContract?.contractDescription;
  const servWorkShortForJournal =
    currentContract?.servWorkShortForJournal ?? '?????';
  const workAddress = currentContract?.workAddress;
  const executorAddress = `${currentExecutor?.postIndex} ${currentExecutor?.address}`;
  const executorEDRPO = currentExecutor?.edrpou;

  const executorFIOImen = `${
    currentExecutor?.firstName_imen
  } ${currentExecutor?.lastName_imen?.toLocaleUpperCase()}`;
  const clientFIOImen = `${
    currentClient?.firstName_imen
  } ${currentClient?.lastName_imen?.toLocaleUpperCase()}`;
  const executorJobTitleimen = currentExecutor?.jobTitle;
  const clientJobTitleimen = currentClient?.jobTitle;

  const alphabet =
    'abcdefghijklmnopqrstuvwxyzабвгдеёжзийклмнопрстуфхцчшщъыьэюя'.split('');
  return (
    <div className={classes.page} id='page'>
      <TableContainer id='rems-budj-jurnal-avt-page-1'>
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
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-avt-main']}
                  align='right'
                >
                  ДСТУ-Н Б А.2.2-11:2014
                </Typography>
              </TableCell>
            </TableRow>
            {alphabet.slice(0, 14).map((item) => (
              <TableRow key={item}>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['rems-budj-jurnal-avt-empty']}
                  >
                    7
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-avt-main']}
                  align='center'
                >
                  ЖУРНАЛ № {jurnalAvtoskiyNumber}
                </Typography>
              </TableCell>
            </TableRow>
            {alphabet.slice(0, 2).map((item) => (
              <TableRow key={item}>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['rems-budj-jurnal-avt-empty']}
                  >
                    7
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-avt-main']}
                  align='center'
                >
                  авторського нагляду за будівництвом
                </Typography>
              </TableCell>
            </TableRow>
            {alphabet.slice(0, 10).map((item) => (
              <TableRow key={item}>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['rems-budj-jurnal-avt-empty']}
                  >
                    7
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-avt-main']}
                  align='right'
                >
                  початий: ______ {contrDateStr} р
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-avt-main']}
                  align='right'
                >
                  закінчений: ______ {contrDateStr} р.
                </Typography>
              </TableCell>
            </TableRow>
            {alphabet.slice(0, 12).map((item) => (
              <TableRow key={item}>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['rems-budj-jurnal-avt-empty']}
                  >
                    7
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-avt-main']}
                  align='center'
                >
                  м. Запоріжжя
                </Typography>
              </TableCell>
            </TableRow>
            {alphabet.slice(0, 5).map((item) => (
              <TableRow key={item}>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['rems-budj-jurnal-avt-empty']}
                  >
                    7
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TableContainer id='rems-budj-jurnal-avt-page-2'>
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
              <TableCell colSpan={4}>
                <Typography
                  mb={5}
                  variant='body2'
                  className={classes['rems-budj-jurnal-avt-main']}
                  align='right'
                >
                  ДСТУ-Н Б А.2.2-11:2014
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={4}>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-avt-main']}
                  align='center'
                >
                  Журнал авторського нагляду за будівництвом
                </Typography>
              </TableCell>
            </TableRow>
            {alphabet.slice(0, 1).map((item) => (
              <TableRow key={item}>
                <TableCell colSpan={4}>
                  <Typography
                    variant='body2'
                    className={classes['rems-budj-jurnal-avt-empty']}
                  >
                    7
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={4}>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-avt-main']}
                >
                  Найменування об’єкту будівництва: « {contractDescription} »
                </Typography>
              </TableCell>
            </TableRow>
            {alphabet.slice(0, 1).map((item) => (
              <TableRow key={item}>
                <TableCell colSpan={4}>
                  <Typography
                    variant='body2'
                    className={classes['rems-budj-jurnal-avt-empty']}
                  >
                    7
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={4}>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-avt-main']}
                >
                  Адреса будівництва: {workAddress}
                </Typography>
              </TableCell>
            </TableRow>
            {alphabet.slice(0, 1).map((item) => (
              <TableRow key={item}>
                <TableCell colSpan={4}>
                  <Typography
                    variant='body2'
                    className={classes['rems-budj-jurnal-avt-empty']}
                  >
                    7
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={4}>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-avt-main']}
                >
                  Замовник: Комунальне підприємство «Запоріжремсервіс»
                  Запорізької міської ради
                </Typography>
              </TableCell>
            </TableRow>
            {alphabet.slice(0, 1).map((item) => (
              <TableRow key={item}>
                <TableCell colSpan={4}>
                  <Typography
                    variant='body2'
                    className={classes['rems-budj-jurnal-avt-empty']}
                  >
                    7
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={4}>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-avt-main']}
                >
                  Проектувальник: {executorTypeShort} « {executorName} »
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={4}>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-avt-main']}
                >
                  Адреса: {executorAddress}, ЄДРПОУ: {executorEDRPO}
                </Typography>
              </TableCell>
            </TableRow>
            {alphabet.slice(0, 4).map((item) => (
              <TableRow key={item}>
                <TableCell colSpan={4}>
                  <Typography
                    variant='body2'
                    className={classes['rems-budj-jurnal-avt-empty']}
                  >
                    7
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={4}>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-avt-main']}
                  align='left'
                >
                  Журнал розпочато: __________ {contrDateStr} р.
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={4}>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-avt-main']}
                  align='left'
                >
                  Журнал закінчений: __________ {contrDateStr} р.
                </Typography>
              </TableCell>
            </TableRow>
            {alphabet.slice(0, 8).map((item) => (
              <TableRow key={item}>
                <TableCell colSpan={4}>
                  <Typography
                    variant='body2'
                    className={classes['rems-budj-jurnal-avt-empty']}
                  >
                    7
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell sx={{ width: '60mm' }}>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-avt-main']}
                  align='right'
                >
                  Керівник проектувальника:
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '30mm' }}>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-avt-main']}
                  align='center'
                >
                  {executorJobTitleimen}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-avt-main']}
                  align='center'
                >
                  ________________________
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '45mm' }}>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-avt-main']}
                  align='left'
                >
                  {executorFIOImen}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-avt-main']}
                  align='right'
                ></Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-avt-main']}
                  align='center'
                ></Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-avt-main']}
                  align='center'
                >
                  М.П. (підпис)
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-avt-main']}
                  align='left'
                ></Typography>
              </TableCell>
            </TableRow>
            {alphabet.slice(0, 5).map((item) => (
              <TableRow key={item}>
                <TableCell colSpan={4}>
                  <Typography
                    variant='body2'
                    className={classes['rems-budj-jurnal-avt-empty']}
                  >
                    7
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-avt-main']}
                  align='right'
                >
                  {' '}
                  Керівник замовника:{' '}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-avt-main']}
                  align='center'
                >
                  {clientJobTitleimen}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-avt-main']}
                  align='center'
                >
                  ________________________
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-avt-main']}
                  align='left'
                >
                  {clientFIOImen}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-avt-main']}
                  align='right'
                ></Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-avt-main']}
                  align='center'
                ></Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-avt-main']}
                  align='center'
                >
                  М.П. (підпис)
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-avt-main']}
                  align='left'
                ></Typography>
              </TableCell>
            </TableRow>
            {alphabet.slice(0, 10).map((item) => (
              <TableRow key={item}>
                <TableCell colSpan={4}>
                  <Typography
                    variant='body2'
                    className={classes['rems-budj-jurnal-avt-empty']}
                  >
                    7
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TableContainer id='rems-budj-jurnal-avt-page-3'>
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
              <TableCell colSpan={2}>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-avt-main']}
                  align='right'
                >
                  ДСТУ-Н Б А.2.2-11:2014
                </Typography>
              </TableCell>
            </TableRow>
            {alphabet.slice(0, 3).map((item) => (
              <TableRow key={item}>
                <TableCell colSpan={2}>
                  <Typography
                    variant='body2'
                    className={classes['rems-budj-jurnal-avt-empty']}
                  >
                    7
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={2}>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-avt-main']}
                  align='center'
                >
                  ПЕРЕЛІК ПІДРЯДНИХ ОРГАНІЗАЦІЙ
                </Typography>
              </TableCell>
            </TableRow>
            {alphabet.slice(0, 3).map((item) => (
              <TableRow key={item}>
                <TableCell colSpan={2}>
                  <Typography
                    variant='body2'
                    className={classes['rems-budj-jurnal-avt-empty']}
                  >
                    7
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={2}>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-avt-main']}
                  align='center'
                >
                  Виконавець робіт (генеральний підрядник, підрядник)
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-avt-main']}
                  align='center'
                >
                  {executorTypeShort} « {executorName} »
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-avt-main']}
                  align='center'
                >
                  Виконавці окремих видів робіт (підрядники)
                </Typography>
              </TableCell>
            </TableRow>
            {alphabet.slice(0, 3).map((item) => (
              <TableRow key={item}>
                <TableCell colSpan={2}>
                  <Typography
                    variant='body2'
                    className={classes['rems-budj-jurnal-avt-empty']}
                  >
                    7
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={2}>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-avt-hr']}
                  align='center'
                >
                  7
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-avt-main']}
                  align='center'
                >
                  Найменування роботи - будівельно-монтажна організація
                </Typography>
              </TableCell>
            </TableRow>
            {alphabet.slice(0, 1).map((item) => (
              <TableRow key={item}>
                <TableCell colSpan={2}>
                  <Typography
                    variant='body2'
                    className={classes['rems-budj-jurnal-avt-empty']}
                  >
                    7
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-avt-main']}
                  align='left'
                >
                  1
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-avt-main']}
                  align='left'
                >
                  {servWorkShortForJournal}
                </Typography>
              </TableCell>
            </TableRow>
            {alphabet.slice(0, 9).map((item, index) => (
              <TableRow key={item}>
                <TableCell sx={{ width: '15mm' }}>
                  <Typography
                    variant='body2'
                    className={classes['rems-budj-jurnal-avt-main']}
                    align='left'
                  >
                    {index + 2}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['rems-budj-jurnal-avt-hr']}
                  >
                    7
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
            {alphabet.slice(0, 20).map((item) => (
              <TableRow key={item}>
                <TableCell colSpan={2}>
                  <Typography
                    variant='body2'
                    className={classes['rems-budj-jurnal-avt-empty']}
                  >
                    7
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography
        variant='body2'
        className={classes['rems-budj-jurnal-avt-main']}
        align='right'
      >
        ДСТУ-Н Б А.2.2-11:2014
      </Typography>
      <Typography
        mt={5}
        variant='body2'
        className={classes['rems-budj-jurnal-avt-main']}
        align='center'
      >
        Список спеціалістів, які здійснюють авторський нагляд
      </Typography>
      <TableContainer id='rems-budj-jurnal-avt-page-4'>
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
              <TableCell sx={{ width: '17mm' }}>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-avt-main']}
                  align='center'
                >
                  № з/п{' '}
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '42mm' }}>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-avt-main']}
                  align='center'
                >
                  Прізвище, ім’я, по-батькові{' '}
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '36mm' }}>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-avt-main']}
                  align='center'
                >
                  Посада, проектна організація, №телефону
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-avt-main']}
                  align='center'
                >
                  Робота, за якою здійснюється авторський нагляд
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '42mm' }}>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-avt-main']}
                  align='center'
                >
                  Дата та номер наказу про призначення осіб авторського нагляду
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-avt-main']}
                  align='center'
                >
                  1
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-avt-main']}
                  align='center'
                >
                  2
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-avt-main']}
                  align='center'
                >
                  3
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-avt-main']}
                  align='center'
                >
                  4
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-avt-main']}
                  align='center'
                >
                  5
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-avt-main']}
                  align='center'
                >
                  1
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-avt-main']}
                  align='center'
                >
                  Пастушок Любов Іванівна
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-avt-main']}
                  align='center'
                >
                  Головний Інженер проекту Любов ПАСТУШОК тел: (067)993-76-03
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-avt-main']}
                  align='center'
                >
                  {servWorkShortForJournal}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-avt-main']}
                  align='center'
                >
                  Наказ № {prikazGipNumber} від {nakazDateStr}
                </Typography>
              </TableCell>
            </TableRow>
            {alphabet.slice(0, 36).map((item) => (
              <TableRow key={item}>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['rems-budj-jurnal-avt-empty']}
                    align='center'
                  >
                    1
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['rems-budj-jurnal-avt-empty']}
                    align='center'
                  >
                    2
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['rems-budj-jurnal-avt-empty']}
                    align='center'
                  >
                    3
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['rems-budj-jurnal-avt-empty']}
                    align='center'
                  >
                    4
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['rems-budj-jurnal-avt-empty']}
                    align='center'
                  >
                    5
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography
        variant='body2'
        className={classes['rems-budj-jurnal-avt-main']}
        align='right'
      >
        ДСТУ-Н Б А.2.2-11:2014
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budj-jurnal-avt-main']}
        align='center'
      >
        Реєстрація відвідування об’єкта фахівцями
      </Typography>
      <TableContainer id='rems-budj-jurnal-avt-page-5'>
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
              <TableCell rowSpan={2}>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-avt-main']}
                  align='center'
                >
                  № з/п
                </Typography>
              </TableCell>
              <TableCell rowSpan={2}>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-avt-main']}
                  align='center'
                >
                  Найменування організації
                </Typography>
              </TableCell>
              <TableCell rowSpan={2}>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-avt-main']}
                  align='center'
                >
                  Прізвище, ініціали
                </Typography>
              </TableCell>
              <TableCell rowSpan={2}>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-avt-main']}
                  align='center'
                >
                  Займана посада
                </Typography>
              </TableCell>
              <TableCell rowSpan={2}>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-avt-main']}
                  align='center'
                >
                  № робочого телефону
                </Typography>
              </TableCell>
              <TableCell colSpan={2}>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-avt-main']}
                  align='center'
                >
                  Дата
                </Typography>
              </TableCell>
              <TableCell rowSpan={2}>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-avt-main']}
                  align='center'
                >
                  Підпис представника замовника
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-avt-main']}
                  align='center'
                >
                  Приїзду
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-avt-main']}
                  align='center'
                >
                  Від’їзду
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ width: '8mm' }}>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-avt-main']}
                  align='center'
                >
                  1
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '33mm' }}>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-avt-main']}
                  align='center'
                >
                  {executorTypeShort} «{executorName}»
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '27mm' }}>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-avt-main']}
                  align='center'
                >
                  Пастушок Любов Іванівна
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '19mm' }}>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-avt-main']}
                  align='center'
                >
                  Інженер-проектувальник
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '18mm' }}>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-avt-main']}
                  align='center'
                >
                  (067)993-76-03
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '18mm' }}>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-avt-main']}
                  align='center'
                ></Typography>
              </TableCell>
              <TableCell sx={{ width: '8mm' }}>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-avt-main']}
                  align='center'
                ></Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-avt-main']}
                  align='center'
                ></Typography>
              </TableCell>
            </TableRow>
            {alphabet.slice(0, 40).map((item) => (
              <TableRow key={item}>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['rems-budj-jurnal-avt-empty']}
                  >
                    2
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['rems-budj-jurnal-avt-empty']}
                  >
                    2
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['rems-budj-jurnal-avt-empty']}
                  >
                    2
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['rems-budj-jurnal-avt-empty']}
                  >
                    2
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['rems-budj-jurnal-avt-empty']}
                  >
                    2
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['rems-budj-jurnal-avt-empty']}
                  >
                    2
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['rems-budj-jurnal-avt-empty']}
                  >
                    2
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['rems-budj-jurnal-avt-empty']}
                  >
                    2
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography
        variant='body2'
        className={classes['rems-budj-jurnal-avt-main']}
        align='right'
      >
        ДСТУ-Н Б А.2.2-11:2014
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budj-jurnal-avt-main']}
        align='center'
      >
        Обліковий лист
      </Typography>

      <TableContainer id='rems-budj-jurnal-avt-page-6'>
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
              <TableCell rowSpan={2} sx={{ width: '8mm' }}>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-avt-main']}
                  align='center'
                >
                  № з/п
                </Typography>
              </TableCell>
              <TableCell rowSpan={2} sx={{ width: '8mm' }}>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-avt-vertical']}
                  align='center'
                >
                  Дата
                </Typography>
              </TableCell>
              <TableCell rowSpan={2} sx={{ width: '25mm' }}>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-avt-main']}
                  align='center'
                >
                  Виявлені відхилення від проектної документації
                </Typography>
              </TableCell>
              <TableCell rowSpan={2} sx={{ width: '26mm' }}>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-avt-main']}
                  align='center'
                >
                  Вказівки щодо усунення виявлених відхилень та терміни їх
                  виконання
                </Typography>
              </TableCell>
              <TableCell rowSpan={2} sx={{ width: '27mm' }}>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-avt-main']}
                  align='center'
                >
                  Підпис спеціаліста, що виконує авторський нагляд (призві ще,
                  ініціали)
                </Typography>
              </TableCell>
              <TableCell colSpan={2}>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-avt-main']}
                  align='center'
                >
                  Із записом ознайомлений представник (прізвище, ініціали, дата)
                </Typography>
              </TableCell>
              <TableCell colSpan={2}>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-avt-main']}
                  align='center'
                >
                  Позначення про виконання вказівок (прізвище, ініціали, дата)
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow sx={{ height: '35mm' }}>
              <TableCell sx={{ width: '18mm' }}>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-avt-vertical']}
                  align='center'
                >
                  підрядник
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '18mm' }}>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-avt-vertical']}
                  align='center'
                >
                  замовник
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '21mm' }}>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-avt-vertical']}
                  align='center'
                >
                  підрядник
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '21mm' }}>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-avt-vertical']}
                  align='center'
                >
                  замовник
                </Typography>
              </TableCell>
            </TableRow>
            {alphabet.slice(0, 30).map((item) => (
              <TableRow key={item}>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['rems-budj-jurnal-avt-empty']}
                  >
                    2
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['rems-budj-jurnal-avt-empty']}
                  >
                    2
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['rems-budj-jurnal-avt-empty']}
                  >
                    2
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['rems-budj-jurnal-avt-empty']}
                  >
                    2
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['rems-budj-jurnal-avt-empty']}
                  >
                    2
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['rems-budj-jurnal-avt-empty']}
                  >
                    2
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['rems-budj-jurnal-avt-empty']}
                  >
                    2
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['rems-budj-jurnal-avt-empty']}
                  >
                    2
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['rems-budj-jurnal-avt-empty']}
                  >
                    2
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
