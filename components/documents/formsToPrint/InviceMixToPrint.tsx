import React from 'react';
import { FloatToSamplesInWordsUkr } from '@/lib/helpers/myPropisUkr';
import {
  I_Contract,
  I_Client,
  I_WorkRows,
  I_LProduct,
} from '@/interfaces/refdata';
import { arr__typeInvoice } from '@/constants/constants';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import classes from './styles.module.scss';

export default function InviceMixToPrint({
  tableAktRows,
  tableNaklRows,
  localOurFirmObj,
  localClientObj,
  localContractObj,

  invoiceNumber,
  invoiceDate,
  naklSum,
  aktSum,
  totalInvoiceSum,
  invoiceDescription,
}: Readonly<{
  tableAktRows: I_WorkRows[];
  tableNaklRows: I_LProduct[];
  localOurFirmObj: I_Client;
  localClientObj: I_Client;
  localContractObj: I_Contract;

  invoiceNumber: string;
  invoiceDate: Date;
  naklSum: number;
  aktSum: number;
  totalInvoiceSum: number;
  invoiceDescription: string;
}>) {
  const sumPropis = FloatToSamplesInWordsUkr(
    isNaN(totalInvoiceSum) ? 0 : totalInvoiceSum
  );
  const invoiceCaption =
    arr__typeInvoice[1].caption +
    ' ' +
    arr__typeInvoice[1].prefix +
    invoiceNumber;

  const invoiceDateToString = new Date(invoiceDate).toLocaleDateString(
    'uk-UA',
    {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }
  );
  const contractDateToString = new Date(
    localContractObj?.contractDate! ?? ''
  ).toLocaleDateString('uk-UA', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  //@ts-ignore
  const ourFirm = `${localOurFirmObj?.firmType!.firmTypeShortName!} « ${
    localOurFirmObj?.clientShortName
  } », ${localOurFirmObj?.edrpou ? `ЄДРПОУ :${localOurFirmObj?.edrpou}` : ''} ${
    localOurFirmObj?.inn ? `ІНН :${localOurFirmObj?.inn}` : ''
  }`;

  const ourFirmAddress = `${localOurFirmObj?.postIndex}, ${localOurFirmObj?.address}`;

  const ourIBAN = localOurFirmObj?.iban;
  //@ts-ignore
  const ourTaxationType = `${localOurFirmObj?.firmType!.firmTypeShortName!} « ${
    localOurFirmObj?.clientShortName
    //@ts-ignore
  } » ${localOurFirmObj?.taxationType.taxationTypeName}`;

  //@ts-ignore
  const payerFirm = `${localClientObj?.firmType!.firmTypeShortName!} « ${
    localClientObj?.clientShortName
  } », ${localClientObj?.edrpou ? `ЄДРПОУ :${localClientObj?.edrpou}` : ''} ${
    localClientObj?.inn ? `ІНН :${localClientObj?.inn}` : ''
  }`;

  const clientFirmAddress = `${localClientObj?.postIndex}, ${localClientObj?.address}`;

  const clientIBAN = localClientObj?.iban;
  const contractNumber = localContractObj?.contractNumber;

  return (
    <div className={classes.page} id='page'>
      <TableContainer id='table-inv-header'>
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
              <TableCell align='center' colSpan={12}>
                <Typography variant='h5'>{invoiceCaption}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align='center' colSpan={12}>
                <Typography variant='h6'>Від {invoiceDateToString}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}>
                <Typography variant='body2'>Постачальник:</Typography>
              </TableCell>
              <TableCell colSpan={9}>
                <Typography variant='body2'>{ourFirm}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}>
                <Typography variant='body2'>Адреса:</Typography>
              </TableCell>
              <TableCell colSpan={9}>
                <Typography variant='body2'>{ourFirmAddress}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}>
                <Typography variant='body2'>IBAN:</Typography>
              </TableCell>
              <TableCell colSpan={9}>
                <Typography variant='body2'>{ourIBAN}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align='left' colSpan={12}>
                <Typography variant='body2'>{ourTaxationType}</Typography>
              </TableCell>
            </TableRow>
            <TableRow sx={{ height: '10px' }}>
              <TableCell align='center' sx={{ width: '7mm' }}></TableCell>
              <TableCell align='center' sx={{ width: '7mm' }}></TableCell>
              <TableCell align='center' sx={{ width: '12mm' }}></TableCell>
              <TableCell align='center' colSpan={5}></TableCell>
              <TableCell align='center' sx={{ width: '16mm' }}></TableCell>
              <TableCell align='center' sx={{ width: '18mm' }}></TableCell>
              <TableCell align='center' sx={{ width: '20mm' }}></TableCell>
              <TableCell align='center' sx={{ width: '20mm' }}></TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}>
                <Typography variant='body2'>Платник:</Typography>
              </TableCell>
              <TableCell colSpan={9}>
                <Typography variant='body2'>{payerFirm}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}>
                <Typography variant='body2'>Адреса:</Typography>
              </TableCell>
              <TableCell colSpan={9}>
                <Typography variant='body2'>{clientFirmAddress}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}>
                <Typography variant='body2'>IBAN:</Typography>
              </TableCell>
              <TableCell colSpan={9}>
                <Typography variant='body2'>{clientIBAN}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align='left' colSpan={12}>
                <Typography variant='body2'>
                  Договір № {contractNumber} від {contractDateToString}
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <TableContainer id='table-inv-main'>
        <Table
          padding='none'
          sx={{
            width: '100%',
            margin: 0,
            // backgroundColor: 'white',
          }}
        >
          <TableBody
            className={classes['table-main']}
            // sx={{
            //   '& td,th': {
            //     border: '1px solid black',
            //   },
            // }}
          >
            <TableRow sx={{ height: 0 }}>
              <TableCell align='center' sx={{ width: '7mm' }}></TableCell>
              <TableCell align='center' sx={{ width: '7mm' }}></TableCell>
              <TableCell align='center' sx={{ width: '12mm' }}></TableCell>
              <TableCell align='center' colSpan={5}></TableCell>

              <TableCell align='center' sx={{ width: '12mm' }}></TableCell>
              <TableCell align='center' sx={{ width: '16mm' }}></TableCell>
              <TableCell align='center' sx={{ width: '18mm' }}></TableCell>
              <TableCell align='center' sx={{ width: '20mm' }}></TableCell>
              <TableCell align='center' sx={{ width: '20mm' }}></TableCell>
            </TableRow>

            <TableRow>
              <TableCell align='center' sx={{ width: '7mm' }}>
                <Typography variant='body2'>№ п/п</Typography>
              </TableCell>
              <TableCell align='center' colSpan={8}>
                <Typography variant='body2'>Найменування</Typography>
              </TableCell>
              <TableCell align='center' sx={{ width: '16mm' }}>
                <Typography variant='body2'>Од. Вимиру</Typography>
              </TableCell>
              <TableCell align='center' sx={{ width: '18mm' }}>
                <Typography variant='body2'>Кількість</Typography>
              </TableCell>
              <TableCell align='center' sx={{ width: '20mm' }}>
                <Typography variant='body2'>Ціна без ПДВ,грн.</Typography>
              </TableCell>
              <TableCell align='center' sx={{ width: '20mm' }}>
                <Typography variant='body2'>Сума без ПДВ,грн</Typography>
              </TableCell>
            </TableRow>

            {tableAktRows && tableAktRows.length > 0 && (
              <>
                <TableRow>
                  <TableCell align='center' sx={{ width: '7mm' }}></TableCell>
                  <TableCell align='center' colSpan={8} sx={{ paddingLeft: 1 }}>
                    <Typography variant='body2'>
                      <strong>Робота</strong>
                    </Typography>
                  </TableCell>
                  <TableCell align='center' sx={{ width: '16mm' }}></TableCell>
                  <TableCell align='center' sx={{ width: '18mm' }}></TableCell>
                  <TableCell align='center' sx={{ width: '20mm' }}></TableCell>
                  <TableCell align='center' sx={{ width: '20mm' }}></TableCell>
                </TableRow>

                {tableAktRows &&
                  tableAktRows.length > 0 &&
                  tableAktRows.map((item, rowIndex) => (
                    <TableRow key={item.row_id}>
                      <TableCell align='center'>
                        <Typography variant='body2'>{rowIndex + 1}</Typography>
                      </TableCell>
                      <TableCell
                        colSpan={8}
                        align='left'
                        sx={{ paddingLeft: 1 }}
                      >
                        <Typography variant='body2'>
                          {item.workName} {item.extraInformation ?? ''}
                        </Typography>
                      </TableCell>
                      <TableCell align='center'>
                        <Typography variant='body2'>{item.unit}</Typography>
                      </TableCell>
                      <TableCell align='center'>
                        <Typography variant='body2'>{item.amount}</Typography>
                      </TableCell>
                      <TableCell align='center'>
                        <Typography variant='body2'>{item.price}</Typography>
                      </TableCell>
                      <TableCell align='center'>
                        <Typography variant='body2'>{item.rowSum}</Typography>
                      </TableCell>
                    </TableRow>
                  ))}

                <TableRow>
                  <TableCell align='center'>{` `}</TableCell>
                  <TableCell colSpan={8} align='left' sx={{ paddingLeft: 1 }}>
                    <Typography variant='body2'>
                      {' '}
                      <strong>Разом робота</strong>
                    </Typography>
                  </TableCell>
                  <TableCell align='center'>{` `}</TableCell>
                  <TableCell align='center'>{` `}</TableCell>
                  <TableCell align='center'>{` `}</TableCell>
                  <TableCell align='center'>
                    <Typography variant='body2'>{aktSum.toFixed(2)}</Typography>
                  </TableCell>
                </TableRow>
              </>
            )}
            {tableNaklRows && tableNaklRows.length > 0 && (
              <>
                <TableRow>
                  <TableCell align='center'>{` `}</TableCell>
                  <TableCell colSpan={8} align='center' sx={{ paddingLeft: 1 }}>
                    <Typography variant='body2'>
                      <strong>Будматеріал</strong>
                    </Typography>
                  </TableCell>
                  <TableCell align='center'>{` `}</TableCell>
                  <TableCell align='center'>{` `}</TableCell>
                  <TableCell align='center'>{` `}</TableCell>
                  <TableCell align='center'>{` `}</TableCell>
                </TableRow>

                {tableNaklRows &&
                  tableNaklRows.length > 0 &&
                  tableNaklRows.map((item, rowIndex) => (
                    <TableRow key={item.row_id}>
                      <TableCell align='center'>
                        <Typography variant='body2'>{rowIndex + 1}</Typography>
                      </TableCell>
                      <TableCell
                        colSpan={8}
                        align='left'
                        sx={{ paddingLeft: 1 }}
                      >
                        <Typography variant='body2'>
                          {item.product} {item.extraInformation ?? ''}
                        </Typography>
                      </TableCell>
                      <TableCell align='center'>
                        <Typography variant='body2'>{item.unit}</Typography>
                      </TableCell>
                      <TableCell align='center'>
                        <Typography variant='body2'>{item.amount}</Typography>
                      </TableCell>
                      <TableCell align='center'>
                        <Typography variant='body2'>{item.price}</Typography>
                      </TableCell>
                      <TableCell align='center'>
                        <Typography variant='body2'>{item.rowSum}</Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                <TableRow>
                  <TableCell align='center'>{` `}</TableCell>
                  <TableCell colSpan={8} align='left' sx={{ paddingLeft: 1 }}>
                    <Typography variant='body2'>
                      <strong>Разом матеріали</strong>
                    </Typography>
                  </TableCell>
                  <TableCell align='center'>{` `}</TableCell>
                  <TableCell align='center'>{` `}</TableCell>
                  <TableCell align='center'>{` `}</TableCell>
                  <TableCell align='center'>
                    <Typography variant='body2'>
                      {naklSum.toFixed(2)}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align='center'>{` `}</TableCell>
                  <TableCell colSpan={8} align='left' sx={{ paddingLeft: 1 }}>
                    <Typography variant='body2'>
                      <strong>Разом матеріали і робота</strong>
                    </Typography>
                  </TableCell>
                  <TableCell align='center'>{` `}</TableCell>
                  <TableCell align='center'>{` `}</TableCell>
                  <TableCell align='center'>{` `}</TableCell>
                  <TableCell align='center'>
                    <Typography variant='body2'>
                      {totalInvoiceSum.toFixed(2)}
                    </Typography>
                  </TableCell>
                </TableRow>
              </>
            )}
          </TableBody>

          <TableBody
            sx={{
              '& td,th': {
                border: '1px solid transparent',
              },
            }}
          >
            {' '}
            <TableRow>
              <TableCell></TableCell>
              <TableCell colSpan={11}>
                <Typography
                  variant='body2'
                  sx={{ color: 'black', paddingLeft: 5 }}
                >
                  Всього без ПДВ
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  align='center'
                  sx={{ color: 'black' }}
                >
                  {totalInvoiceSum.toFixed(2)}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell colSpan={11}>
                <Typography
                  variant='body2'
                  sx={{ color: 'black', paddingLeft: 5 }}
                >
                  ПДВ
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  align='center'
                  sx={{ color: 'black' }}
                >
                  0,00
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell colSpan={11}>
                <Typography
                  variant='body2'
                  sx={{ color: 'black', paddingLeft: 5 }}
                >
                  Загальна сума без ПДВ
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  align='center'
                  sx={{ color: 'black' }}
                >
                  {totalInvoiceSum.toFixed(2)}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={12}>
                <Typography variant='body1' align='left'>
                  Всього до сплати: <strong>{sumPropis}</strong>
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={12}>
                <Typography variant='body1' align='left'>
                  Призначення платежу: <strong>{invoiceDescription}</strong>
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}></TableCell>
              <TableCell colSpan={9}>
                <Typography variant='body1' align='left'>
                  Керівник ____________________
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}></TableCell>
              <TableCell colSpan={9}>
                <Typography variant='body1' align='left'>
                  <strong>М.П.</strong>
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
