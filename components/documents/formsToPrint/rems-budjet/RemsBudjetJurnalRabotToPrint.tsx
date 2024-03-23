import React from 'react';
import { I_Contract, I_Client, I_CalendarnGrafik } from '@/interfaces/refdata';

import Typography from '@mui/material/Typography';

import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import classes from '../styles.module.scss';

export default function RemsBudjetJurnalRabotToPrint({
  currentContract,
  currentExecutor,
  currentCalendarnGrafik,
}: Readonly<{
  currentContract: I_Contract;
  currentExecutor: I_Client;
  currentCalendarnGrafik: I_CalendarnGrafik;
}>) {
  const contrDateStr = new Date(
    currentContract?.contractDate!
  ).toLocaleDateString('uk-UA', {
    year: 'numeric',
  });
  //@ts-ignore
  const executorTypeShort = currentExecutor?.firmType?.firmTypeShortName;
  const executorName = currentExecutor?.clientShortName;
  const jurnalRabotNumber = currentContract?.jurnalRabotNumber;
  const contractDescription = currentContract?.contractDescription;
  const workAddress = currentContract?.workAddress;
  const executorFullFIO_imenit = `${currentExecutor?.lastName_imen} ${currentExecutor?.firstName_imen} ${currentExecutor?.patronymic_imen}`;
  const executorFIOImen = `${
    currentExecutor?.firstName_imen
  } ${currentExecutor?.lastName_imen?.toLocaleUpperCase()}`;
  const executorJobTitleimen = currentExecutor?.jobTitle?.toLocaleLowerCase();
  const zvedeniySumBudjet = currentContract?.zvedeniySumBudjet;
  const [sumGrn, sumKop] =
    zvedeniySumBudjet > 0
      ? zvedeniySumBudjet.toFixed(2).split('.')
      : ['0', '00'];

  const serviceWorks = currentCalendarnGrafik?.serviceWorks ?? [];
  const alphabet =
    'abcdefghijklmnopqrstuvwxyzабвгдеёжзийклмнопрстуфхцчшщъыьэюя'.split('');
  return (
    <div className={classes.page} id='page'>
      <TableContainer id='rems-budj-jurnal-rabot-page-1-header'>
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
                <Typography variant='h5' align='center' mt={5}>
                  <strong>ЗАГАЛЬНИЙ ЖУРНАЛ РОБІТ</strong>
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-rabot-main']}
                  align='center'
                >
                  Найменування будівельної організації {executorTypeShort} «
                  {executorName}»{' '}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-rabot-main']}
                  align='center'
                >
                  Загальний журнал робіт № ЗЖ {jurnalRabotNumber}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-rabot-main']}
                >
                  із будівництва об’єкта{' '}
                  <strong>« {contractDescription} »</strong>
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-rabot-caption']}
                  align='center'
                >
                  (найменування)
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-rabot-main']}
                >
                  Адреса об’єкта будівництва: {workAddress}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-rabot-hr']}
                >
                  7
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-rabot-hr']}
                >
                  7
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-rabot-main']}
                >
                  Посада, прізвище, ім’я, по батькові та підпис уповноважених
                  осіб будівельної організації, що відповідають за будівництво
                  об’єкта {executorJobTitleimen} {executorTypeShort} «
                  {executorName}» {executorFullFIO_imenit}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-rabot-hr']}
                >
                  7
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-rabot-main']}
                >
                  Генеральна проектна організація, прізвище, ім’я, по батькові
                  та підпис головного інженера проекту, номер та серія
                  сертифікату {executorTypeShort} «{executorName}» ,ГІП Пастушок
                  Любов Іванівна, сертифікат №003442{' '}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-rabot-hr']}
                >
                  7
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-rabot-main']}
                >
                  Прізвище, ім’я, по батькові та підпис особи, яка здійснює
                  технічний нагляд, номер та серія сертифіката
                  _______________________ ___________________
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-rabot-text']}
                >
                  Початок робіт:
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-rabot-text']}
                >
                  за планом (договором) в продовж {contrDateStr}{' '}
                  року__________________
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  mb={2}
                  variant='body2'
                  className={classes['rems-budj-jurnal-rabot-text']}
                >
                  фактично «__»____________{contrDateStr}
                  ___________________________
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-rabot-text']}
                >
                  Закінчення робіт (введення в експлуатацію)
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-rabot-text']}
                >
                  за планом (договором)_____________________________________
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-rabot-text']}
                >
                  фактично «__»____________{contrDateStr}
                  ___________________________
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-rabot-text']}
                >
                  Посада, прізвище, ім’я, по батькові і підпис керівника
                  будівельної організації, який видав журнал директор{' '}
                  {executorTypeShort} «{executorName}» {executorFullFIO_imenit}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-rabot-hr']}
                >
                  7
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-rabot-caption']}
                  align='center'
                >
                  (дата видачі, печатка організації)
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-rabot-text']}
                >
                  Основні показники об’єкта, що будується, в тому числі
                  кошторисна вартість{' '}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  mb={3}
                  variant='body2'
                  className={classes['rems-budj-jurnal-rabot-text']}
                >
                  Кошторисна вартість – {sumGrn} грн {sumKop} коп
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      {/* //////////////////////////////////// */}
      <TableContainer id='rems-budj-jurnal-rabot-page-2-header'>
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
                  className={classes['rems-budj-jurnal-rabot-main']}
                >
                  Організація, що затвердила проект (робочий проект), і дата
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-rabot-hr']}
                >
                  1
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-rabot-main']}
                >
                  Назва субпідрядних організацій та перелік робіт, що ними
                  виконується
                </Typography>
              </TableCell>
            </TableRow>
            {alphabet.slice(0, 14).map((item) => (
              <TableRow key={item}>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['rems-budj-jurnal-rabot-hr']}
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
                  className={classes['rems-budj-jurnal-rabot-main']}
                >
                  Назва субпідрядних організацій, що розробили проектну
                  документацію
                </Typography>
              </TableCell>
            </TableRow>
            {alphabet.slice(0, 4).map((item) => (
              <TableRow key={item}>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['rems-budj-jurnal-rabot-hr']}
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
                  className={classes['rems-budj-jurnal-rabot-main']}
                >
                  Відмітки про зміни в записах на титульному листі загального
                  журналу робіт
                </Typography>
              </TableCell>
            </TableRow>
            {alphabet.slice(0, 3).map((item) => (
              <TableRow key={item}>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['rems-budj-jurnal-rabot-hr']}
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
                  className={classes['rems-budj-jurnal-rabot-text']}
                  mt={3}
                >
                  Назва організації, посада, прізвище, імя по батькові та підпис
                  особи, яка внесла зміни,
                </Typography>
              </TableCell>
            </TableRow>
            {alphabet.slice(0, 1).map((item) => (
              <TableRow key={item}>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['rems-budj-jurnal-rabot-hr']}
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
                  className={classes['rems-budj-jurnal-rabot-caption']}
                  align='center'
                >
                  дата внесення зміни
                </Typography>
              </TableCell>
            </TableRow>
            {alphabet.slice(0, 11).map((item) => (
              <TableRow key={item}>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['rems-budj-jurnal-rabot-hr']}
                  >
                    7
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* //////////////////////////////////// */}
      <Typography
        variant='body2'
        className={classes['rems-budj-jurnal-rabot-text']}
        align='center'
      >
        Таблиця А.1 Список інженерно-технічного персоналу, зайнятого на
        будівництві об’єкта
      </Typography>
      <TableContainer id='rems-budj-jurnal-rabot-page-3-header'>
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
              <TableCell sx={{ width: '50mm' }}>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-rabot-text']}
                  align='center'
                >
                  Прізвище, ім’я та по батькові, посада, ділянка роботи
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '40mm' }}>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-rabot-text']}
                  align='center'
                >
                  Дата початку робіт на будівництві об’єкта
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '40mm' }}>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-rabot-text']}
                  align='center'
                >
                  Дата отримання дозвільних документів на право виконання робіт
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-rabot-text']}
                  align='center'
                >
                  Дата закінчення робіт на будівництві об’єкта
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-rabot-text']}
                  align='center'
                >
                  1
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-rabot-text']}
                  align='center'
                >
                  2
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-rabot-text']}
                  align='center'
                >
                  3
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-rabot-text']}
                  align='center'
                >
                  4
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-rabot-text']}
                  align='center'
                >
                  {executorFIOImen}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-rabot-text']}
                  align='center'
                >
                  «__»_______ {contrDateStr}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-rabot-text']}
                  align='center'
                ></Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-rabot-text']}
                  align='center'
                >
                  «__»_________ {contrDateStr}
                </Typography>
              </TableCell>
            </TableRow>
            {alphabet.slice(0, 40).map((item) => (
              <TableRow key={item}>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['rems-budj-jurnal-rabot-empty-row']}
                    align='center'
                  >
                    1
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['rems-budj-jurnal-rabot-empty-row']}
                    align='center'
                  >
                    1
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['rems-budj-jurnal-rabot-empty-row']}
                    align='center'
                  >
                    1
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['rems-budj-jurnal-rabot-empty-row']}
                    align='center'
                  >
                    1
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography
        variant='body2'
        className={classes['rems-budj-jurnal-rabot-text']}
        align='center'
      >
        Таблиця А.2 Перелік актів проміжного приймання відповідальних
        конструкцій і актів на закриття прихованих робіт
      </Typography>
      <TableContainer id='rems-budj-jurnal-rabot-page-4-header'>
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
              <TableCell sx={{ width: '20mm' }}>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-rabot-text']}
                  align='center'
                >
                  Номер рядка
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '80mm' }}>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-rabot-text']}
                  align='center'
                >
                  Найменування актів (із зазначенням місця знаходження
                  конструкцій і робіт)
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-rabot-text']}
                  align='center'
                >
                  Дата підписання акта, прізвище, ініціали і посади осіб, що
                  підписали
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-rabot-text']}
                  align='center'
                >
                  1
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-rabot-text']}
                  align='center'
                >
                  2
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-rabot-text']}
                  align='center'
                >
                  3
                </Typography>
              </TableCell>
            </TableRow>
            {alphabet.slice(0, 43).map((item) => (
              <TableRow key={item}>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['rems-budj-jurnal-rabot-empty-row']}
                    align='center'
                  >
                    1
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['rems-budj-jurnal-rabot-empty-row']}
                    align='center'
                  >
                    1
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['rems-budj-jurnal-rabot-empty-row']}
                    align='center'
                  >
                    1
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography
        variant='body2'
        className={classes['rems-budj-jurnal-rabot-text']}
        align='center'
      >
        Таблиця А.3 Відомість результатів контролю якості будівельно-монтажних
        робіт
      </Typography>

      <TableContainer id='rems-budj-jurnal-rabot-page-5-header'>
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
              <TableCell sx={{ width: '20mm' }}>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-rabot-text']}
                  align='center'
                >
                  Дата та час виконання контролю
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '60mm' }}>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-rabot-text']}
                  align='center'
                >
                  Частини об’єкта та конструктивні елементи, їх розташування з
                  посиланням на номери креслень, види робіт
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '50mm' }}>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-rabot-text']}
                  align='center'
                >
                  Результати контролю якості
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-rabot-text']}
                  align='center'
                >
                  Посада і підписи осіб, що оцінюють якість робіт
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-rabot-text']}
                  align='center'
                >
                  1
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-rabot-text']}
                  align='center'
                >
                  2
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-rabot-text']}
                  align='center'
                >
                  3
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-rabot-text']}
                  align='center'
                >
                  4
                </Typography>
              </TableCell>
            </TableRow>
            {alphabet.slice(0, 42).map((item) => (
              <TableRow key={item}>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['rems-budj-jurnal-rabot-empty-row']}
                    align='center'
                  >
                    1
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['rems-budj-jurnal-rabot-empty-row']}
                    align='center'
                  >
                    1
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['rems-budj-jurnal-rabot-empty-row']}
                    align='center'
                  >
                    1
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['rems-budj-jurnal-rabot-empty-row']}
                    align='center'
                  >
                    1
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography
        variant='body2'
        className={classes['rems-budj-jurnal-rabot-text']}
        align='center'
      >
        Таблиця А.4 Перелік спеціальних (загальних) журналів робіт
      </Typography>

      <TableContainer id='rems-budj-jurnal-rabot-page-6-header'>
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
              <TableCell sx={{ width: '60mm' }}>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-rabot-text']}
                  align='center'
                >
                  Найменування спеціальних (загальних) журналів і дата їх видачі
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '60mm' }}>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-rabot-text']}
                  align='center'
                >
                  Організація, що веде журнал, прізвище, ініціали і посада
                  відповідальної особи
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-rabot-text']}
                  align='center'
                >
                  Дата здачі-прийняття журналу і підписи посадових осіб
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-rabot-text']}
                  align='center'
                >
                  1
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-rabot-text']}
                  align='center'
                >
                  2
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-rabot-text']}
                  align='center'
                >
                  3
                </Typography>
              </TableCell>
            </TableRow>
            {alphabet.slice(0, 40).map((item) => (
              <TableRow key={item}>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['rems-budj-jurnal-rabot-empty-row']}
                    align='center'
                  >
                    1
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['rems-budj-jurnal-rabot-empty-row']}
                    align='center'
                  >
                    1
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['rems-budj-jurnal-rabot-empty-row']}
                    align='center'
                  >
                    1
                  </Typography>
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
              <TableCell colSpan={3}>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-rabot-text']}
                >
                  Примітка. Перелік загальних журналів надається за умови
                  будівництва комплексу (будови) і ведення загального журналу
                  робіт на кожній будівлі, споруді та лінійних об’єктах
                  інженерно-транспортної інфраструктури
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Typography
        variant='body2'
        className={classes['rems-budj-jurnal-rabot-text']}
        align='center'
      >
        Таблиця А.5 Відомості про виконання робіт
      </Typography>
      <TableContainer id='rems-budj-jurnal-rabot-page-7-header'>
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
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-rabot-text']}
                  align='center'
                >
                  Дата та час виконання робіт
                </Typography>
              </TableCell>
              <TableCell colSpan={2}>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-rabot-text']}
                  align='center'
                >
                  Короткий опис і умови виконання робіт (з посиланням, за
                  необхідності, на роботи, що виконуються субпідрядними
                  організаціями), посада, прізвище, ініціали і підпис
                  відповідальної особи
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ width: '30mm' }}>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-rabot-text']}
                  align='center'
                >
                  1
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-rabot-text']}
                  align='center'
                >
                  2
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '30mm' }}>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-rabot-text']}
                  align='center'
                >
                  підпис
                </Typography>
              </TableCell>
            </TableRow>
            {serviceWorks.length > 0 &&
              serviceWorks.map((item) => (
                <TableRow key={item.serviceWork}>
                  <TableCell>
                    <Typography
                      variant='body2'
                      className={classes['rems-budj-jurnal-rabot-italic']}
                      align='center'
                    ></Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant='body2'
                      className={classes['rems-budj-jurnal-rabot-italic']}
                      align='center'
                    >
                      {item.serviceWork}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant='body2'
                      className={classes['rems-budj-jurnal-rabot-italic']}
                      align='center'
                    ></Typography>
                  </TableCell>
                </TableRow>
              ))}
            {alphabet.slice(0, 22).map((item) => (
              <TableRow key={item}>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['rems-budj-jurnal-rabot-empty-row']}
                    align='center'
                  >
                    1
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['rems-budj-jurnal-rabot-empty-row']}
                    align='center'
                  >
                    1
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['rems-budj-jurnal-rabot-empty-row']}
                    align='center'
                  >
                    1
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography
        variant='body2'
        className={classes['rems-budj-jurnal-rabot-text']}
        align='center'
      >
        Таблиця А.6 Зауваження контролюючих органів і служб
      </Typography>
      <TableContainer id='rems-budj-jurnal-rabot-page-8-header'>
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
              <TableCell sx={{ width: '20mm' }}>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-rabot-text']}
                  align='center'
                >
                  Дата
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '60mm' }}>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-rabot-text']}
                  align='center'
                >
                  Зауваження контролюючих органів, опис виявлених дефектів,
                  термін усунення, посада, ПІБ, підпис
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '38mm' }}>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-rabot-text']}
                  align='center'
                >
                  Підпис відповідальної особи, яка прийняла зауваження до
                  виконання{' '}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-rabot-text']}
                  align='center'
                >
                  Підпис представника контролюючих органів і служб про перевірку
                  їх виконання
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-rabot-text']}
                  align='center'
                >
                  1
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-rabot-text']}
                  align='center'
                >
                  2
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-rabot-text']}
                  align='center'
                >
                  3
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-jurnal-rabot-text']}
                  align='center'
                >
                  4
                </Typography>
              </TableCell>
            </TableRow>
            {alphabet.slice(0, 41).map((item) => (
              <TableRow key={item}>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['rems-budj-jurnal-rabot-empty-row']}
                    align='center'
                  >
                    1
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['rems-budj-jurnal-rabot-empty-row']}
                    align='center'
                  >
                    1
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['rems-budj-jurnal-rabot-empty-row']}
                    align='center'
                  >
                    1
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['rems-budj-jurnal-rabot-empty-row']}
                    align='center'
                  >
                    1
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography
        variant='body2'
        className={classes['rems-budj-jurnal-rabot-text']}
        align='center'
      >
        Вказівки щодо ведення загального журналу робіт
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budj-jurnal-rabot-text']}
      >
        1. Загальний журнал робіт є основним первинним виробничим документом,
        який відтворює технологічну послідовність, строки, якість і умови
        виконання будівельно-монтажних робіт.
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budj-jurnal-rabot-text']}
      >
        2. Загальний журнал робіт ведеться на будівництві окремих або групи
        однотипних будівель, споруд, які розміщені в межах одного будівельного
        майданчика і споруджуються одночасно.
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budj-jurnal-rabot-text']}
      >
        3. Загальний журнал робіт веде особа, відповідальна за будівництво
        будівлі або споруди (виконавець робіт, старший виконавець робіт) і
        заповнює його з першого дня роботи на об’єкті особисто або доручає
        керівникам змін. Спеціалізовані будівельно-монтажні організації ведуть
        спеціалізовані журнали робіт, що знаходяться у відповідальних осіб, які
        виконують ці роботи. Після закінчення робіт спеціальний журнал
        передається генеральній будівельній організації.
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budj-jurnal-rabot-text']}
      >
        4. Титульний аркуш заповнюється до початку будівництва генеральною
        підрядною будівельною організацією за участю проектної організації і
        замовника.
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budj-jurnal-rabot-text']}
      >
        5. Список інженерно-технічного персоналу, який зайнятий на будівництві
        об’єкта (табл. 1), складає керівник генпідрядної будівельної
        організації.
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budj-jurnal-rabot-text']}
      >
        6. У табл. 2 наводиться перелік всіх актів, що підлягають оформленню на
        данному об’єкті будівництва, в календарному порядку.
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budj-jurnal-rabot-text']}
      >
        7. У табл. Звключаються всі роботи по частинах і елементах будівель і
        споруд, якість виконання яких контролюється і підлягає оцінці.
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budj-jurnal-rabot-text']}
      >
        8. Табл. 4 заповнюється особою, відповідальною за ведення загального
        журналу робіт.
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budj-jurnal-rabot-text']}
      >
        9. Регулярн івідомості про виконання робіт (з початку і до їх
        завершення), що включаються в табл. 5, є основною частиною журналу. Ця
        частина журналу містить відомості про початок і закінчення роботи і
        відображає перебіг її виконання.
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budj-jurnal-rabot-text']}
      >
        Опис робіт повинен проводитись по конструктивних елементах будівлі або
        споруди з означенням осей, позначок, поверхів, ярусів, секцій і
        приміщень, де роботи виконуються.
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budj-jurnal-rabot-text']}
      >
        Наводяться короткі відомості про методи виконання робіт, застосовані
        матеріали, готові вироби і конструкції, вимушені простої будівельних
        машин (із зазначенням вжитих заходів), випробування устаткування,
        систем, мереж і вимушені простої (випробування в холосту або під
        навантаженням, подача електроенергії, випробування на міцність і
        герметичність тощо), відхилення від робочих креслень (із зазначенням
        причин) і їх погодження, зміни розміщення охоронних, захисних і
        сигнальних огорож, переноси транспортних і пожежних мереж, прокладання,
        перекладання, розбирання тимчасових інженерних мереж, наявність і
        виконання схем операційного контролю якості, виправлення і переробку
        виконання робіт (із зазначенням винних), а також метеорологічні та інші
        особливі умови виконання робіт.
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budj-jurnal-rabot-text']}
      >
        10. У табл. 6 вносяться зауваження осіб, які контролюють виконання і
        безпеку робіт відповідно до наданих їм прав, а також уповноважених
        представників проектної організації або її авторського нагляду.
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budj-jurnal-rabot-text']}
      >
        11. Загальний журнал повинен бути пронумерований, прошнурований,
        оформлений усіма підписами на титульному аркуші і скріплений печаткою
        будівельної організації, яка його видала.
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budj-jurnal-rabot-text']}
      >
        12. Під час здачі завершенного будівництвом об’єкта загальний і
        спеціальні журнали робіт передаються замовнику і зберігаються у нього до
        введення об’єкта в експлуатацію. Після введення об’єкта в експлуатацію
        журнали передаються на постійне зберігання експлуатаційній організації.
      </Typography>
      <TableContainer id='rems-budj-jurnal-rabot-page-2-header'>
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
            {alphabet.slice(0, 1).map((item) => (
              <TableRow key={item}>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['rems-budj-jurnal-rabot-hr']}
                  >
                    7
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
