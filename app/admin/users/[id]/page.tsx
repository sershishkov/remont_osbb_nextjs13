'use client';

import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import { item__get_one, item__edit } from '@/lib/actions/refdata.actions';
import { roles } from '@/constants/constants';

import { paramsProps } from '@/interfaces/CommonInterfaces';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';

import MySelectAutoCompl from '@/components/common/MySelectAutoCompl';

const currentURL = '/admin/users';
const initState = {
  name: '',
  email: '',
  password: '',
  role: '',
};

function ProductsEdit({ params }: paramsProps) {
  const { id } = params;
  const route = useRouter();

  const [formData, setFormdata] = useState(initState);
  const [showPassword, set__showPassword] = useState<boolean>(false);

  const { name, email, password, role } = formData;
  const all_roles = roles.filter((item) => item._id !== 'admin');

  useEffect(() => {
    const inputFocus = document.getElementById('name');
    inputFocus?.focus();
  }, []);
  // console.log('FormData', formData);

  useLayoutEffect(() => {
    if (id) {
      const myGetOne = async () => {
        const item = await item__get_one({ _id: id }, currentURL);
        // console.log('item', item);
        if (item) {
          setFormdata({
            name: item.name!,
            email: item.email!,
            password: '',
            role: item.role!,
          });
        }
      };
      myGetOne();
    }
  }, [id]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormdata((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const created__Data = {
      _id: id,
      name,
      email,
      password,
      role,
    };

    const myData = await item__edit(created__Data, currentURL);

    if (myData) {
      toast.success(myData.message);

      setTimeout(() => {
        route.back();
      }, 2000);
    }
  };
  const handleChangeSelects = (targetName: string, targetValue: string) => {
    setFormdata((prevState) => ({
      ...prevState,
      [targetName]: targetValue,
    }));
  };
  const handleClickShowPassword = () => {
    set__showPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <Grid component='form' onSubmit={onSubmit} container direction='column'>
      <Grid item className='item item-heading'>
        <Typography variant='h3' align='center'>
          Добавить пользователя
        </Typography>
      </Grid>
      <Grid item>
        <TextField
          margin='normal'
          required
          fullWidth
          name='name'
          label='name'
          type='text'
          id='name'
          value={name}
          onChange={onChange}
        />
      </Grid>

      <Grid item>
        <TextField
          margin='normal'
          required
          fullWidth
          name='email'
          label='email'
          type='email'
          id='email'
          value={email}
          onChange={onChange}
        />
      </Grid>
      <Grid item>
        <FormControl variant='outlined' fullWidth margin='normal'>
          <InputLabel htmlFor='password'>Пароль</InputLabel>
          <OutlinedInput
            id='password'
            name='password'
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={onChange}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge='end'
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label='Пароль'
          />
        </FormControl>
      </Grid>
      <Grid item>
        <MySelectAutoCompl
          selectName={`role`}
          selectLabel={`Роли`}
          fieldToShow={`caption`}
          handleChangeSelects={handleChangeSelects}
          selectedOption={role ?? ''}
          // @ts-ignore
          arrToSelect={all_roles}
        />
      </Grid>

      <Grid item>
        <Button
          type='submit'
          fullWidth
          variant='contained'
          sx={{ mt: 3, mb: 2 }}
        >
          Добавить
        </Button>
      </Grid>
    </Grid>
  );
}

export default ProductsEdit;
