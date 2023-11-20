'use client';

import React, { useState, useEffect, useLayoutEffect, useMemo } from 'react';
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

const currentURL = '/manager/refdata/thirdpartyservices';
const initState = {
  thirdPartyServiceName: '',
  description: '',
  unit: '',
  thirdPartyServiceGroup: [],
  priceBuyRecommend: '',
};

function ThirdPartyServicesEdit({ params }: paramsProps) {
  const { id } = params;
  const route = useRouter();

  const [formData, setFormdata] = useState(initState);
  const [arr__Units, setArr__Units] = useState([]);
  const [arr__ThirdPartyServiceGroups, setArr__ThirdPartyServiceGroups] =
    useState([]);

  const {
    thirdPartyServiceName,
    description,
    unit,
    thirdPartyServiceGroup,
    priceBuyRecommend,
  } = formData;

  useEffect(() => {
    const inputFocus = document.getElementById('thirdPartyServiceName');
    inputFocus?.focus();
  }, []);
  // console.log('id', id);

  useLayoutEffect(() => {
    if (id) {
      const myGetOne = async () => {
        const item = await item__get_one({ _id: id }, currentURL);
        // console.log('item', item);
        if (item) {
          const arrToSet_thirdPartyServiceGroup =
            item.thirdPartyServiceGroup!.map((item: any) => {
              return item._id;
            });

          setFormdata({
            thirdPartyServiceName: item.thirdPartyServiceName!,
            unit: item.unit?._id!,
            description: item.description,

            thirdPartyServiceGroup: arrToSet_thirdPartyServiceGroup!,
            priceBuyRecommend: item.priceBuyRecommend!.toString(),
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
      const thirdpartyservicegroup = await get__all(
        { page: '0', limit: '0', filter: '' },
        '/manager/refdata/thirdpartyservice-group'
      );

      setArr__Units(units.items);
      setArr__ThirdPartyServiceGroups(thirdpartyservicegroup.items);
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
      thirdPartyServiceName,
      description,
      unit,
      thirdPartyServiceGroup,
      priceBuyRecommend: priceBuyRecommend ? Number(priceBuyRecommend) : 1,
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
          Добавить
        </Typography>
      </Grid>

      <Grid item>
        <TextField
          margin='normal'
          required
          fullWidth
          name='thirdPartyServiceName'
          label='thirdPartyServiceName'
          type='text'
          id='thirdPartyServiceName'
          value={thirdPartyServiceName ?? ''}
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
            // prettier-ignore
            selectedOption={unit ?? ""}
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
            selectName={`thirdPartyServiceGroup`}
            selectLabel={`Группы сторонних работ`}
            fieldToShow={`thirdPartyServiceGroupName`}
            handleChangeMultipleSelects={handleChangeMultipleSelects}
            selectedOptions={
              thirdPartyServiceGroup.length !== 0 ? thirdPartyServiceGroup : []
            }
            // @ts-ignore
            arrToSelect={arr__ThirdPartyServiceGroups}
          />

          <IconButton
            onClick={() =>
              onClickAddItem('/manager/refdata/thirdpartyservice-group/add')
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
        <Button
          type='submit'
          fullWidth
          disabled={
            !thirdPartyServiceName ||
            !unit ||
            thirdPartyServiceGroup.length === 0 ||
            !priceBuyRecommend
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

export default ThirdPartyServicesEdit;
