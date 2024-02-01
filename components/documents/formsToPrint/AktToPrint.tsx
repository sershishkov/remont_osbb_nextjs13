import React from 'react';

import { FloatToSamplesInWordsUkr } from '@/lib/helpers/myPropisUkr';

import { I_Client, I_Contract, I_WorkRows } from '@/interfaces/refdata';

import { arr__typeAkt } from '@/constants/constants';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Grid from '@mui/material/Grid';

import classes from './styles.module.css';

function AktToPrint({
  aktOfWorkNumber,
  aktOfWorkDate,
  ourFirmObj,
  clientObj,
  contractObj,
  typeAkt,
  aktSum,
  tableRows,
}: Readonly<{
  aktOfWorkNumber: string;
  aktOfWorkDate: Date;
  ourFirmObj: I_Client;
  clientObj: I_Client;
  contractObj: I_Contract;

  typeAkt: string;
  aktSum: number;
  tableRows: I_WorkRows[];
}>) {
  const sumPropis = FloatToSamplesInWordsUkr(aktSum);
  const objTypeAkt = arr__typeAkt.find((item) => item._id === typeAkt);
  const aktCaption =
    objTypeAkt?.caption + ' ' + objTypeAkt?.prefix + aktOfWorkNumber;
  const aktDateToString = new Date(aktOfWorkDate).toLocaleDateString('uk-UA', {
    // day: '2-digit',
    // month: 'long',
    year: 'numeric',
  });
  const contractDateToString = new Date(
    contractObj?.contractDate! ?? ''
  ).toLocaleDateString('uk-UA', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  //@ts-ignore
  const ourFirm = `${ourFirmObj?.firmType!.firmTypeShortName!} « ${
    ourFirmObj?.clientShortName
  } », ${ourFirmObj?.edrpou ? `ЄДРПОУ :${ourFirmObj?.edrpou}` : ''} ${
    ourFirmObj?.inn ? `ІНН :${ourFirmObj?.inn}` : ''
  }`;

  const ourFirmAddress = `${ourFirmObj?.postIndex}, ${ourFirmObj?.address}`;

  const ourIBAN = ourFirmObj?.iban;

  //@ts-ignore
  const payerFirm = `${clientObj?.firmType!.firmTypeShortName!} « ${
    clientObj?.clientShortName
  } », ${clientObj?.edrpou ? `ЄДРПОУ :${clientObj?.edrpou}` : ''} ${
    clientObj?.inn ? `ІНН :${clientObj?.inn}` : ''
  }`;

  const clientFirmAddress = `${clientObj?.postIndex}, ${clientObj?.address}`;

  const clientIBAN = clientObj?.iban;

  const contractNumber = contractObj?.contractNumber;
  const ourBoss = `${
    ourFirmObj?.firstName_imen
  } ${ourFirmObj?.lastName_imen?.toUpperCase()}`;
  const ourBossLong = `${ourFirmObj?.lastName_imen} ${ourFirmObj?.firstName_imen} ${ourFirmObj?.patronymic_imen}`;

  const clientBoss = `${
    clientObj?.firstName_imen
  } ${clientObj?.lastName_imen?.toUpperCase()}`;

  const clientBossLong = `${clientObj?.lastName_imen} ${clientObj?.firstName_imen} ${clientObj?.patronymic_imen}`;

  return (
    <div className={classes.page} id='page'>
      <TableContainer sx={{ margin: 0 }} id='table-to-save'>
        <Table
          padding='none'
          sx={{
            width: '100%',
            margin: 0,
            backgroundColor: 'white',
            '& td,th': {
              color: 'black',
            },
          }}
        >
          <TableHead
            sx={{
              '& td, th': {
                borderBottom: '1px solid transparent',
              },
            }}
          >
            <TableRow
              sx={{
                height: '1mm',
                '& td, th': {
                  // color: 'transparent',
                  visibility: 'hidden',
                },
              }}
            >
              <TableCell
                align='center'
                sx={{
                  width: '8mm',
                }}
              >
                1
              </TableCell>
              <TableCell align='center'>2</TableCell>
              <TableCell align='center'>3</TableCell>
              <TableCell align='center'>4</TableCell>
              <TableCell align='center'>5</TableCell>
              <TableCell align='center'>6</TableCell>
              <TableCell
                align='center'
                sx={{
                  width: '16mm',
                }}
              >
                7
              </TableCell>
              <TableCell
                align='center'
                sx={{
                  width: '20mm',
                }}
              >
                8
              </TableCell>
              <TableCell
                align='center'
                sx={{
                  width: '20mm',
                }}
              >
                9
              </TableCell>
              <TableCell
                align='center'
                sx={{
                  width: '20mm',
                }}
              >
                10
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={5} align='center'>
                ВИКОНАВЕЦЬ
              </TableCell>
              <TableCell colSpan={5} align='center'>
                ЗАМОВНИК
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                colSpan={5}
                align='left'
                sx={{
                  verticalAlign: 'top',
                }}
              >
                {ourFirm}
              </TableCell>
              <TableCell
                colSpan={5}
                align='left'
                sx={{
                  verticalAlign: 'top',
                }}
              >
                {payerFirm}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                colSpan={5}
                align='left'
                sx={{
                  verticalAlign: 'top',
                }}
              >
                Адреса: {ourFirmAddress}
              </TableCell>
              <TableCell
                colSpan={5}
                align='left'
                sx={{
                  verticalAlign: 'top',
                }}
              >
                Адреса: {clientFirmAddress}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                colSpan={5}
                align='left'
                sx={{
                  verticalAlign: 'top',
                }}
              >
                IBAN: {ourIBAN}
              </TableCell>
              <TableCell
                colSpan={5}
                align='left'
                sx={{
                  verticalAlign: 'top',
                }}
              >
                IBAN: {clientIBAN}
              </TableCell>
            </TableRow>

            <TableRow
              sx={{
                '& td,th': {
                  color: 'transparent',
                  visibility: 'hidden',
                },
              }}
            >
              <TableCell colSpan={10} align='center'>
                разделитель
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={10} align='center'>
                {aktCaption}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={10} align='center'>
                Від &quot;___&quot;_______________{aktDateToString} р.
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={10} align='left'>
                Договір № {contractNumber} від {contractDateToString}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={6} align='left'>
                Ми,що нижче підписалися, представник Замовника :
              </TableCell>
              <TableCell colSpan={4} align='left'>
                {ourBossLong}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={6} align='left'>
                та представник Виконавця :
              </TableCell>
              <TableCell colSpan={4} align='left'>
                {clientBossLong}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={10} align='left'>
                склали цей АКТ про те, що Виконавець належнім чином і в повному
                обсязі виконав (надав), а Замовник прийняв роботи (послуги):
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody
            sx={{
              outline: '1px solid black',
              '& td,th': {
                border: '1px solid black',
              },
            }}
          >
            <TableRow
              sx={{
                outline: '1px solid black',
                '& td,th': {
                  border: '1px solid black',
                },
              }}
            >
              <TableCell align='center'>№ п/п</TableCell>
              <TableCell align='center' colSpan={5}>
                Найменування
              </TableCell>
              <TableCell align='center'>Од. Вимиру</TableCell>
              <TableCell align='center'>Кількість</TableCell>
              <TableCell align='center'>Ціна без ПДВ,грн.</TableCell>
              <TableCell align='center'>Сума без ПДВ,грн</TableCell>
            </TableRow>
            {tableRows &&
              tableRows.length > 0 &&
              tableRows.map((item, rowIndex) => (
                <TableRow key={item.row_id}>
                  <TableCell align='center'>{rowIndex + 1}</TableCell>
                  <TableCell align='left' colSpan={5}>
                    {item.workName} {item.extraInformation}
                  </TableCell>
                  <TableCell align='center'>{item.unit}</TableCell>
                  <TableCell align='center'>{item.amount}</TableCell>
                  <TableCell align='center'>{item.price}</TableCell>
                  <TableCell align='center'>{item.rowSum}</TableCell>
                </TableRow>
              ))}
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
              <TableCell align='left' colSpan={8}>
                Всього без ПДВ
              </TableCell>
              <TableCell align='center'>{aktSum.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align='left' colSpan={8}>
                ПДВ
              </TableCell>
              <TableCell align='center'>0,00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align='left' colSpan={8}>
                Загальна сума без ПДВ
              </TableCell>
              <TableCell align='center'>{aktSum.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align='left' colSpan={10}>
                Загальна вартість виконаних робіт (послуг):{' '}
                {`(${sumPropis}).), без ПДВ.`}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align='left' colSpan={10}>
                Сторони одна до одної претензій не мають.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align='left' colSpan={5}>
                ВИКОНАВЕЦ
              </TableCell>
              <TableCell align='left' colSpan={5}>
                ЗАМОВНИК
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align='center' colSpan={5}>
                <Grid container direction='row'>
                  <Grid
                    item
                    sx={{
                      borderBottom: '1px solid black',
                      flex: 1,
                    }}
                  ></Grid>
                  <Grid item sx={{ flex: 1 }}>
                    {ourBoss}
                  </Grid>
                </Grid>
              </TableCell>
              <TableCell align='center' colSpan={5}>
                <Grid container direction='row'>
                  <Grid
                    item
                    sx={{ borderBottom: '1px solid black', flex: 1 }}
                  ></Grid>
                  <Grid item sx={{ flex: 1 }}>
                    {clientBoss}
                  </Grid>
                </Grid>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align='left' colSpan={5}>
                МП
              </TableCell>
              <TableCell align='left' colSpan={5}>
                МП
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default AktToPrint;
