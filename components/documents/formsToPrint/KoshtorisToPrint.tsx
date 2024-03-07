import React from 'react';

import {
  I_Contract,
  I_Client,
  I_WorkRows,
  I_LProduct,
} from '@/interfaces/refdata';
import { arr__TypeOfOSBB } from '@/constants/constants';
import { FloatToSamplesInWordsUkr } from '@/lib/helpers/myPropisUkr';

import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import classes from './styles.module.scss';

export default function KoshtorisToPrint({
  tableAktRows,
  tableNaklRows,
  currentOurFirm,
  currentClient,
  currentContract,

  naklSum,
  aktSum,
  mode,
}: Readonly<{
  tableAktRows: I_WorkRows[];
  tableNaklRows: I_LProduct[];
  currentOurFirm: I_Client;
  currentClient: I_Client;
  currentContract: I_Contract;

  naklSum: number;
  aktSum: number;
  mode: string;
}>) {
  const proectnSumBudjet = currentContract?.proectnSumBudjet;
  const avtorskSumBudjet = currentContract?.avtorskSumBudjet;
  const totalKoshtSum = naklSum + aktSum;
  const tehnadzSum = totalKoshtSum * 0.015;
  const totalWithDocsSum =
    totalKoshtSum + proectnSumBudjet + avtorskSumBudjet + tehnadzSum;

  const contractNumber = currentContract?.contractNumber;
  const koshtorisNumber = currentContract?.koshtorisNumber;
  const contrDateStr = new Date(
    currentContract?.contractDate ?? ''
  ).toLocaleDateString('uk-UA', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
  //@ts-ignore
  const contractType = currentContract?.contractType?.contractTypeName;
  //@ts-ignore
  const clientType = currentContract?.client?.firmType?.firmTypeShortName;
  let contractDescription = '';
  if (
    contractType === 'Общий' ||
    contractType === 'Общий Сумма' ||
    contractType === 'Предоплата Частичная' ||
    contractType === 'Предоплата Материал' ||
    contractType === 'Предоплата 100%' ||
    contractType === 'Кошторис Сумма' ||
    contractType === 'Кошторис Частичная Предоплата' ||
    contractType === 'Кошторис Предоплата Материал' ||
    contractType === 'Кошторис Предоплата 100%'
  ) {
    const injectPhrase = arr__TypeOfOSBB.includes(clientType)
      ? 'у житловому будинку за адресою: '
      : ' за адресою:';
    const workAddress = currentContract?.workAddress;
    contractDescription = `${currentContract?.contractDescription} ${injectPhrase} ${workAddress}`;
  } else {
    contractDescription = currentContract?.contractDescription!;
  }
  //@ts-ignore
  const executorTypeShort = currentOurFirm?.firmType?.firmTypeShortName;
  const executorName = currentOurFirm?.clientShortName;
  const executorAddress = `${currentOurFirm?.postIndex}, ${currentOurFirm?.address}`;
  const executorIBAN = currentOurFirm?.iban;
  const executorEDRPO = `ЄДРПОУ: ${currentOurFirm?.edrpou}`;
  const executorTel = `${
    currentOurFirm?.telNumber ? `Тел:${currentOurFirm?.telNumber}` : ''
  }`;
  const executorEmail = `${
    currentOurFirm?.email ? `email:${currentOurFirm?.email}` : ''
  }`;
  const executorFIOImen = `${
    currentOurFirm?.firstName_imen
  } ${currentOurFirm?.lastName_imen?.toLocaleUpperCase()}`;
  const executorJobTitleimen = currentOurFirm?.jobTitle;
  //@ts-ignore
  const clientTypeShort = currentClient?.firmType?.firmTypeShortName;
  const clientName = currentClient?.clientShortName;
  const clientAddress = `${currentClient?.postIndex}, ${currentClient?.address}`;
  const clientIBAN = currentClient?.iban;
  const clientEDRPO = `ЄДРПОУ: ${currentClient?.edrpou}`;
  const clientTel = `${
    currentClient?.telNumber ? `Тел:${currentClient?.telNumber}` : ''
  }`;
  const clientEmail = `${
    currentClient?.email ? `email:${currentClient?.email}` : ''
  }`;
  const clientFIOImen = `${
    currentClient?.firstName_imen
  } ${currentClient?.lastName_imen?.toLocaleUpperCase()}`;
  const clientJobTitleimen = currentClient?.jobTitle;

  let p2_1 = '';
  let p2_2 = '';
  let p2_2_1 = '';
  let p2_2_2 = '';
  const prepaymentPercentage = currentContract?.prepaymentPercentage;
  const totalSum = naklSum + aktSum;
  const prePayPercentSum =
    Math.round(
      ((totalSum * prepaymentPercentage) / 100 + Number.EPSILON) * 100
    ) / 100;
  const restPrePayPercentSum =
    Math.round((totalSum - prePayPercentSum + Number.EPSILON) * 100) / 100;

  const totalSumPropis = FloatToSamplesInWordsUkr(totalSum);

  const prePayNaklSumPropis = FloatToSamplesInWordsUkr(naklSum);
  const restPrePayNaklSumPropis = FloatToSamplesInWordsUkr(aktSum);

  const prePayPercentSumPropis = FloatToSamplesInWordsUkr(
    isNaN(prePayPercentSum) ? 0 : prePayPercentSum
  );
  const restPrePayPercentSumPropis = FloatToSamplesInWordsUkr(
    isNaN(restPrePayPercentSum) ? 0 : restPrePayPercentSum
  );

  const arr__totalSum = totalSum.toFixed(2).split('.');
  const arr__prePayPercentSum = prePayPercentSum.toFixed(2).split('.');
  const arr__restPrePayPercentSum = restPrePayPercentSum.toFixed(2).split('.');
  const arr__naklSum = naklSum.toFixed(2).split('.');
  const arr__aktSum = aktSum.toFixed(2).split('.');

  if (contractType === 'Общий') {
    p2_1 = `2.1. Оплата за надані послуги та матерiали відбувається згідно актів виконаних робіт, видаткових накладных або наданих рахунків ВИКОНАВЦЯ. Вартість послуг визначається згідно обсягу наданих послуг.`;
    p2_2 = `2.2. Оплата здійснюється ЗАМОВНИКОМ шляхом перерахування на розрахунковий рахунок ВИКОНАВЦЯ коштів протягом 3 банківських днів після дати підписання акту виконаних робіт.`;
  } else {
    p2_1 = `2.1. Вартість послуг складає  ${arr__totalSum[0]} грн ${arr__totalSum[1]} коп (${totalSumPropis}), без ПДВ.`;
  }
  if (contractType === 'Общий Сумма' || contractType === 'Кошторис Сумма') {
    p2_2 = `2.2. Оплата здійснюється ЗАМОВНИКОМ шляхом перерахування на розрахунковий рахунок ВИКОНАВЦЯ коштів протягом 3 банківських днів після дати підписання акту виконаних робіт.`;
  }
  if (
    contractType === 'Предоплата Частичная' ||
    contractType === 'Предоплата 100%'
  ) {
    p2_2 = `2.2. Оплата здійснюється ЗАМОВНИКОМ шляхом перерахування на розрахунковий рахунок ВИКОНАВЦЯ коштів:`;
    p2_2_1 = `2.2.1. Попередньої оплати, яка надається ВИКОНАВЕЦЮ , у розмірі (${prepaymentPercentage})% ${arr__prePayPercentSum[0]} грн ${arr__prePayPercentSum[1]} коп (${prePayPercentSumPropis} ), без ПДВ.`;
    if (restPrePayPercentSum > 0) {
      p2_2_2 = `2.2.2. Остаточна оплата по даному Договору, у розмірі (${
        100 - prepaymentPercentage
      })% ${arr__restPrePayPercentSum[0]} грн ${
        arr__restPrePayPercentSum[1]
      } коп (${restPrePayPercentSumPropis}), без ПДВ. здійснюється протягом 3 банківських днів після дати підписання акту виконаних робіт.`;
    }
  }

  if (
    contractType === 'Предоплата Материал' ||
    contractType === 'Кошторис Предоплата Материал'
  ) {
    p2_2 = `2.2. Оплата здійснюється ЗАМОВНИКОМ шляхом перерахування на розрахунковий рахунок ВИКОНАВЦЯ коштів:`;
    p2_2_1 = `   2.2.1. Попередньої оплати, яка надається ВИКОНАВЕЦЮ , у розмірі ${arr__naklSum[0]} грн ${arr__naklSum[1]} коп ${prePayNaklSumPropis} ), без ПДВ.`;

    p2_2_2 = `   2.2.2. Остаточна оплата по даному Договору, у розмірі  ${arr__aktSum[0]} грн ${arr__aktSum[1]} коп (${restPrePayNaklSumPropis}), без ПДВ. здійснюється протягом 3 банківських днів після дати підписання акту виконаних робіт.`;
  }

  return (
    <div className={classes.page} id='page'>
      <TableContainer id='table-kosht-header'>
        <Table
          padding='none'
          sx={{
            width: '100%',
            margin: 0,
            // backgroundColor: 'white',
          }}
        >
          {mode === 'предварительный' && (
            <TableBody
              sx={{
                '& td,th': {
                  border: '1px solid transparent',
                },
              }}
            >
              <TableRow>
                <TableCell align='center' colSpan={2}>
                  <Typography variant='h5'>
                    {executorTypeShort} {executorName}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align='center' colSpan={2}>
                  <Typography variant='body2'>{executorAddress}</Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align='center' colSpan={2}>
                  <Typography variant='body2'>{executorIBAN}</Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align='center'>
                  <Typography variant='h4'>КОШТОРИС</Typography>
                </TableCell>
                <TableCell align='center'>
                  <Typography variant='h4'>№{koshtorisNumber}</Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2}>
                  <Typography variant='body2'>{contractDescription}</Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          )}
          {mode === 'договор' && (
            <TableBody
              sx={{
                '& td,th': {
                  border: '1px solid transparent',
                },
              }}
            >
              <TableRow>
                <TableCell align='center' colSpan={2}>
                  <Typography variant='body1'>
                    <strong>
                      Кошторис розрахунків виконання робіт на об&apos;єкті:
                    </strong>
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align='center' colSpan={2}>
                  <Typography variant='body2'>
                    {contractDescription} до договіру № {contractNumber} від{' '}
                    {contrDateStr}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </TableContainer>

      <TableContainer id='table-kosht-main'>
        <Table
          padding='none'
          sx={{
            width: '100%',
            margin: 0,
            // backgroundColor: 'white',
          }}
        >
          <TableBody
            className={classes['table-main']}
            // sx={{
            //   '& td,th': {
            //     border: '1px solid black',
            //   },
            // }}
          >
            <TableRow sx={{ height: 0 }}>
              <TableCell align='center' sx={{ width: '7mm' }}></TableCell>
              <TableCell align='center' sx={{ width: '7mm' }}></TableCell>
              <TableCell align='center' sx={{ width: '12mm' }}></TableCell>
              <TableCell align='center' colSpan={5}></TableCell>

              <TableCell align='center' sx={{ width: '12mm' }}></TableCell>
              <TableCell align='center' sx={{ width: '16mm' }}></TableCell>
              <TableCell align='center' sx={{ width: '18mm' }}></TableCell>
              <TableCell align='center' sx={{ width: '20mm' }}></TableCell>
              <TableCell align='center' sx={{ width: '20mm' }}></TableCell>
            </TableRow>

            <TableRow>
              <TableCell align='center' sx={{ width: '7mm' }}>
                <Typography variant='body2'>№ п/п</Typography>
              </TableCell>
              <TableCell align='center' colSpan={8}>
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

            {tableAktRows && tableAktRows.length > 0 && (
              <>
                <TableRow>
                  <TableCell align='center' sx={{ width: '7mm' }}></TableCell>
                  <TableCell align='center' colSpan={8} sx={{ paddingLeft: 1 }}>
                    <Typography variant='body2'>
                      <strong>Робота</strong>
                    </Typography>
                  </TableCell>
                  <TableCell align='center' sx={{ width: '16mm' }}></TableCell>
                  <TableCell align='center' sx={{ width: '18mm' }}></TableCell>
                  <TableCell align='center' sx={{ width: '20mm' }}></TableCell>
                  <TableCell align='center' sx={{ width: '20mm' }}></TableCell>
                </TableRow>

                {tableAktRows &&
                  tableAktRows.length > 0 &&
                  tableAktRows.map((item, rowIndex) => (
                    <TableRow key={item.row_id}>
                      <TableCell align='center'>
                        <Typography variant='body2'>{rowIndex + 1}</Typography>
                      </TableCell>
                      <TableCell
                        colSpan={8}
                        align='left'
                        sx={{ paddingLeft: 1 }}
                      >
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

                <TableRow>
                  <TableCell align='center'>{` `}</TableCell>
                  <TableCell colSpan={8} align='left' sx={{ paddingLeft: 1 }}>
                    <Typography variant='body2'>
                      {' '}
                      <strong>Разом робота</strong>
                    </Typography>
                  </TableCell>
                  <TableCell align='center'>{` `}</TableCell>
                  <TableCell align='center'>{` `}</TableCell>
                  <TableCell align='center'>{` `}</TableCell>
                  <TableCell align='center'>
                    <Typography variant='body2'>{aktSum.toFixed(2)}</Typography>
                  </TableCell>
                </TableRow>
              </>
            )}
            {tableNaklRows && tableNaklRows.length > 0 && (
              <>
                <TableRow>
                  <TableCell align='center'>{` `}</TableCell>
                  <TableCell colSpan={8} align='center' sx={{ paddingLeft: 1 }}>
                    <Typography variant='body2'>
                      <strong>Будматеріал</strong>
                    </Typography>
                  </TableCell>
                  <TableCell align='center'>{` `}</TableCell>
                  <TableCell align='center'>{` `}</TableCell>
                  <TableCell align='center'>{` `}</TableCell>
                  <TableCell align='center'>{` `}</TableCell>
                </TableRow>

                {tableNaklRows &&
                  tableNaklRows.length > 0 &&
                  tableNaklRows.map((item, rowIndex) => (
                    <TableRow key={item.row_id}>
                      <TableCell align='center'>
                        <Typography variant='body2'>{rowIndex + 1}</Typography>
                      </TableCell>
                      <TableCell
                        colSpan={8}
                        align='left'
                        sx={{ paddingLeft: 1 }}
                      >
                        <Typography variant='body2'>
                          {item.product} {item.extraInformation ?? ''}
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
                  <TableCell align='center'>{` `}</TableCell>
                  <TableCell colSpan={8} align='left' sx={{ paddingLeft: 1 }}>
                    <Typography variant='body2'>
                      <strong>Разом матеріали</strong>
                    </Typography>
                  </TableCell>
                  <TableCell align='center'>{` `}</TableCell>
                  <TableCell align='center'>{` `}</TableCell>
                  <TableCell align='center'>{` `}</TableCell>
                  <TableCell align='center'>
                    <Typography variant='body2'>
                      {naklSum.toFixed(2)}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align='center'>{` `}</TableCell>
                  <TableCell colSpan={8} align='left' sx={{ paddingLeft: 1 }}>
                    <Typography variant='body2'>
                      <strong>Разом матеріали і робота</strong>
                    </Typography>
                  </TableCell>
                  <TableCell align='center'>{` `}</TableCell>
                  <TableCell align='center'>{` `}</TableCell>
                  <TableCell align='center'>{` `}</TableCell>
                  <TableCell align='center'>
                    <Typography variant='body2'>
                      {(naklSum + aktSum).toFixed(2)}
                    </Typography>
                  </TableCell>
                </TableRow>
              </>
            )}
          </TableBody>
          {mode === 'предварительный' && (
            <TableBody
              sx={{
                '& td,th': {
                  border: '1px solid transparent',
                },
              }}
            >
              <TableRow>
                <TableCell></TableCell>
                <TableCell colSpan={11}>
                  <Typography variant='body2' sx={{ paddingLeft: 5 }}>
                    Тех надзор
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant='body2' align='center'>
                    {tehnadzSum.toFixed(2)}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell></TableCell>
                <TableCell colSpan={11}>
                  <Typography variant='body2' sx={{ paddingLeft: 5 }}>
                    Проектные работы
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant='body2' align='center'>
                    {proectnSumBudjet?.toFixed(2)}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell></TableCell>
                <TableCell colSpan={11}>
                  <Typography variant='body2' sx={{ paddingLeft: 5 }}>
                    Авторский надзор
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant='body2' align='center'>
                    {avtorskSumBudjet?.toFixed(2)}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell></TableCell>
                <TableCell colSpan={11}>
                  <Typography variant='body2' sx={{ paddingLeft: 5 }}>
                    Всего с материалами, работами и документами
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant='body2' align='center'>
                    {totalWithDocsSum?.toFixed(2)}
                  </Typography>
                </TableCell>
              </TableRow>
              {p2_1 !== '' && (
                <TableRow>
                  <TableCell colSpan={13}>
                    <Typography variant='body2' sx={{ paddingLeft: 5 }}>
                      {p2_1}
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
              {p2_2 !== '' && (
                <TableRow>
                  <TableCell colSpan={13}>
                    <Typography variant='body2' sx={{ paddingLeft: 5 }}>
                      {p2_2}
                    </Typography>
                  </TableCell>
                </TableRow>
              )}{' '}
              {p2_2_1 !== '' && (
                <TableRow>
                  <TableCell colSpan={13}>
                    <Typography variant='body2' sx={{ paddingLeft: 5 }}>
                      {p2_2_1}
                    </Typography>
                  </TableCell>
                </TableRow>
              )}{' '}
              {p2_2_2 !== '' && (
                <TableRow>
                  <TableCell colSpan={13}>
                    <Typography variant='body2' sx={{ paddingLeft: 5 }}>
                      {p2_2_2}
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          )}
        </Table>
      </TableContainer>
      {mode === 'договор' && (
        <TableContainer id='table-base-contr-sign'>
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
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['base-contr-text']}
                    align='center'
                  >
                    ВИКОНАВЕЦЬ
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['base-contr-text']}
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
                    className={classes['base-contr-text']}
                  >
                    {executorTypeShort} {executorName}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['base-contr-text']}
                  >
                    {clientTypeShort} {clientName}
                  </Typography>
                </TableCell>
              </TableRow>

              {(executorAddress !== '' || clientAddress !== '') && (
                <TableRow>
                  <TableCell>
                    <Typography
                      variant='body2'
                      className={classes['base-contr-text']}
                    >
                      {executorAddress}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant='body2'
                      className={classes['base-contr-text']}
                    >
                      {clientAddress}
                    </Typography>
                  </TableCell>
                </TableRow>
              )}

              {(executorEDRPO !== '' || clientEDRPO !== '') && (
                <TableRow>
                  <TableCell>
                    <Typography
                      variant='body2'
                      className={classes['base-contr-text']}
                    >
                      {executorEDRPO}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant='body2'
                      className={classes['base-contr-text']}
                    >
                      {clientEDRPO}
                    </Typography>
                  </TableCell>
                </TableRow>
              )}

              {(executorEDRPO !== '' || clientEDRPO !== '') && (
                <TableRow>
                  <TableCell>
                    <Typography
                      variant='body2'
                      className={classes['base-contr-text']}
                    >
                      {executorIBAN}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant='body2'
                      className={classes['base-contr-text']}
                    >
                      {clientIBAN}
                    </Typography>
                  </TableCell>
                </TableRow>
              )}

              {(executorTel !== '' || clientTel !== '') && (
                <TableRow>
                  <TableCell>
                    <Typography
                      variant='body2'
                      className={classes['base-contr-text']}
                    >
                      {executorTel}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant='body2'
                      className={classes['base-contr-text']}
                    >
                      {clientTel}
                    </Typography>
                  </TableCell>
                </TableRow>
              )}

              {(executorEmail !== '' || clientEmail !== '') && (
                <TableRow>
                  <TableCell>
                    <Typography
                      variant='body2'
                      className={classes['base-contr-text']}
                    >
                      {executorEmail}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant='body2'
                      className={classes['base-contr-text']}
                    >
                      {clientEmail}
                    </Typography>
                  </TableCell>
                </TableRow>
              )}

              {(executorJobTitleimen !== '' || clientJobTitleimen !== '') && (
                <TableRow>
                  <TableCell>
                    <Typography
                      variant='body2'
                      className={classes['base-contr-text']}
                      mb={2}
                    >
                      {executorJobTitleimen}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant='body2'
                      className={classes['base-contr-text']}
                      mb={2}
                    >
                      {clientJobTitleimen}
                    </Typography>
                  </TableCell>
                </TableRow>
              )}

              <TableRow>
                <TableCell>
                  <Grid container direction={`row`}>
                    <Grid
                      item
                      sx={{ flex: 1, borderBottom: '1px solid black' }}
                    ></Grid>
                    <Grid item>
                      <Typography
                        variant='body2'
                        className={classes['base-contr-text']}
                        sx={{ paddingRight: '4px' }}
                      >
                        {executorFIOImen}
                      </Typography>
                    </Grid>
                  </Grid>
                </TableCell>
                <TableCell>
                  <Grid container direction={`row`}>
                    <Grid
                      item
                      sx={{ flex: 1, borderBottom: '1px solid black' }}
                    ></Grid>
                    <Grid item>
                      <Typography
                        variant='body2'
                        className={classes['base-contr-text']}
                        sx={{ paddingRight: '4px' }}
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
                    className={classes['base-contr-text']}
                    align='left'
                  >
                    м.п.
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['base-contr-text']}
                    align='left'
                  >
                    м.п.
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}
