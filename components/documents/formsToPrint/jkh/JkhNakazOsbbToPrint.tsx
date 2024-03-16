import React from 'react';
import { I_Contract, I_Client } from '@/interfaces/refdata';
import { FloatToSamplesInWordsUkr } from '@/lib/helpers/myPropisUkr';

import Typography from '@mui/material/Typography';

import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import classes from '../styles.module.scss';

export default function JkhNakazOsbbToPrint({
  currentContract,
  currentClient,
}: Readonly<{
  currentContract: I_Contract;
  currentClient: I_Client;
}>) {
  const contrDateStr = new Date(
    currentContract?.contractDate ?? ''
  ).toLocaleDateString('uk-UA', {
    year: 'numeric',
  });

  const totalSum = currentContract?.zvedeniySumBudjet;

  const totalSumPropis = FloatToSamplesInWordsUkr(totalSum);

  const contractDescription = currentContract?.contractDescription;

  //@ts-ignore
  const clientTypeLong = currentClient?.firmType?.firmTypeLongName;
  //@ts-ignore
  const clientTypeShort = currentClient?.firmType?.firmTypeShortName;
  const clientName = currentClient?.clientShortName;

  const clientJobTitleimen = currentClient?.jobTitle;

  const clientFIOImen = `${
    currentClient?.firstName_imen
  } ${currentClient?.lastName_imen?.toLocaleUpperCase()}`;

  const clientIBAN = currentClient?.iban_budget;

  const clientAddress = `${currentClient?.postIndex} ${currentClient?.address}`;

  return (
    <div className={classes.page} id='page'>
      <TableContainer id='table-jkh-nakaz-header' sx={{ marginBottom: 2 }}>
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
              },
            }}
          >
            <TableRow>
              <TableCell colSpan={2}>
                <Typography
                  variant='body2'
                  className={classes['jkh-nakaz-text']}
                  align='center'
                >
                  {clientTypeLong}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>
                <Typography
                  variant='body1'
                  className={classes['jkh-nakaz-text']}
                  align='center'
                >
                  « {clientName} »
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>
                <Typography
                  variant='body1'
                  className={classes['jkh-nakaz-text']}
                  align='center'
                >
                  {clientAddress}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>
                <Typography
                  variant='body1'
                  className={classes['jkh-nakaz-text']}
                  align='center'
                >
                  {clientIBAN}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>
                <Typography
                  variant='body1'
                  className={classes['jkh-nakaz-text']}
                  align='center'
                  sx={{ borderBottom: '1px solid black' }}
                ></Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>
                <Typography
                  mt={2}
                  mb={2}
                  variant='body1'
                  className={classes['jkh-nakaz-text']}
                  align='center'
                >
                  НАКАЗ№________
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ width: '50%' }}>
                <Typography
                  mb={2}
                  variant='body2'
                  className={classes['jkh-nakaz-text']}
                  align='left'
                >
                  м. Запоріжжя
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '50%' }}>
                <Typography
                  mb={2}
                  variant='body2'
                  className={classes['jkh-nakaz-text']}
                  align='right'
                >
                  «___»_______________{contrDateStr} року.
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>
                <Typography
                  variant='body2'
                  className={classes['jkh-nakaz-text']}
                  align='left'
                >
                  Про затвердження
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>
                <Typography
                  variant='body2'
                  className={classes['jkh-nakaz-text']}
                  align='left'
                >
                  Проектно-кошторисної
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>
                <Typography
                  variant='body2'
                  className={classes['jkh-nakaz-text']}
                  align='left'
                >
                  Документації
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>
                <Typography
                  mt={2}
                  mb={2}
                  variant='body2'
                  className={classes['jkh-nakaz-text']}
                >
                  1. Правління {clientTypeLong} « {clientName} » затверджує
                  проектно-кошторисну документацію по об’єкту будівництва : «{' '}
                  {contractDescription} » на загальну кошторисну вартість:{' '}
                  {totalSum?.toFixed(2)} грн. ({totalSumPropis})
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>
                <Typography
                  mb={3}
                  variant='body2'
                  className={classes['jkh-nakaz-text']}
                >
                  {clientJobTitleimen}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ width: '50%' }}>
                <Typography
                  variant='body2'
                  className={classes['jkh-nakaz-text']}
                  align='left'
                >
                  {clientTypeShort} « {clientName} »
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '50%' }}>
                <Typography
                  variant='body2'
                  className={classes['jkh-nakaz-text']}
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
