import { I_Contract, I_Client } from '@/interfaces/refdata';

import { FloatToSamplesInWordsUkr } from '@/lib/helpers/myPropisUkr';

import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import classes from '../styles.module.scss';
export default function JkhProectnAvtKoshtToPrint({
  currentContract,
  currentClient,
}: Readonly<{
  currentContract: I_Contract;
  currentClient: I_Client;
}>) {
  const contractDescription = currentContract?.contractDescription;

  //@ts-ignore
  const clientTypeShort = currentClient?.firmType?.firmTypeShortName;

  const clientName = currentClient?.clientShortName;

  const proectnSumBudjet = currentContract?.proectnSumBudjet;
  const avtorskSumBudjet = currentContract?.avtorskSumBudjet;

  const totalSum = proectnSumBudjet + avtorskSumBudjet;
  const podatokSum = totalSum * 0.05;

  const totalSumPropis = FloatToSamplesInWordsUkr(totalSum);
  const [totalSumGrn, totalSumKopeyki] = totalSum
    ? totalSum.toFixed(2).split('.')
    : '0.00'.split('.');
  return (
    <div className={classes.page} id='page'>
      <TableContainer
        id='table-jkh-proectn-avt-kosht-header'
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
                  className={classes['jkh-proectn-avt-kosht-text']}
                  align='center'
                >
                  Додаток №1
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>
                <Typography
                  variant='body2'
                  className={classes['jkh-proectn-avt-kosht-text']}
                  align='center'
                >
                  Зведений КОШТОРИС
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>
                <Typography
                  variant='body2'
                  className={classes['jkh-proectn-avt-kosht-text']}
                  align='center'
                >
                  на виконання проектних робіт
                  {avtorskSumBudjet > 0 &&
                    ' та здійснення авторського нагляду'}{' '}
                  по обꞌєкту :
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>
                <Typography
                  variant='body2'
                  className={classes['jkh-proectn-avt-kosht-text']}
                >
                  Найменування підприємства, будівлі, споруди, стану, виду,
                  проектних робіт:
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>
                <Typography
                  variant='body2'
                  className={classes['jkh-proectn-avt-kosht-text']}
                >
                  <strong>« {contractDescription} »</strong>
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ width: '50%' }}>
                <Typography
                  variant='body2'
                  className={classes['jkh-proectn-avt-kosht-text']}
                >
                  Найменування організації Замовника
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '50%' }}>
                <Typography
                  variant='body2'
                  className={classes['jkh-proectn-avt-kosht-text']}
                >
                  {clientTypeShort} « {clientName} »
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ width: '50%' }}>
                <Typography
                  variant='body2'
                  className={classes['jkh-proectn-avt-kosht-text']}
                >
                  Підстава:
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '50%' }}>
                <Typography
                  variant='body2'
                  className={classes['jkh-proectn-avt-kosht-text']}
                >
                  Договір
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <TableContainer
        id='table-jkh-proectn-avt-kosht-akt-main'
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
                  className={classes['jkh-proectn-avt-kosht-akt-text']}
                  align='center'
                >
                  № з/п
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['jkh-proectn-avt-kosht-akt-text']}
                  align='center'
                >
                  Характеристика підприємства, будівлі споруди або виду робіт
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['jkh-proectn-avt-kosht-akt-text']}
                  align='center'
                >
                  № частини, розділів, таблиць і пунктів вказівок до розділу
                  збірки цін на проектні або дослідні роботи
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '20mm' }}>
                <Typography
                  variant='body2'
                  className={classes['jkh-proectn-avt-kosht-akt-text']}
                  align='center'
                >
                  Вартість, грн
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ width: '20mm' }}>
                <Typography
                  variant='body2'
                  className={classes['jkh-proectn-avt-kosht-akt-text']}
                  align='center'
                >
                  1
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['jkh-proectn-avt-kosht-akt-text']}
                >
                  Виконання проектно-кошторисної документації «{' '}
                  {contractDescription} »
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['jkh-proectn-avt-kosht-akt-text']}
                  align='center'
                >
                  Розрахунок вартості згідно таб. Ж.З. ДСТУ Б.Д.1.1-7:2013
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '20mm' }}>
                <Typography
                  variant='body2'
                  className={classes['jkh-proectn-avt-kosht-akt-text']}
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
                    className={classes['jkh-proectn-avt-kosht-akt-text']}
                    align='center'
                  >
                    2
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['jkh-proectn-avt-kosht-akt-text']}
                  >
                    Виконання авторського нагляду « {contractDescription} »
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['jkh-proectn-avt-kosht-akt-text']}
                    align='center'
                  >
                    Розрахунок вартості згідно таб. Ж.З. ДСТУ Б.Д.1.1-7:2013
                  </Typography>
                </TableCell>
                <TableCell sx={{ width: '20mm' }}>
                  <Typography
                    variant='body2'
                    className={classes['jkh-proectn-avt-kosht-akt-text']}
                    align='center'
                  >
                    {avtorskSumBudjet?.toFixed(2)}
                  </Typography>
                </TableCell>
              </TableRow>
            )}
            <TableRow>
              <TableCell sx={{ width: '20mm' }}>
                <Typography
                  variant='body2'
                  className={classes['jkh-proectn-avt-kosht-akt-text']}
                  align='center'
                ></Typography>
              </TableCell>
              <TableCell colSpan={2}>
                <Typography
                  variant='body2'
                  className={classes['jkh-proectn-avt-kosht-akt-text']}
                >
                  Разом по кошторису: (без ПДВ)
                </Typography>
              </TableCell>

              <TableCell sx={{ width: '20mm' }}>
                <Typography
                  variant='body2'
                  className={classes['jkh-proectn-avt-kosht-akt-text']}
                  align='center'
                >
                  {totalSum?.toFixed(2)}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ width: '20mm' }}>
                <Typography
                  variant='body2'
                  className={classes['jkh-proectn-avt-kosht-akt-text']}
                  align='center'
                ></Typography>
              </TableCell>
              <TableCell colSpan={2}>
                <Typography
                  variant='body2'
                  className={classes['jkh-proectn-avt-kosht-akt-text']}
                >
                  Всього: (без ПДВ)
                </Typography>
              </TableCell>

              <TableCell sx={{ width: '20mm' }}>
                <Typography
                  variant='body2'
                  className={classes['jkh-proectn-avt-kosht-akt-text']}
                  align='center'
                >
                  {totalSum?.toFixed(2)}
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
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
                  mt={2}
                  variant='body2'
                  className={classes['jkh-proectn-avt-kosht-akt-text']}
                >
                  Разом по кошторису: {totalSumPropis} без ПДВ у т.ч. єдиний
                  податок 5% - {podatokSum?.toFixed(2)} грн.
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={4}>
                <Typography
                  variant='body2'
                  className={classes['jkh-proectn-avt-kosht-akt-text']}
                >
                  Всього: {totalSumGrn} грн {totalSumKopeyki} коп без ПДВ
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={4}>
                <Typography
                  mt={2}
                  variant='body2'
                  className={classes['jkh-proectn-avt-kosht-akt-text']}
                >
                  ФОП Пастушок Любов Іванівна ____________________________Б/П
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
