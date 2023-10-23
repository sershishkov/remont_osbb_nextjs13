'use client';

import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

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

const currentURL = '/manager/refdata/products';
const initState = {
  productName: '',
  description: '',
  unit: '',
  productType: '',
  productGroup: [],
  priceBuyRecommend: '',
  normPerOne: '',
  amountInPackage: '',
  weight: '',
  height: '',
  width: '',
  length: '',
  paintingArea: '',
};

function ProductsEdit({ params }: paramsProps) {
  const { id } = params;
  const route = useRouter();

  const [formData, setFormdata] = useState(initState);
  const [arr__Units, setArr__Units] = useState([]);
  const [arr__ProductGroups, setArr__ProductGroups] = useState([]);
  const [arr__ProductTypes, setArr__ProductTypes] = useState([]);

  const {
    productName,
    description,
    unit,
    productType,
    productGroup,
    priceBuyRecommend,
    normPerOne,
    amountInPackage,
    weight,
    height,
    width,
    length,
    paintingArea,
  } = formData;

  useEffect(() => {
    const inputFocus = document.getElementById('productName');
    inputFocus?.focus();
  }, []);
  // console.log('FormData', formData);

  useLayoutEffect(() => {
    if (id) {
      const myGetOne = async () => {
        const item = await item__get_one({ _id: id }, currentURL);
        // console.log('item', item);
        if (item) {
          const arrToSet = item.productGroup!.map((item: any) => {
            return item._id;
          });

          setFormdata({
            productName: item.productName!,
            description: item.description!,

            unit: item.unit._id!,
            productType: item.productType._id!,
            // @ts-ignore
            productGroup: arrToSet!,
            priceBuyRecommend: item.priceBuyRecommend!.toString(),
            normPerOne: item.normPerOne!.toString(),
            amountInPackage: item.amountInPackage!.toString(),
            weight: item.weight!.toString(),
            height: item.height!.toString(),
            width: item.width!.toString(),
            length: item.length!.toString(),
            paintingArea: item.paintingArea!.toString(),
          });
        }
      };
      myGetOne();
    }
  }, [id]);

  useEffect(() => {
    const myGetAll = async () => {
      const units = await get__all(
        { page: '0', limit: '0', filter: '' },
        '/manager/refdata/unit'
      );
      const productgroups = await get__all(
        { page: '0', limit: '0', filter: '' },
        '/manager/refdata/productgroup'
      );
      const producttypes = await get__all(
        { page: '0', limit: '0', filter: '' },
        '/manager/refdata/producttype'
      );

      setArr__Units(units.items);
      setArr__ProductGroups(productgroups.items);
      setArr__ProductTypes(producttypes.items);
    };
    myGetAll();
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormdata((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const created__Data = {
      _id: id,
      productName,
      description,
      unit,
      productGroup,
      productType,
      priceBuyRecommend: priceBuyRecommend ? Number(priceBuyRecommend) : 1,
      normPerOne: normPerOne ? Number(normPerOne) : 1,
      amountInPackage: amountInPackage ? Number(amountInPackage) : 1,
      weight: weight ? Number(weight) : 0,
      height: height ? Number(height) : 0,
      width: width ? Number(width) : 0,
      length: length ? Number(length) : 0,
      paintingArea: paintingArea ? Number(paintingArea) : 0,
    };

    const myData = await item__edit(created__Data, currentURL);

    if (myData) {
      toast.success(myData.message);

      setTimeout(() => {
        route.back();
      }, 2000);
    }
  };
  const handleChangeSelects = (targetName: string, targetValue: string) => {
    setFormdata((prevState) => ({
      ...prevState,
      [targetName]: targetValue,
    }));
  };

  const handleChangeMultipleSelects = (
    targetName: string,
    targetValue: string[]
  ) => {
    setFormdata((prevState) => ({
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
      <Grid item>
        <TextField
          margin='normal'
          required
          fullWidth
          name='productName'
          label='productName'
          type='text'
          id='productName'
          value={productName ?? ''}
          onChange={onChange}
        />
      </Grid>
      <Grid item>
        <TextField
          margin='normal'
          multiline
          maxRows={4}
          fullWidth
          name='description'
          label='Описание'
          type='text'
          id='description'
          value={description ?? ''}
          onChange={onChange}
        />
      </Grid>

      <Grid item sx={{ mb: 2 }}>
        <Stack
          direction='row'
          spacing={2}
          // direction={{ xs: 'column', sm: 'row' }}
        >
          <MySelectAutoCompl
            selectName={`unit`}
            selectLabel={`Размерность`}
            fieldToShow={`unitName`}
            handleChangeSelects={handleChangeSelects}
            selectedOption={unit ?? ''}
            // @ts-ignore
            arrToSelect={arr__Units}
          />

          <IconButton
            onClick={() => onClickAddItem('/manager/refdata/unit/add')}
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
          <MySelectMultipleAutoCompl
            selectName={`productGroup`}
            selectLabel={`Группы товаров`}
            fieldToShow={`productGroupName`}
            handleChangeMultipleSelects={handleChangeMultipleSelects}
            selectedOptions={productGroup ?? []}
            // @ts-ignore
            arrToSelect={arr__ProductGroups}
          />

          <IconButton
            onClick={() => onClickAddItem('/manager/refdata/productgroup/add')}
          >
            <AddIcon color='success' sx={{ fontSize: 30 }} />
          </IconButton>
        </Stack>
      </Grid>
      <Grid item>
        <Stack
          direction='row'
          spacing={2}
          // direction={{ xs: 'column', sm: 'row' }}
        >
          <MySelectAutoCompl
            selectName={`productType`}
            selectLabel={`Тип`}
            fieldToShow={`productTypeName`}
            handleChangeSelects={handleChangeSelects}
            selectedOption={productType ?? ''}
            // @ts-ignore
            arrToSelect={arr__ProductTypes}
          />

          <IconButton
            onClick={() => onClickAddItem('/manager/refdata/producttype/add')}
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
          name='priceBuyRecommend'
          label='priceBuyRecommend'
          type='number'
          id='priceBuyRecommend'
          value={priceBuyRecommend ?? ''}
          onChange={onChange}
          // inputProps={{
          //   step: '.001',
          // }}
        />
      </Grid>

      <Grid item>
        <TextField
          margin='normal'
          // required

          fullWidth
          name='normPerOne'
          label='normPerOne'
          type='number'
          id='normPerOne'
          value={normPerOne ?? ''}
          onChange={onChange}
          // inputProps={{
          //   step: '.001',
          // }}
        />
      </Grid>
      <Grid item>
        <TextField
          margin='normal'
          // required
          fullWidth
          name='amountInPackage'
          label='amountInPackage'
          type='number'
          id='amountInPackage'
          value={amountInPackage ?? ''}
          onChange={onChange}
        />
      </Grid>
      <Grid item>
        <TextField
          margin='normal'
          // required
          fullWidth
          name='weight'
          label='weight'
          type='number'
          id='weight'
          value={weight ?? ''}
          onChange={onChange}
        />
      </Grid>
      <Grid item>
        <TextField
          margin='normal'
          // required
          fullWidth
          name='height'
          label='height'
          type='number'
          id='height'
          value={height ?? ''}
          onChange={onChange}
        />
      </Grid>
      <Grid item>
        <TextField
          margin='normal'
          // required
          fullWidth
          name='width'
          label='width'
          type='number'
          id='width'
          value={width ?? ''}
          onChange={onChange}
        />
      </Grid>
      <Grid item>
        <TextField
          margin='normal'
          // required
          fullWidth
          name='length'
          label='length'
          type='number'
          id='length'
          value={length ?? ''}
          onChange={onChange}
        />
      </Grid>
      <Grid item>
        <TextField
          margin='normal'
          // required
          fullWidth
          name='paintingArea'
          label='paintingArea'
          type='number'
          id='paintingArea'
          value={paintingArea ?? ''}
          onChange={onChange}
        />
      </Grid>

      <Grid item>
        <Button
          type='submit'
          fullWidth
          disabled={
            !productName || !unit || productGroup.length === 0 || !productType
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

export default ProductsEdit;
