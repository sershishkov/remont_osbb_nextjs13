'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import {
  item__get_one,
  item__edit,
  item__add,
  get__all,
} from '@/lib/actions/refdata.actions';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

import MySelectMultipleAutoCompl from '@/components/common/MySelectMultipleAutoCompl';
import { I_Worker } from '@/interfaces/refdata';

const currentURL = '/accountant/refdata/cash-register';

const initState = {
  cashRegisterName: '',
  allowedWorkers: [],
};

function ClientTypeAddEdit({
  id,
  mode,
  title,
}: Readonly<{ id?: string; mode: string; title: string }>) {
  const route = useRouter();

  const [formData, setFormData] = useState(initState);
  const [arr__Workers, setArr__Workers] = useState<I_Worker[]>([]);

  const { cashRegisterName, allowedWorkers } = formData;

  useEffect(() => {
    const inputFocus = document.getElementById('cashRegisterName');
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

  useEffect(() => {
    if (id) {
      const myGetOne = async () => {
        const item = await item__get_one({ _id: id }, currentURL);

        if (item) {
          const arrToSet_allowedWorkers = item.allowedWorkers!.map(
            (item: any) => {
              return item._id;
            }
          );
          setFormData({
            cashRegisterName: item.cashRegisterName,
            allowedWorkers: arrToSet_allowedWorkers,
          });
        }
      };
      myGetOne();
    }
  }, [id]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
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

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const created__Data = {
      cashRegisterName,
      allowedWorkers,
    };

    if (mode === 'add') {
      await item__add(created__Data, currentURL, route);
    } else if (mode === 'edit') {
      //@ts-ignore
      created__Data._id = id;
      await item__edit(created__Data, currentURL, route);
    }
  };

  return (
    <Grid component='form' onSubmit={onSubmit} container direction='column'>
      <Grid item className='item item-heading'>
        <Typography variant='h3' align='center'>
          {title}
        </Typography>
      </Grid>
      <Grid item>
        <TextField
          margin='normal'
          required
          fullWidth
          name='cashRegisterName'
          label='Название кассы'
          type='text'
          id='cashRegisterName'
          value={cashRegisterName ?? ''}
          onChange={onChange}
        />
      </Grid>
      <Grid item sx={{ mb: 2 }}>
        <Stack
          direction='row'
          spacing={2}
          // direction={{ xs: 'column', sm: 'row' }}
        >
          <MySelectMultipleAutoCompl
            selectName={`allowedWorkers`}
            selectLabel={`Участники`}
            fieldToShow={`lastName`}
            handleChangeMultipleSelects={handleChangeSelects}
            selectedOptions={allowedWorkers.length !== 0 ? allowedWorkers : []}
            // @ts-ignore
            arrToSelect={arr__Workers}
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
          disabled={allowedWorkers.length === 0 || !cashRegisterName}
          variant='contained'
          sx={{ mt: 3, mb: 2 }}
        >
          Сохранить
        </Button>
      </Grid>
    </Grid>
  );
}

export default ClientTypeAddEdit;
