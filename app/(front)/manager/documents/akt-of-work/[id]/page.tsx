'use client';

import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

import TableNakladnayaOrAkt from '@/components/documents/TableNakladnayaOrAkt';

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
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Link from '@mui/material/Link';

import MySelectAutoCompl from '@/components/common/MySelectAutoCompl';

import {
  I_ThirdPartyService,
  I_ServiceWork,
  I_Contract,
  I_Client,
  I_LThirdPartyService,
  I_LServiceWork,
  I_ThirdPartyServiceInAkt,
  I_ServiceWorkInAkt,
} from '@/interfaces/refdata';

import { arr__typeAkt } from '@/constants/constants';

const currentURL = '/manager/documents/akt-of-work';
const initState = {
  aktOfWorkNumber: '',
  aktOfWorkDate: '',
  client: '',
  contract: '',

  typeAkt: 'outgoing',
  aktSum: 0,
  thirdSum: 0,
  servSum: 0,
};

function DocumentAktOfWorkEdit({ params }: Readonly<paramsProps>) {
  const { id } = params;
  const route = useRouter();

  const [formData, setFormData] = useState(initState);

  const [localThirdPartyServices, setLocalThirdPartyServices] = useState<
    I_LThirdPartyService[]
  >([]);
  const [localServiceWorks, setLocalServiceWorks] = useState<I_LServiceWork[]>(
    []
  );
  const [naklStages, setNaklStages] = useState({
    isActive: false,
  });

  const [arr__Clients, setArr__Clients] = useState<I_Client[]>([]);
  const [arr__Contracts, setArr__Contracts] = useState<I_Contract[]>([]);
  const [arr__ClientContracts, setArr__ClientContracts] = useState<
    I_Contract[]
  >([]);
  const [arr__thirdPartyServices, setArr__thirdPartyServices] = useState<
    I_ThirdPartyService[]
  >([]);
  const [arr__ServiceWorks, setArr__ServiceWorks] = useState<I_ServiceWork[]>(
    []
  );

  const {
    aktOfWorkNumber,
    aktOfWorkDate,
    client,
    contract,

    typeAkt,
    aktSum,
    thirdSum,
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
      const thirdPartys = await get__all(
        { page: '0', limit: '0', filter: '' },
        '/manager/refdata/thirdpartyservices'
      );
      const serviceWorks = await get__all(
        { page: '0', limit: '0', filter: '' },
        '/manager/refdata/serviceworks'
      );
      setArr__Clients(clients.items);
      setArr__Contracts(contracts.items);
      setArr__ClientContracts(contracts.items);
      setArr__thirdPartyServices(thirdPartys.items);
      setArr__ServiceWorks(serviceWorks.items);
    };
    myGetAll();
  }, []);
  useEffect(() => {
    if (client) {
      const belongingContracts = arr__Contracts.filter(
        (item) => item.client?._id.toString() === client
      );
      setArr__ClientContracts(belongingContracts);
    }
  }, [client, arr__Contracts]);

  useLayoutEffect(() => {
    if (id) {
      const myGetOne = async () => {
        const item = await item__get_one({ _id: id }, currentURL);

        if (item) {
          setFormData((prevState) => ({
            ...prevState,
            aktOfWorkNumber: item.aktOfWorkNumber,
            aktOfWorkDate: new Date(item.aktOfWorkDate!)
              .toISOString()
              .split('T')[0],
            client: item.contract.client._id.toString(),
            contract: item.contract._id.toString(),

            typeAkt: item.typeAkt,
            aktSum: Number(item.totalSums.totalAktSum),
            thirdSum: Number(item.totalSums.totalThirdPartySum),
            servSum: Number(item.totalSums.totalServiceWorkSum),
          }));

          const newLocalThirdPartyServices = item.thirdPartyServices?.map(
            (inner_item: I_ThirdPartyServiceInAkt) => {
              //@ts-ignore
              // console.log(inner_item.product.unit.uniteName);
              return {
                row_id: uuidv4(),
                //@ts-ignore
                thirdPartyService: inner_item.thirdPartyService._id.toString(),
                //@ts-ignore
                unit: inner_item.thirdPartyService.unit.unitName,

                amount: inner_item?.amount!.toString(),
                price: inner_item?.price!.toString(),
                extraInformation: inner_item?.extraInformation!,
                rowSum: (inner_item?.amount! * inner_item?.price!).toFixed(2),
              };
            }
          );

          const newLocalServiceWorks = item.serviceWorks?.map(
            (inner_item: I_ServiceWorkInAkt) => {
              //@ts-ignore
              // console.log(inner_item.product.unit.uniteName);
              return {
                row_id: uuidv4(),
                //@ts-ignore
                serviceWork: inner_item.serviceWork._id.toString(),
                //@ts-ignore
                unit: inner_item.serviceWork.unit.unitName,

                amount: inner_item?.amount!.toString(),
                price: inner_item?.price!.toString(),
                extraInformation: inner_item?.extraInformation!,
                rowSum: (inner_item?.amount! * inner_item?.price!).toFixed(2),
              };
            }
          );

          setNaklStages((prevState) => ({
            ...prevState,
            isActive: item.isActive,
          }));

          setLocalThirdPartyServices(newLocalThirdPartyServices ?? []);
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
    const thirdPartysToSave = localThirdPartyServices.map((item) => {
      return {
        thirdPartyService: item.thirdPartyService,
        extraInformation: item.extraInformation,
        amount: Number(item.amount),
        price: Number(item.price),
      };
    });
    const serviceWorksToSave = localServiceWorks.map((item) => {
      return {
        serviceWork: item.serviceWork,
        extraInformation: item.extraInformation,
        amount: Number(item.amount),
        price: Number(item.price),
      };
    });

    const created__Data = {
      _id: id,
      aktOfWorkNumber,
      aktOfWorkDate,
      contract,

      thirdPartyServices: thirdPartysToSave,
      serviceWorks: serviceWorksToSave,

      isActive: naklStages.isActive,
      typeAkt,
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
  const handleChangeContractStages = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNaklStages({
      ...naklStages,
      [event.target.name]: event.target.checked,
    });
  };

  const addTableRowThird = () => {
    const newItem = {
      row_id: uuidv4(),
      thirdPartyService: '',
      unit: '',
      amount: '',
      price: '',
      rowSum: '0',
      extraInformation: '',
    };

    setLocalThirdPartyServices([...localThirdPartyServices, newItem]);
  };

  const deleteTableRowThird = (rowID: string) => {
    const newArr = [...localThirdPartyServices].filter(
      (item) => item.row_id !== rowID
    );
    setLocalThirdPartyServices(newArr);
  };

  const rowGoUpThird = (rowIndex: number) => {
    const tempArr = [...localThirdPartyServices];
    tempArr.splice(rowIndex - 1, 2, tempArr[rowIndex], tempArr[rowIndex - 1]);

    setLocalThirdPartyServices(tempArr);
  };
  const rowGowDownThird = (rowIndex: number) => {
    const tempArr = [...localThirdPartyServices];
    tempArr.splice(rowIndex, 2, tempArr[rowIndex + 1], tempArr[rowIndex]);

    setLocalThirdPartyServices(tempArr);
  };

  const recalcRowThird = (rowID: string) => {
    const tempRows = [...localThirdPartyServices];
    const findRowIndex = tempRows.findIndex((item) => item.row_id === rowID);
    const findedRow = tempRows[findRowIndex];

    const recalcSum = Number(findedRow.amount) * Number(findedRow.price);

    const updatedRow = {
      ...findedRow,
      rowSum: recalcSum.toFixed(2),
    };

    tempRows.splice(findRowIndex, 1, updatedRow);
    setLocalThirdPartyServices(tempRows);
    recalcAllTableThird();
  };

  const recalcAllTableThird = () => {
    let tempTotalSum = 0;
    localThirdPartyServices.forEach((item) => {
      tempTotalSum += Number(item.amount) * Number(item.price);
    });

    setFormData((prevState) => ({
      ...prevState,
      thirdSum: tempTotalSum,
      aktSum: tempTotalSum + servSum,
    }));
  };
  /////////////////////////////////////////
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
      aktSum: tempTotalSum + thirdSum,
    }));
  };
  ////////////////////////////////////////

  const handleChangeInputsInRowThird = (
    rowID: string,
    fieldName: string,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const tempRows = [...localThirdPartyServices];
    const findRowIndex = tempRows.findIndex((item) => item.row_id === rowID);
    const findedRow = tempRows[findRowIndex];

    const updatedRow = {
      ...findedRow,
      [fieldName]: event.target.value,
    };

    tempRows.splice(findRowIndex, 1, updatedRow);
    setLocalThirdPartyServices(tempRows);
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

  const handleChangeSelectsMainFieldThird = (
    targetName: string,
    targetValue: string
  ) => {
    const rowId = targetName.split('_')[1];

    const temp__localProducts = [...localThirdPartyServices];
    const currentIndex = temp__localProducts.findIndex(
      (item) => item.row_id === rowId
    );
    const currentProduct = arr__thirdPartyServices.find(
      (item) => item._id === targetValue
    );

    temp__localProducts[currentIndex].thirdPartyService = targetValue;
    //@ts-ignore
    temp__localProducts[currentIndex].unit = currentProduct?.unit?.unitName!;

    setLocalThirdPartyServices(temp__localProducts);
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
        <Typography variant='h3' align='center'>
          Редактировать
        </Typography>
        <Typography variant='h6' align='center'>
          Полная сумма: {aktSum.toFixed(2)}
        </Typography>
      </Grid>

      <Grid item>
        <TextField
          margin='normal'
          required
          fullWidth
          name='aktOfWorkNumber'
          label='aktOfWorkNumber'
          type='text'
          id='aktOfWorkNumber'
          value={aktOfWorkNumber ?? ''}
          onChange={onChange}
        />
      </Grid>
      <Grid item>
        <TextField
          margin='normal'
          required
          fullWidth
          name='aktOfWorkDate'
          label='aktOfWorkDate'
          type='date'
          id='aktOfWorkDate'
          value={aktOfWorkDate ?? ''}
          onChange={onChange}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>

      <Grid item sx={{ mb: 2 }}>
        <Stack
          direction='row'
          spacing={2}
          // direction={{ xs: 'column', sm: 'row' }}
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

          <IconButton
            onClick={() => onClickAddItem('/manager/refdata/client/add')}
          >
            <AddIcon color='success' sx={{ fontSize: 30 }} />
          </IconButton>
        </Stack>
      </Grid>

      <Grid item sx={{ mb: 2, display: client ? 'block' : 'none' }}>
        <Stack
          direction='row'
          spacing={2}
          // direction={{ xs: 'column', sm: 'row' }}
        >
          <MySelectAutoCompl
            selectName={`contract`}
            selectLabel={`Договор`}
            fieldToShow={`contractDescription`}
            handleChangeSelects={handleChangeSelects}
            selectedOption={contract ?? ''}
            // @ts-ignore
            arrToSelect={arr__ClientContracts ?? []}
          />

          <IconButton
            onClick={() => onClickAddItem('/manager/refdata/contract/add')}
          >
            <AddIcon color='success' sx={{ fontSize: 30 }} />
          </IconButton>
        </Stack>
      </Grid>

      <Grid item sx={{ mb: 2 }}>
        <MySelectAutoCompl
          selectName={`typeAkt`}
          selectLabel={`Тип акта`}
          fieldToShow={`caption`}
          handleChangeSelects={handleChangeSelects}
          selectedOption={typeAkt ?? ''}
          // @ts-ignore
          arrToSelect={arr__typeAkt ?? []}
        />
      </Grid>

      <Grid item>
        <FormControl component='fieldset' variant='standard'>
          <FormLabel component='legend'>Стадии выполнения</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={naklStages.isActive}
                  onChange={handleChangeContractStages}
                  name='isActive'
                />
              }
              label={
                naklStages.isActive
                  ? 'Провести документ'
                  : 'Не проводить документ'
              }
            />
          </FormGroup>
        </FormControl>
      </Grid>

      <Grid item>
        <TableNakladnayaOrAkt
          mainFieldCaption={`Сервисы`}
          mainFieldnName={`thirdPartyServiceName`}
          mainFieldId={`thirdPartyService`}
          tableRows={localThirdPartyServices}
          naklSum={thirdSum.toFixed(2)}
          arrToSelectInMainColumn={arr__thirdPartyServices}
          addTableRow={addTableRowThird}
          deleteTableRow={deleteTableRowThird}
          rowGoUp={rowGoUpThird}
          rowGowDown={rowGowDownThird}
          recalcRow={recalcRowThird}
          handleChangeInputsInRow={handleChangeInputsInRowThird}
          handleChangeSelectsMainField={handleChangeSelectsMainFieldThird}
          showExtraInformation={true}
        />
      </Grid>
      <Grid item>
        <TableNakladnayaOrAkt
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

      <Grid item sx={{ width: '100%' }}>
        <Grid
          container
          direction='row'
          justifyContent='space-around'
          alignItems='center'
          sx={{ width: '100%' }}
        >
          <Grid item>
            <Button
              type='submit'
              fullWidth
              disabled={
                !aktOfWorkNumber ||
                !aktOfWorkDate ||
                !contract ||
                !typeAkt ||
                (localThirdPartyServices &&
                  localThirdPartyServices.length === 0 &&
                  localServiceWorks &&
                  localServiceWorks.length === 0)
              }
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              {naklStages.isActive
                ? 'Сохранить и провести '
                : 'Сохранить без проведения'}
            </Button>
          </Grid>
          <Grid item>
            <Button
              component={Link}
              href={`${currentURL}/print/${id}`}
              fullWidth
              color='success'
              disabled={
                !aktOfWorkNumber ||
                !aktOfWorkDate ||
                !contract ||
                !typeAkt ||
                (localThirdPartyServices &&
                  localThirdPartyServices.length === 0 &&
                  localServiceWorks &&
                  localServiceWorks.length === 0)
              }
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              На печать
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default DocumentAktOfWorkEdit;