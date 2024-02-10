import React from 'react';

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';

import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';

import TableRow from '@mui/material/TableRow';

import IconButton from '@mui/material/IconButton';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PlusOneIcon from '@mui/icons-material/PlusOne';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

import MySelectAutoCompl from '@/components/common/MySelectAutoCompl';

function TableNakladnayaOrAkt({
  linkToAddNewItem,
  mainFieldCaption,
  mainFieldnName,
  mainFieldId,
  tableRows,
  naklSum,
  arrToSelectInMainColumn,

  addTableRow,
  deleteTableRow,
  rowGoUp,
  rowGowDown,
  recalcRow,
  handleChangeInputsInRow,
  handleChangeSelectsMainField,
  showExtraInformation = false,
}: Readonly<{
  linkToAddNewItem: string;
  mainFieldCaption: string;
  mainFieldnName: string;
  mainFieldId: string;
  tableRows: any[];
  naklSum: string;
  arrToSelectInMainColumn: any[];

  addTableRow: () => void;
  deleteTableRow: (rowID: string) => void;
  rowGoUp: (rowIndex: number) => void;
  rowGowDown: (rowIndex: number) => void;
  recalcRow: (rowID: string) => void;
  handleChangeInputsInRow: (
    rowID: string,
    fieldName: string,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleChangeSelectsMainField: (
    targetName: string,
    targetValue: string
  ) => void;
  showExtraInformation?: boolean;
}>) {
  return (
    <TableContainer component={Paper} sx={{ maxHeight: 700 }}>
      <Table
        stickyHeader
        padding='none'
        sx={{
          maxWidth: 1200,
          width: '100%',
          minWidth: 900,
          fontSize: '1rem',
          margin: '1rem auto',
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell>
              <IconButton onClick={addTableRow}>
                <PlusOneIcon color='success' sx={{ fontSize: '2rem' }} />
              </IconButton>
            </TableCell>
            <TableCell
              colSpan={showExtraInformation === true ? 6 : 5}
            ></TableCell>
            <TableCell colSpan={3}>
              <Typography>{naklSum}</Typography>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell
              align='center'
              sx={{
                fontSize: '1rem',
                width: '0.5rem',
              }}
            >
              №
            </TableCell>
            <TableCell align='center'>
              <Link href={linkToAddNewItem} variant='button'>
                {mainFieldCaption}
              </Link>
            </TableCell>

            <TableCell
              align='center'
              sx={{
                width: 150,
                display: showExtraInformation ? 'table-cell' : 'none',
              }}
            >
              Доп Инфо
            </TableCell>

            <TableCell align='center' sx={{ width: 75 }}>
              Од. Вимиру
            </TableCell>
            <TableCell align='center' sx={{ width: 100 }}>
              Кількість
            </TableCell>
            <TableCell align='center' sx={{ width: 100 }}>
              Ціна без ПДВ,грн.
            </TableCell>
            <TableCell align='center' sx={{ width: 100 }}>
              Сума без ПДВ,грн
            </TableCell>
            <TableCell colSpan={3} align='center'>
              Действия
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableRows.length > 0 &&
            tableRows.map((row, rowIndex) => (
              <TableRow key={row.row_id}>
                <TableCell align='center'>{`${rowIndex + 1}`}</TableCell>
                <TableCell align='center'>
                  <MySelectAutoCompl
                    selectName={`${mainFieldnName}_${row.row_id}`}
                    selectLabel={``}
                    fieldToShow={mainFieldnName}
                    handleChangeSelects={handleChangeSelectsMainField}
                    selectedOption={tableRows[rowIndex][mainFieldId]}
                    // @ts-ignore
                    arrToSelect={arrToSelectInMainColumn ?? []}
                  />
                </TableCell>

                <TableCell
                  align='center'
                  sx={{ display: showExtraInformation ? 'table-cell' : 'none' }}
                >
                  <TextField
                    name={`${row.row_id}-extraInformation`}
                    multiline
                    type='text'
                    id={`${row.row_id}-extraInformation`}
                    value={row.extraInformation ?? ''}
                    onChange={(e) =>
                      handleChangeInputsInRow(
                        row.row_id!,
                        'extraInformation',
                        e
                      )
                    }
                  />
                </TableCell>

                <TableCell align='center'>{row.unit ?? ''}</TableCell>
                <TableCell align='center'>
                  <TextField
                    name={`${row.row_id}-amount`}
                    // label='amount'
                    placeholder='0.00'
                    inputProps={{
                      pattern: '/^d*.d{2}$/',
                      // pattern: '^d*.d{4}$',
                      // step: '.01',
                    }}
                    type='number'
                    id={`${row.row_id}-amount`}
                    value={row.amount ?? ''}
                    onChange={(e) =>
                      handleChangeInputsInRow(row.row_id!, 'amount', e)
                    }
                    onBlur={() => recalcRow(row.row_id!)}
                  />
                </TableCell>
                <TableCell align='center'>
                  <TextField
                    name={`${row.row_id}-price`}
                    // label='price'
                    placeholder='0.00'
                    type='number'
                    id={`${row.row_id}-price`}
                    value={row.price ?? ''}
                    onChange={(e) =>
                      handleChangeInputsInRow(row.row_id!, 'price', e)
                    }
                    onBlur={() => recalcRow(row.row_id!)}
                  />
                </TableCell>
                <TableCell align='center'>{`${row.rowSum!}`}</TableCell>
                <TableCell align='center' sx={{ width: 50 }}>
                  <IconButton onClick={() => deleteTableRow(row.row_id!)}>
                    <DeleteForeverIcon
                      color='error'
                      sx={{ fontSize: '1rem' }}
                    />
                  </IconButton>
                </TableCell>
                <TableCell align='center' sx={{ width: 50 }}>
                  <IconButton
                    onClick={() => rowGoUp(rowIndex)}
                    disabled={rowIndex === 0}
                  >
                    <ArrowUpwardIcon
                      color='primary'
                      sx={{ fontSize: '1rem' }}
                    />
                  </IconButton>
                </TableCell>
                <TableCell align='center' sx={{ width: 50 }}>
                  <IconButton
                    onClick={() => rowGowDown(rowIndex)}
                    disabled={rowIndex === tableRows.length - 1}
                  >
                    <ArrowDownwardIcon
                      color='primary'
                      sx={{ fontSize: '1rem' }}
                    />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TableNakladnayaOrAkt;
