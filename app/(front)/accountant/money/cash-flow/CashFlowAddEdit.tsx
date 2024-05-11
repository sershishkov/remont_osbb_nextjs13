'use client';

import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useRouter } from 'next/navigation';

import {
  item__get_one,
  item__edit,
  item__add,
  get__all,
} from '@/lib/actions/refdata.actions';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

import MySelectAutoCompl from '@/components/common/MySelectAutoCompl';
import {
  I_Worker,
  I_CashFlowType,
  I_CashRegister,
  I_Contract,
  I_Client,
} from '@/interfaces/refdata';

const currentURL = '/accountant/money/cash-flow';

const initState = {
  cashFlowDate: '',
  cashFlowSum: '',
  cashFlowType: '',
  сashRegister: '',
  contract: '',
  ourFirm: '',
  client: '',
  responsiblePerson: '',
  additionalInformation: '',
};

function CashFlowAddEdit({
  id,
  mode,
  title,
}: Readonly<{ id?: string; mode: string; title: string }>) {
  const route = useRouter();

  const [formData, setFormData] = useState(initState);
  const [isContractRequired, setIsContractRequired] = useState<boolean>(false);
  const [isClientRequired, setIsClientRequired] = useState<boolean>(false);
  const [isResponsPersonRequired, setIsResponsPersonRequired] =
    useState<boolean>(false);

  const [arr__Workers, setArr__Workers] = useState<I_Worker[]>([]);
  const [arr__CashFlowTypes, setArr__CashFlowTypes] = useState<
    I_CashFlowType[]
  >([]);
  const [arr__CashRegisters, setArr__CashRegisters] = useState<
    I_CashRegister[]
  >([]);

  const [arr__Clients, setArr__Clients] = useState<I_Client[]>([]);
  const [arr__Contracts, setArr__Contracts] = useState<I_Contract[]>([]);
  const [arr__ClientContracts, setArr__ClientContracts] = useState<
    I_Contract[]
  >([]);

  const {
    cashFlowDate,
    cashFlowSum,
    cashFlowType,
    сashRegister,
    contract,
    ourFirm,
    client,
    responsiblePerson,
    additionalInformation,
  } = formData;

  useEffect(() => {
    const inputFocus = document.getElementById('cashFlowSum');
    inputFocus?.focus();
  }, []);
  useEffect(() => {
    const myGetAll = async () => {
      const all__cashFlowTypes = await get__all(
        { page: '0', limit: '0', filter: '' },
        '/accountant/refdata/cash-flow-type'
      );
      const all__сashRegisters = await get__all(
        { page: '0', limit: '0', filter: '' },
        '/accountant/refdata/cash-register'
      );
      const all__contracts = await get__all(
        { page: '0', limit: '0', filter: '' },
        '/manager/refdata/contract'
      );
      const all__Workers = await get__all(
        { page: '0', limit: '0', filter: '' },
        '/accountant/refdata/workers'
      );

      const allFirms = await get__all(
        { page: '0', limit: '0', filter: '' },
        '/manager/refdata/client'
      );

      const arr__Clients = allFirms.items.filter((l_client: I_Client) => {
        const hasOurFirm = l_client.clientType?.some(
          //@ts-ignore
          (oneType) => oneType.clientTypeName === 'наша фирма'
        );

        return !hasOurFirm;
      });

      setArr__Workers(all__Workers.items);
      setArr__CashFlowTypes(all__cashFlowTypes.items);
      setArr__CashRegisters(all__сashRegisters.items);
      setArr__Clients(arr__Clients);
      setArr__Contracts(all__contracts.items);
      setArr__ClientContracts(all__contracts.items);
    };

    myGetAll();
  }, []);

  useEffect(() => {
    if (mode === 'add') {
      setFormData((prevState) => ({
        ...prevState,
        cashFlowDate: new Date().toISOString().split('T')[0],
      }));
    }
  }, [mode]);

  useLayoutEffect(() => {
    if (id) {
      const myGetOne = async () => {
        const item = await item__get_one({ _id: id }, currentURL);

        if (item) {
          console.log(item.cashFlowDate);
          setFormData((prevState) => ({
            ...prevState,
            cashFlowDate: new Date(item.cashFlowDate!)
              .toISOString()
              .split('T')[0],

            cashFlowSum: item.cashFlowSum.toFixed(2),
            cashFlowType: item.cashFlowType._id.toString(),
            сashRegister: item.сashRegister._id.toString(),
            contract: item.contract?._id ? item.contract?._id.toString() : '',
            ourFirm: item.ourFirm?._id ? item.ourFirm?._id.toString() : '',
            client: item.client?._id ? item.client?._id.toString() : '',
            responsiblePerson: item.responsiblePerson?._id
              ? item.responsiblePerson?._id.toString()
              : '',
            additionalInformation: item.additionalInformation,
          }));
        }
      };
      myGetOne();
    }
  }, [id]);

  useEffect(() => {
    if (client) {
      const belongingContracts = arr__Contracts.filter(
        //@ts-ignore
        (item) => item.client?._id.toString() === client
      );
      setArr__ClientContracts(belongingContracts);
    }
  }, [client, arr__Contracts]);
  useEffect(() => {
    if (contract) {
      const currentContract = arr__Contracts.find(
        //@ts-ignore
        (item) => item._id.toString() === contract
      );
      //@ts-ignore
      const currentOurFirmId = currentContract?.ourFirm._id;
      //@ts-ignore
      const currentClientId = currentContract?.client._id;

      setFormData((prevState) => ({
        ...prevState,

        ourFirm: currentOurFirmId,
        client: currentClientId,
      }));
    }
  }, [contract, arr__Contracts]);

  useEffect(() => {
    if (cashFlowType) {
      const currentCashFlowType = arr__CashFlowTypes.find(
        (item) => item._id === cashFlowType
      );
      const cashFlowTypeName = currentCashFlowType?.cashFlowTypeName;

      if (cashFlowTypeName?.startsWith('Дог')) {
        setIsContractRequired(true);
        setIsClientRequired(true);
        setIsResponsPersonRequired(false);
      } else if (
        cashFlowTypeName === 'ЗарплатаМенедж' ||
        cashFlowTypeName === 'Инвестиция'
      ) {
        setIsContractRequired(false);
        setIsClientRequired(false);
        setIsResponsPersonRequired(true);
      } else {
        setIsContractRequired(false);
        setIsClientRequired(false);
        setIsResponsPersonRequired(false);
      }
    }
  }, [cashFlowType, arr__CashFlowTypes]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
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

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const created__Data = {
      cashFlowDate,
      cashFlowSum: Number(cashFlowSum),
      cashFlowType,
      сashRegister,
      contract,
      ourFirm,
      client,
      responsiblePerson,
      additionalInformation,
    };

    if (mode === 'add') {
      await item__add(created__Data, currentURL, route);
    } else if (mode === 'edit') {
      //@ts-ignore
      created__Data._id = id;
      await item__edit(created__Data, currentURL, route);
    }
  };

  return (
    <Grid component='form' onSubmit={onSubmit} container direction='column'>
      <Grid item className='item item-heading'>
        <Typography variant='h3' align='center'>
          {title}
        </Typography>
      </Grid>
      <Grid item sx={{ width: '100%' }}>
        <Grid
          container
          direction={`column`}
          justifyContent={`flex-start`}
          alignItems={`flex-start`}
          spacing={1}
        >
          <Grid item sx={{ width: 200 }}>
            <TextField
              margin='normal'
              required
              fullWidth
              name='cashFlowDate'
              label='Дата '
              type='date'
              id='cashFlowDate'
              value={cashFlowDate ?? ''}
              onChange={onChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item sx={{ width: 200 }}>
            <TextField
              margin='normal'
              required
              fullWidth
              name='cashFlowSum'
              label='Сумма '
              type='number'
              id='cashFlowSum'
              value={cashFlowSum ?? ''}
              onChange={onChange}
            />
          </Grid>
          <Grid item>
            <Stack direction='row' spacing={1} alignItems={`center`}>
              <Grid item sx={{ width: 300 }}>
                <MySelectAutoCompl
                  selectName={`cashFlowType`}
                  selectLabel={`Тип Операции`}
                  fieldToShow={`cashFlowTypeName`}
                  handleChangeSelects={handleChangeSelects}
                  selectedOption={cashFlowType ?? ''}
                  // @ts-ignore
                  arrToSelect={arr__CashFlowTypes ?? []}
                />
              </Grid>

              <IconButton
                onClick={() =>
                  onClickAddItem('/accountant/refdata/cash-flow-type/add')
                }
              >
                <AddIcon color='success' sx={{ fontSize: 15 }} />
              </IconButton>
            </Stack>
          </Grid>
          <Grid item>
            <Stack direction='row' spacing={1}>
              <Grid item sx={{ width: 300 }}>
                <MySelectAutoCompl
                  selectName={`сashRegister`}
                  selectLabel={`Касса`}
                  fieldToShow={`cashRegisterName`}
                  handleChangeSelects={handleChangeSelects}
                  selectedOption={сashRegister ?? ''}
                  // @ts-ignore
                  arrToSelect={arr__CashRegisters ?? []}
                />
              </Grid>

              <IconButton
                onClick={() =>
                  onClickAddItem('/accountant/refdata/cash-register/add')
                }
              >
                <AddIcon color='success' sx={{ fontSize: 15 }} />
              </IconButton>
            </Stack>
          </Grid>
          <Grid
            item
            sx={{
              width: 310,
              display: !isClientRequired ? 'none' : undefined,
              border:
                !client && isClientRequired
                  ? '2px solid red'
                  : '2px solid transparent',
            }}
          >
            <MySelectAutoCompl
              selectName={`client`}
              selectLabel={`Клиент`}
              fieldToShow={`clientShortName`}
              handleChangeSelects={handleChangeSelects}
              selectedOption={client ?? ''}
              // @ts-ignore
              arrToSelect={arr__Clients ?? []}
            />
          </Grid>
          <Grid
            item
            sx={{
              display: client && isContractRequired ? 'block' : 'none',
              width: '100%',
              border:
                !contract && isContractRequired
                  ? '2px solid red'
                  : '2px solid transparent',
            }}
          >
            <MySelectAutoCompl
              selectName={`contract`}
              selectLabel={`Договора`}
              fieldToShow={`contractDescription`}
              handleChangeSelects={handleChangeSelects}
              selectedOption={contract ?? ''}
              // @ts-ignore
              arrToSelect={arr__ClientContracts ?? []}
            />
          </Grid>
          <Grid
            item
            sx={{
              width: 310,
              display: !isResponsPersonRequired ? 'none' : undefined,
              border:
                !responsiblePerson && isResponsPersonRequired
                  ? '2px solid red'
                  : '2px solid transparent',
            }}
          >
            <MySelectAutoCompl
              selectName={`responsiblePerson`}
              selectLabel={`Отв.Лицо`}
              fieldToShow={`lastName`}
              handleChangeSelects={handleChangeSelects}
              selectedOption={responsiblePerson ?? ''}
              // @ts-ignore
              arrToSelect={arr__Workers ?? []}
            />
          </Grid>
          <Grid item sx={{ width: '100%' }}>
            <TextField
              margin='normal'
              // required
              multiline
              fullWidth
              name='additionalInformation'
              label='Примечание'
              type='text'
              id='additionalInformation'
              value={additionalInformation ?? ''}
              onChange={onChange}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid item>
        <Button
          type='submit'
          fullWidth
          disabled={
            !cashFlowDate ||
            !cashFlowSum ||
            !cashFlowType ||
            !сashRegister ||
            (!contract && isContractRequired) ||
            (!client && isClientRequired) ||
            (!responsiblePerson && isResponsPersonRequired)
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

export default CashFlowAddEdit;
