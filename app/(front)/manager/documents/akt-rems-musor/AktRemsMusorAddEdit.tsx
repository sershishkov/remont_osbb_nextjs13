'use client';

import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useRouter } from 'next/navigation';

import { v4 as uuidv4 } from 'uuid';

import TableNakladnayaOrAkt from '@/components/documents/TableNakladnayaOrAkt';

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

import PrintIcon from '@mui/icons-material/Print';

import Link from '@mui/material/Link';

import MySelectAutoCompl from '@/components/common/MySelectAutoCompl';

import {
  I_ServiceWork,
  I_Contract,
  I_Client,
  I_ClientType,
  I_RowInAktRemsMusor,
  I_ServiceWorkInAktRemsMusor,
} from '@/interfaces/refdata';

const currentURL = '/manager/documents/akt-rems-musor';
const initState = {
  aktRemsMusorNumber: '',
  aktRemsMusorDate: '',
  contract: '',

  executorFirm: '',
  clientFirm: '',
  ourFirm: '',

  totalAktRemsMusorToShow: '0',
  servSum: 0,
};

function AktRemsMusorAddEdit({
  id,
  mode,
  title,
}: Readonly<{ id?: string; mode: string; title: string }>) {
  const route = useRouter();

  const [formData, setFormData] = useState(initState);

  const [arr__Clients, setArr__Clients] = useState<I_Client[]>([]);
  const [arr__ourFirms, setArr__ourFirms] = useState<I_Client[]>([]);
  const [arr__Contracts, setArr__Contracts] = useState<I_Contract[]>([]);
  const [arr__ClientContracts, setArr__ClientContracts] = useState<
    I_Contract[]
  >([]);
  const [arr__ServiceWorks, setArr__ServiceWorks] = useState<I_ServiceWork[]>(
    []
  );
  const [localServiceWorks, setLocalServiceWorks] = useState<
    I_RowInAktRemsMusor[]
  >([]);

  const {
    aktRemsMusorNumber,
    aktRemsMusorDate,
    contract,

    executorFirm,
    clientFirm,
    ourFirm,

    totalAktRemsMusorToShow,
    servSum,
  } = formData;

  useEffect(() => {
    const inputFocus = document.getElementById('client');
    inputFocus?.focus();
  }, []);

  useEffect(() => {
    const myGetAll = async () => {
      const clients = await get__all(
        { page: '0', limit: '0', filter: '' },
        '/manager/refdata/client'
      );
      const contracts = await get__all(
        { page: '0', limit: '0', filter: '' },
        '/manager/refdata/contract'
      );
      const serviceWorks = await get__all(
        { page: '0', limit: '0', filter: '' },
        '/manager/refdata/serviceworks'
      );
      const all__ClientTypes = await get__all(
        { page: '0', limit: '0', filter: '' },
        '/accountant/refdata/client-type'
      );
      const ourFirmObj = all__ClientTypes.items.find(
        (item: I_ClientType) => item.clientTypeName === 'наша фирма'
      );
      const arr__ourFirms: I_Client[] = [];
      const arr__Clients: I_Client[] = [];

      clients.items.forEach((item: I_Client) => {
        const hasOurFirm = item.clientType?.some(
          (oneType) => oneType._id === ourFirmObj._id
        );

        if (hasOurFirm) {
          arr__ourFirms.push(item);
        } else {
          arr__Clients.push(item);
        }
      });

      setArr__Clients(arr__Clients);
      setArr__ourFirms(arr__ourFirms);
      setArr__Contracts(contracts.items);
      setArr__ClientContracts(contracts.items);
      setArr__ServiceWorks(serviceWorks.items);

      setFormData((prevState) => ({
        ...prevState,
        aktRemsMusorDate: new Date().toISOString().split('T')[0],
      }));
    };
    myGetAll();
  }, []);

  useEffect(() => {
    if (clientFirm) {
      const belongingContracts = arr__Contracts.filter(
        //@ts-ignore
        (item) => item.client?._id.toString() === clientFirm
      );
      setArr__ClientContracts(belongingContracts);
    }
  }, [clientFirm, arr__Contracts]);

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
        aktRemsMusorNumber: currentContract?.aktNumber ?? '',

        ourFirm: currentOurFirmId,
        clientFirm: currentClientId,
      }));
    }
  }, [contract, arr__Contracts]);

  useLayoutEffect(() => {
    if (id) {
      const myGetOne = async () => {
        const item = await item__get_one({ _id: id }, currentURL);

        if (item) {
          setFormData((prevState) => ({
            ...prevState,
            aktRemsMusorNumber: item.aktRemsMusorNumber,

            aktRemsMusorDate: new Date(item.aktRemsMusorDate!)
              .toISOString()
              .split('T')[0],
            contract: item.contract._id.toString(),
            executorFirm: item.executorFirm._id.toString(),

            clientFirm: item.contract.client._id.toString(),
            ourFirm: item.contract.ourFirm._id.toString(),

            totalAktRemsMusorToShow: item.totalAktRemsMusorToShow
              ? item.totalAktRemsMusorToShow.toFixed(2)
              : item.totalAktRemsMusorSum,

            servSum: Number(item.totalAktRemsMusorSum),
          }));

          const newLocalServiceWorks = item.serviceWorks?.map(
            (inner_item: I_ServiceWorkInAktRemsMusor) => {
              return {
                row_id: uuidv4(),
                //@ts-ignore
                serviceWork: inner_item.serviceWork._id.toString(),
                //@ts-ignore
                unit: inner_item.serviceWork.unit.unitName,

                amount: inner_item.amount.toString(),
                price: inner_item.price.toString(),
                extraInformation: inner_item?.extraInformation!,
                rowSum: inner_item.rowSum.toFixed(2),
              };
            }
          );

          setLocalServiceWorks(newLocalServiceWorks ?? []);
        }
      };
      myGetOne();
    }
  }, [id, arr__Contracts]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const serviceWorksToSave = localServiceWorks.map((item) => {
      return {
        serviceWork: item.serviceWork,
        extraInformation: item.extraInformation,
        amount: Number(item.amount),
        price: Number(item.price),
        rowSum: Number(item.rowSum),
      };
    });

    const created__Data = {
      aktRemsMusorNumber,

      aktRemsMusorDate,
      contract,

      executorFirm,
      clientFirm,
      ourFirm,

      totalAktRemsMusorToShow: Number(totalAktRemsMusorToShow),

      serviceWorks: serviceWorksToSave,
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

  const addTableRowServ = () => {
    const newItem = {
      row_id: uuidv4(),
      serviceWork: '',
      unit: '',
      amount: '',
      price: '',
      rowSum: '0',
      extraInformation: '',
    };

    setLocalServiceWorks([...localServiceWorks, newItem]);
  };

  const deleteTableRowServ = (rowID: string) => {
    const newArr = [...localServiceWorks].filter(
      (item) => item.row_id !== rowID
    );
    setLocalServiceWorks(newArr);
  };

  const rowGoUpServ = (rowIndex: number) => {
    const tempArr = [...localServiceWorks];
    tempArr.splice(rowIndex - 1, 2, tempArr[rowIndex], tempArr[rowIndex - 1]);

    setLocalServiceWorks(tempArr);
  };
  const rowGowDownServ = (rowIndex: number) => {
    const tempArr = [...localServiceWorks];
    tempArr.splice(rowIndex, 2, tempArr[rowIndex + 1], tempArr[rowIndex]);

    setLocalServiceWorks(tempArr);
  };

  const recalcRowServ = (rowID: string) => {
    const tempRows = [...localServiceWorks];
    const findRowIndex = tempRows.findIndex((item) => item.row_id === rowID);
    const findedRow = tempRows[findRowIndex];

    const recalcSum = Number(findedRow.amount) * Number(findedRow.price);

    const updatedRow = {
      ...findedRow,
      rowSum: recalcSum.toFixed(2),
    };

    tempRows.splice(findRowIndex, 1, updatedRow);
    setLocalServiceWorks(tempRows);
    recalcAllTableServ();
  };

  const recalcAllTableServ = () => {
    let tempTotalSum = 0;
    localServiceWorks.forEach((item) => {
      tempTotalSum += Number(item.amount) * Number(item.price);
    });

    setFormData((prevState) => ({
      ...prevState,
      servSum: tempTotalSum,
      totalAktRemsMusorToShow: tempTotalSum.toFixed(2),
    }));
  };

  const handleChangeInputsInRowServ = (
    rowID: string,
    fieldName: string,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const tempRows = [...localServiceWorks];
    const findRowIndex = tempRows.findIndex((item) => item.row_id === rowID);
    const findedRow = tempRows[findRowIndex];

    const updatedRow = {
      ...findedRow,
      [fieldName]: event.target.value,
    };

    tempRows.splice(findRowIndex, 1, updatedRow);
    setLocalServiceWorks(tempRows);
  };

  const handleChangeSelectsMainFieldServ = (
    targetName: string,
    targetValue: string
  ) => {
    const rowId = targetName.split('_')[1];

    const temp__localProducts = [...localServiceWorks];
    const currentIndex = temp__localProducts.findIndex(
      (item) => item.row_id === rowId
    );
    const currentProduct = arr__ServiceWorks.find(
      (item) => item._id === targetValue
    );

    temp__localProducts[currentIndex].serviceWork = targetValue;
    //@ts-ignore
    temp__localProducts[currentIndex].unit = currentProduct?.unit?.unitName!;

    setLocalServiceWorks(temp__localProducts);
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
        <Grid
          container
          direction='row'
          alignItems='center'
          justifyContent={`space-between`}
          spacing={1}
        >
          <Grid item>
            <Typography variant='body2' align='left'>
              {title}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant='body2' align='left'>
              Сумма: {servSum.toFixed(2)}
            </Typography>
          </Grid>
          <Grid item>
            <Button
              type='submit'
              size='small'
              fullWidth
              disabled={
                !aktRemsMusorNumber ||
                !aktRemsMusorDate ||
                !contract ||
                !executorFirm ||
                !clientFirm ||
                !ourFirm ||
                (localServiceWorks && localServiceWorks.length === 0)
              }
              variant='contained'
            >
              Сохранить
            </Button>
          </Grid>
          <Grid item sx={{ display: mode === 'edit' ? 'block' : 'none' }}>
            <Button
              startIcon={<PrintIcon />}
              component={Link}
              href={`${currentURL}/print/${id}`}
              fullWidth
              size='small'
              color='success'
              disabled={
                !aktRemsMusorNumber ||
                !aktRemsMusorDate ||
                !contract ||
                !executorFirm ||
                !clientFirm ||
                !ourFirm ||
                (localServiceWorks && localServiceWorks.length === 0)
              }
              variant='contained'
            >
              Акт
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container direction='row' alignItems='center' spacing={1}>
          <Grid item sx={{ width: 150 }}>
            <TextField
              margin='normal'
              required
              fullWidth
              name='aktRemsMusorDate'
              label='Дата акта'
              type='date'
              id='aktRemsMusorDate'
              value={aktRemsMusorDate ?? ''}
              onChange={onChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item sx={{ width: 300 }}>
            <MySelectAutoCompl
              selectName={`clientFirm`}
              selectLabel={`Клиент`}
              fieldToShow={`clientShortName`}
              handleChangeSelects={handleChangeSelects}
              selectedOption={clientFirm ?? ''}
              // @ts-ignore
              arrToSelect={arr__Clients ?? []}
            />
          </Grid>

          <Grid item sx={{ flex: 1, display: clientFirm ? 'block' : 'none' }}>
            <MySelectAutoCompl
              selectName={`contract`}
              selectLabel={`Договор`}
              fieldToShow={`contractDescription`}
              handleChangeSelects={handleChangeSelects}
              selectedOption={contract ?? ''}
              // @ts-ignore
              arrToSelect={arr__ClientContracts ?? []}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid item>
        <Grid container direction='row' alignItems='center' spacing={1}>
          <Grid item sx={{ width: 150 }}>
            <TextField
              margin='normal'
              required
              fullWidth
              name='aktRemsMusorNumber'
              label='№ акта'
              type='text'
              id='aktRemsMusorNumber'
              value={aktRemsMusorNumber ?? ''}
              onChange={onChange}
            />
          </Grid>

          <Grid item sx={{ width: 200 }}>
            <MySelectAutoCompl
              selectName={`executorFirm`}
              selectLabel={`executorFirm`}
              fieldToShow={`clientShortName`}
              handleChangeSelects={handleChangeSelects}
              selectedOption={executorFirm ?? ''}
              // @ts-ignore
              arrToSelect={arr__ourFirms ?? []}
            />
          </Grid>

          <Grid item sx={{ width: 200 }}>
            <TextField
              margin='normal'
              required
              fullWidth
              name='totalAktRemsMusorToShow'
              label='Округл Сум'
              type='number'
              id='totalAktRemsMusorToShow'
              value={totalAktRemsMusorToShow ?? ''}
              onChange={onChange}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid item>
        <TableNakladnayaOrAkt
          linkToAddNewItem={`/manager/refdata/serviceworks/add`}
          mainFieldCaption={`Работы`}
          mainFieldnName={`serviceWorkName`}
          mainFieldId={`serviceWork`}
          tableRows={localServiceWorks}
          naklSum={servSum.toFixed(2)}
          arrToSelectInMainColumn={arr__ServiceWorks}
          addTableRow={addTableRowServ}
          deleteTableRow={deleteTableRowServ}
          rowGoUp={rowGoUpServ}
          rowGowDown={rowGowDownServ}
          recalcRow={recalcRowServ}
          handleChangeInputsInRow={handleChangeInputsInRowServ}
          handleChangeSelectsMainField={handleChangeSelectsMainFieldServ}
          showExtraInformation={true}
        />
      </Grid>
    </Grid>
  );
}

export default AktRemsMusorAddEdit;
