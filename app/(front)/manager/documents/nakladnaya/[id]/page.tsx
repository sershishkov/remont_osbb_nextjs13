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
  I_Product,
  I_Contract,
  I_StoreHouse,
  I_Client,
  I_LocalProduct,
  I_ProductInNakl,
} from '@/interfaces/refdata';

import { arr__typeNakl } from '@/constants/constants';

const currentURL = '/manager/documents/nakladnaya';
const initState = {
  nakladnayaNumber: '',
  nakladnayaDate: '',
  client: '',
  contract: '',

  storeHouse: '',

  typeNakl: 'outgoing',
  naklSum: 0,
};

function DocumentNakladnayaEdit({ params }: Readonly<paramsProps>) {
  const { id } = params;
  const route = useRouter();

  const [formData, setFormData] = useState(initState);

  const [localProducts, setLocalProducts] = useState<I_LocalProduct[]>([]);
  const [naklStages, setNaklStages] = useState({
    isActive: false,
  });

  const [arr__Clients, setArr__Clients] = useState<I_Client[]>([]);
  const [arr__Contracts, setArr__Contracts] = useState<I_Contract[]>([]);
  const [arr__ClientContracts, setArr__ClientContracts] = useState<
    I_Contract[]
  >([]);
  const [arr__Products, setArr__Products] = useState<I_Product[]>([]);
  const [arr__StoreHouses, setArr__StoreHouses] = useState<I_StoreHouse[]>([]);

  const {
    nakladnayaNumber,
    nakladnayaDate,
    client,
    contract,

    storeHouse,

    typeNakl,
    naklSum,
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
      const products = await get__all(
        { page: '0', limit: '0', filter: '' },
        '/manager/refdata/products'
      );
      const storehouses = await get__all(
        { page: '0', limit: '0', filter: '' },
        '/accountant/refdata/storehouse'
      );

      setArr__Clients(clients.items);
      setArr__Contracts(contracts.items);
      setArr__ClientContracts(contracts.items);
      setArr__Products(products.items);
      setArr__StoreHouses(storehouses.items);
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
            nakladnayaNumber: item.nakladnayaNumber,
            nakladnayaDate: new Date(item.nakladnayaDate!)
              .toISOString()
              .split('T')[0],
            contract: item.contract._id.toString(),
            storeHouse: item.storeHouse._id.toString(),
            typeNakl: item.typeNakl,
            naklSum: Number(item.totalNaklSum),
            client: item.contract.client._id.toString(),
          }));

          const newLocalProducts = item.products?.map(
            (inner_item: I_ProductInNakl) => {
              //@ts-ignore
              // console.log(inner_item.product.unit.uniteName);
              return {
                row_id: uuidv4(),
                //@ts-ignore
                product: inner_item.product._id.toString(),
                //@ts-ignore
                unit: inner_item.product.unit.unitName,

                amount: inner_item?.amount.toString(),
                price: inner_item?.price.toString(),
                rowSum: (inner_item?.amount * inner_item?.price).toFixed(2),
              };
            }
          );

          setNaklStages((prevState) => ({
            ...prevState,
            isActive: item.isActive,
          }));

          setLocalProducts(newLocalProducts ?? []);
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
    const productsToSave = localProducts.map((item) => {
      return {
        product: item.product,
        amount: Number(item.amount),
        price: Number(item.price),
      };
    });

    const created__Data = {
      _id: id,
      nakladnayaNumber,
      nakladnayaDate,
      contract,

      products: productsToSave,
      storeHouse,
      isActive: naklStages.isActive,
      typeNakl,
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

  const addTableRow = () => {
    const newItem = {
      row_id: uuidv4(),
      product: '',
      unit: '',
      amount: '',
      price: '',
      rowSum: '0',
    };

    setLocalProducts([...localProducts, newItem]);
  };

  const deleteTableRow = (rowID: string) => {
    const newArr = [...localProducts].filter((item) => item.row_id !== rowID);
    setLocalProducts(newArr);
  };

  const rowGoUp = (rowIndex: number) => {
    const tempArr = [...localProducts];
    tempArr.splice(rowIndex - 1, 2, tempArr[rowIndex], tempArr[rowIndex - 1]);

    setLocalProducts(tempArr);
  };
  const rowGowDown = (rowIndex: number) => {
    const tempArr = [...localProducts];
    tempArr.splice(rowIndex, 2, tempArr[rowIndex + 1], tempArr[rowIndex]);

    setLocalProducts(tempArr);
  };

  const recalcRow = (rowID: string) => {
    const tempRows = [...localProducts];
    const findRowIndex = tempRows.findIndex((item) => item.row_id === rowID);
    const findedRow = tempRows[findRowIndex];

    const recalcSum = Number(findedRow.amount) * Number(findedRow.price);

    const updatedRow = {
      ...findedRow,
      rowSum: recalcSum.toFixed(2),
    };

    tempRows.splice(findRowIndex, 1, updatedRow);
    setLocalProducts(tempRows);
    recalcAllTable();
  };

  const recalcAllTable = () => {
    let tempTotalSum = 0;
    localProducts.forEach((item) => {
      tempTotalSum += Number(item.amount) * Number(item.price);
    });

    setFormData((prevState) => ({
      ...prevState,
      naklSum: tempTotalSum,
    }));
  };

  const handleChangeInputsInRow = (
    rowID: string,
    fieldName: string,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const tempRows = [...localProducts];
    const findRowIndex = tempRows.findIndex((item) => item.row_id === rowID);
    const findedRow = tempRows[findRowIndex];

    const updatedRow = {
      ...findedRow,
      [fieldName]: event.target.value,
    };

    tempRows.splice(findRowIndex, 1, updatedRow);
    setLocalProducts(tempRows);
  };

  const handleChangeSelectsMainField = (
    targetName: string,
    targetValue: string
  ) => {
    const rowId = targetName.split('_')[1];

    const temp__localProducts = [...localProducts];
    const currentIndex = temp__localProducts.findIndex(
      (item) => item.row_id === rowId
    );
    const currentProduct = arr__Products.find(
      (item) => item._id === targetValue
    );

    temp__localProducts[currentIndex].product = targetValue;
    //@ts-ignore
    temp__localProducts[currentIndex].unit = currentProduct?.unit?.unitName!;

    setLocalProducts(temp__localProducts);
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

      <Grid item>
        <TextField
          margin='normal'
          required
          fullWidth
          name='nakladnayaNumber'
          label='nakladnayaNumber'
          type='text'
          id='nakladnayaNumber'
          value={nakladnayaNumber ?? ''}
          onChange={onChange}
        />
      </Grid>
      <Grid item>
        <TextField
          margin='normal'
          required
          fullWidth
          name='nakladnayaDate'
          label='nakladnayaDate'
          type='date'
          id='nakladnayaDate'
          value={nakladnayaDate ?? ''}
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
        <Stack
          direction='row'
          spacing={2}
          // direction={{ xs: 'column', sm: 'row' }}
        >
          <MySelectAutoCompl
            selectName={`storeHouse`}
            selectLabel={`Склад`}
            fieldToShow={`storeHouseName`}
            handleChangeSelects={handleChangeSelects}
            selectedOption={storeHouse ?? ''}
            // @ts-ignore
            arrToSelect={arr__StoreHouses ?? []}
          />

          <IconButton
            onClick={() => onClickAddItem('/accountant/refdata/storehouse/add')}
          >
            <AddIcon color='success' sx={{ fontSize: 30 }} />
          </IconButton>
        </Stack>
      </Grid>
      <Grid item sx={{ mb: 2 }}>
        <MySelectAutoCompl
          selectName={`typeNakl`}
          selectLabel={`Тип накладной`}
          fieldToShow={`caption`}
          handleChangeSelects={handleChangeSelects}
          selectedOption={typeNakl ?? ''}
          // @ts-ignore
          arrToSelect={arr__typeNakl ?? []}
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
          mainFieldCaption={`Материалы`}
          mainFieldnName={`productName`}
          mainFieldId={`product`}
          tableRows={localProducts}
          naklSum={naklSum.toFixed(2)}
          arrToSelectInMainColumn={arr__Products}
          addTableRow={addTableRow}
          deleteTableRow={deleteTableRow}
          rowGoUp={rowGoUp}
          rowGowDown={rowGowDown}
          recalcRow={recalcRow}
          handleChangeInputsInRow={handleChangeInputsInRow}
          handleChangeSelectsMainField={handleChangeSelectsMainField}
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
                !nakladnayaNumber ||
                !nakladnayaDate ||
                !contract ||
                !storeHouse ||
                !typeNakl ||
                (localProducts && localProducts.length === 0)
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
                !nakladnayaNumber ||
                !nakladnayaDate ||
                !contract ||
                !storeHouse ||
                !typeNakl ||
                (localProducts && localProducts.length === 0)
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

export default DocumentNakladnayaEdit;
