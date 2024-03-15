import { I_Contract, I_Client } from '@/interfaces/refdata';

import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import classes from '../styles.module.scss';

export default function TehNadzorKoshtToPrint({
  currentContract,
  currentClient,
}: Readonly<{
  currentContract: I_Contract;
  currentClient: I_Client;
}>) {
  const contractDescription = currentContract?.contractDescription;
  const tehnadzorSumBudjetGlava1_9 =
    currentContract?.tehnadzorSumBudjetGlava1_9;

  const clientJobTitleimen = currentClient?.jobTitle;
  const clientFIOImen = `${
    currentClient?.firstName_imen
  } ${currentClient?.lastName_imen?.toLocaleUpperCase()}`;

  const tehnadzorSumBudjet = currentContract?.tehnadzorSumBudjet;
  const podatokSum = tehnadzorSumBudjet * 0.05;

  return (
    <div className={classes.page} id='page'>
      <TableContainer
        id='table-tehnadzor-kosht-header'
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
              <TableCell colSpan={2}>
                <Typography
                  variant='body2'
                  className={classes['tehnadzor-akt-text']}
                >
                  Будівництво: « {contractDescription} »
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>
                <Typography
                  variant='body2'
                  className={classes['tehnadzor-akt-text']}
                  align='center'
                >
                  <strong>Розрахунок № 10-1Р</strong>
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>
                <Typography
                  variant='body2'
                  className={classes['tehnadzor-akt-text']}
                  align='center'
                >
                  <strong>
                    Кошти на утримання служби замовника (включаючи кошти на
                    здійснення технiчного нагляду)
                  </strong>
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <TableContainer id='table-tehnadzor-kosht-main' sx={{ marginBottom: 2 }}>
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
              <TableCell sx={{ width: '8mm' }}>
                <Typography
                  variant='body2'
                  className={classes['tehnadzor-akt-text']}
                  align='center'
                >
                  № п/п
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['tehnadzor-akt-text']}
                  align='center'
                >
                  Найменування
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '50mm' }}>
                <Typography
                  variant='body2'
                  className={classes['tehnadzor-akt-text']}
                  align='center'
                >
                  Формула
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '30mm' }}>
                <Typography
                  variant='body2'
                  className={classes['tehnadzor-akt-text']}
                  align='center'
                >
                  Значення
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['tehnadzor-akt-text']}
                  align='center'
                ></Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['tehnadzor-akt-text']}
                >
                  <strong>1. Вихідні дані</strong>
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['tehnadzor-akt-text']}
                  align='center'
                ></Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['tehnadzor-akt-text']}
                  align='center'
                ></Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['tehnadzor-akt-text']}
                  align='center'
                >
                  1
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['tehnadzor-akt-text']}
                >
                  Разом по главах 1-9, Всього кошторисна вартість, усі види
                  робіт і витрат, грн.
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['tehnadzor-akt-text']}
                  align='center'
                >
                  {tehnadzorSumBudjetGlava1_9?.toFixed(2)}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['tehnadzor-akt-text']}
                  align='center'
                >
                  {tehnadzorSumBudjetGlava1_9?.toFixed(2)}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['tehnadzor-akt-text']}
                  align='center'
                >
                  2
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['tehnadzor-akt-text']}
                >
                  Показник для визначення коштів на здійснення технiчного
                  нагляду, 1,5% пункт 5.8.13 ДСТУ Б Д.1.1-1:2013, %
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['tehnadzor-akt-text']}
                  align='center'
                >
                  1,5
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['tehnadzor-akt-text']}
                  align='center'
                >
                  1,5
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['tehnadzor-akt-text']}
                  align='center'
                ></Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['tehnadzor-akt-text']}
                >
                  <strong>2. Розрахунок</strong>
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['tehnadzor-akt-text']}
                  align='center'
                ></Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['tehnadzor-akt-text']}
                  align='center'
                ></Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['tehnadzor-akt-text']}
                  align='center'
                >
                  3
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['tehnadzor-akt-text']}
                >
                  Кошти на утримання служби замовника (включаючи кошти на
                  здійснення технiчного нагляду), грн
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['tehnadzor-akt-text']}
                  align='center'
                >
                  ({tehnadzorSumBudjetGlava1_9?.toFixed(2)}) х 1,5:100
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['tehnadzor-akt-text']}
                  align='center'
                >
                  {tehnadzorSumBudjet?.toFixed(2)}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['tehnadzor-akt-text']}
                  align='center'
                >
                  4
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['tehnadzor-akt-text']}
                >
                  Сума єдиного податку по ставці 5 %, грн
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['tehnadzor-akt-text']}
                  align='center'
                >
                  ({tehnadzorSumBudjet?.toFixed(2)})х5/100
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['tehnadzor-akt-text']}
                  align='center'
                >
                  {podatokSum?.toFixed(2)}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['tehnadzor-akt-text']}
                  align='center'
                >
                  5
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['tehnadzor-akt-text']}
                >
                  <strong>Всього, грн.</strong>
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['tehnadzor-akt-text']}
                ></Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['tehnadzor-akt-text']}
                  align='center'
                >
                  <strong>{tehnadzorSumBudjet?.toFixed(2)}</strong>
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <TableContainer id='table-tehnadzor-kosht-sign'>
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
                  mt={5}
                  mb={5}
                  className={classes['tehnadzor-akt-text']}
                >
                  ФОП Сень А.Ю.________________________
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '50%' }}>
                <Typography
                  mt={5}
                  mb={5}
                  variant='body2'
                  className={classes['tehnadzor-akt-text']}
                ></Typography>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={{ width: '50%' }}>
                <Typography
                  variant='body2'
                  className={classes['tehnadzor-akt-text']}
                >
                  {clientJobTitleimen} _______________________
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '50%' }}>
                <Typography
                  align='right'
                  variant='body2'
                  className={classes['tehnadzor-akt-text']}
                >
                  {clientFIOImen}{' '}
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
