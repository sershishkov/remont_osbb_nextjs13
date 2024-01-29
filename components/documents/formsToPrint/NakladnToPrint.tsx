import React from 'react';

import { FloatToSamplesInWordsUkr } from '@/lib/helpers/myPropisUkr';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';

import classes from './styles.module.css';

const tableRows = [
  {
    _id: 'id_1',
    product: 'Цемент',
    unit: 'мешок',
    amount: 140,
    price: 4,
    rowSum: 560,
  },
  {
    _id: 'id_2',
    product: 'Уголь',
    unit: 'тонна',
    amount: 2,
    price: 500,
    rowSum: 1000,
  },
  {
    _id: 'id_3',
    product: 'Пена',
    unit: 'шт',
    amount: 3,
    price: 120,
    rowSum: 360,
  },
];

function NakladnToPrint() {
  const sumPropis = FloatToSamplesInWordsUkr(1011.54);
  return (
    <div className={classes.page}>
      <TableContainer>
        <Table
          padding='none'
          sx={{
            width: '100%',
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
                '& td, th': {
                  color: 'transparent',
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
                ВИДАТКОВА НАКЛАДНА № ВН-24.01.08.10.15
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={10} align='center'>
                Від 08 січня 2024 року
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3} align='left'>
                Постачальник
              </TableCell>
              <TableCell colSpan={7} align='left'>
                ТОВ «АЗОТЕЯ 2» ЄДРПОУ : 44438025
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3} align='left'>
                Адреса:
              </TableCell>
              <TableCell colSpan={7} align='left'>
                69104 м. Запоріжжя, вул. Чумаченка, буд.23В, кв. 123
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3} align='left'>
                IBAN:
              </TableCell>
              <TableCell colSpan={7} align='left'>
                UA59 307770 00000 26004211129297 ПАТ &quot; Акцент-БАНК &quot;,
                МФО 307770
              </TableCell>
            </TableRow>
            <TableRow sx={{ marginBottom: '20mm' }}>
              <TableCell colSpan={10} align='left'>
                ТОВ «АЗОТЕЯ 2» є платником на прибуток на загальних засадах (без
                ПДВ).
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
                ОСББ « Добробут 35 » ЄДРПОУ : 40282339
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3} align='left'>
                Адреса:
              </TableCell>
              <TableCell colSpan={7} align='left'>
                69121, м.Запоріжжя,вул.Днiпровськi Пороги, 35
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3} align='left'>
                IBAN:
              </TableCell>
              <TableCell colSpan={7} align='left'>
                UA203204780000026009924440846, АБ &quot;УКРГАЗБАНК &quot;, МФО
                320478
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={10} align='left'>
                Договір № 24.01.08.10.17 від « 08 » січня 2024 року
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
                <TableRow key={item._id}>
                  <TableCell align='center'>{rowIndex + 1}</TableCell>
                  <TableCell align='left' colSpan={5}>
                    {item.product}
                  </TableCell>
                  <TableCell align='center'> {item.unit}</TableCell>
                  <TableCell align='center'>{item.amount}</TableCell>
                  <TableCell align='center'>{item.price}</TableCell>
                  <TableCell align='center'>{item.rowSum}</TableCell>
                </TableRow>
              ))}
          </TableBody>
          <TableFooter
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
              <TableCell align='center'>1011,54</TableCell>
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
              <TableCell align='center'>1011,54</TableCell>
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
                __________________ Віталій ТКАЧОВ
              </TableCell>
              <TableCell align='center' colSpan={5}>
                ___________________ Олександр ТРОЦКО
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
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
}

export default NakladnToPrint;
