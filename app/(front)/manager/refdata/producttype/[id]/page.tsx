'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { item__get_one, item__edit } from '@/lib/actions/refdata.actions';

import { paramsProps } from '@/interfaces/CommonInterfaces';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const currentURL = '/manager/refdata/producttype';

function ProductTypeEdit({ params }: Readonly<paramsProps>) {
  const { id } = params;
  const route = useRouter();

  const [productTypeName, setProductTypeName] = useState<string>('');

  useEffect(() => {
    const inputFocus = document.getElementById('productTypeName');
    inputFocus?.focus();
  }, []);

  useEffect(() => {
    if (id) {
      const myGetOne = async () => {
        const myData = await item__get_one({ _id: id }, currentURL);
        setProductTypeName(myData.productTypeName);
      };
      myGetOne();
    }
  }, [id]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductTypeName(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const created__Data = {
      _id: id,
      productTypeName,
    };

    await item__edit(created__Data, currentURL, route);
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
          name='productTypeName'
          label='productTypeName'
          type='text'
          id='productTypeName'
          value={productTypeName ?? ''}
          onChange={onChange}
        />
      </Grid>

      <Grid item>
        <Button
          type='submit'
          fullWidth
          disabled={productTypeName.length === 0}
          variant='contained'
          sx={{ mt: 3, mb: 2 }}
        >
          Сохранить
        </Button>
      </Grid>
    </Grid>
  );
}

export default ProductTypeEdit;