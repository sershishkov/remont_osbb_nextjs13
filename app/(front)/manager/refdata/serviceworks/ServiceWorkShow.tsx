'use client';
import React, { useState, useEffect } from 'react';

import { get__all, delete__one } from '@/lib/actions/refdata.actions';

import Link from '@mui/material/Link';

import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';

import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import MySelectAutoCompl from '@/components/common/MySelectAutoCompl';
import MySelectMultipleAutoCompl from '@/components/common/MySelectMultipleAutoCompl';
import MySpinner from '@/components/common/MySpinner';

const initState = {
  unit: '',
  serviceWorkGroup: [],
  products: [],
  inventars: [],
  tools: [],
  equipment: [],
  workerProtection: [],
};

const headerFields = [
  'Наименование',
  'ед.изм',
  'Цена вход',
  'Группы работ',

  'Материалы',
  'Инвентарь',
  'Инструмент',
  'Оборудование',
  'Средства защиты',
];

const tableFields = [
  'serviceWorkName',
  'unit',
  'priceWorkerRecommend',
  'serviceWorkGroup',

  'products',
  'inventars',
  'tools',
  'equipment',
  'workerProtection',
];

const arrToShow = (enteredArr: any) => {
  const localArr = JSON.parse(JSON.stringify(enteredArr));

  const transformedArr = localArr.map((currentItem: any) => {
    let serviceWork__ToString = '';
    let products__ToString = '';
    let inventars__ToString = '';
    let tools__ToString = '';
    let equipment__ToString = '';
    let workerProtection__ToString = '';

    currentItem.serviceWorkGroup.forEach((element: any) => {
      serviceWork__ToString += `${element.serviceWorkGroupName}, `;
    });

    currentItem.products.forEach((element: any) => {
      products__ToString += `${element.productName}, `;
    });
    currentItem.inventars.forEach((element: any) => {
      inventars__ToString += `${element.productName}, `;
    });
    currentItem.tools.forEach((element: any) => {
      tools__ToString += `${element.productName}, `;
    });
    currentItem.equipment.forEach((element: any) => {
      equipment__ToString += `${element.productName}, `;
    });
    currentItem.workerProtection.forEach((element: any) => {
      workerProtection__ToString += `${element.productName}, `;
    });

    return {
      _id: currentItem._id,
      serviceWorkName: currentItem.serviceWorkName,
      unit: currentItem.unit.unitName,
      priceWorkerRecommend: currentItem.priceWorkerRecommend,
      serviceWorkGroup: serviceWork__ToString,

      products: products__ToString,
      inventars: inventars__ToString,
      tools: tools__ToString,
      equipment: equipment__ToString,
      workerProtection: workerProtection__ToString,
    };
  });
  return transformedArr;
};

