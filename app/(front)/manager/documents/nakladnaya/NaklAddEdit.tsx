'use client';

import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
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

import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import PrintIcon from '@mui/icons-material/Print';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';

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

import { accountant_role, arr__typeNakl } from '@/constants/constants';

const currentURL = '/manager/documents/nakladnaya';
const initState = {
  nakladnayaNumber: '',
  nakladnayaDate: '',
  client: '',
  contract: '',

  storeHouse: '',

  typeNakl: 'outgoing',
  naklSum: 0,

  naklOurFirm: '',
  naklClient: '',
};

function NaklAddEdit({
  id,
  mode,
  title,
}: Readonly<{ id?: string; mode: string; title: string }>) {
  const route = useRouter();
  const session = useSession();
  const userRole = session?.data?.user.role;

  const [formData, setFormData] = useState(initState);

  const [localProducts, setLocalProducts] = useState<I_LocalProduct[]>([]);
  const [naklStages, setNaklStages] = useState({
    isActive: true,
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

    naklOurFirm,
    naklClient,
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
      const defaultStoreHouse = storehouses.items.find(
        (item: I_StoreHouse) => item.storeHouseName === 'Основной'
      );

      setFormData((prevState) => ({
        ...prevState,
        storeHouse: defaultStoreHouse._id,
        // nakladnayaNumber: generateDocNumber(),
        nakladnayaDate: new Date().toISOString().split('T')[0],
      }));
    };
    myGetAll();
  }, []);

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

      const naklNum = currentContract?.naklNumber;

      setFormData((prevState) => ({
        ...prevState,
        nakladnayaNumber: naklNum ?? '',
        naklOurFirm: currentOurFirmId,
        naklClient: currentClientId,
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
              return {
                row_id: uuidv4(),
                //@ts-ignore
                product: inner_item.product._id.toString(),
                //@ts-ignore
                unit: inner_item.product.unit.unitName,

                amount: inner_item?.amount.toString(),
                price: inner_item?.price.toString(),
                extraInformation: inner_item?.extraInformation!,
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
        extraInformation: item.extraInformation,
        amount: Number(item.amount),
        price: Number(item.price),
      };
    });

    const created__Data = {
      nakladnayaNumber,
      nakladnayaDate,
      contract,

      products: productsToSave,
      storeHouse,
      isActive: naklStages.isActive,
      typeNakl,

      naklOurFirm,
      naklClient,
    };

    console.log(created__Data);

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
      extraInformation: '',
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
              Сумма: {naklSum.toFixed(2)}
            </Typography>
          </Grid>
          <Grid item>
            <Button
              type='submit'
              size='small'
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
            >
              {naklStages.isActive
                ? 'Сохранить и провести '
                : 'Сохранить без проведения'}
            </Button>
          </Grid>
          <Grid item sx={{ display: mode === 'edit' ? 'block' : 'none' }}>
            <Button
              startIcon={<PrintIcon />}
              component={Link}
              href={`${currentURL}/print/nakladnaya/${id}`}
              fullWidth
              size='small'
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
            >
              накладная
            </Button>
          </Grid>
          <Grid item sx={{ display: mode === 'edit' ? 'block' : 'none' }}>
            <Button
              startIcon={<PrintIcon />}
              component={Link}
              href={`${currentURL}/print/invoice/${id}`}
              fullWidth
              size='small'
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
            >
              Счет
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
              name='nakladnayaNumber'
              label='№ накладной'
              type='text'
              id='nakladnayaNumber'
              value={nakladnayaNumber ?? ''}
              onChange={onChange}
            />
          </Grid>
          <Grid item sx={{ width: 150 }}>
            <TextField
              margin='normal'
              required
              fullWidth
              name='nakladnayaDate'
              label='Дата накладной'
              type='date'
              id='nakladnayaDate'
              value={nakladnayaDate ?? ''}
              onChange={onChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item sx={{ width: 150 }}>
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

          <Grid
            item
            sx={{
              width: 110,
              display: accountant_role.includes(userRole!) ? 'block' : 'none',
              // border: '1px solid red',
            }}
          >
            <FormControl component='fieldset' variant='standard'>
              <FormLabel component='legend'>
                {naklStages.isActive ? 'Проведен' : 'Не Проведен'}
              </FormLabel>
              <FormGroup>
                <Switch
                  checked={naklStages.isActive}
                  onChange={handleChangeContractStages}
                  name='isActive'
                />
              </FormGroup>
            </FormControl>
          </Grid>
          <Grid item sx={{ width: 200, display: 'none' }}>
            <Stack
              direction='row'
              spacing={1}
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
                onClick={() =>
                  onClickAddItem('/accountant/refdata/storehouse/add')
                }
              >
                <AddIcon color='success' sx={{ fontSize: 30 }} />
              </IconButton>
            </Stack>
          </Grid>
          <Grid item sx={{ width: 300 }}>
            <Stack
              direction='row'
              spacing={1}
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

          <Grid item sx={{ flex: 1, display: client ? 'block' : 'none' }}>
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
              <IconButton
                onClick={() =>
                  onClickAddItem(`/manager/refdata/contract/${contract}`)
                }
              >
                <EditIcon color='primary' sx={{ fontSize: 30 }} />
              </IconButton>
            </Stack>
          </Grid>
        </Grid>
      </Grid>

      <Grid item>
        <TableNakladnayaOrAkt
          linkToAddNewItem={`/manager/refdata/products/add`}
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
          showExtraInformation={true}
        />
      </Grid>
    </Grid>
  );
}

export default NaklAddEdit;
