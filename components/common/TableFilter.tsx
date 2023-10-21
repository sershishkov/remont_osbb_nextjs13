'use client';
import React, { useState, useEffect } from 'react';

import { get__all, delete__one } from '@/lib/actions/refdata.actions';

import Link from '@mui/material/Link';

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
  headerFields,
  tableFields,
  currentURL,
  tableHeader,
}: {
  headerFields: string[];
  tableFields: string[];
  currentURL: string;
  tableHeader: string;
}) {
  const [searchText, set__searchText] = useState('');
  const [resultFetch, set_resultFetch] = useState({
    items: [],
    total: '',
    totalPages: '',
  });

  const deleteHanler = async (_id: string) => {
    await delete__one(_id, currentURL);
    set_resultFetch(
      await get__all({ page: '0', limit: '0', filter: '' }, currentURL)
    );

    set__searchText('');
  };

  const onChangeSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    set__searchText(e.target.value);

    setTimeout(async () => {
      const all_items = get__all(
        { page: '0', limit: '0', filter: e.target.value },
        currentURL
      );
      set_resultFetch(await all_items);
    }, 1000);
  };

  useEffect(() => {
    const myGetAll = async () => {
      const myItems = await get__all(
        { page: '0', limit: '0', filter: '' },
        currentURL
      );
      set_resultFetch(myItems);
    };
    myGetAll();
  }, [currentURL]);

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

  return (
    <Grid
      container
      alignItems='center'
      direction='column'
      sx={{
        // border: '1px solid yellow',
        maxWidth: 1200,
        minWidth: 600,
      }}
    >
      <Grid item sx={{ width: '100%' }}>
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
            <Typography align='center'>{`Найдено:${resultFetch.items?.length}`}</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item sx={{ width: '100%' }}>
        <TableContainer
          component={Paper}
          sx={
            {
              // maxWidth: 1200,
              // minWidth: 600,
              // maxHeight: 700,
              // margin: '0 auto',
              // padding: 0,
              // border: '1px solid red',
            }
          }
        >
          <Table
            stickyHeader
            sx={{
              width: '100%',
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell
                  colSpan={
                    headerFields.length ? headerFields.length : undefined
                  }
                  sx={{ textAlign: 'center' }}
                >
                  {`${tableHeader} `}
                </TableCell>
                <TableCell
                  colSpan={2}
                >{` Всего ${resultFetch.total}`}</TableCell>
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
              {resultFetch.items &&
                resultFetch.items.map((row: any) => (
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
                        href={`${currentURL}/${row._id}`}
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
      </Grid>
    </Grid>
  );
}

export default TableSimple;
