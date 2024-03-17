import React from 'react';
import {
  I_NakladnayaRems,
  I_ProductInNakladnayaRems,
} from '@/interfaces/refdata';
import { FloatToSamplesInWordsUkr } from '@/lib/helpers/myPropisUkr';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import classes from '../styles.module.scss';

export default function NaklRems2ToPrint({
  currentNakl,
}: Readonly<{
  currentNakl: I_NakladnayaRems;
}>) {
  const percent2 = currentNakl?.percent2;
  let newNaklSum = 0;

  const tableRows = currentNakl?.products?.map(
    (inner_item: I_ProductInNakladnayaRems) => {
      const newPrice = inner_item?.price + (inner_item?.price * percent2) / 100;
      const newRowSum = inner_item?.amount * newPrice;
      newNaklSum += newRowSum;

      return {
        row_id: inner_item._id!.toString(),
        //@ts-ignore
        product: inner_item.product.productName,
        //@ts-ignore
        unit: inner_item.product.unit.unitName,
        extraInformation: inner_item?.extraInformation!,
        amount: inner_item?.amount.toString(),
        price: newPrice?.toFixed(2),
        rowSum: newRowSum?.toFixed(2),
      };
    }
  );
  const nakladnayaRemsNumber2 = currentNakl?.nakladnayaRemsNumber2;

  const contrDateStr = new Date(
    currentNakl?.nakladnayaRemsDate
  ).toLocaleDateString('uk-UA', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
  //@ts-ignore
  const executorFirm2_name = currentNakl?.executorFirm2?.clientShortName;

  const executorFirm2_TypeShort =
    //@ts-ignore
    currentNakl?.executorFirm2?.firmType?.firmTypeShortName;
  //@ts-ignore
  const ourFirm_name = currentNakl?.ourFirm?.clientShortName;

  const ourFirm_TypeShort =
    //@ts-ignore
    currentNakl?.ourFirm?.firmType?.firmTypeShortName;

  const totalSumPropis = FloatToSamplesInWordsUkr(newNaklSum);

  return (
    <div className={classes.page} id='page'>
      <TableContainer id='table-nakl-rems-header' sx={{ marginBottom: 2 }}>
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
                  className={classes['nakl-rems-text']}
                >
                  Видаткова накладна № ВН-{nakladnayaRemsNumber2} від{' '}
                  {contrDateStr}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ width: '40mm' }}>
                <Typography
                  variant='body2'
                  className={classes['nakl-rems-text']}
                >
                  Постачальник:
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['nakl-rems-text']}
                >
                  {executorFirm2_TypeShort} {executorFirm2_name}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['nakl-rems-text']}
                >
                  Покупець:
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['nakl-rems-text']}
                >
                  {ourFirm_TypeShort} «{ourFirm_name}»
                </Typography>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['nakl-rems-text']}
                >
                  Договір:
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['nakl-rems-text']}
                >
                  Основний
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <TableContainer id='table-nakl-rems-main'>
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
              <TableCell sx={{ width: '7mm' }}>
                <Typography
                  variant='body2'
                  className={classes['nakl-rems-text']}
                  align='center'
                >
                  № п/п
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['nakl-rems-text']}
                  align='center'
                >
                  Найменування робіт і витрат
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '20mm' }}>
                <Typography
                  variant='body2'
                  className={classes['nakl-rems-text']}
                  align='center'
                >
                  Од. Вимиру
                </Typography>
              </TableCell>

              <TableCell sx={{ width: '20mm' }}>
                <Typography
                  variant='body2'
                  className={classes['nakl-rems-text']}
                  align='center'
                >
                  Кількість
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '20mm' }}>
                <Typography
                  variant='body2'
                  className={classes['nakl-rems-text']}
                  align='center'
                >
                  Ціна без ПДВ,грн
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '20mm' }}>
                <Typography
                  variant='body2'
                  className={classes['nakl-rems-text']}
                  align='center'
                >
                  Сума без ПДВ,грн
                </Typography>
              </TableCell>
            </TableRow>
            {tableRows &&
              tableRows.length > 0 &&
              tableRows.map((item, rowIndex) => (
                <TableRow key={item.row_id}>
                  <TableCell align='center'>
                    <Typography
                      variant='body2'
                      className={classes['nakl-rems-text']}
                      align='center'
                    >
                      {rowIndex + 1}
                    </Typography>
                  </TableCell>
                  <TableCell align='left' sx={{ paddingLeft: 1 }}>
                    <Typography
                      variant='body2'
                      className={classes['nakl-rems-text']}
                    >
                      {item.product} {item.extraInformation ?? ''}
                    </Typography>
                  </TableCell>
                  <TableCell align='center'>
                    <Typography
                      variant='body2'
                      className={classes['nakl-rems-text']}
                      align='center'
                    >
                      {item.unit}
                    </Typography>
                  </TableCell>
                  <TableCell align='center'>
                    <Typography
                      variant='body2'
                      className={classes['nakl-rems-text']}
                      align='center'
                    >
                      {item.amount}
                    </Typography>
                  </TableCell>
                  <TableCell align='center'>
                    <Typography
                      variant='body2'
                      className={classes['nakl-rems-text']}
                      align='center'
                    >
                      {item.price}
                    </Typography>
                  </TableCell>
                  <TableCell align='center'>
                    <Typography
                      variant='body2'
                      className={classes['nakl-rems-text']}
                      align='center'
                    >
                      {item.rowSum}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['nakl-rems-text']}
                  align='center'
                ></Typography>
              </TableCell>
              <TableCell>
                <Typography
                  pl={1}
                  variant='body2'
                  className={classes['nakl-rems-text']}
                >
                  <strong>Итого материалы</strong>
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['nakl-rems-text']}
                  align='center'
                ></Typography>
              </TableCell>

              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['nakl-rems-text']}
                  align='center'
                ></Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['nakl-rems-text']}
                  align='center'
                ></Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['nakl-rems-text']}
                  align='center'
                >
                  {newNaklSum?.toFixed(2)}
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
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['nakl-rems-text']}
                  align='center'
                ></Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['nakl-rems-text']}
                >
                  Всього без ПДВ
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['nakl-rems-text']}
                  align='center'
                ></Typography>
              </TableCell>

              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['nakl-rems-text']}
                  align='center'
                ></Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['nakl-rems-text']}
                  align='center'
                ></Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['nakl-rems-text']}
                  align='center'
                >
                  {newNaklSum?.toFixed(2)}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['nakl-rems-text']}
                  align='center'
                ></Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['nakl-rems-text']}
                >
                  ПДВ
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['nakl-rems-text']}
                  align='center'
                ></Typography>
              </TableCell>

              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['nakl-rems-text']}
                  align='center'
                ></Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['nakl-rems-text']}
                  align='center'
                ></Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['nakl-rems-text']}
                  align='center'
                >
                  0.00
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['nakl-rems-text']}
                  align='center'
                ></Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['nakl-rems-text']}
                >
                  Загальна сума без ПДВ
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['nakl-rems-text']}
                  align='center'
                ></Typography>
              </TableCell>

              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['nakl-rems-text']}
                  align='center'
                ></Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['nakl-rems-text']}
                  align='center'
                ></Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['nakl-rems-text']}
                  align='center'
                >
                  {newNaklSum?.toFixed(2)}
                </Typography>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={6}>
                <Typography
                  variant='body2'
                  className={classes['nakl-rems-text']}
                >
                  {totalSumPropis}, без ПДВ
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={6}>
                <Typography
                  variant='body2'
                  className={classes['nakl-rems-text']}
                >
                  Місце складання: м. Запоріжжя
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <TableContainer sx={{ marginTop: '1rem' }} id='table-nakl-rems-sign'>
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
              <TableCell sx={{ width: '50%' }}>
                <Typography
                  mb={2}
                  variant='body2'
                  className={classes['nakl-rems-text']}
                >
                  Постачальник
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '50%' }}>
                <Typography
                  mb={2}
                  variant='body2'
                  className={classes['nakl-rems-text']}
                >
                  Отримувач
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ width: '50%' }}>
                <Typography
                  mt={2}
                  variant='body2'
                  className={classes['nakl-rems-text']}
                  sx={{ borderBottom: '1px solid black', width: '95%' }}
                ></Typography>
              </TableCell>
              <TableCell sx={{ width: '50%' }}>
                <Typography
                  mt={2}
                  variant='body2'
                  className={classes['nakl-rems-text']}
                  sx={{ borderBottom: '1px solid black', width: '95%' }}
                ></Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
