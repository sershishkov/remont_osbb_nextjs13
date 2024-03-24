import React from 'react';
import { I_Contract, I_Client } from '@/interfaces/refdata';
import { FloatToSamplesInWordsUkr } from '@/lib/helpers/myPropisUkr';

import Typography from '@mui/material/Typography';

import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Grid from '@mui/material/Grid';

import classes from '../styles.module.scss';

export default function RemsBudjetDopUgodaToPrint({
  currentContract,
  currentClient,
  currentExecutor,
}: Readonly<{
  currentContract: I_Contract;
  currentClient: I_Client;
  currentExecutor: I_Client;
}>) {
  const contrDateStr = new Date(
    currentContract?.contractDate!
  ).toLocaleDateString('uk-UA', {
    year: 'numeric',
  });

  const dopUgodaSum = currentContract?.dopUgodaSum;
  const totalSumPropis = FloatToSamplesInWordsUkr(dopUgodaSum);

  const [sumGrn, sumKop] =
    dopUgodaSum > 0 ? dopUgodaSum.toFixed(2).split('.') : ['0', '00'];

  const clientJobTitleRod = currentClient?.jobTitle_rodit;
  const clientJobTitleimen = currentClient?.jobTitle;
  const clientFIORodit = `${currentClient?.lastName_rodit} ${currentClient?.firstName_rodit} ${currentClient?.patronymic_rodit}`;
  const clientFIOImen = `${
    currentClient?.firstName_imen
  } ${currentClient?.lastName_imen?.toLocaleUpperCase()}`;

  const clientActsOn = currentClient?.whichActsOnTheBasis;
  const clientAddres = `${currentClient?.postIndex}, ${currentClient?.address}`;

  const clientIBAN = currentClient?.iban;
  const clientEDRPO = `ЄДРПОУ: ${currentClient?.edrpou}`;
  //@ts-ignore
  const executorTypeLong = currentExecutor?.firmType?.firmTypeLongName;
  //@ts-ignore
  const executorTypeShort = currentExecutor?.firmType?.firmTypeShortName;
  const executorName = currentExecutor?.clientShortName;
  const executorJobTitleRod = currentExecutor?.jobTitle_rodit;
  const executorJobTitleimen = currentExecutor?.jobTitle;
  const executorFIORodit = `${currentExecutor?.lastName_rodit} ${currentExecutor?.firstName_rodit} ${currentExecutor?.patronymic_rodit}`;
  const executorFIOImen = `${
    currentExecutor?.firstName_imen
  } ${currentExecutor?.lastName_imen?.toLocaleUpperCase()}`;
  const executorActsOn = currentExecutor?.whichActsOnTheBasis;

  const executorAddres = `${currentExecutor?.postIndex}, ${currentExecutor?.address}`;
  const executorIBAN = currentExecutor?.iban;
  const executorEDRPO = `ЄДРПОУ: ${currentExecutor?.edrpou}`;
  return (
    <div className={classes.page} id='page'>
      <TableContainer id='table-rems-contract-budjet-header'>
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
                  variant='body1'
                  className={classes['rems-budjet-text']}
                  align='center'
                >
                  <strong>ДОДАТКОВА УГОДА № 1</strong>
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>
                <Typography
                  variant='body1'
                  className={classes['rems-budjet-paragraph']}
                  align='center'
                >
                  до договору № _____________ від «__»_________20__ р.
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>
                <Typography
                  variant='body1'
                  className={classes['rems-budjet-paragraph']}
                  align='center'
                  mb={2}
                >
                  на надання послуг з поточного ремонту
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ width: '50%' }}>
                <Typography
                  variant='body1'
                  className={classes['rems-budjet-text']}
                  align='left'
                >
                  м. Запоріжжя
                </Typography>
              </TableCell>

              <TableCell sx={{ width: '50%' }}>
                <Typography
                  variant='body1'
                  className={classes['rems-budjet-text']}
                  align='right'
                >
                  «____» __________ {contrDateStr} р.
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Typography
        variant='body2'
        className={classes['rems-budjet-paragraph']}
        mt={2}
      >
        ЗАМОВНИК: Комунальне підприємство «Запоріжремсервіс» Запорізької міської
        ради в особі {clientJobTitleRod} {clientFIORodit}, який діє на підставі
        {clientActsOn}, з одної сторони,
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        ПІДРЯДНИК: {executorTypeLong} «{executorName}» в особі{' '}
        {executorJobTitleRod} {executorFIORodit} , який дії на підставі{' '}
        {executorActsOn}
        підприємства з другої сторони, уклали цю додаткову угоду до договору на
        надання послуг з поточного ремонту № _____________ від «__»_________20__
        р.. про наступне:
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        1. Сторони домовились викласти пункт.2.1 Договору у наступній редакції:
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        «2.1. Ціна Послуг за цим Договором складає {sumGrn} грн. {sumKop} коп. (
        {totalSumPropis} ), без ПДВ.»
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        2. Додаткова угода набирає чинності з дати підписання Сторонами та
        скріплення її печатками Сторін.
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        3. Дану додаткову угоду укладено при повному розумінні Сторонами її умов
        та термінології українською мовою у двох автентичних примірниках, які
        мають однакову юридичну силу, - по одному для кожної із Сторін та є
        невід’ємною частиною Договору.{' '}
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        4. Інші умови Договору залишаються без змін і Сторони підтверджують по
        них свої зобов’язання.
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budjet-paragraph']}
        align='center'
        mt={2}
        mb={2}
      >
        5. МІСЦЕЗНАХОДЖЕННЯ ТА БАНКІВСЬКІ РЕКВІЗИТИ СТОРІН
      </Typography>
      <TableContainer id='table-rems-contract-budjet-sign'>
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
                // paddingRight: '2px',
              },
            }}
          >
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-text']}
                >
                  ЗАМОВНИК
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-text']}
                >
                  ПІДРЯДНИК
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-text']}
                >
                  <strong>КП «Запоріжремсервіс» ЗМР</strong>{' '}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-text']}
                >
                  <strong>
                    {executorTypeShort} «{executorName}»
                  </strong>
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-text']}
                >
                  {clientAddres}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-text']}
                >
                  {executorAddres}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-text']}
                >
                  {' '}
                  {clientIBAN}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-text']}
                >
                  {executorIBAN}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-text']}
                >
                  {clientEDRPO}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-text']}
                >
                  {executorEDRPO}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-text']}
                  mb={2}
                >
                  {clientJobTitleimen}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-text']}
                  mb={2}
                >
                  {executorJobTitleimen}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ width: '50%' }}>
                <Grid container direction={`row`}>
                  <Grid
                    item
                    sx={{ flex: 1, borderBottom: '1px solid black' }}
                  ></Grid>
                  <Grid item>
                    <Typography
                      variant='body2'
                      pr={1}
                      className={classes['rems-budjet-text']}
                    >
                      {clientFIOImen}
                    </Typography>
                  </Grid>
                </Grid>
              </TableCell>
              <TableCell sx={{ width: '50%' }}>
                <Grid container direction={`row`}>
                  <Grid
                    item
                    sx={{ flex: 1, borderBottom: '1px solid black' }}
                  ></Grid>
                  <Grid item>
                    <Typography
                      variant='body2'
                      pr={1}
                      className={classes['rems-budjet-text']}
                    >
                      {executorFIOImen}{' '}
                    </Typography>
                  </Grid>
                </Grid>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  align='left'
                  className={classes['rems-budjet-text']}
                >
                  М.П.
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  align='left'
                  className={classes['rems-budjet-text']}
                >
                  М.П.
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
