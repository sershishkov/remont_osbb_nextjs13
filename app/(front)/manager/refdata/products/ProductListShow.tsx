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

import MySelectAutoCompl from '@/components/common/MySelectAutoCompl';
import MySpinner from '@/components/common/MySpinner';

const initState = {
  unit: '',
  productType: '',
  productGroup: '',
};

export default function ProductListShow({
  headerFields,
  tableFields,
  currentURL,
  tableHeader,
}: {
  readonly headerFields: string[];
  readonly tableFields: string[];
  readonly currentURL: string;
  readonly tableHeader: string;
}) {
  const [formData, setFormData] = useState(initState);
  const [arr__Units, setArr__Units] = useState([]);
  const [arr__ProductGroups, setArr__ProductGroups] = useState([]);
  const [arr__ProductTypes, setArr__ProductTypes] = useState([]);

  const [searchText, setSearchText] = useState('');
  const [resultFetch, setResultFetch] = useState({
    items: [],
    total: '',
    totalPages: '',
  });

  const { unit, productType, productGroup } = formData;

  const deleteHanler = async (_id: string) => {
    await delete__one(_id, currentURL);
    setResultFetch(
      await get__all({ page: '0', limit: '0', filter: '' }, currentURL)
    );

    setSearchText('');
  };

  const onChangeSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    const myGetAll = async () => {
      const myItems = await get__all(
        { page: '0', limit: '0', filter: '' },
        currentURL
      );
      const units = await get__all(
        { page: '0', limit: '0', filter: '' },
        '/manager/refdata/unit'
      );
      const productgroups = await get__all(
        { page: '0', limit: '0', filter: '' },
        '/manager/refdata/productgroup'
      );
      const producttypes = await get__all(
        { page: '0', limit: '0', filter: '' },
        '/manager/refdata/producttype'
      );

      setArr__Units(units.items);
      setArr__ProductGroups(productgroups.items);
      setArr__ProductTypes(producttypes.items);
      setResultFetch(myItems);
    };
    myGetAll();
  }, [currentURL]);

  useEffect(() => {
    setSearchText('');
    const searchInput = document.getElementById('searchText');
    searchInput?.focus();
  }, []);

  useEffect(() => {
    if (unit || productType || productGroup || searchText) {
      const myGetAll = async () => {
        const filtered_items = await get__all(
          {
            page: '0',
            limit: '0',
            filter: searchText,
            unit: unit,
            productType: productType,
            productGroup: productGroup,
          },
          currentURL
        );

        setTimeout(() => {
          setResultFetch(filtered_items);
        }, 2000);
      };
      myGetAll();
    }
  }, [unit, productType, productGroup, searchText, currentURL]);

  const handleChangeSelects = (
    targetName: string,
    targetValue: string | string[]
  ) => {
    setFormData((prevState) => ({
      ...prevState,
      [targetName]: targetValue,
    }));
  };

  const getMyItem = (row: any, item: string) => {
    let innerProp;
    if (item.includes('.')) {
      const arrFields = item.split('.');

      if (row[arrFields[0]] !== null) {
        if (arrFields.length === 2) {
          innerProp = row[arrFields[0]][arrFields[1]];
        } else if (arrFields.length === 3) {
          innerProp = row[arrFields[0]][arrFields[1]][arrFields[2]];
        } else if (arrFields.length === 4) {
          innerProp =
            row[arrFields[0]][arrFields[1]][arrFields[2]][arrFields[3]];
        }
      } else {
        innerProp = 'NULL';
      }
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
          <Grid item sx={{ width: 300 }}>
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
          <Grid item sx={{ width: 120 }}>
            <MySelectAutoCompl
              selectName={`unit`}
              selectLabel={`Ед.изм`}
              fieldToShow={`unitName`}
              handleChangeSelects={handleChangeSelects}
              selectedOption={unit ?? ''}
              // @ts-ignore
              arrToSelect={arr__Units}
            />
          </Grid>
          <Grid item sx={{ width: 200 }}>
            <MySelectAutoCompl
              selectName={`productType`}
              selectLabel={`Тип товара`}
              fieldToShow={`productTypeName`}
              handleChangeSelects={handleChangeSelects}
              selectedOption={productType ?? ''}
              // @ts-ignore
              arrToSelect={arr__ProductTypes}
            />
          </Grid>

          <Grid item sx={{ width: 200 }}>
            <MySelectAutoCompl
              selectName={`productGroup`}
              selectLabel={`Группы товаров`}
              fieldToShow={`productGroupName`}
              handleChangeSelects={handleChangeSelects}
              selectedOption={productGroup ?? ''}
              // @ts-ignore
              arrToSelect={arr__ProductGroups}
            />
          </Grid>

          <Grid item>
            <Typography align='center'>{`Найдено:${resultFetch?.items?.length}`}</Typography>
          </Grid>
        </Grid>
      </Grid>
      {!resultFetch?.items || resultFetch?.items.length === 0 ? (
        <MySpinner />
      ) : (
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
                  {headerFields.length > 0 &&
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
                {resultFetch.items.length > 0 &&
                  resultFetch.items.map((row: any) => (
                    <TableRow key={row._id}>
                      {tableFields.length > 0 &&
                        tableFields.map((item) => (
                          <TableCell
                            align='center'
                            key={item}
                            sx={{
                              color:
                                row.hasOwnProperty('isActive') &&
                                row.isActive === false
                                  ? 'red'
                                  : undefined,
                            }}
                          >
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
      )}
    </Grid>
  );
}
