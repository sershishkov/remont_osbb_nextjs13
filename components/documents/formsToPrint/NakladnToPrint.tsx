import React from 'react';

import { FloatToSamplesInWordsUkr } from '@/lib/helpers/myPropisUkr';
import { Export22Doc } from '@/lib/helpers/helperFunction';
import { I_Client, I_Contract, I_LProduct } from '@/interfaces/refdata';

import { arr__typeNakl } from '@/constants/constants';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import classes from './styles.module.css';

function NakladnToPrint({
  nakladnayaNumber,
  nakladnayaDate,
  ourFirmObj,
  clientObj,
  contractObj,
  typeNakl,
  naklSum,
  tableRows,
}: Readonly<{
  nakladnayaNumber: string;
  nakladnayaDate: Date;
  ourFirmObj: I_Client;
  clientObj: I_Client;
  contractObj: I_Contract;

  typeNakl: string;
  naklSum: number;
  tableRows: I_LProduct[];
}>) {
  const convertToDocHandler = () => {
    Export22Doc('page', nakladnayaNumber);
  };

  const sumPropis = FloatToSamplesInWordsUkr(naklSum);
  const objTypeNakl = arr__typeNakl.find((item) => item._id === typeNakl);
  const naklCaption =
    objTypeNakl?.caption + ' ' + objTypeNakl?.prefix + nakladnayaNumber;
  const naklDateToString = new Date(nakladnayaDate).toLocaleDateString(
    'uk-UA',
    {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }
  );
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
  const ourTaxationType = `${ourFirmObj?.firmType!.firmTypeShortName!} « ${
    ourFirmObj?.clientShortName
    //@ts-ignore
  } » ${ourFirmObj?.taxationType.taxationTypeName}`;

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

  const clientBoss = `${
    clientObj?.firstName_imen
  } ${clientObj?.lastName_imen?.toUpperCase()}`;

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
                  color: 'transparent',
                  // display: 'none',
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
              <TableCell colSpan={10} align='center'>
                {naklCaption}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={10} align='center'>
                Від {naklDateToString}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3} align='left'>
                Постачальник:
              </TableCell>
              <TableCell colSpan={7} align='left'>
                {ourFirm}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3} align='left'>
                Адреса:
              </TableCell>
              <TableCell colSpan={7} align='left'>
                {ourFirmAddress}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3} align='left'>
                IBAN:
              </TableCell>
              <TableCell colSpan={7} align='left'>
                {ourIBAN}
              </TableCell>
            </TableRow>
            <TableRow sx={{ marginBottom: '20mm' }}>
              <TableCell colSpan={10} align='left'>
                {ourTaxationType}
              </TableCell>
            </TableRow>
            <TableRow
              sx={{
                '& td,th': {
                  color: 'transparent',
                },
              }}
            >
              <TableCell colSpan={10} align='center'>
                разделитель
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3} align='left'>
                Платник:
              </TableCell>
              <TableCell colSpan={7} align='left'>
                {payerFirm}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3} align='left'>
                Адреса:
              </TableCell>
              <TableCell colSpan={7} align='left'>
                {clientFirmAddress}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3} align='left'>
                IBAN:
              </TableCell>
              <TableCell colSpan={7} align='left'>
                {clientIBAN}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={10} align='left'>
                Договір № {contractNumber} від {contractDateToString}
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
                    {item.product} {item.extraInformation}
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
              <TableCell align='center'>{naklSum.toFixed(2)}</TableCell>
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
              <TableCell align='center'>{naklSum.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align='left' colSpan={10}>
                Всього до сплати:{sumPropis}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align='left' colSpan={5}>
                Відпустив
              </TableCell>
              <TableCell align='left' colSpan={5}>
                Отримал
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
      <Grid
        id='convert-buttons'
        container
        direction='row'
        justifyContent='space-around'
        alignItems='center'
        sx={{ display: 'none' }}
      >
        <Grid item>
          <Button fullWidth variant='contained' onClick={convertToDocHandler}>
            Save to Doc
          </Button>
        </Grid>
        <Grid item>
          <Button fullWidth variant='contained' onClick={() => {}}>
            Save to PDF
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default NakladnToPrint;
