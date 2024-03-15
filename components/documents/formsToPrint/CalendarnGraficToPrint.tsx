import {
  I_Contract,
  I_Client,
  I_CalendarnGrafik,
  I_ServiceWorkInCalendarnGrafik,
} from '@/interfaces/refdata';

import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Grid from '@mui/material/Grid';

import classes from './styles.module.scss';
const fillColor = '#c0bdbd';
const widthColumnUnit = '11mm';
const widthColumnAmount = '11mm';
const widthColumnMonths = '9mm';

export default function CalendarnGraficToPrint({
  currentContract,
  currentClient,
  currentExecutor,
  currentCalendGrafic,
}: Readonly<{
  currentContract: I_Contract;
  currentClient: I_Client;
  currentExecutor: I_Client;
  currentCalendGrafic: I_CalendarnGrafik;
}>) {
  const tableRows: I_ServiceWorkInCalendarnGrafik[] =
    currentCalendGrafic?.serviceWorks;

  const contrDateStr = new Date(
    currentContract?.contractDate ?? ''
  ).toLocaleDateString('uk-UA', {
    year: 'numeric',
  });
  //@ts-ignore
  const currentContractType = currentContract?.contractType?.contractTypeName;

  const contractDescription = currentContract?.contractDescription;
  const remsCalendarGrafikUnit = currentContract?.remsCalendarGrafikUnit;
  const remsCalendarGrafikAmount = currentContract?.remsCalendarGrafikAmount;

  const startMonthWorkBudjet = currentContract?.startMonthWorkBudjet;
  const endMonthWorkBudjet = currentContract?.endMonthWorkBudjet;

  //@ts-ignore
  const clientTypeShort = currentClient?.firmType?.firmTypeShortName;
  const clientName = currentClient?.clientShortName;

  const clientJobTitleimen = currentClient?.jobTitle;
  const clientFIOImen = `${
    currentClient?.firstName_imen
  } ${currentClient?.lastName_imen?.toLocaleUpperCase()}`;
  const clientIBAN = currentClient?.iban_budget;
  const clientEDRPO = `ЄДРПОУ: ${currentClient?.edrpou}`;
  const clientAddress = `${currentClient?.postIndex} ${currentClient?.address}`;
  const clientTel = `${
    currentClient?.telNumber ? `Тел:${currentClient?.telNumber}` : ''
  }`;
  const clientEmail = `${
    currentClient?.email ? `email:${currentClient?.email}` : ''
  }`;

  const executorName = currentExecutor?.clientShortName;

  const executorJobTitleimen = currentExecutor?.jobTitle;

  const executorFIOImen = `${
    currentExecutor?.firstName_imen
  } ${currentExecutor?.lastName_imen?.toLocaleUpperCase()}`;

  const executorIBAN = currentExecutor?.iban;
  const executograyRPO = `ЄДРПОУ: ${currentExecutor?.edrpou}`;

  //@ts-ignore
  const executorTypeShort = currentExecutor?.firmType?.firmTypeShortName;
  const executorAddress = `${currentExecutor?.postIndex} ${currentExecutor?.address}`;
  const executorTel = `${
    currentExecutor?.telNumber ? `Тел:${currentExecutor?.telNumber}` : ''
  }`;
  const executorEmail = `${
    currentExecutor?.email ? `email:${currentExecutor?.email}` : ''
  }`;
  return (
    <div className={classes.page} id='page'>
      {currentContractType !== 'Ремсервис (бюджет)' && (
        <TableContainer
          id='table-calendarn-grafik-header'
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
                <TableCell>
                  <Typography
                    variant='body1'
                    className={classes['calendarn-grafik-text']}
                    align='center'
                  >
                    Календарний графік виконання робіт
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography
                    variant='body1'
                    className={classes['calendarn-grafik-text']}
                    align='center'
                  >
                    <strong>{contractDescription} </strong>
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography
                    variant='body1'
                    className={classes['calendarn-grafik-text']}
                    align='center'
                  >
                    Терміни виконання робіт: {startMonthWorkBudjet} -{' '}
                    {endMonthWorkBudjet}
                    {contrDateStr} року
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {currentContractType === 'Ремсервис (бюджет)' && (
        <TableContainer
          id='table-calendarn-grafik-header2'
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
                <TableCell>
                  <Typography
                    variant='body1'
                    className={classes['calendarn-grafik-text']}
                    align='right'
                  >
                    Додаток до договору № _________ від «___» ________{' '}
                    {contrDateStr} р
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography
                    variant='body1'
                    className={classes['calendarn-grafik-text']}
                    align='center'
                  >
                    <strong>Календарний графік виконання робіт </strong>
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography
                    variant='body1'
                    className={classes['calendarn-grafik-text']}
                    align='center'
                  >
                    {contractDescription}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {currentContractType !== 'Ремсервис (бюджет)' && (
        <TableContainer
          id='table-calendarn-grafik-main'
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
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['calendarn-grafik-text']}
                    align='center'
                  >
                    <strong>
                      Перелік видів робіт (у розрізі розділів локальних
                      кошторисів)
                    </strong>
                  </Typography>
                </TableCell>
                <TableCell sx={{ width: '20mm' }}>
                  <Typography
                    variant='body2'
                    className={classes['calendarn-grafik-text']}
                    align='center'
                  >
                    <strong>Одиниця виміру</strong>
                  </Typography>
                </TableCell>
                <TableCell sx={{ width: '20mm' }}>
                  <Typography
                    variant='body2'
                    className={classes['calendarn-grafik-text']}
                    align='center'
                  >
                    <strong>Кіль кість</strong>
                  </Typography>
                </TableCell>
              </TableRow>
              {tableRows &&
                tableRows.length > 0 &&
                tableRows.map((row) => (
                  <TableRow key={row.row_id}>
                    <TableCell>
                      <Typography
                        pl={1}
                        variant='body2'
                        className={classes['calendarn-grafik-text']}
                      >
                        {row.serviceWork}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant='body2'
                        className={classes['calendarn-grafik-text']}
                        align='center'
                      >
                        {row.unit}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant='body2'
                        className={classes['calendarn-grafik-text']}
                        align='center'
                      >
                        {row.amount}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {currentContractType === 'Ремсервис (бюджет)' && (
        <TableContainer
          id='table-calendarn-grafik-main2'
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
                <TableCell rowSpan={5}>
                  <Typography
                    variant='body2'
                    className={classes['calendarn-grafik-text']}
                    align='center'
                  >
                    <strong>
                      Перелік видів робіт (у розрізі розділів локальних
                      кошторисів)
                    </strong>
                  </Typography>
                </TableCell>
                <TableCell rowSpan={5}>
                  <Typography
                    variant='body2'
                    className={classes['calendarn-grafik-text']}
                    align='center'
                    sx={{ wordWrap: 'break-word', width: widthColumnUnit }}
                  >
                    <strong>Одиниця виміру</strong>
                  </Typography>
                </TableCell>
                <TableCell rowSpan={5}>
                  <Typography
                    variant='body2'
                    className={classes['calendarn-grafik-text']}
                    align='center'
                    sx={{ wordWrap: 'break-word', width: widthColumnAmount }}
                  >
                    <strong>Кількість</strong>
                  </Typography>
                </TableCell>
                <TableCell colSpan={9}>
                  <Typography
                    variant='body2'
                    className={classes['calendarn-grafik-text']}
                    align='center'
                  >
                    <strong>Строки виконання робіт</strong>
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={9}>
                  <Typography
                    variant='body2'
                    className={classes['calendarn-grafik-text']}
                    align='center'
                  >
                    <strong>{contrDateStr} рік</strong>
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={3}>
                  <Typography
                    variant='body2'
                    className={classes['calendarn-grafik-text']}
                    align='center'
                  >
                    <strong>2 квартал </strong>
                  </Typography>
                </TableCell>
                <TableCell colSpan={3}>
                  <Typography
                    variant='body2'
                    className={classes['calendarn-grafik-text']}
                    align='center'
                  >
                    <strong>3 квартал </strong>
                  </Typography>
                </TableCell>
                <TableCell colSpan={3}>
                  <Typography
                    variant='body2'
                    className={classes['calendarn-grafik-text']}
                    align='center'
                  >
                    <strong>4 квартал </strong>
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow sx={{ height: '30mm' }}>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['calendarn-grafik-vertical-text']}
                    align='center'
                    sx={{ width: widthColumnMonths }}
                  >
                    <strong>квітень</strong>
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['calendarn-grafik-vertical-text']}
                    align='center'
                    sx={{ width: widthColumnMonths }}
                  >
                    <strong>травень </strong>
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['calendarn-grafik-vertical-text']}
                    align='center'
                    sx={{ width: widthColumnMonths }}
                  >
                    <strong>червень </strong>
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['calendarn-grafik-vertical-text']}
                    align='center'
                    sx={{ width: widthColumnMonths }}
                  >
                    <strong>липень </strong>
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['calendarn-grafik-vertical-text']}
                    align='center'
                    sx={{ width: widthColumnMonths }}
                  >
                    <strong>серпень </strong>
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['calendarn-grafik-vertical-text']}
                    align='center'
                    sx={{ width: widthColumnMonths }}
                  >
                    <strong>вересень </strong>
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['calendarn-grafik-vertical-text']}
                    align='center'
                    sx={{ width: widthColumnMonths }}
                  >
                    <strong>жовтень </strong>
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['calendarn-grafik-vertical-text']}
                    align='center'
                    sx={{ width: widthColumnMonths }}
                  >
                    <strong>листопад </strong>
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['calendarn-grafik-vertical-text']}
                    align='center'
                    sx={{ width: widthColumnMonths }}
                  >
                    <strong>грудень </strong>
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={9} sx={{ height: '5mm' }}></TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['calendarn-grafik-text']}
                    align='center'
                  >
                    {contractDescription}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['calendarn-grafik-text']}
                    align='center'
                    sx={{ width: widthColumnUnit }}
                  >
                    {remsCalendarGrafikUnit}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['calendarn-grafik-text']}
                    align='center'
                    sx={{ width: widthColumnAmount }}
                  >
                    {remsCalendarGrafikAmount}
                  </Typography>
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor:
                      startMonthWorkBudjet === 'квітень' ||
                      endMonthWorkBudjet === 'квітень'
                        ? fillColor
                        : undefined,
                  }}
                ></TableCell>
                <TableCell
                  sx={{
                    backgroundColor:
                      startMonthWorkBudjet === 'травень' ||
                      endMonthWorkBudjet === 'травень'
                        ? fillColor
                        : undefined,
                  }}
                ></TableCell>
                <TableCell
                  sx={{
                    backgroundColor:
                      startMonthWorkBudjet === 'червень' ||
                      endMonthWorkBudjet === 'червень'
                        ? fillColor
                        : undefined,
                  }}
                ></TableCell>
                <TableCell
                  sx={{
                    backgroundColor:
                      startMonthWorkBudjet === 'липень' ||
                      endMonthWorkBudjet === 'липень'
                        ? fillColor
                        : undefined,
                  }}
                ></TableCell>
                <TableCell
                  sx={{
                    backgroundColor:
                      startMonthWorkBudjet === 'серпень' ||
                      endMonthWorkBudjet === 'серпень'
                        ? fillColor
                        : undefined,
                  }}
                ></TableCell>
                <TableCell
                  sx={{
                    backgroundColor:
                      startMonthWorkBudjet === 'вересень' ||
                      endMonthWorkBudjet === 'вересень'
                        ? fillColor
                        : undefined,
                  }}
                ></TableCell>
                <TableCell
                  sx={{
                    backgroundColor:
                      startMonthWorkBudjet === 'жовтень' ||
                      endMonthWorkBudjet === 'жовтень'
                        ? fillColor
                        : undefined,
                  }}
                ></TableCell>
                <TableCell
                  sx={{
                    backgroundColor:
                      startMonthWorkBudjet === 'листопад' ||
                      endMonthWorkBudjet === 'листопад'
                        ? fillColor
                        : undefined,
                  }}
                ></TableCell>
                <TableCell
                  sx={{
                    backgroundColor:
                      startMonthWorkBudjet === 'грудень' ||
                      endMonthWorkBudjet === 'грудень'
                        ? fillColor
                        : undefined,
                  }}
                ></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <TableContainer id='table-calendarn-grafik-sign'>
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
                  className={classes['calendarn-grafik-text']}
                  align='center'
                >
                  ПІДРЯДНИК
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['calendarn-grafik-text']}
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
                  className={classes['calendarn-grafik-text']}
                >
                  {executorTypeShort} «{executorName}»{' '}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['calendarn-grafik-text']}
                >
                  {clientTypeShort} «{clientName}»{' '}
                </Typography>
              </TableCell>
            </TableRow>
            {(executorAddress !== '' || clientAddress !== '') && (
              <TableRow>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['calendarn-grafik-text']}
                  >
                    {executorAddress}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['calendarn-grafik-text']}
                  >
                    {clientAddress}
                  </Typography>
                </TableCell>
              </TableRow>
            )}
            {(executograyRPO !== '' || clientEDRPO !== '') && (
              <TableRow>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['calendarn-grafik-text']}
                  >
                    {executograyRPO}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['calendarn-grafik-text']}
                  >
                    {clientEDRPO}
                  </Typography>
                </TableCell>
              </TableRow>
            )}
            {(executorIBAN !== '' || clientIBAN !== '') && (
              <TableRow>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['calendarn-grafik-text']}
                  >
                    {executorIBAN}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['calendarn-grafik-text']}
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
                    className={classes['calendarn-grafik-text']}
                  >
                    {executorTel}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['calendarn-grafik-text']}
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
                    className={classes['calendarn-grafik-text']}
                  >
                    {executorEmail}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['calendarn-grafik-text']}
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
                    className={classes['calendarn-grafik-text']}
                    mb={2}
                  >
                    {executorJobTitleimen}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['calendarn-grafik-text']}
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
                      className={classes['calendarn-grafik-text']}
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
                      className={classes['calendarn-grafik-text']}
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
                  className={classes['calendarn-grafik-text']}
                  align='left'
                >
                  м.п.
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['calendarn-grafik-text']}
                  align='left'
                >
                  м.п.
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
