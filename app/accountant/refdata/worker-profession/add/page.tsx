'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import { item__add } from '@/lib/actions/refdata.actions';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const currentURL = '/accountant/refdata/worker-profession';

const initState = {
  workerProfessionName: '',
  description: '',
};

function WorkerProfessionAdd() {
  const route = useRouter();

  const [formData, setFormdata] = useState(initState);

  const { workerProfessionName, description } = formData;

  useEffect(() => {
    const inputFocus = document.getElementById('workerProfessionName');
    inputFocus?.focus();
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
      workerProfessionName,
      description,
    };

    const myData = await item__add(created__Data, currentURL);
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
          Добавить
        </Typography>
      </Grid>
      <Grid item>
        <TextField
          margin='normal'
          required
          fullWidth
          name='workerProfessionName'
          label='workerProfessionName'
          type='text'
          id='workerProfessionName'
          value={workerProfessionName ?? ''}
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

      <Grid item>
        <Button
          type='submit'
          fullWidth
          disabled={
            workerProfessionName.length === 0 || description.length === 0
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

export default WorkerProfessionAdd;
