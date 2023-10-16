import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';

import Link from '@mui/material/Link';
import CircularProgress from '@mui/material/CircularProgress';

import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';

import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

function TableSimple({
  currentState,
  get__all,
  delete__one,
  headerFields,
  tableFields,
  editLink,
  tableHeader,
}: {
  currentState: string;
  get__all: any;
  delete__one: any;
  headerFields: string[];
  tableFields: string[];
  editLink: string;
  tableHeader: string;
}) {
  const { items, total, isLoading } = useAppSelector((state: RootState) => {
    if (currentState !== 'theme__state' && currentState !== 'auth__state') {
      return state[currentState as keyof typeof state];
    } else {
      return {
        items: [],
        total: 0,
        isLoading: false,
      };
    }
  });

  const dispatch = useAppDispatch();

  const [searchText, set__searchText] = useState('');

  const deleteHanler = (_id: string) => {
    dispatch(delete__one({ _id }));
    dispatch(get__all({ page: 0, limit: 0, filter: '' }));
    set__searchText('');
  };

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    set__searchText(e.target.value);
    setTimeout(() => {
      dispatch(get__all({ page: 0, limit: 0, filter: e.target.value }));
    }, 1000);
  };
  useEffect(() => {
    dispatch(get__all({ page: 0, limit: 0, filter: '' }));
  }, [get__all, dispatch]);

  useEffect(() => {
    set__searchText('');
    const searchInput = document.getElementById('searchText');
    searchInput?.focus();
  }, []);

  const getMyItem = (row: any, item: string) => {
    if (item.includes('.')) {
      const arrFields = item.split('.');
      const innerProp = row[arrFields[0]][arrFields[1]];
      return `${innerProp}`;
    } else {
      return `${row[item]}`;
    }
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <>
      <Grid container alignItems='center' justifyContent='space-between'>
        <Grid item sm={9}>
          <TextField
            margin='normal'
            focused
            fullWidth
            id='searchText'
            name='searchText'
            label='searchText'
            type='search'
            value={searchText}
            onChange={onChangeSearch}
          />
        </Grid>
        <Grid item sm={3}>
          <Typography align='center'>{`Найдено:${items?.length}`}</Typography>
        </Grid>
      </Grid>
      <TableContainer component={Paper} sx={{ maxHeight: 700 }}>
        <Table
          stickyHeader
          sx={{
            maxWidth: 1200,
            width: '100%',
            minWidth: 600,
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell
                colSpan={headerFields.length ? headerFields.length : undefined}
                sx={{ textAlign: 'center' }}
              >
                {`${tableHeader} `}
              </TableCell>
              <TableCell colSpan={2}>{` Всего ${total}`}</TableCell>
            </TableRow>
            <TableRow>
              {headerFields &&
                headerFields.map((item) => (
                  <TableCell align='center' key={item}>
                    {item}
                  </TableCell>
                ))}

              <TableCell style={{ width: 25 }} align='center'>
                edit
              </TableCell>
              <TableCell style={{ width: 25 }} align='center'>
                delete
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items &&
              items.map((row: any) => (
                <TableRow key={row._id}>
                  {tableFields &&
                    tableFields.map((item) => (
                      <TableCell align='center' key={item}>
                        {getMyItem(row, item)}
                      </TableCell>
                    ))}

                  <TableCell align='center'>
                    <IconButton
                      component={Link}
                      href={`${editLink}/${row._id}`}
                    >
                      <EditIcon color='primary' />
                    </IconButton>
                  </TableCell>
                  <TableCell align='center'>
                    <IconButton onClick={() => deleteHanler(row._id)}>
                      <DeleteForeverIcon color='error' />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
          <TableFooter></TableFooter>
        </Table>
      </TableContainer>
    </>
  );
}

export default TableSimple;
