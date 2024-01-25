'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { item__get_one, item__edit } from '@/lib/actions/refdata.actions';

import { paramsProps } from '@/interfaces/CommonInterfaces';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const currentURL = '/accountant/refdata/taxation-type';

const initState = {
  taxationTypeName: '',
};

function TaxationTypeEdit({ params }: Readonly<paramsProps>) {
  const { id } = params;
  const route = useRouter();

  const [formData, setFormData] = useState(initState);

  const { taxationTypeName } = formData;

  useEffect(() => {
    const inputFocus = document.getElementById('taxationTypeName');
    inputFocus?.focus();
  }, []);

  useEffect(() => {
    if (id) {
      const myGetOne = async () => {
        const item = await item__get_one({ _id: id }, currentURL);

        if (item) {
          setFormData({
            taxationTypeName: item.taxationTypeName!,
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
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const created__Data = {
      _id: id,
      taxationTypeName,
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
          name='taxationTypeName'
          label='taxationTypeName'
          type='text'
          id='taxationTypeName'
          value={taxationTypeName ?? ''}
          onChange={onChange}
        />
      </Grid>

      <Grid item>
        <Button
          type='submit'
          fullWidth
          disabled={taxationTypeName.length === 0}
          variant='contained'
          sx={{ mt: 3, mb: 2 }}
        >
          Сохранить
        </Button>
      </Grid>
    </Grid>
  );
}

export default TaxationTypeEdit;
