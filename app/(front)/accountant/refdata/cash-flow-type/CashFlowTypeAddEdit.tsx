'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import {
  item__get_one,
  item__edit,
  item__add,
} from '@/lib/actions/refdata.actions';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import MySelectAutoCompl from '@/components/common/MySelectAutoCompl';

import { arr__incomeOrExpense } from '@/constants/constants';

const currentURL = '/accountant/refdata/cash-flow-type';

const initState = {
  cashFlowTypeName: '',
  incomeOrExpense: '',
};

function CashFlowTypeAddEdit({
  id,
  mode,
  title,
}: Readonly<{ id?: string; mode: string; title: string }>) {
  const route = useRouter();

  const [formData, setFormData] = useState(initState);

  const { cashFlowTypeName, incomeOrExpense } = formData;

  useEffect(() => {
    const inputFocus = document.getElementById('cashFlowTypeName');
    inputFocus?.focus();
  }, []);

  useEffect(() => {
    if (id) {
      const myGetOne = async () => {
        const item = await item__get_one({ _id: id }, currentURL);

        if (item) {
          setFormData({
            cashFlowTypeName: item.cashFlowTypeName,
            incomeOrExpense: item.incomeOrExpense,
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

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const created__Data = {
      cashFlowTypeName,
      incomeOrExpense,
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
          name='cashFlowTypeName'
          label='Название операции'
          type='text'
          id='cashFlowTypeName'
          value={cashFlowTypeName ?? ''}
          onChange={onChange}
        />
      </Grid>
      <Grid item sx={{ width: 300 }}>
        <MySelectAutoCompl
          selectName={`incomeOrExpense`}
          selectLabel={`Приход или расход`}
          fieldToShow={`caption`}
          handleChangeSelects={handleChangeSelects}
          selectedOption={incomeOrExpense ?? ''}
          // @ts-ignore
          arrToSelect={arr__incomeOrExpense ?? []}
        />
      </Grid>

      <Grid item>
        <Button
          type='submit'
          fullWidth
          disabled={!incomeOrExpense || !cashFlowTypeName}
          variant='contained'
          sx={{ mt: 3, mb: 2 }}
        >
          Сохранить
        </Button>
      </Grid>
    </Grid>
  );
}

export default CashFlowTypeAddEdit;
