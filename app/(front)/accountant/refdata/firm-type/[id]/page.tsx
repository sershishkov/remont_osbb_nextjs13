'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { item__get_one, item__edit } from '@/lib/actions/refdata.actions';

import { paramsProps } from '@/interfaces/CommonInterfaces';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const currentURL = '/accountant/refdata/firm-type';

const initState = {
  firmTypeLongName: '',
  firmTypeShortName: '',
};

function FirmTypeEdit({ params }: Readonly<paramsProps>) {
  const { id } = params;
  const route = useRouter();

  const [formData, setFormData] = useState(initState);

  const { firmTypeLongName, firmTypeShortName } = formData;

  useEffect(() => {
    const inputFocus = document.getElementById('firmTypeLongName');
    inputFocus?.focus();
  }, []);

  useEffect(() => {
    if (id) {
      const myGetOne = async () => {
        const item = await item__get_one({ _id: id }, currentURL);

        if (item) {
          setFormData({
            firmTypeLongName: item.firmTypeLongName!,
            firmTypeShortName: item.firmTypeShortName!,
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
      firmTypeLongName,
      firmTypeShortName,
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
          name='firmTypeLongName'
          label='firmTypeLongName'
          type='text'
          id='firmTypeLongName'
          value={firmTypeLongName ?? ''}
          onChange={onChange}
        />
      </Grid>
      <Grid item>
        <TextField
          margin='normal'
          // multiline
          maxRows={4}
          fullWidth
          name='firmTypeShortName'
          label='firmTypeShortName'
          type='text'
          id='firmTypeShortName'
          value={firmTypeShortName ?? ''}
          onChange={onChange}
        />
      </Grid>

      <Grid item>
        <Button
          type='submit'
          fullWidth
          disabled={
            firmTypeLongName.length === 0 || firmTypeShortName.length === 0
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

export default FirmTypeEdit;
