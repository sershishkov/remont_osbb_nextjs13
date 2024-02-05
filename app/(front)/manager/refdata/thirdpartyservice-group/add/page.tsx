'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { item__add } from '@/lib/actions/refdata.actions';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const currentURL = '/manager/refdata/thirdpartyservice-group';

function ThirdPartyServiceGroupAdd() {
  const route = useRouter();

  const [thirdPartyServiceGroupName, setThirdPartyServiceGroupName] =
    useState<string>('');

  useEffect(() => {
    const inputFocus = document.getElementById('thirdPartyServiceGroupName');
    inputFocus?.focus();
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setThirdPartyServiceGroupName(e.target.value);
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const created__Data = {
      thirdPartyServiceGroupName,
    };

    await item__add(created__Data, currentURL, route);
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
          name='thirdPartyServiceGroupName'
          label='Группа работ (сторонние)'
          type='text'
          id='thirdPartyServiceGroupName'
          value={thirdPartyServiceGroupName}
          onChange={onChange}
        />
      </Grid>

      <Grid item>
        <Button
          type='submit'
          fullWidth
          disabled={thirdPartyServiceGroupName.length === 0}
          variant='contained'
          sx={{ mt: 3, mb: 2 }}
        >
          Сохранить
        </Button>
      </Grid>
    </Grid>
  );
}

export default ThirdPartyServiceGroupAdd;
