'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import { item__get_one, item__edit } from '@/lib/actions/refdata.actions';

import { paramsProps } from '@/interfaces/CommonInterfaces';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const currentURL = '/api/manager/refdata/thirdpartyservice-group';

function ThirdPartyServiceGroupEdit({ params }: paramsProps) {
  const { id } = params;
  const route = useRouter();

  const [thirdPartyServiceGroupName, set__thirdPartyServiceGroupName] =
    useState<string>('');

  useEffect(() => {
    const inputFocus = document.getElementById('thirdPartyServiceGroupName');
    inputFocus?.focus();
  }, []);

  useEffect(() => {
    if (id) {
      const myGetOne = async () => {
        const myData = await item__get_one({ _id: id }, currentURL);
        set__thirdPartyServiceGroupName(myData.thirdPartyServiceGroupName);
      };
      myGetOne();
    }
  }, [id]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    set__thirdPartyServiceGroupName(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const created__Data = {
      _id: id,
      thirdPartyServiceGroupName,
    };

    const myData = await item__edit(created__Data, currentURL);
    if (myData) {
      toast.success(myData.message);

      setTimeout(() => {
        route.back();
      }, 2000);
    }
  };

  return (
    <Grid component='form' onSubmit={onSubmit} container direction='column'>
      <Grid item className='item item-heading'>
        <Typography variant='h3' align='center'>
          Редактировать
        </Typography>
      </Grid>
      <Grid item>
        <TextField
          margin='normal'
          required
          fullWidth
          name='thirdPartyServiceGroupName'
          label='thirdPartyServiceGroupName'
          type='text'
          id='thirdPartyServiceGroupName'
          value={thirdPartyServiceGroupName ?? ''}
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

export default ThirdPartyServiceGroupEdit;
