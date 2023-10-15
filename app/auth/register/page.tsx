'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
// import CircularProgress from '@mui/material/CircularProgress';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';

const Register = () => {
  const router = useRouter();
  const [formData, setFormdata] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });
  const [showPassword, set__showPassword] = useState<boolean>(false);
  const [showPassword2, set__showPassword2] = useState<boolean>(false);

  const { name, email, password, password2 } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormdata((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== password2) {
      console.log('Password do not match');
      toast.error('Password do not match');
    } else {
      const userData = {
        name,
        email,
        password,
      };

      try {
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });
        res.status === 201 &&
          toast.success('Account has been created') &&
          router.push('/auth/login');
      } catch (err) {
        console.log(err);
      }
    }
  };
  const handleClickShowPassword = () => {
    set__showPassword(!showPassword);
  };
  const handleClickShowPassword2 = () => {
    set__showPassword2(!showPassword2);
  };
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <Grid
      component='form'
      onSubmit={onSubmit}
      container
      className='root'
      direction='column'
    >
      <Grid item className='item item-heading'>
        <Typography variant='h3' align='center'>
          <AccountCircleIcon /> Регистрация
        </Typography>
      </Grid>
      <Grid item className='item item-name'>
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
          // sx={{
          //   backgroundColor: 'white',
          // }}
        />
      </Grid>
      <Grid item className='item item-email'>
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
      <Grid item className='item item-password'>
        <FormControl variant='outlined' fullWidth margin='normal'>
          <InputLabel htmlFor='password'>Пароль</InputLabel>
          <OutlinedInput
            id='password'
            name='password'
            required
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
      <Grid item className='item item-password'>
        <FormControl variant='outlined' fullWidth margin='normal'>
          <InputLabel htmlFor='password2'>Подтвердить пароль</InputLabel>
          <OutlinedInput
            id='password2'
            name='password2'
            required
            type={showPassword2 ? 'text' : 'password'}
            value={password2}
            onChange={onChange}
            placeholder='password2'
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
      <Grid item className='item item-sibmit'>
        <Button
          type='submit'
          fullWidth
          variant='contained'
          sx={{ mt: 3, mb: 2 }}
        >
          Зарегистрироваться
        </Button>
      </Grid>
      <Grid item className='item item-auth'>
        <Grid container justifyContent='center' alignItems='center'>
          <Grid item>
            <Link href='/api/auth/login' variant='body2'>
              {'Уже зарегестрированы? Вход'}
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Register;
