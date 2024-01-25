'use client';

import React, { useState, useLayoutEffect } from 'react';
import { toast } from 'react-toastify';
import { signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

import { userProfile__update } from '@/lib/actions/user.actions';

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

const UserEditDetails = () => {
  const session = useSession();
  const user = session?.data?.user;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showPassword2, setShowPassword2] = useState<boolean>(false);
  const { name, email, password, password2 } = formData;

  useLayoutEffect(() => {
    if (user) {
      setFormData((prevState) => ({
        ...prevState,
        name: user.name ? user.name : '',
        email: user.email ? user.email : '',
      }));
    }
  }, [user]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmitDetail = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error('Password do not match');
    } else {
      const userData = {
        name,
        email,
        password,
      };

      await userProfile__update(userData);
      signOut();
      setTimeout(() => {
        redirect('/');
      }, 2000);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleClickShowPassword2 = () => {
    setShowPassword2(!showPassword2);
  };
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <Grid container direction='column'>
      <Grid item sx={{ mb: 5 }}>
        <Typography variant='h3' align='center'>
          Моя страница
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant='h3' align='center'>
          Изменить почту или имя
        </Typography>
      </Grid>
      <Grid item>
        <TextField
          margin='normal'
          required
          fullWidth
          name='name'
          label='Имя'
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

      <Grid item sx={{ mt: 5 }}>
        <Typography variant='h3' align='center'>
          Изменить пароль
        </Typography>
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
        <FormControl variant='outlined' fullWidth margin='normal'>
          <InputLabel htmlFor='password2'>Подтвердить пароль</InputLabel>
          <OutlinedInput
            id='password2'
            name='password2'
            type={showPassword2 ? 'text' : 'password'}
            value={password2}
            onChange={onChange}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={handleClickShowPassword2}
                  onMouseDown={handleMouseDownPassword}
                  edge='end'
                >
                  {showPassword2 ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label='Подтвердить пароль'
          />
        </FormControl>
      </Grid>
      <Grid item>
        <Button
          type='button'
          fullWidth
          variant='contained'
          sx={{ mt: 3, mb: 2 }}
          onClick={onSubmitDetail}
        >
          Сохранить
        </Button>
      </Grid>
    </Grid>
  );
};

export default UserEditDetails;
