'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import { item__add, get__all } from '@/lib/actions/refdata.actions';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

import MySelectAutoCompl from '@/components/common/MySelectAutoCompl';
import MySelectMultipleAutoCompl from '@/components/common/MySelectMultipleAutoCompl';

const currentURL = '/manager/refdata/serviceworks';
const initState = {
  serviceWorkName: '',
  description: '',
  unit: '',
  serviceWorkGroup: [],
  priceWorkerRecommend: '',
  priceClientRecommend: '',
  products: [],
  inventars: [],
  tools: [],
  equipment: [],
  workerProtection: [],
};

function ServiceWorksAdd() {
  const route = useRouter();

  const [formData, setFormdata] = useState(initState);
  const [arr__Units, setArr__Units] = useState([]);
  const [arr__ServiceworkGroups, setArr__ServiceworkGroups] = useState([]);
  const [arr__Products, setArr__Products] = useState<any[]>([]);

  const arr_Materials = useMemo(
    () =>
      arr__Products?.filter(
        (item) => item.productType?.productTypeName === 'стройматериалы'
      ),
    [arr__Products]
  );
  const arr_Inventars = useMemo(
    () =>
      arr__Products?.filter(
        (item) => item.productType?.productTypeName === 'инвентарь'
      ),
    [arr__Products]
  );
  const arr_Tools = useMemo(
    () =>
      arr__Products?.filter(
        (item) => item.productType?.productTypeName === 'инструмент'
      ),
    [arr__Products]
  );
  const arr_Equipments = useMemo(
    () =>
      arr__Products?.filter(
        (item) => item.productType?.productTypeName === 'оборудование'
      ),
    [arr__Products]
  );
  const arr_WorkerProtections = useMemo(
    () =>
      arr__Products?.filter(
        (item) => item.productType?.productTypeName === 'средство защиты'
      ),
    [arr__Products]
  );

  const {
    serviceWorkName,
    description,
    unit,
    serviceWorkGroup,
    priceWorkerRecommend,
    priceClientRecommend,
    products,
    inventars,
    tools,
    equipment,
    workerProtection,
  } = formData;

  useEffect(() => {
    const inputFocus = document.getElementById('productName');
    inputFocus?.focus();
  }, []);

  useEffect(() => {
    const myGetAll = async () => {
      const units = await get__all(
        { page: '0', limit: '0', filter: '' },
        '/manager/refdata/unit'
      );
      const serviceworkgroup = await get__all(
        { page: '0', limit: '0', filter: '' },
        '/manager/refdata/servicework-group'
      );
      const products = await get__all(
        { page: '0', limit: '0', filter: '' },
        '/manager/refdata/products'
      );

      setArr__Units(units.items);
      setArr__ServiceworkGroups(serviceworkgroup.items);
      setArr__Products(products.items);
    };
    myGetAll();
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormdata((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const created__Data = {
      serviceWorkName,
      description,
      unit,
      serviceWorkGroup,

      priceWorkerRecommend: priceWorkerRecommend
        ? Number(priceWorkerRecommend)
        : 1,
      priceClientRecommend: priceClientRecommend
        ? Number(priceClientRecommend)
        : 0,
      products,
      inventars,
      tools,
      equipment,
      workerProtection,
    };

    const myData = await item__add(created__Data, currentURL);
    if (myData) {
      toast.success(myData.message);

      setTimeout(() => {
        route.back();
      }, 2000);
    }
  };
  const handleChangeSelects = (targetName: string, targetValue: string) => {
    setFormdata((prevState) => ({
      ...prevState,
      [targetName]: targetValue,
    }));
  };

  const handleChangeMultipleSelects = (
    targetName: string,
    targetValue: string[]
  ) => {
    setFormdata((prevState) => ({
      ...prevState,
      [targetName]: targetValue,
    }));
  };

  const onClickAddItem = (link: string) => {
    route.push(`${link}`);
  };

  return (
    <Grid
      component='form'
      onSubmit={onSubmit}
      container
      direction='column'
      autoComplete='off'
    >
      <Grid item className='item item-heading'>
        <Typography variant='h3' align='center'>
          Добавить
        </Typography>
      </Grid>

      <Grid item>
        <TextField
          margin='normal'
          required
          fullWidth
          name='serviceWorkName'
          label='serviceWorkName'
          type='text'
          id='serviceWorkName'
          value={serviceWorkName ?? ''}
          onChange={onChange}
        />
      </Grid>
      <Grid item>
        <TextField
          margin='normal'
          multiline
          maxRows={4}
          fullWidth
          name='description'
          label='Описание'
          type='text'
          id='description'
          value={description ?? ''}
          onChange={onChange}
        />
      </Grid>

      <Grid item sx={{ mb: 2 }}>
        <Stack
          direction='row'
          spacing={2}
          // direction={{ xs: 'column', sm: 'row' }}
        >
          <MySelectAutoCompl
            selectName={`unit`}
            selectLabel={`Размерность`}
            fieldToShow={`unitName`}
            handleChangeSelects={handleChangeSelects}
            // @ts-ignore
            arrToSelect={arr__Units}
          />

          <IconButton
            onClick={() => onClickAddItem('/manager/refdata/unit/add')}
          >
            <AddIcon color='success' sx={{ fontSize: 30 }} />
          </IconButton>
        </Stack>
      </Grid>

      <Grid item sx={{ mb: 2 }}>
        <Stack
          direction='row'
          spacing={2}
          // direction={{ xs: 'column', sm: 'row' }}
        >
          <MySelectMultipleAutoCompl
            selectName={`serviceWorkGroup`}
            selectLabel={`Группы работ`}
            fieldToShow={`serviceWorkGroupName`}
            handleChangeMultipleSelects={handleChangeMultipleSelects}
            // @ts-ignore
            arrToSelect={arr__ServiceworkGroups}
          />

          <IconButton
            onClick={() =>
              onClickAddItem('/manager/refdata/servicework-group/add')
            }
          >
            <AddIcon color='success' sx={{ fontSize: 30 }} />
          </IconButton>
        </Stack>
      </Grid>

      <Grid item>
        <TextField
          margin='normal'
          // required

          fullWidth
          name='priceWorkerRecommend'
          label='priceWorkerRecommend'
          type='number'
          id='priceWorkerRecommend'
          value={priceWorkerRecommend ?? ''}
          onChange={onChange}
          // inputProps={{
          //   step: '.001',
          // }}
        />
      </Grid>

      <Grid item>
        <TextField
          margin='normal'
          // required

          fullWidth
          name='priceClientRecommend'
          label='priceClientRecommend'
          type='number'
          id='priceClientRecommend'
          value={priceClientRecommend ?? ''}
          onChange={onChange}
          // inputProps={{
          //   step: '.001',
          // }}
        />
      </Grid>

      <Grid item sx={{ mb: 2 }}>
        <Stack
          direction='row'
          spacing={2}
          // direction={{ xs: 'column', sm: 'row' }}
        >
          <MySelectMultipleAutoCompl
            selectName={`products`}
            selectLabel={`Товары`}
            fieldToShow={`productName`}
            handleChangeMultipleSelects={handleChangeMultipleSelects}
            // @ts-ignore
            arrToSelect={arr_Materials ?? []}
          />

          <IconButton
            onClick={() => onClickAddItem('/manager/refdata/products/add')}
          >
            <AddIcon color='success' sx={{ fontSize: 30 }} />
          </IconButton>
        </Stack>
      </Grid>

      <Grid item sx={{ mb: 2 }}>
        <Stack
          direction='row'
          spacing={2}
          // direction={{ xs: 'column', sm: 'row' }}
        >
          <MySelectMultipleAutoCompl
            selectName={`inventars`}
            selectLabel={`Инвентарь`}
            fieldToShow={`productName`}
            handleChangeMultipleSelects={handleChangeMultipleSelects}
            // @ts-ignore
            arrToSelect={arr_Inventars ?? []}
          />

          <IconButton
            onClick={() => onClickAddItem('/manager/refdata/products/add')}
          >
            <AddIcon color='success' sx={{ fontSize: 30 }} />
          </IconButton>
        </Stack>
      </Grid>

      <Grid item sx={{ mb: 2 }}>
        <Stack
          direction='row'
          spacing={2}
          // direction={{ xs: 'column', sm: 'row' }}
        >
          <MySelectMultipleAutoCompl
            selectName={`tools`}
            selectLabel={`Инструмент`}
            fieldToShow={`productName`}
            handleChangeMultipleSelects={handleChangeMultipleSelects}
            // @ts-ignore
            arrToSelect={arr_Tools ?? []}
          />

          <IconButton
            onClick={() => onClickAddItem('/manager/refdata/products/add')}
          >
            <AddIcon color='success' sx={{ fontSize: 30 }} />
          </IconButton>
        </Stack>
      </Grid>

      <Grid item sx={{ mb: 2 }}>
        <Stack
          direction='row'
          spacing={2}
          // direction={{ xs: 'column', sm: 'row' }}
        >
          <MySelectMultipleAutoCompl
            selectName={`equipment`}
            selectLabel={`Оборудование`}
            fieldToShow={`productName`}
            handleChangeMultipleSelects={handleChangeMultipleSelects}
            // @ts-ignore
            arrToSelect={arr_Equipments ?? []}
          />

          <IconButton
            onClick={() => onClickAddItem('/manager/refdata/products/add')}
          >
            <AddIcon color='success' sx={{ fontSize: 30 }} />
          </IconButton>
        </Stack>
      </Grid>

      <Grid item sx={{ mb: 2 }}>
        <Stack
          direction='row'
          spacing={2}
          // direction={{ xs: 'column', sm: 'row' }}
        >
          <MySelectMultipleAutoCompl
            selectName={`workerProtection`}
            selectLabel={`Средства Защиты`}
            fieldToShow={`productName`}
            handleChangeMultipleSelects={handleChangeMultipleSelects}
            // @ts-ignore
            arrToSelect={arr_WorkerProtections ?? []}
          />

          <IconButton
            onClick={() => onClickAddItem('/manager/refdata/products/add')}
          >
            <AddIcon color='success' sx={{ fontSize: 30 }} />
          </IconButton>
        </Stack>
      </Grid>

      <Grid item>
        <Button
          type='submit'
          fullWidth
          disabled={
            !serviceWorkName ||
            !unit ||
            !serviceWorkGroup ||
            !priceWorkerRecommend
          }
          variant='contained'
          sx={{ mt: 3, mb: 2 }}
        >
          Сохранить
        </Button>
      </Grid>
    </Grid>
  );
}

export default ServiceWorksAdd;
