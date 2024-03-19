import React from 'react';
import { I_Contract } from '@/interfaces/refdata';

import { FloatToSamplesInWordsUkr } from '@/lib/helpers/myPropisUkr';

import Typography from '@mui/material/Typography';

import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import classes from '../landscape_styles.module.scss';

export default function RemsBudjetProectnKoshtorisToPrint({
  currentContract,
  mode,
}: Readonly<{
  currentContract: I_Contract;
  mode: string;
}>) {
  const contractDescription = currentContract?.contractDescription ?? '??????';
  const totalSumPropis = FloatToSamplesInWordsUkr(1060);
  let textCaption = '';
  let textTable = '';
  if (mode === 'project') {
    textCaption = 'на виконання проектних робіт';
    textTable = 'Виконання кошторисної документації';
  } else if (mode === 'avt') {
    textCaption = 'на виконання авторського нагляду';
    textTable = ' Виконання авторського нагляду';
  } else {
    textCaption = '?????';
    textTable = '?????';
  }
  return (
    <div className={classes['page-landscape']} id='page-landscape'>
      <TableContainer
        id='table-rems-budjet-pr-avt-kosht-header'
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
              <TableCell colSpan={7}>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-pr-avt-kosht-text']}
                  align='right'
                >
                  Форма № 3-П
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={7}>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-pr-avt-kosht-chapter']}
                  align='center'
                >
                  КОШТОРИС
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={7}>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-pr-avt-kosht-text']}
                  align='center'
                >
                  {textCaption}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={7}>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-pr-avt-kosht-text']}
                  align='center'
                >
                  {contractDescription}
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <TableContainer
        id='rems-budjet-pr-avt-kosht-main'
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
              <TableCell rowSpan={2}>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-pr-avt-kosht-text']}
                  align='center'
                >
                  Ч.ч.
                </Typography>
              </TableCell>
              <TableCell rowSpan={2}>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-pr-avt-kosht-text']}
                  align='center'
                >
                  Перелік робіт, що виконуються
                </Typography>
              </TableCell>
              <TableCell rowSpan={2}>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-pr-avt-kosht-text']}
                  align='center'
                >
                  Найменування посад виконавців (виробничий персонал)
                </Typography>
              </TableCell>
              <TableCell rowSpan={2}>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-pr-avt-kosht-text']}
                  align='center'
                >
                  Кількість виконавців
                </Typography>
              </TableCell>
              <TableCell rowSpan={2}>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-pr-avt-kosht-text']}
                  align='center'
                >
                  Витрати труда, люд.днів
                </Typography>
              </TableCell>
              <TableCell colSpan={2}>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-pr-avt-kosht-text']}
                  align='center'
                >
                  Вартість, грн.
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-pr-avt-kosht-text']}
                  align='center'
                >
                  за 1 день
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-pr-avt-kosht-text']}
                  align='center'
                >
                  всього
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ width: '10mm' }}>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-pr-avt-kosht-text']}
                  align='center'
                >
                  1
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-pr-avt-kosht-text']}
                  align='center'
                >
                  2
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '90mm' }}>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-pr-avt-kosht-text']}
                  align='center'
                >
                  3
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '22mm' }}>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-pr-avt-kosht-text']}
                  align='center'
                >
                  4
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '25mm' }}>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-pr-avt-kosht-text']}
                  align='center'
                >
                  5
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '35mm' }}>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-pr-avt-kosht-text']}
                  align='center'
                >
                  6
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '25mm' }}>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-pr-avt-kosht-text']}
                  align='center'
                >
                  7
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-pr-avt-kosht-text']}
                  align='center'
                >
                  1
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-pr-avt-kosht-text']}
                >
                  {textTable}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-pr-avt-kosht-text']}
                >
                  Головний інженер проекту
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-pr-avt-kosht-text']}
                  align='center'
                >
                  1
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-pr-avt-kosht-text']}
                  align='center'
                >
                  0,5
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-pr-avt-kosht-text']}
                  align='center'
                >
                  1,194x1780,00х0,5 = 2125,32
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-pr-avt-kosht-text']}
                  align='center'
                >
                  1063,00
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
              <TableCell></TableCell>
              <TableCell colSpan={2}>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-pr-avt-kosht-text']}
                >
                  <strong>
                    Разом по позиціях кошторису, грн. Коефіціент на підвищення
                    рівня заробітної плати 1,194 /мінімальна заробітна плата
                    2023р -6700грн., мінімальна заробітна плата 2024р-8000грн./
                  </strong>
                </Typography>
              </TableCell>

              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell>
                {' '}
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-pr-avt-kosht-text']}
                  align='center'
                >
                  1063,00
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-pr-avt-kosht-text']}
                >
                  Договірна вартість
                </Typography>
              </TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-pr-avt-kosht-text']}
                  align='center'
                >
                  1060.00
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell colSpan={6}>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-pr-avt-kosht-text']}
                >
                  Вартість роботи: {totalSumPropis}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={7}>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-pr-avt-kosht-sign']}
                  align='center'
                >
                  (сума прописом)
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell colSpan={6}>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-pr-avt-kosht-text']}
                >
                  Головний архітектор проекту
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-pr-avt-kosht-text']}
                >
                  (Головний інженер проекту)
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-pr-avt-kosht-text']}
                  align='center'
                >
                  ____________________________
                </Typography>
              </TableCell>

              <TableCell colSpan={4}>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-pr-avt-kosht-text']}
                >
                  ____________________________
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-pr-avt-kosht-sign']}
                  align='center'
                >
                  (підпис)
                </Typography>
              </TableCell>

              <TableCell colSpan={4}>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-pr-avt-kosht-sign']}
                >
                  (ПІБ)
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-pr-avt-kosht-text']}
                >
                  Кошторис склав
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-pr-avt-kosht-text']}
                  align='center'
                >
                  ____________________________
                </Typography>
              </TableCell>

              <TableCell colSpan={4}>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-pr-avt-kosht-text']}
                >
                  ____________________________
                </Typography>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-pr-avt-kosht-sign']}
                  align='center'
                >
                  (підпис)
                </Typography>
              </TableCell>

              <TableCell colSpan={4}>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-pr-avt-kosht-sign']}
                >
                  (ПІБ)
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
