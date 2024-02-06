'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { item__add, get__all } from '@/lib/actions/refdata.actions';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

import MySelectAutoCompl from '@/components/common/MySelectAutoCompl';

import { I_Worker } from '@/interfaces/refdata';

const currentURL = '/accountant/refdata/storehouse';

const initState = {
  storeHouseName: '',
  address: '',
  responsiblePerson: '',
};

function StoreHouseAdd() {
  const route = useRouter();

  const [formData, setFormData] = useState(initState);
  const [arr__Workers, setArr__Workers] = useState<I_Worker[]>([]);

  const { storeHouseName, address, responsiblePerson } = formData;

  useEffect(() => {
    const inputFocus = document.getElementById('storeHouseName');
    inputFocus?.focus();
  }, []);

  useEffect(() => {
    const myGetAll = async () => {
      const all__Workers = await get__all(
        { page: '0', limit: '0', filter: '' },
        '/accountant/refdata/workers'
      );

      setArr__Workers(all__Workers.items);
    };

    myGetAll();
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const created__Data = {
      storeHouseName,
      address,
      responsiblePerson,
    };

    await item__add(created__Data, currentURL, route);
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

  const onClickAddItem = (link: string) => {
    route.push(`${link}`);
  };

  return (
    <Grid component='form' onSubmit={onSubmit} container direction='column'>
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
          name='storeHouseName'
          label='Название склада'
          type='text'
          id='storeHouseName'
          value={storeHouseName ?? ''}
          onChange={onChange}
        />
      </Grid>
      <Grid item>
        <TextField
          margin='normal'
          required
          fullWidth
          name='address'
          label='Адрес'
          type='text'
          id='address'
          value={address ?? ''}
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
            selectName={`responsiblePerson`}
            selectLabel={`Ответственный кладовщик`}
            fieldToShow={`lastName`}
            handleChangeSelects={handleChangeSelects}
            selectedOption={responsiblePerson ?? ''}
            // @ts-ignore
            arrToSelect={arr__Workers ?? []}
          />

          <IconButton
            onClick={() => onClickAddItem('/accountant/refdata/workers/add')}
          >
            <AddIcon color='success' sx={{ fontSize: 30 }} />
          </IconButton>
        </Stack>
      </Grid>

      <Grid item>
        <Button
          type='submit'
          fullWidth
          disabled={!storeHouseName || !address || !responsiblePerson}
          variant='contained'
          sx={{ mt: 3, mb: 2 }}
        >
          Сохранить
        </Button>
      </Grid>
    </Grid>
  );
}

export default StoreHouseAdd;
