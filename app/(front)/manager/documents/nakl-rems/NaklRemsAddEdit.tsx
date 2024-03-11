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
  I_Product,
  I_Contract,
  I_Client,
  I_ProductInNakladnayaRems,
  I_RowInNakladnayaRems,
  I_ClientType,
} from '@/interfaces/refdata';

const currentURL = '/manager/documents/nakl-rems';
const initState = {
  nakladnayaRemsNumber1: '',
  nakladnayaRemsNumber2: '',
  nakladnayaRemsNumber3: '',
  nakladnayaRemsDate: '',
  contract: '',

  executorFirm1: '',
  executorFirm2: '',
  executorFirm3: '',
  clientFirm: '',
  ourFirm: '',

  percent2: '5.1',
  percent3: '9.8',
  totalRemsNaklSumToShow: '0',

  naklSum: 0,
};

function NaklRemsAddEdit({
  id,
  mode,
  title,
}: Readonly<{ id?: string; mode: string; title: string }>) {
  const route = useRouter();

  const [formData, setFormData] = useState(initState);

  const [localProducts, setLocalProducts] = useState<I_RowInNakladnayaRems[]>(
    []
  );

  const [arr__Clients, setArr__Clients] = useState<I_Client[]>([]);
  const [arr__ourFirms, setArr__ourFirms] = useState<I_Client[]>([]);
  const [arr__Contracts, setArr__Contracts] = useState<I_Contract[]>([]);
  const [arr__ClientContracts, setArr__ClientContracts] = useState<
    I_Contract[]
  >([]);
  const [arr__Products, setArr__Products] = useState<I_Product[]>([]);

  const {
    nakladnayaRemsNumber1,
    nakladnayaRemsNumber2,
    nakladnayaRemsNumber3,
    nakladnayaRemsDate,
    contract,

    executorFirm1,
    executorFirm2,
    executorFirm3,
    clientFirm,
    ourFirm,

    percent2,
    percent3,
    totalRemsNaklSumToShow,

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
      setArr__Products(products.items);

      setFormData((prevState) => ({
        ...prevState,
        nakladnayaRemsDate: new Date().toISOString().split('T')[0],
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

      const naklNum1 = currentContract?.naklNumber;
      let naklNum2 = '';
      let naklNum3 = '';
      const splitedNumber = naklNum1?.split('.');
      if (splitedNumber && splitedNumber.length > 0) {
        naklNum2 = `${splitedNumber[1]}/${splitedNumber[2]}-${Math.round(
          Number(splitedNumber[2]) * (Math.random() * (8 - 1) + 1)
        )}`;
        naklNum3 = `${splitedNumber[1]}/${splitedNumber[2]}/${Math.round(
          Number(splitedNumber[2]) * (Math.random() * (14 - 1) + 1)
        )}`;
      }

      setFormData((prevState) => ({
        ...prevState,
        nakladnayaRemsNumber1: naklNum1 ?? '',
        nakladnayaRemsNumber2: naklNum2 ?? '',
        nakladnayaRemsNumber3: naklNum3 ?? '',
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
            nakladnayaRemsNumber1: item.nakladnayaRemsNumber1,
            nakladnayaRemsNumber2: item.nakladnayaRemsNumber2,
            nakladnayaRemsNumber3: item.nakladnayaRemsNumber3,
            nakladnayaRemsDate: new Date(item.nakladnayaRemsDate!)
              .toISOString()
              .split('T')[0],
            contract: item.contract._id.toString(),
            executorFirm1: item.executorFirm1._id.toString(),
            executorFirm2: item.executorFirm2._id.toString(),
            executorFirm3: item.executorFirm3._id.toString(),
            clientFirm: item.contract.client._id.toString(),
            ourFirm: item.contract.ourFirm._id.toString(),
            percent2: item.percent2.toFixed(2),
            percent3: item.percent3.toFixed(2),
            totalRemsNaklSumToShow: item.totalRemsNaklSumToShow
              ? item.totalRemsNaklSumToShow.toFixed(2)
              : item.totalRemsNaklSum,

            naklSum: Number(item.totalRemsNaklSum),
          }));

          const newLocalProducts = item.products?.map(
            (inner_item: I_ProductInNakladnayaRems) => {
              return {
                row_id: uuidv4(),
                //@ts-ignore
                product: inner_item.product._id.toString(),
                extraInformation: inner_item?.extraInformation!,
                //@ts-ignore
                unit: inner_item.product.unit.unitName,

                amount: inner_item?.amount.toString(),
                price: inner_item?.price.toFixed(2),
                rowSum: inner_item?.rowSum.toFixed(2),
              };
            }
          );

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
        rowSum: Number(item.rowSum),
      };
    });

    const created__Data = {
      nakladnayaRemsNumber1,
      nakladnayaRemsNumber2,
      nakladnayaRemsNumber3,

      nakladnayaRemsDate,
      contract,

      executorFirm1,
      executorFirm2,
      executorFirm3,
      clientFirm,
      ourFirm,

      percent2: Number(percent2),
      percent3: Number(percent3),
      totalRemsNaklSumToShow: Number(totalRemsNaklSumToShow),

      products: productsToSave,
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

  const addTableRow = () => {
    const newItem = {
      row_id: uuidv4(),
      product: '',
      extraInformation: '',
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
                !nakladnayaRemsNumber1 ||
                !nakladnayaRemsNumber2 ||
                !nakladnayaRemsNumber3 ||
                !nakladnayaRemsDate ||
                !contract ||
                !executorFirm1 ||
                !executorFirm2 ||
                !executorFirm3 ||
                !clientFirm ||
                !ourFirm ||
                !percent2 ||
                !percent3 ||
                (localProducts && localProducts.length === 0)
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
                !nakladnayaRemsNumber1 ||
                !nakladnayaRemsNumber2 ||
                !nakladnayaRemsNumber3 ||
                !nakladnayaRemsDate ||
                !contract ||
                !executorFirm1 ||
                !executorFirm2 ||
                !executorFirm3 ||
                !clientFirm ||
                !ourFirm ||
                !percent2 ||
                !percent3 ||
                (localProducts && localProducts.length === 0)
              }
              variant='contained'
            >
              накладная
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
              name='nakladnayaRemsDate'
              label='Дата накладной'
              type='date'
              id='nakladnayaRemsDate'
              value={nakladnayaRemsDate ?? ''}
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
              name='nakladnayaRemsNumber1'
              label='№ накладной'
              type='text'
              id='nakladnayaRemsNumber1'
              value={nakladnayaRemsNumber1 ?? ''}
              onChange={onChange}
            />
          </Grid>
          <Grid item sx={{ width: 150 }}>
            <TextField
              margin='normal'
              required
              fullWidth
              name='nakladnayaRemsNumber2'
              label='№ накл 2'
              type='text'
              id='nakladnayaRemsNumber2'
              value={nakladnayaRemsNumber2 ?? ''}
              onChange={onChange}
            />
          </Grid>
          <Grid item sx={{ width: 150 }}>
            <TextField
              margin='normal'
              required
              fullWidth
              name='nakladnayaRemsNumber3'
              label='№ накл 3'
              type='text'
              id='nakladnayaRemsNumber3'
              value={nakladnayaRemsNumber3 ?? ''}
              onChange={onChange}
            />
          </Grid>

          <Grid item sx={{ width: 200 }}>
            <MySelectAutoCompl
              selectName={`executorFirm1`}
              selectLabel={`executorFirm1`}
              fieldToShow={`clientShortName`}
              handleChangeSelects={handleChangeSelects}
              selectedOption={executorFirm1 ?? ''}
              // @ts-ignore
              arrToSelect={arr__ourFirms ?? []}
            />
          </Grid>
          <Grid item sx={{ width: 200 }}>
            <MySelectAutoCompl
              selectName={`executorFirm2`}
              selectLabel={`executorFirm2`}
              fieldToShow={`clientShortName`}
              handleChangeSelects={handleChangeSelects}
              selectedOption={executorFirm2 ?? ''}
              // @ts-ignore
              arrToSelect={arr__ourFirms ?? []}
            />
          </Grid>
          <Grid item sx={{ width: 200 }}>
            <MySelectAutoCompl
              selectName={`executorFirm3`}
              selectLabel={`executorFirm3`}
              fieldToShow={`clientShortName`}
              handleChangeSelects={handleChangeSelects}
              selectedOption={executorFirm3 ?? ''}
              // @ts-ignore
              arrToSelect={arr__ourFirms ?? []}
            />
          </Grid>
          <Grid item sx={{ width: 200 }}>
            <TextField
              margin='normal'
              required
              fullWidth
              name='percent2'
              label='percent2'
              type='number'
              id='percent2'
              value={percent2 ?? ''}
              onChange={onChange}
            />
          </Grid>
          <Grid item sx={{ width: 200 }}>
            <TextField
              margin='normal'
              required
              fullWidth
              name='percent3'
              label='percent3'
              type='number'
              id='percent3'
              value={percent3 ?? ''}
              onChange={onChange}
            />
          </Grid>
          <Grid item sx={{ width: 200 }}>
            <TextField
              margin='normal'
              required
              fullWidth
              name='totalRemsNaklSumToShow'
              label='Округл Сум'
              type='number'
              id='totalRemsNaklSumToShow'
              value={totalRemsNaklSumToShow ?? ''}
              onChange={onChange}
            />
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

export default NaklRemsAddEdit;