export default function ServiceWorkShow({
  currentURL,
  tableHeader,
}: {
  readonly currentURL: string;
  readonly tableHeader: string;
}) {
  const [formData, setFormData] = useState(initState);
  const [countTotalItems, setCountTotalItems] = useState(0);
  const [arr__Units, setArr__Units] = useState([]);
  const [arr__ServiceWorkGroups, setArr__ServiceWorkGroups] = useState([]);
  const [arr__Materials, setArr__Materials] = useState([]);
  const [arr__Inventars, setArr__Inventars] = useState([]);
  const [arr__Tools, setArr__Tools] = useState([]);
  const [arr__Equipments, setArr__Equipments] = useState([]);
  const [arr__WorkerProtections, setArr__WorkerProtections] = useState([]);

  const [searchText, setSearchText] = useState('');
  const [totalResults, setTotalResults] = useState([]);
  const [resultFetch, setResultFetch] = useState([]);

  const {
    unit,
    serviceWorkGroup,
    products,
    inventars,
    tools,
    equipment,
    workerProtection,
  } = formData;

  useEffect(() => {
    const myGetAll = async () => {
      const getTotalItems = await get__all(
        { page: '0', limit: '0', filter: '' },
        currentURL
      );
      const units = await get__all(
        { page: '0', limit: '0', filter: '' },
        '/manager/refdata/unit'
      );
      const serviceWorkGroup = await get__all(
        { page: '0', limit: '0', filter: '' },
        '/manager/refdata/servicework-group'
      );
      const products = await get__all(
        { page: '0', limit: '0', filter: '' },
        '/manager/refdata/products'
      );

      const arr_Materials = products?.items.filter(
        (item: any) => item.productType?.productTypeName === 'стройматериалы'
      );
      const arr_Inventars = products?.items.filter(
        (item: any) => item.productType?.productTypeName === 'инвентарь'
      );
      const arr_Tools = products?.items.filter(
        (item: any) => item.productType?.productTypeName === 'инструмент'
      );
      const arr_Equipments = products?.items.filter(
        (item: any) => item.productType?.productTypeName === 'оборудование'
      );
      const arr_WorkerProtections = products?.items.filter(
        (item: any) => item.productType?.productTypeName === 'средство защиты'
      );

      setArr__Units(units.items);
      setArr__ServiceWorkGroups(serviceWorkGroup.items);

      setArr__Materials(arr_Materials);
      setArr__Inventars(arr_Inventars);
      setArr__Tools(arr_Tools);
      setArr__Equipments(arr_Equipments);
      setArr__WorkerProtections(arr_WorkerProtections);

      setCountTotalItems(getTotalItems.total);
      setTotalResults(arrToShow(getTotalItems.items));
      setResultFetch(arrToShow(getTotalItems.items));
    };
    myGetAll();
  }, [currentURL]);

  useEffect(() => {
    setSearchText('');
    const searchInput = document.getElementById('searchText');
    searchInput?.focus();
  }, []);

  const onChangeSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleChangeSelects = (
    targetName: string,
    targetValue: string | string[]
  ) => {
    setFormData((prevState) => ({
      ...prevState,
      [targetName]: targetValue,
    }));
  };

  const handleSearch = async () => {
    const filtered_items = await get__all(
      {
        page: '0',
        limit: '0',
        filter: searchText,

        unit: unit,
        serviceWorkGroup: serviceWorkGroup,
        products: products,
        inventars: inventars,
        tools: tools,
        equipment: equipment,
        workerProtection: workerProtection,
      },
      currentURL
    );

    setResultFetch(arrToShow(filtered_items?.items));
  };
  const handleRestart = () => {
    setResultFetch(totalResults);
    setFormData(initState);
  };

  const deleteHanler = async (_id: string) => {
    await delete__one(_id, currentURL);
    setResultFetch(
      await get__all({ page: '0', limit: '0', filter: '' }, currentURL)
    );
    setFormData(initState);
    setSearchText('');
  };

  return (
    <Grid
      container
      alignItems='center'
      direction='column'
      sx={{
        maxWidth: 1200,
        minWidth: 600,
      }}
    >
      <Grid item sx={{ width: '100%' }}>
        <Grid
          container
          alignItems='center'
          justifyContent='space-between'
          spacing={1}
        >
          <Grid item sx={{ flex: 1 }}>
            <TextField
              margin='normal'
              focused
              fullWidth
              id='searchText'
              name='searchText'
              label='Строка поиска'
              type='search'
              value={searchText ?? ''}
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
            <MySelectMultipleAutoCompl
              selectName={`serviceWorkGroup`}
              selectLabel={`Группы работ`}
              fieldToShow={`serviceWorkGroupName`}
              handleChangeMultipleSelects={handleChangeSelects}
              selectedOptions={serviceWorkGroup ?? []}
              // @ts-ignore
              arrToSelect={arr__ServiceWorkGroups}
            />
          </Grid>

          <Grid item>
            <Typography align='center'>{`Найдено:${resultFetch?.length}`}</Typography>
          </Grid>
          <Grid item>
            <IconButton onClick={handleSearch}>
              <SearchIcon color='success' />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton onClick={handleRestart}>
              <RestartAltIcon color='error' />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
      <Grid item sx={{ width: '100%' }}>
        <Grid
          container
          alignItems='center'
          justifyContent='space-between'
          spacing={1}
        >
          <Grid item sx={{ width: 200 }}>
            <MySelectMultipleAutoCompl
              selectName={`products`}
              selectLabel={`Материалы`}
              fieldToShow={`productName`}
              handleChangeMultipleSelects={handleChangeSelects}
              selectedOptions={products ?? []}
              // @ts-ignore
              arrToSelect={arr__Materials}
            />
          </Grid>

          <Grid item sx={{ width: 200 }}>
            <MySelectMultipleAutoCompl
              selectName={`inventars`}
              selectLabel={`Инвентарь`}
              fieldToShow={`productName`}
              handleChangeMultipleSelects={handleChangeSelects}
              selectedOptions={inventars ?? []}
              // @ts-ignore
              arrToSelect={arr__Inventars}
            />
          </Grid>
          <Grid item sx={{ width: 200 }}>
            <MySelectMultipleAutoCompl
              selectName={`tools`}
              selectLabel={`Инструмент`}
              fieldToShow={`productName`}
              handleChangeMultipleSelects={handleChangeSelects}
              selectedOptions={tools ?? []}
              // @ts-ignore
              arrToSelect={arr__Tools}
            />
          </Grid>
          <Grid item sx={{ width: 200 }}>
            <MySelectMultipleAutoCompl
              selectName={`equipment`}
              selectLabel={`Оборудование`}
              fieldToShow={`productName`}
              handleChangeMultipleSelects={handleChangeSelects}
              selectedOptions={equipment ?? []}
              // @ts-ignore
              arrToSelect={arr__Equipments}
            />
          </Grid>
          <Grid item sx={{ width: 200 }}>
            <MySelectMultipleAutoCompl
              selectName={`workerProtection`}
              selectLabel={`Средства защиты`}
              fieldToShow={`productName`}
              handleChangeMultipleSelects={handleChangeSelects}
              selectedOptions={workerProtection ?? []}
              // @ts-ignore
              arrToSelect={arr__WorkerProtections}
            />
          </Grid>
        </Grid>
      </Grid>
      {!resultFetch || resultFetch?.length === 0 ? (
        <MySpinner />
      ) : (
        <Grid item sx={{ width: '100%' }}>
          <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
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
                  <TableCell colSpan={2}>{` Всего ${
                    countTotalItems ?? 0
                  }`}</TableCell>
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
                {resultFetch.length > 0 &&
                  resultFetch.map((row: any) => (
                    <TableRow key={row._id}>
                      {tableFields.length > 0 &&
                        tableFields.map((item) => (
                          <TableCell align='center' key={item}>
                            {row[item]}
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
            </Table>
          </TableContainer>
        </Grid>
      )}
    </Grid>
  );
}
