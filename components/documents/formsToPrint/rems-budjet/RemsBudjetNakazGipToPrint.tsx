import React from 'react';
import { I_Contract, I_Client } from '@/interfaces/refdata';

import Typography from '@mui/material/Typography';

import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import classes from '../styles.module.scss';

export default function RemsBudjetNakazGipToPrint({
  currentContract,
  currentExecutor,
}: Readonly<{
  currentContract: I_Contract;
  currentExecutor: I_Client;
}>) {
  const nakazDateStr = new Date(
    currentContract?.contractDate!
  ).toLocaleDateString('uk-UA', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  //@ts-ignore
  const executorTypeShort = currentExecutor?.firmType?.firmTypeShortName;
  const executorName = currentExecutor?.clientShortName?.toLocaleUpperCase();

  const prikazGipNumber = currentContract?.prikazGipNumber;
  const contractDescription = currentContract?.contractDescription;

  const executorAddress = `${currentExecutor?.postIndex} ${currentExecutor?.address}`;
  const executorEDRPO = currentExecutor?.edrpou;
  const executorIBAN = currentExecutor?.iban;

  const executorFIOImen = `${
    currentExecutor?.firstName_imen
  } ${currentExecutor?.lastName_imen?.toLocaleUpperCase()}`;

  const executorJobTitleimen = currentExecutor?.jobTitle;

  const alphabet =
    'abcdefghijklmnopqrstuvwxyzабвгдеёжзийклмнопрстуфхцчшщъыьэюя'.split('');
  return (
    <div className={classes.page} id='page'>
      <TableContainer id='rems-budj-nakaz-gip'>
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
                <Typography variant='h4' align='center' mt={3}>
                  {executorTypeShort} «{executorName}»
                </Typography>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={2}>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-nakaz-gip-hr']}
                >
                  1
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-nakaz-gip-main']}
                  align='center'
                >
                  {executorAddress}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-nakaz-gip-main']}
                  align='center'
                >
                  ЄДРПОУ: {executorEDRPO}, IBAN: {executorIBAN}
                </Typography>
              </TableCell>
            </TableRow>
            {alphabet.slice(0, 3).map((item) => (
              <TableRow key={item}>
                <TableCell colSpan={2}>
                  <Typography
                    variant='body2'
                    className={classes['rems-budj-nakaz-gip-empty']}
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
                  className={classes['rems-budj-nakaz-gip-main']}
                  align='left'
                >
                  № {prikazGipNumber}
                </Typography>
              </TableCell>
            </TableRow>
            {alphabet.slice(0, 2).map((item) => (
              <TableRow key={item}>
                <TableCell colSpan={2}>
                  <Typography
                    variant='body2'
                    className={classes['rems-budj-nakaz-gip-empty']}
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
                  className={classes['rems-budj-nakaz-gip-main']}
                  align='left'
                >
                  {nakazDateStr}
                </Typography>
              </TableCell>
            </TableRow>
            {alphabet.slice(0, 5).map((item) => (
              <TableRow key={item}>
                <TableCell colSpan={2}>
                  <Typography
                    variant='body2'
                    className={classes['rems-budj-nakaz-gip-empty']}
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
                  className={classes['rems-budj-nakaz-gip-main']}
                  align='center'
                >
                  Наказ
                </Typography>
              </TableCell>
            </TableRow>
            {alphabet.slice(0, 1).map((item) => (
              <TableRow key={item}>
                <TableCell colSpan={2}>
                  <Typography
                    variant='body2'
                    className={classes['rems-budj-nakaz-gip-empty']}
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
                  className={classes['rems-budj-nakaz-gip-main']}
                >
                  Наказую призначити головним інженером проекту та
                  відповідальним за авторський нагляд по обꞌєкту «{' '}
                  {contractDescription} », інженера з проектно-кошторисної
                  роботи Пастушок Любов Іванівну.
                </Typography>
              </TableCell>
            </TableRow>
            {alphabet.slice(0, 3).map((item) => (
              <TableRow key={item}>
                <TableCell colSpan={2}>
                  <Typography
                    variant='body2'
                    className={classes['rems-budj-nakaz-gip-empty']}
                  >
                    7
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell sx={{ width: '50%' }}>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-nakaz-gip-main']}
                  align='left'
                >
                  {executorJobTitleimen} {executorTypeShort} «{executorName}»
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '50%' }}>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-nakaz-gip-main']}
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
