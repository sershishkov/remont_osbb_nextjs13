'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import { I_Unit, paramsProps } from '@/interfaces/refdata';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

const API_URL = '/api/manager/refdata/unit';

const item__get_one = async (dataObject: I_Unit) => {
  const { _id } = dataObject;
  try {
    const res = await fetch(`${API_URL}/${_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },

      cache: 'no-store',
    });
    const myData = await res.json();
    if (!res.ok) {
      throw new Error(myData.message);
    }
    console.log('myData.my_data', myData.my_data);
    return myData.my_data;
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(`${message}`);
  }
};

const item__edit = async (dataObject: I_Unit) => {
  const { _id } = dataObject;
  delete dataObject._id;

  try {
    const res = await fetch(`${API_URL}/${_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataObject),
      cache: 'no-store',
    });
    const myData = await res.json();
    if (!res.ok) {
      throw new Error(myData.message);
    }

    return myData;
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(`${message}`);
  }
};

function UnitEdit({ params }: paramsProps) {
  const { id } = params;
  const route = useRouter();

  const [unitName, set__unitName] = useState<string>('');

  useEffect(() => {
    const inputFocus = document.getElementById('unitName');
    inputFocus?.focus();
  }, []);

  useEffect(() => {
    if (id) {
      const myGetOne = async () => {
        const myData = await item__get_one({ _id: id });
        set__unitName(myData.unitName);
      };
      myGetOne();
    }
  }, [id]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    set__unitName(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const created__Data = {
      _id: id,
      unitName,
    };

    const myData = await item__edit(created__Data);
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
          name='unitName'
          label='unitName'
          type='text'
          id='unitName'
          value={unitName ?? ''}
          onChange={onChange}
        />
      </Grid>

      <Grid item>
        <Button
          type='submit'
          fullWidth
          disabled={unitName.length === 0}
          variant='contained'
          sx={{ mt: 3, mb: 2 }}
        >
          Сохранить
        </Button>
      </Grid>
    </Grid>
  );
}

export default UnitEdit;
