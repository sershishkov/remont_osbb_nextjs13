'use client';
import { signIn, useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import CircularProgress from '@mui/material/CircularProgress';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';

const Login = () => {
  const session = useSession();
  const router = useRouter();

  const [formData, setFormdata] = useState({
    email: '',
    password: '',
  });
  const [showPassword, set__showPassword] = useState<boolean>(false);

  const { email, password } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormdata((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    signIn('credentials', { email, password });
  };
  const handleClickShowPassword = () => {
    set__showPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (session.status == 'authenticated') {
      toast.success('Logged IN Successfuly ');
      router.push('/');
    }
  }, [session.status, router]);

  if (session.status == 'loading') {
    return <CircularProgress />;
  }

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
          <AccountCircleIcon /> Вход
        </Typography>
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
          // sx={{
          //   backgroundColor: 'white',
          // }}
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
            // sx={{
            //   backgroundColor: 'white',
            // }}
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
          Войти
        </Button>
      </Grid>
      <Grid item className='item item-auth'>
        <Grid container justifyContent='center' alignItems='center'>
          <Grid item>
            <Link href='/api/auth/register' variant='body2'>
              {'Еще не зарегестрированы? Регистрация'}
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Login;
