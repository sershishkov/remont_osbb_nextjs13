import React from 'react';
import { I_Contract, I_Client } from '@/interfaces/refdata';

import Typography from '@mui/material/Typography';

import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import classes from '../styles.module.scss';

export default function JkhPismoOtOsbbToPrint({
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
      <TableContainer id='table-jkh-pismo-header' sx={{ marginBottom: 2 }}>
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
                  className={classes['jkh-pismo-text']}
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
                  className={classes['jkh-pismo-text']}
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
                  className={classes['jkh-pismo-text']}
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
                  className={classes['jkh-pismo-text']}
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
                  className={classes['jkh-pismo-text']}
                  align='center'
                  sx={{ borderBottom: '1px solid black' }}
                ></Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>
                <Typography
                  variant='body1'
                  className={classes['jkh-pismo-text']}
                  align='right'
                >
                  Директору департаменту з управління
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>
                <Typography
                  variant='body1'
                  className={classes['jkh-pismo-text']}
                  align='right'
                >
                  Житлово-комунальним господарством
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>
                <Typography
                  mb={2}
                  variant='body1'
                  className={classes['jkh-pismo-text']}
                  align='right'
                >
                  Запорізької міської ради
                </Typography>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={2}>
                <Typography
                  variant='body1'
                  className={classes['jkh-pismo-text']}
                  align='right'
                >
                  {clientJobTitleimen}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>
                <Typography
                  variant='body1'
                  className={classes['jkh-pismo-text']}
                  align='right'
                >
                  {clientTypeShort} « {clientName} »
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>
                <Typography
                  variant='body1'
                  className={classes['jkh-pismo-text']}
                  align='right'
                >
                  {clientFIOImen}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>
                <Typography
                  variant='body1'
                  className={classes['jkh-pismo-text']}
                  align='right'
                >
                  {clientAddress}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>
                <Typography
                  mt={5}
                  mb={2}
                  variant='body2'
                  className={classes['jkh-pismo-text']}
                >
                  Для виконання робіт з « {contractDescription} », витрати за
                  здійснення авторського та техничного нагляду,
                  проектно-кошторисних робіт виконуються за рахунок{' '}
                  {clientTypeShort} « {clientName} »
                </Typography>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={{ width: '50%' }}>
                <Typography
                  mb={2}
                  variant='body2'
                  className={classes['jkh-pismo-text']}
                  align='left'
                >
                  «___»_______________{contrDateStr} року.
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '50%' }}>
                <Typography
                  mb={2}
                  variant='body2'
                  className={classes['jkh-pismo-text']}
                  align='right'
                >
                  {clientJobTitleimen}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>
                <Typography
                  variant='body1'
                  className={classes['jkh-pismo-text']}
                  align='right'
                >
                  {clientTypeShort} « {clientName} »
                </Typography>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={2}>
                <Typography
                  mt={5}
                  variant='body1'
                  className={classes['jkh-pismo-text']}
                  align='right'
                >
                  ___________________ {clientFIOImen}
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
