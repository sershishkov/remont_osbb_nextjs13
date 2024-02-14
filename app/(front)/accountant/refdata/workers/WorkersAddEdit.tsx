'use client';

import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useRouter } from 'next/navigation';

import 'react-phone-number-input/style.css';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';

import {
  item__get_one,
  item__edit,
  get__all,
  item__add,
} from '@/lib/actions/refdata.actions';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

import MySelectAutoCompl from '@/components/common/MySelectAutoCompl';
import MySelectMultipleAutoCompl from '@/components/common/MySelectMultipleAutoCompl';

const currentURL = '/accountant/refdata/workers';
const initState = {
  user: '',
  firstName: '',
  patronymic: '',
  lastName: '',
  workerProfessions: [],
  passportNumber: '',
  representedBy: '',
  whenIssued: '',
  inn: '',
  birthDay: '',
  address: '',
};

function WorkersAddEdit({
  id,
  mode,
  title,
}: Readonly<{ id?: string; mode: string; title: string }>) {
  const route = useRouter();

  const [formData, setFormData] = useState(initState);
  const [telNumber, setTelNumber] = useState<string>();
  const [arr__Users, setArr__Users] = useState([]);
  const [arr__WorkerProfessions, setArr__WorkerProfessions] = useState([]);

  const {
    user,
    firstName,
    patronymic,
    lastName,
    workerProfessions,
    passportNumber,
    representedBy,
    whenIssued,
    inn,
    birthDay,
    address,
  } = formData;

  useEffect(() => {
    const inputFocus = document.getElementById('user');
    inputFocus?.focus();
  }, []);

  useLayoutEffect(() => {
    if (id) {
      const myGetOne = async () => {
        const item = await item__get_one({ _id: id }, currentURL);

        if (item) {
          const arrToSet_workerProfessions = item.workerProfessions!.map(
            (item: any) => {
              return item._id;
            }
          );

          setFormData({
            user: item.user._id!,
            firstName: item.firstName!,
            patronymic: item.patronymic!,
            lastName: item.lastName!,
            workerProfessions: arrToSet_workerProfessions ?? [],
            passportNumber: item.passportNumber!,
            representedBy: item.representedBy!,
            whenIssued: new Date(item.whenIssued!).toISOString().split('T')[0],
            inn: item.inn!,
            birthDay: new Date(item.birthDay!).toISOString().split('T')[0],
            address: item.address!,
          });
          setTelNumber(item.telNumber === '' ? undefined : item.telNumber!);
        }
      };
      myGetOne();
    }
  }, [id]);

  useEffect(() => {
    const myGetAll = async () => {
      const users = await get__all(
        { page: '0', limit: '0', filter: '' },
        '/accountant/refdata/users'
      );
      const workerProfessions = await get__all(
        { page: '0', limit: '0', filter: '' },
        '/accountant/refdata/worker-profession'
      );

      setArr__Users(users.items);
      setArr__WorkerProfessions(workerProfessions.items);
    };
    myGetAll();
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const created__Data = {
      user,
      firstName,
      patronymic,
      lastName,
      workerProfessions,
      passportNumber,
      representedBy,
      whenIssued,
      inn,
      birthDay,
      telNumber,
      address,
    };

    if (mode === 'add') {
      await item__add(created__Data, currentURL, route);
    } else if (mode === 'edit') {
      //@ts-ignore
      created__Data._id = id;
      await item__edit(created__Data, currentURL, route);
    }
  };
  const handleChangeSelects = (
    targetName: string,
    targetValue: string | string[]
  ) => {
    setFormData((prevState) => ({
      ...prevState,
      [targetName]: targetValue,
    }));
  };

  const onClickAddItem = (link: string) => {
    route.push(`${link}`);
  };

  return (
    <Grid
      component='form'
      onSubmit={onSubmit}
      container
      direction='column'
      autoComplete='off'
    >
      <Grid item className='item item-heading'>
        <Typography variant='h3' align='center'>
          {title}
        </Typography>
      </Grid>

      <MySelectAutoCompl
        selectName={`user`}
        selectLabel={`Имя пользователя на сайте`}
        fieldToShow={`name`}
        handleChangeSelects={handleChangeSelects}
        selectedOption={user ?? ''}
        // @ts-ignore
        arrToSelect={arr__Users}
      />

      <Grid item>
        <TextField
          margin='normal'
          required
          fullWidth
          name='lastName'
          label='Фамилия'
          type='text'
          id='lastName'
          value={lastName ?? ''}
          onChange={onChange}
        />
      </Grid>

      <Grid item>
        <TextField
          margin='normal'
          required
          fullWidth
          name='firstName'
          label='Имя'
          type='text'
          id='firstName'
          value={firstName ?? ''}
          onChange={onChange}
        />
      </Grid>

      <Grid item>
        <TextField
          margin='normal'
          // required
          fullWidth
          name='patronymic'
          label='Отчество'
          type='text'
          id='patronymic'
          value={patronymic ?? ''}
          onChange={onChange}
        />
      </Grid>

      <Grid item sx={{ mb: 2 }}>
        <Stack
          direction='row'
          spacing={2}
          // direction={{ xs: 'column', sm: 'row' }}
        >
          <MySelectMultipleAutoCompl
            selectName={`workerProfessions`}
            selectLabel={`Профессии`}
            fieldToShow={`workerProfessionName`}
            handleChangeMultipleSelects={handleChangeSelects}
            selectedOptions={
              workerProfessions.length !== 0 ? workerProfessions : []
            }
            // @ts-ignore
            arrToSelect={arr__WorkerProfessions}
          />

          <IconButton
            onClick={() =>
              onClickAddItem('/accountant/refdata/worker-profession/add')
            }
          >
            <AddIcon color='success' sx={{ fontSize: 30 }} />
          </IconButton>
        </Stack>
      </Grid>

      <Grid item>
        <TextField
          margin='normal'
          // required
          fullWidth
          name='passportNumber'
          label='Серия и номер паспорта'
          type='text'
          id='passportNumber'
          value={passportNumber ?? ''}
          onChange={onChange}
        />
      </Grid>

      <Grid item>
        <TextField
          margin='normal'
          // required
          fullWidth
          name='representedBy'
          label='Кем выдан паспорт'
          type='text'
          id='representedBy'
          value={representedBy ?? ''}
          onChange={onChange}
        />
      </Grid>

      <Grid item>
        <TextField
          margin='normal'
          // required
          fullWidth
          name='whenIssued'
          label='Когда выдан паспорт'
          type='date'
          id='whenIssued'
          value={whenIssued ?? ''}
          onChange={onChange}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>

      <Grid item>
        <TextField
          margin='normal'
          // required
          fullWidth
          name='inn'
          label='ІПН'
          type='text'
          id='inn'
          value={inn ?? ''}
          onChange={onChange}
        />
      </Grid>
      <Grid item>
        <TextField
          margin='normal'
          // required
          fullWidth
          name='birthDay'
          label='Дата рождения'
          type='date'
          id='birthDay'
          value={birthDay ?? ''}
          onChange={onChange}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>

      <Grid
        item
        sx={{
          height: '3.5rem',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <PhoneInput
          maxLength={16}
          international
          defaultCountry='UA'
          countries={['UA', 'RU']}
          value={telNumber ?? ''}
          onChange={setTelNumber}
          // required
        />
        <span
          style={{
            color:
              telNumber && isValidPhoneNumber(telNumber) ? undefined : 'red',
          }}
        >
          {telNumber && isValidPhoneNumber(telNumber)
            ? '   Номер корректен'
            : '   Введите верный номер'}
        </span>
      </Grid>

      <Grid item>
        <TextField
          margin='normal'
          multiline
          maxRows={4}
          fullWidth
          name='address'
          label='Адрес роживания'
          type='text'
          id='address'
          value={address ?? ''}
          onChange={onChange}
        />
      </Grid>

      <Grid item>
        <Button
          type='submit'
          fullWidth
          disabled={
            !user || !firstName || !lastName || workerProfessions.length === 0
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

export default WorkersAddEdit;
