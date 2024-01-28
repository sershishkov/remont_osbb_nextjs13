'use client';

import React, { useState, useEffect, useLayoutEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';

import 'react-phone-number-input/style.css';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';

import {
  item__get_one,
  item__edit,
  get__all,
} from '@/lib/actions/refdata.actions';

import { paramsProps } from '@/interfaces/CommonInterfaces';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

import MySelectAutoCompl from '@/components/common/MySelectAutoCompl';
import MySelectMultipleAutoCompl from '@/components/common/MySelectMultipleAutoCompl';

import { I_ClientType, I_FirmType, I_TaxationType } from '@/interfaces/refdata';

const currentURL = '/manager/documents/nakladnaya';
const initState = {
  clientLongName: '',
  clientShortName: '',
  firmType: '',

  postIndex: '',
  address: '',
  edrpou: '',
  inn: '',
  iban: '',
  iban_budget: '',

  passportNumber: '',
  firstName_imen: '',
  patronymic_imen: '',
  lastName_imen: '',
  firstName_rodit: '',
  patronymic_rodit: '',
  lastName_rodit: '',

  certificateNumber: '',
  representedBy: '',
  whichActsOnTheBasis: '',

  jobTitle: '',
  jobTitle_rodit: '',
  tax: '',
  taxationType: '',

  certificate_PDV: '',
  email: '',
  clientType: [],
};

function DocumentNakladnayaEdit({ params }: Readonly<paramsProps>) {
  const { id } = params;
  const route = useRouter();

  const [formData, setFormData] = useState(initState);
  const [telNumber, setTelNumber] = useState<string>();
  const [displayFizOsoba, setDisplayFizOsoba] = useState<boolean>(false);
  const [displayFOP, setdisplayFOP] = useState<boolean>(false);
  const [arr__FirmTypes, setArr__FirmTypes] = useState<I_FirmType[]>([]);
  const [arr__ClientTypes, setArr__ClientTypes] = useState<I_ClientType[]>([]);
  const [arr__TaxationType, setArr__TaxationType] = useState<I_TaxationType[]>(
    []
  );
  const fizOsoba_Id = useMemo(
    () =>
      arr__FirmTypes?.find((item) => item.firmTypeLongName === 'Фізична особа')
        ?._id,
    [arr__FirmTypes]
  );
  const fop_Id = useMemo(
    () =>
      arr__FirmTypes?.find(
        (item) => item.firmTypeLongName === 'Фізична особа-підприємець'
      )?._id,
    [arr__FirmTypes]
  );

  const {
    clientLongName,
    clientShortName,
    firmType,

    postIndex,
    address,
    edrpou,
    inn,
    iban,
    iban_budget,

    passportNumber,
    firstName_imen,
    patronymic_imen,
    lastName_imen,
    firstName_rodit,
    patronymic_rodit,
    lastName_rodit,

    certificateNumber,
    representedBy,
    whichActsOnTheBasis,

    jobTitle,
    jobTitle_rodit,
    tax,
    taxationType,

    certificate_PDV,
    email,
    clientType,
  } = formData;

  useEffect(() => {
    const inputFocus = document.getElementById('firmType');
    inputFocus?.focus();
  }, []);

  useLayoutEffect(() => {
    if (id) {
      const myGetOne = async () => {
        const item = await item__get_one({ _id: id }, currentURL);

        if (item) {
          const arrToSet__clientType = item.clientType!.map(
            (item: I_ClientType) => {
              return item._id;
            }
          );

          setFormData({
            firmType: item.firmType._id,
            clientLongName: item.clientLongName,
            clientShortName: item.clientShortName,

            postIndex: item.postIndex,
            address: item.address,
            edrpou: item.edrpou,
            inn: item.inn,
            iban: item.iban,
            iban_budget: item.iban_budget,

            passportNumber: item.passportNumber,
            firstName_imen: item.firstName_imen,
            patronymic_imen: item.patronymic_imen,
            lastName_imen: item.lastName_imen,
            firstName_rodit: item.firstName_rodit,
            patronymic_rodit: item.patronymic_rodit,
            lastName_rodit: item.lastName_rodit,

            certificateNumber: item.certificateNumber,
            representedBy: item.representedBy,
            whichActsOnTheBasis: item.whichActsOnTheBasis,

            jobTitle: item.jobTitle,
            jobTitle_rodit: item.jobTitle_rodit,
            tax: item.tax.toString(),
            taxationType: item.taxationType._id,

            certificate_PDV: item.certificate_PDV,
            email: item.email,
            clientType: arrToSet__clientType ?? [],
          });
          setTelNumber(item.telNumber);
        }
      };
      myGetOne();
    }
  }, [id]);

  useEffect(() => {
    const myGetAll = async () => {
      const firmTypes = await get__all(
        { page: '0', limit: '0', filter: '' },
        '/accountant/refdata/firm-type'
      );
      const clientTypes = await get__all(
        { page: '0', limit: '0', filter: '' },
        '/accountant/refdata/client-type'
      );
      const taxationTypes = await get__all(
        { page: '0', limit: '0', filter: '' },
        '/accountant/refdata/taxation-type'
      );

      setArr__FirmTypes(firmTypes.items);
      setArr__ClientTypes(clientTypes.items);
      setArr__TaxationType(taxationTypes.items);
    };
    myGetAll();
  }, []);

  useEffect(() => {
    if (firmType === fizOsoba_Id) {
      setDisplayFizOsoba(true);
      setdisplayFOP(false);
    } else if (firmType === fop_Id) {
      setdisplayFOP(true);
      setDisplayFizOsoba(false);
    } else {
      setdisplayFOP(false);
      setDisplayFizOsoba(false);
    }
  }, [firmType, fizOsoba_Id, fop_Id]);

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
      clientLongName,
      clientShortName,
      firmType,

      postIndex,
      address,
      edrpou,
      inn,
      iban,
      iban_budget,

      passportNumber,
      firstName_imen,
      patronymic_imen,
      lastName_imen,
      firstName_rodit,
      patronymic_rodit,
      lastName_rodit,

      certificateNumber,
      representedBy,
      whichActsOnTheBasis,

      jobTitle,
      jobTitle_rodit,
      tax: tax ? Number(tax) : 0,
      taxationType,

      certificate_PDV,
      telNumber,
      email,
      clientType,
    };

    await item__edit(created__Data, currentURL, route);
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
          Редактировать
        </Typography>
      </Grid>

      <Grid item sx={{ mb: 2 }}>
        <Stack
          direction='row'
          spacing={2}
          // direction={{ xs: 'column', sm: 'row' }}
        >
          <MySelectAutoCompl
            selectName={`firmType`}
            selectLabel={`форма собств`}
            fieldToShow={`firmTypeLongName`}
            handleChangeSelects={handleChangeSelects}
            selectedOption={firmType ?? ''}
            // @ts-ignore
            arrToSelect={arr__FirmTypes ?? []}
          />

          <IconButton
            onClick={() => onClickAddItem('/accountant/refdata/firm-type/add')}
          >
            <AddIcon color='success' sx={{ fontSize: 30 }} />
          </IconButton>
        </Stack>
      </Grid>

      <Grid item>
        <TextField
          margin='normal'
          required
          fullWidth
          name='clientLongName'
          label='clientLongName'
          type='text'
          id='clientLongName'
          value={clientLongName ?? ''}
          onChange={onChange}
        />
      </Grid>

      <Grid item>
        <TextField
          margin='normal'
          required
          fullWidth
          name='clientShortName'
          label='clientShortName'
          type='text'
          id='clientShortName'
          value={clientShortName ?? ''}
          onChange={onChange}
        />
      </Grid>

      <Grid item>
        <TextField
          margin='normal'
          required
          fullWidth
          name='postIndex'
          label='postIndex'
          type='text'
          id='postIndex'
          value={postIndex ?? ''}
          onChange={onChange}
        />
      </Grid>

      <Grid item>
        <TextField
          margin='normal'
          required
          fullWidth
          name='address'
          label='address'
          type='text'
          id='address'
          value={address ?? ''}
          onChange={onChange}
        />
      </Grid>

      <Grid
        item
        sx={{ display: !displayFizOsoba && !displayFOP ? 'block' : 'none' }}
      >
        <TextField
          margin='normal'
          required
          fullWidth
          name='edrpou'
          label='edrpou'
          type='text'
          id='edrpou'
          value={edrpou ?? ''}
          onChange={onChange}
        />
      </Grid>

      <Grid
        item
        sx={{ display: displayFizOsoba || displayFOP ? 'block' : 'none' }}
      >
        <TextField
          margin='normal'
          required
          fullWidth
          name='inn'
          label='inn'
          type='text'
          id='inn'
          value={inn ?? ''}
          onChange={onChange}
        />
      </Grid>
      <Grid item sx={{ display: !displayFizOsoba ? 'block' : 'none' }}>
        <TextField
          margin='normal'
          required
          fullWidth
          name='iban'
          label='iban'
          type='text'
          id='iban'
          value={iban ?? ''}
          onChange={onChange}
        />
      </Grid>
      <Grid item sx={{ display: !displayFizOsoba ? 'block' : 'none' }}>
        <TextField
          margin='normal'
          required
          fullWidth
          name='iban_budget'
          label='iban_budget'
          type='text'
          id='iban_budget'
          value={iban_budget ?? ''}
          onChange={onChange}
        />
      </Grid>
      <Grid item sx={{ display: displayFizOsoba ? 'block' : 'none' }}>
        <TextField
          margin='normal'
          required
          fullWidth
          name='passportNumber'
          label='passportNumber'
          type='text'
          id='passportNumber'
          value={passportNumber ?? ''}
          onChange={onChange}
        />
      </Grid>
      <Grid item>
        <TextField
          margin='normal'
          required
          fullWidth
          name='firstName_imen'
          label='firstName_imen'
          type='text'
          id='firstName_imen'
          value={firstName_imen ?? ''}
          onChange={onChange}
        />
      </Grid>
      <Grid item>
        <TextField
          margin='normal'
          required
          fullWidth
          name='patronymic_imen'
          label='patronymic_imen'
          type='text'
          id='patronymic_imen'
          value={patronymic_imen ?? ''}
          onChange={onChange}
        />
      </Grid>
      <Grid item>
        <TextField
          margin='normal'
          required
          fullWidth
          name='lastName_imen'
          label='lastName_imen'
          type='text'
          id='lastName_imen'
          value={lastName_imen ?? ''}
          onChange={onChange}
        />
      </Grid>
      <Grid item>
        <TextField
          margin='normal'
          required
          fullWidth
          name='firstName_rodit'
          label='firstName_rodit'
          type='text'
          id='firstName_rodit'
          value={firstName_rodit ?? ''}
          onChange={onChange}
        />
      </Grid>
      <Grid item>
        <TextField
          margin='normal'
          required
          fullWidth
          name='patronymic_rodit'
          label='patronymic_rodit'
          type='text'
          id='patronymic_rodit'
          value={patronymic_rodit ?? ''}
          onChange={onChange}
        />
      </Grid>
      <Grid item>
        <TextField
          margin='normal'
          required
          fullWidth
          name='lastName_rodit'
          label='lastName_rodit'
          type='text'
          id='lastName_rodit'
          value={lastName_rodit ?? ''}
          onChange={onChange}
        />
      </Grid>

      <Grid item sx={{ display: displayFOP ? 'block' : 'none' }}>
        <TextField
          margin='normal'
          required
          fullWidth
          name='certificateNumber'
          label='certificateNumber'
          type='text'
          id='certificateNumber'
          value={certificateNumber ?? ''}
          onChange={onChange}
        />
      </Grid>
      <Grid item sx={{ display: displayFOP ? 'block' : 'none' }}>
        <TextField
          margin='normal'
          required
          fullWidth
          name='representedBy'
          label='representedBy'
          type='text'
          id='representedBy'
          value={representedBy ?? ''}
          onChange={onChange}
        />
      </Grid>
      <Grid
        item
        sx={{ display: !displayFizOsoba && !displayFOP ? 'block' : 'none' }}
      >
        <TextField
          margin='normal'
          required
          fullWidth
          name='whichActsOnTheBasis'
          label='whichActsOnTheBasis'
          type='text'
          id='whichActsOnTheBasis'
          value={whichActsOnTheBasis ?? ''}
          onChange={onChange}
        />
      </Grid>

      <Grid
        item
        sx={{ display: !displayFizOsoba && !displayFOP ? 'block' : 'none' }}
      >
        <TextField
          margin='normal'
          required
          fullWidth
          name='jobTitle'
          label='jobTitle'
          type='text'
          id='jobTitle'
          value={jobTitle ?? ''}
          onChange={onChange}
        />
      </Grid>
      <Grid
        item
        sx={{ display: !displayFizOsoba && !displayFOP ? 'block' : 'none' }}
      >
        <TextField
          margin='normal'
          required
          fullWidth
          name='jobTitle_rodit'
          label='jobTitle_rodit'
          type='text'
          id='jobTitle_rodit'
          value={jobTitle_rodit ?? ''}
          onChange={onChange}
        />
      </Grid>
      <Grid item sx={{ display: !displayFizOsoba ? 'block' : 'none' }}>
        <TextField
          margin='normal'
          required
          fullWidth
          name='tax'
          label='tax'
          type='number'
          id='tax'
          value={tax ?? '0'}
          onChange={onChange}
        />
      </Grid>

      <Grid item sx={{ mb: 2, display: !displayFizOsoba ? 'block' : 'none' }}>
        <Stack
          direction='row'
          spacing={2}
          // direction={{ xs: 'column', sm: 'row' }}
        >
          <MySelectAutoCompl
            selectName={`taxationType`}
            selectLabel={`Налогооблажение`}
            fieldToShow={`taxationTypeName`}
            handleChangeSelects={handleChangeSelects}
            selectedOption={taxationType ?? ''}
            // @ts-ignore
            arrToSelect={arr__TaxationType ?? []}
          />

          <IconButton
            onClick={() =>
              onClickAddItem('/accountant/refdata/taxation-type/add')
            }
          >
            <AddIcon color='success' sx={{ fontSize: 30 }} />
          </IconButton>
        </Stack>
      </Grid>
      <Grid item>
        <TextField
          margin='normal'
          required
          fullWidth
          name='certificate_PDV'
          label='certificate_PDV'
          type='text'
          id='certificate_PDV'
          value={certificate_PDV ?? ''}
          onChange={onChange}
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
          value={telNumber}
          onChange={setTelNumber}
          required
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
          required
          fullWidth
          name='email'
          label='email'
          type='email'
          id='email'
          value={email ?? ''}
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
            selectName={`clientType`}
            selectLabel={`Тип клиента`}
            fieldToShow={`clientTypeName`}
            handleChangeMultipleSelects={handleChangeSelects}
            selectedOptions={clientType.length !== 0 ? clientType : []}
            // @ts-ignore
            arrToSelect={arr__ClientTypes ?? []}
          />

          <IconButton
            onClick={() =>
              onClickAddItem('/accountant/refdata/client-type/add')
            }
          >
            <AddIcon color='success' sx={{ fontSize: 30 }} />
          </IconButton>
        </Stack>
      </Grid>

      <Grid item>
        <Button
          type='submit'
          fullWidth
          disabled={
            !clientLongName ||
            !clientShortName ||
            !firmType ||
            !postIndex ||
            !address ||
            !firstName_imen ||
            !patronymic_imen ||
            !lastName_imen ||
            !firstName_rodit ||
            !patronymic_rodit ||
            !lastName_rodit ||
            !taxationType ||
            !telNumber ||
            (clientType && clientType.length === 0)
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

export default DocumentNakladnayaEdit;
