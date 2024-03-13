import { I_Contract, I_Client } from '@/interfaces/refdata';

import { FloatToSamplesInWordsUkr } from '@/lib/helpers/myPropisUkr';

import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import classes from '../styles.module.scss';

export default function JkhProectnAvtAktToPrint({
  currentContract,
  currentClient,
}: Readonly<{
  currentContract: I_Contract;
  currentClient: I_Client;
}>) {
  const contrProectAvtorskNumber = currentContract?.contrProectAvtorskNumber;
  const aktProectAvtorskNumber = currentContract?.aktProectAvtorskNumber;
  const contractDescription = currentContract?.contractDescription;
  const contrDateStr = new Date(
    currentContract?.contractDate ?? ''
  ).toLocaleDateString('uk-UA', {
    year: 'numeric',
  });
  //@ts-ignore
  const clientTypeShort = currentClient?.firmType?.firmTypeShortName;

  const clientName = currentClient?.clientShortName;
  const clientAddress = `${currentClient?.postIndex} ${currentClient?.address}`;
  const clientEDRPO = `ЄДРПОУ: ${currentClient?.edrpou}`;
  const clientJobTitleimen = currentClient?.jobTitle;
  const clientFIOImen = `${
    currentClient?.firstName_imen
  } ${currentClient?.lastName_imen?.toLocaleUpperCase()}`;
  const paymentSourceProectnAvt = currentContract?.paymentSourceProectnAvt;
  const clientIBAN =
    paymentSourceProectnAvt === 'собств'
      ? currentClient?.iban
      : currentClient?.iban_budget;

  const proectnSumBudjet = currentContract?.proectnSumBudjet;
  const avtorskSumBudjet = currentContract?.avtorskSumBudjet;

  const totalSum = proectnSumBudjet + avtorskSumBudjet;
  const podatokSum = totalSum * 0.05;

  const totalSumPropis = FloatToSamplesInWordsUkr(totalSum);

  return (
    <div className={classes.page} id='page'>
      <TableContainer
        id='table-jkh-proectn-avt-akt-header'
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
              <TableCell sx={{ width: '50%' }}>
                <Typography
                  variant='body2'
                  className={classes['jkh-proectn-avt-akt-text']}
                  align='center'
                >
                  ЗАТВЕРДЖУЮ
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '50%' }}>
                <Typography
                  variant='body2'
                  className={classes['jkh-proectn-avt-akt-text']}
                  align='center'
                >
                  ЗАТВЕРДЖУЮ
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ width: '50%' }}>
                <Typography
                  variant='body2'
                  className={classes['jkh-proectn-avt-akt-text']}
                >
                  Фізична особа-підприємець
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '50%' }}>
                <Typography
                  variant='body2'
                  className={classes['jkh-proectn-avt-akt-text']}
                >
                  {clientJobTitleimen}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ width: '50%' }}>
                <Typography
                  variant='body2'
                  className={classes['jkh-proectn-avt-akt-text']}
                >
                  Пастушок Любов Іванівна
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '50%' }}>
                <Typography
                  variant='body2'
                  className={classes['jkh-proectn-avt-akt-text']}
                >
                  {clientTypeShort} « {clientName} »
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ width: '50%' }}>
                <Typography
                  variant='body2'
                  className={classes['jkh-proectn-avt-akt-text']}
                >
                  _________________________________ Б/П
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '50%' }}>
                <Typography
                  variant='body2'
                  className={classes['jkh-proectn-avt-akt-text']}
                >
                  ___________________________________м.п
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ width: '50%' }}>
                <Typography
                  variant='body2'
                  className={classes['jkh-proectn-avt-akt-text']}
                >
                  Любов ПАСТУШОК
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '50%' }}>
                <Typography
                  variant='body2'
                  className={classes['jkh-proectn-avt-akt-text']}
                >
                  {clientFIOImen}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>
                <Typography
                  variant='body2'
                  className={classes['jkh-proectn-avt-akt-text']}
                  align='center'
                >
                  АКТ виконаних робіт (послуг) № АВР – {aktProectAvtorskNumber}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>
                <Typography
                  variant='body2'
                  className={classes['jkh-proectn-avt-akt-text']}
                  align='center'
                >
                  Від «___» _____________ {contrDateStr} року
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>
                <Typography
                  variant='body2'
                  className={classes['jkh-proectn-avt-akt-text']}
                >
                  Ми,що нижче підписалися, представник Замовника{' '}
                  {clientTypeShort} « {clientName} » з одного боку, та
                  представник Виконавця : ФОП Пастушок Любов Іванівна з іншого
                  боку, склали цей АКТ про те, що на підставі наведених
                  документів:
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>
                <Typography
                  variant='body2'
                  className={classes['jkh-proectn-avt-akt-text']}
                >
                  Договір: №{contrProectAvtorskNumber} від «___» _____________
                  {contrDateStr} року
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>
                <Typography
                  variant='body2'
                  className={classes['jkh-proectn-avt-akt-text']}
                >
                  Виконавцем були виконанні наступні роботи (надані такі
                  послуги) :
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <TableContainer
        id='table-jkh-proectn-avt-akt-main'
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
                border: '1px solid black',
              },
            }}
          >
            <TableRow>
              <TableCell sx={{ width: '20mm' }}>
                <Typography
                  variant='body2'
                  className={classes['jkh-proectn-avt-akt-text']}
                  align='center'
                >
                  № п/п
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['jkh-proectn-avt-akt-text']}
                  align='center'
                >
                  Найменування робіт,послуг
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '20mm' }}>
                <Typography
                  variant='body2'
                  className={classes['jkh-proectn-avt-akt-text']}
                  align='center'
                >
                  Одиниця виміру
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '20mm' }}>
                <Typography
                  variant='body2'
                  className={classes['jkh-proectn-avt-akt-text']}
                  align='center'
                >
                  Кількість
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '20mm' }}>
                <Typography
                  variant='body2'
                  className={classes['jkh-proectn-avt-akt-text']}
                  align='center'
                >
                  Цена
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '20mm' }}>
                <Typography
                  variant='body2'
                  className={classes['jkh-proectn-avt-akt-text']}
                  align='center'
                >
                  Сума
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ width: '20mm' }}>
                <Typography
                  variant='body2'
                  className={classes['jkh-proectn-avt-akt-text']}
                  align='center'
                >
                  1
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['jkh-proectn-avt-akt-text']}
                >
                  Виконання проектно-кошторисної документації «{' '}
                  {contractDescription} »
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '20mm' }}>
                <Typography
                  variant='body2'
                  className={classes['jkh-proectn-avt-akt-text']}
                  align='center'
                >
                  послуга
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '20mm' }}>
                <Typography
                  variant='body2'
                  className={classes['jkh-proectn-avt-akt-text']}
                  align='center'
                >
                  1
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '20mm' }}>
                <Typography
                  variant='body2'
                  className={classes['jkh-proectn-avt-akt-text']}
                  align='center'
                >
                  {proectnSumBudjet?.toFixed(2)}
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '20mm' }}>
                <Typography
                  variant='body2'
                  className={classes['jkh-proectn-avt-akt-text']}
                  align='center'
                >
                  {proectnSumBudjet?.toFixed(2)}
                </Typography>
              </TableCell>
            </TableRow>
            {avtorskSumBudjet > 0 && (
              <TableRow>
                <TableCell sx={{ width: '20mm' }}>
                  <Typography
                    variant='body2'
                    className={classes['jkh-proectn-avt-akt-text']}
                    align='center'
                  >
                    2
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['jkh-proectn-avt-akt-text']}
                  >
                    Виконання авторського нагляду « {contractDescription} »
                  </Typography>
                </TableCell>
                <TableCell sx={{ width: '20mm' }}>
                  <Typography
                    variant='body2'
                    className={classes['jkh-proectn-avt-akt-text']}
                    align='center'
                  >
                    послуга
                  </Typography>
                </TableCell>
                <TableCell sx={{ width: '20mm' }}>
                  <Typography
                    variant='body2'
                    className={classes['jkh-proectn-avt-akt-text']}
                    align='center'
                  >
                    1
                  </Typography>
                </TableCell>
                <TableCell sx={{ width: '20mm' }}>
                  <Typography
                    variant='body2'
                    className={classes['jkh-proectn-avt-akt-text']}
                    align='center'
                  >
                    {avtorskSumBudjet?.toFixed(2)}
                  </Typography>
                </TableCell>
                <TableCell sx={{ width: '20mm' }}>
                  <Typography
                    variant='body2'
                    className={classes['jkh-proectn-avt-akt-text']}
                    align='center'
                  >
                    {avtorskSumBudjet?.toFixed(2)}
                  </Typography>
                </TableCell>
              </TableRow>
            )}
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
                  className={classes['jkh-proectn-avt-akt-text']}
                >
                  Всього без ПДВ
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['jkh-proectn-avt-akt-text']}
                  align='center'
                >
                  {totalSum.toFixed(2)}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell colSpan={4}>
                <Typography
                  variant='body2'
                  className={classes['jkh-proectn-avt-akt-text']}
                >
                  Разом до сплати без ПДВ
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['jkh-proectn-avt-akt-text']}
                  align='center'
                >
                  {totalSum.toFixed(2)}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={6}>
                <Typography
                  variant='body2'
                  className={classes['jkh-proectn-avt-akt-text']}
                >
                  Загальна вартість робіт (послуг) склала без ПДВ:{' '}
                  {totalSumPropis} в т.ч. єдиний податок 5%:
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={6}>
                <Typography
                  variant='body2'
                  className={classes['jkh-proectn-avt-akt-text']}
                >
                  Єдиний податок 5%: {podatokSum.toFixed(2)} грн
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={6}>
                <Typography
                  variant='body2'
                  className={classes['jkh-proectn-avt-akt-text']}
                >
                  Разом до сплати без ПДВ: {totalSumPropis}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={6}>
                <Typography
                  variant='body2'
                  className={classes['jkh-proectn-avt-akt-text']}
                >
                  Замовник претензії по об’єму, якості та строкам виконання
                  робіт (надання послуг) не має
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={6}>
                <Typography
                  variant='body2'
                  className={classes['jkh-proectn-avt-akt-text']}
                >
                  Місце складання: м.Запоріжжя
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <TableContainer id='table-jkh-proectn-avt-akt-sign'>
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
                  className={classes['jkh-proectn-avt-akt-text']}
                  align='center'
                >
                  Від Виконавця
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['jkh-proectn-avt-akt-text']}
                  align='center'
                >
                  Від Замовника
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ width: '50%' }}>
                <Typography
                  variant='body2'
                  className={classes['jkh-proectn-avt-akt-text']}
                  align='center'
                >
                  ________________________________ Б/П
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['jkh-proectn-avt-akt-text']}
                  align='center'
                >
                  ________________________________м.п
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['jkh-proectn-avt-akt-text']}
                >
                  ФОП Пастушок Любов Іванівна
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['jkh-proectn-avt-akt-text']}
                >
                  {clientTypeShort} «{clientName}»{' '}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['jkh-proectn-avt-akt-text']}
                >
                  Адреса: 69050 м.Запоріжжя, Вул.Радгоспна, б.59А, кв.14
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['jkh-proectn-avt-akt-text']}
                >
                  {clientAddress}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['jkh-proectn-avt-akt-text']}
                >
                  ЄДРПОУ/ДРФО 2197219469
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['jkh-proectn-avt-akt-text']}
                >
                  {clientEDRPO}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['jkh-proectn-avt-akt-text']}
                >
                  IBAN: UA433133990000026007055749691, у АТ КБ
                  &ldquo;ПРИВАТБАНК&rdquo;, МФО 313399
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['jkh-proectn-avt-akt-text']}
                >
                  {clientIBAN}
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
