'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

import { item__add, get__all } from '@/lib/actions/refdata.actions';

import TableNakladnayaOrAkt from '@/components/documents/TableNakladnayaOrAkt';

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

import MySelectAutoCompl from '@/components/common/MySelectAutoCompl';

import {
  I_ThirdPartyService,
  I_ServiceWork,
  I_Contract,
  I_Client,
  I_LThirdPartyService,
  I_LServiceWork,
} from '@/interfaces/refdata';

import { generateDocNumber } from '@/lib/helpers/helperFunction';
import { arr__typeAkt, accountant_role } from '@/constants/constants';

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

function DocumentAktOfWorkAdd() {
  const route = useRouter();
  const session = useSession();
  const userRole = session?.data?.user.role;

  const [formData, setFormData] = useState(initState);
  const [localThirdPartyServices, setLocalThirdPartyServices] = useState<
    I_LThirdPartyService[]
  >([]);
  const [localServiceWorks, setLocalServiceWorks] = useState<I_LServiceWork[]>(
    []
  );
  const [naklStages, setNaklStages] = useState({
    isActive: true,
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

      setFormData((prevState) => ({
        ...prevState,
        aktOfWorkNumber: generateDocNumber(),
        aktOfWorkDate: new Date().toISOString().split('T')[0],
      }));
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
      aktOfWorkNumber,
      aktOfWorkDate,
      contract,

      thirdPartyServices: thirdPartysToSave,
      serviceWorks: serviceWorksToSave,

      isActive: naklStages.isActive,
      typeAkt,
    };

    await item__add(created__Data, currentURL, route);
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
          Добавить
        </Typography>
        <Typography variant='h6' align='center'>
          Полная сумма: {aktSum.toFixed(2)}
        </Typography>
      </Grid>
      <Grid item>
        <Grid container direction='row' alignItems='center' spacing={3}>
          <Grid item>
            <TextField
              margin='normal'
              required
              fullWidth
              name='aktOfWorkNumber'
              label='№ акта'
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
              label='Дата акта'
              type='date'
              id='aktOfWorkDate'
              value={aktOfWorkDate ?? ''}
              onChange={onChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item sx={{ flex: 1 }}>
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

          <Grid
            item
            sx={{
              flex: 1,
              display: accountant_role.includes(userRole!) ? 'flex' : 'none',
            }}
          >
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
        </Grid>
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
    </Grid>
  );
}

export default DocumentAktOfWorkAdd;
