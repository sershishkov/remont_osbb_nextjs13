import { I_Contract, I_Client } from '@/interfaces/refdata';

import { FloatToSamplesInWordsUkr } from '@/lib/helpers/myPropisUkr';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import classes from '../styles.module.scss';

export default function TehNadzorAktToPrint({
  currentContract,
  currentClient,
}: Readonly<{
  currentContract: I_Contract;
  currentClient: I_Client;
}>) {
  const contractDescription = currentContract?.contractDescription;
  const contrDateStr = new Date(
    currentContract?.contractDate ?? ''
  ).toLocaleDateString('uk-UA', {
    year: 'numeric',
  });
  //@ts-ignore
  const clientTypeShort = currentClient?.firmType?.firmTypeShortName;
  //@ts-ignore

  const clientName = currentClient?.clientShortName;
  const clientAddress = `${currentClient?.postIndex} ${currentClient?.address}`;
  const clientEDRPO = `ЄДРПОУ: ${currentClient?.edrpou}`;

  const clientFIOImen = `${
    currentClient?.firstName_imen
  } ${currentClient?.lastName_imen?.toLocaleUpperCase()}`;
  const paymentSourceProectnAvt = currentContract?.paymentSourceProectnAvt;
  const clientIBAN =
    paymentSourceProectnAvt === 'собств'
      ? currentClient?.iban
      : currentClient?.iban_budget;

  const tehnadzorSumBudjet = currentContract?.tehnadzorSumBudjet;
  const podatokSum = tehnadzorSumBudjet * 0.05;

  const tehnadzorSumBudjetPropis = FloatToSamplesInWordsUkr(tehnadzorSumBudjet);
  return (
    <div className={classes.page} id='page'>
      <TableContainer id='table-tehnadzor-akt-header' sx={{ marginBottom: 2 }}>
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
                  variant='body1'
                  className={classes['tehnadzor-akt-text']}
                  align='center'
                >
                  Акт №_____________
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>
                <Typography
                  variant='body1'
                  className={classes['tehnadzor-akt-text']}
                  align='center'
                >
                  приймання-передачі наданих послуг зі здійснення технічного
                  нагляду
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['tehnadzor-akt-text']}
                  align='left'
                >
                  м. Запоріжжя
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['tehnadzor-akt-text']}
                  align='right'
                >
                  «___»_______________{contrDateStr} року.
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['tehnadzor-akt-caption']}
                  align='left'
                >
                  (місце складання акта)
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['tehnadzor-akt-caption']}
                  align='right'
                >
                  (дата складання акта)
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>
                <Typography
                  mt={2}
                  variant='body2'
                  className={classes['tehnadzor-akt-text']}
                >
                  Ми, що нижче підписалися, представники Замовника ОСББ «
                  КАМ’ЯНОГІРСЬКА-14»,з одного боку, і Виконавець фізична
                  особа-підприємець Сень Андрій Юрійович (кваліфікаційний
                  сертифікат серії № АТ 007959), з іншого боку, склали цей акт
                  про те, що на підставі наведених документів:
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>
                <Typography
                  variant='body2'
                  className={classes['tehnadzor-akt-text']}
                >
                  Договір: Основний договір № ТН___________ від____________
                  {contrDateStr}
                  року
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>
                <Typography
                  variant='body2'
                  className={classes['tehnadzor-akt-text']}
                >
                  Виконавцем були виконанні наступні роботи (надані такі
                  послуги):
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <TableContainer id='table-tehnadzor-akt-main' sx={{ marginBottom: 2 }}>
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
              <TableCell sx={{ width: '10mm' }}>
                <Typography
                  variant='body2'
                  className={classes['tehnadzor-akt-text']}
                  align='center'
                >
                  №
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['tehnadzor-akt-text']}
                  align='center'
                >
                  Найменування робіт, послуг
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '20mm' }}>
                <Typography
                  variant='body2'
                  className={classes['tehnadzor-akt-text']}
                  align='center'
                >
                  Кількість
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '20mm' }}>
                <Typography
                  variant='body2'
                  className={classes['tehnadzor-akt-text']}
                  align='center'
                >
                  Одиниці виміру
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '20mm' }}>
                <Typography
                  variant='body2'
                  className={classes['tehnadzor-akt-text']}
                  align='center'
                >
                  Ціна без ПДВ
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '20mm' }}>
                <Typography
                  variant='body2'
                  className={classes['tehnadzor-akt-text']}
                  align='center'
                >
                  Сума без ПДВ
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
                  1
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['tehnadzor-akt-text']}
                >
                  Технічний нагляд по об’єкту: « {contractDescription} »
                </Typography>
              </TableCell>
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
                  align='center'
                >
                  послуга
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
          </TableBody>
          <TableBody
            sx={{
              '& td,th': {
                border: '1px solid transparent',
              },
            }}
          >
            <TableRow>
              <TableCell colSpan={5}>
                <Typography
                  variant='body2'
                  className={classes['tehnadzor-akt-text']}
                  align='right'
                >
                  Єдиний Податок 5%
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
              <TableCell colSpan={5}>
                <Typography
                  variant='body2'
                  className={classes['tehnadzor-akt-text']}
                  align='right'
                >
                  Всього без ПДВ з єдиним податком:
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
              <TableCell colSpan={6}>
                <Typography
                  mt={2}
                  variant='body2'
                  className={classes['tehnadzor-akt-text']}
                >
                  Загальна вартість робіт (послуг) із єдиним податком без ПДВ:{' '}
                  {tehnadzorSumBudjetPropis}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={6}>
                <Typography
                  variant='body2'
                  className={classes['tehnadzor-akt-text']}
                >
                  Замовник претензій по об’єму, якості та строкам виконання
                  робіт (надання послуг) не має
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <TableContainer id='table-tehnadzor-akt-sign'>
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
                  className={classes['tehnadzor-akt-text']}
                >
                  Від Виконавця
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['tehnadzor-akt-text']}
                >
                  Від Замовника
                </Typography>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['tehnadzor-akt-text']}
                >
                  ФОП Сень Андрій Юрійович
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['tehnadzor-akt-text']}
                >
                  {clientTypeShort} «{clientName}»{' '}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['tehnadzor-akt-text']}
                >
                  65012, м. Одеса, вул. Пантелеймонівська, б. 4, кв. 8
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['tehnadzor-akt-text']}
                >
                  {clientAddress}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['tehnadzor-akt-text']}
                >
                  ЄДРПОУ 2959201778
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['tehnadzor-akt-text']}
                >
                  {clientEDRPO}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['tehnadzor-akt-text']}
                >
                  п/р: UA 703133990000026005030201316, в АТ КБ
                  &ldquo;ПРИВАТБАНК&rdquo;, МФО 313399
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['tehnadzor-akt-text']}
                >
                  {clientIBAN}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Grid container direction={`row`} mt={2}>
                  <Grid
                    item
                    sx={{ flex: 1, borderBottom: '1px solid black' }}
                  ></Grid>
                  <Grid item>
                    <Typography
                      variant='body2'
                      className={classes['tehnadzor-akt-text']}
                      sx={{ paddingRight: '4px' }}
                    >
                      Андрій СЕНЬ
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
                      className={classes['tehnadzor-akt-text']}
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
                  pl={4}
                  variant='body2'
                  className={classes['tehnadzor-akt-caption']}
                  align='left'
                >
                  (підпис)
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  pl={4}
                  variant='body2'
                  className={classes['tehnadzor-akt-caption']}
                  align='left'
                >
                  (підпис)
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
