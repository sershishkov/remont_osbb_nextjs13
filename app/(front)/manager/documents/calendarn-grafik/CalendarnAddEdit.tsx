'use client';
import React, { useState, useEffect, useLayoutEffect } from 'react';

import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

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

import IconButton from '@mui/material/IconButton';

import TableContainer from '@mui/material/TableContainer';

import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PlusOneIcon from '@mui/icons-material/PlusOne';

import MySelectAutoCompl from '@/components/common/MySelectAutoCompl';
import {
  I_Contract,
  I_ServiceWorkInCalendarnGrafik,
} from '@/interfaces/refdata';

const currentURL = '/manager/documents/calendarn-grafik';
const initState = {
  contract: '',
};

export default function CalendarnAddEdit({
  id,
  mode,
  title,
  contractID = '',
}: Readonly<{
  id?: string;
  mode: string;
  title: string;
  contractID?: string;
}>) {
  const route = useRouter();

  const [formData, setFormData] = useState(initState);

  const [localServiceWorks, setLocalServiceWorks] = useState<
    I_ServiceWorkInCalendarnGrafik[]
  >([]);

  const [arr__Contracts, setArr__Contracts] = useState<I_Contract[]>([]);

  const { contract } = formData;
  useEffect(() => {
    const inputFocus = document.getElementById('client');
    inputFocus?.focus();
  }, []);
  useEffect(() => {
    const myGetAll = async () => {
      const contracts = await get__all(
        { page: '0', limit: '0', filter: '' },
        '/manager/refdata/contract'
      );
      const budgetContracts = contracts?.items?.filter(
        //@ts-ignore
        (tempContract: I_Contract) =>
          //@ts-ignore
          tempContract?.contractType?.contractTypeName === 'Бюджет ЖКХ' ||
          //@ts-ignore
          tempContract?.contractType?.contractTypeName === 'Ремсервис (бюджет)'
      );

      setArr__Contracts(budgetContracts);
    };
    myGetAll();
  }, []);

  useLayoutEffect(() => {
    if (contractID) {
      setFormData((prevState) => ({
        ...prevState,
        contract: contractID,
      }));
    }
  }, [contractID]);

  useLayoutEffect(() => {
    if (id) {
      const myGetOne = async () => {
        const item = await item__get_one({ _id: id }, currentURL);

        if (item) {
          setFormData((prevState) => ({
            ...prevState,
            contract: item.contract._id.toString(),
          }));

          const transformedServiceWorks = item.serviceWorks?.map(
            (inner_item: I_ServiceWorkInCalendarnGrafik) => {
              return {
                row_id: uuidv4(),
                serviceWork: inner_item.serviceWork,
                unit: inner_item.unit,
                amount: inner_item.amount,
              };
            }
          );

          setLocalServiceWorks(transformedServiceWorks ?? []);
        }
      };
      myGetOne();
    }
  }, [id]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const serviceWorksToSave = localServiceWorks.map((item) => {
      return {
        serviceWork: item.serviceWork,
        unit: item.unit,
        amount: item.amount,
      };
    });

    const created__Data = {
      contract,
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

  const addTableRow = () => {
    const newItem = {
      row_id: uuidv4(),
      serviceWork: '',
      unit: '',
      amount: '',
    };

    setLocalServiceWorks([...localServiceWorks, newItem]);
  };

  const deleteTableRow = (rowID: string) => {
    const newArr = [...localServiceWorks].filter(
      (item) => item.row_id !== rowID
    );
    setLocalServiceWorks(newArr);
  };

  const handleChangeInputsInRow = (
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
            <Button
              type='submit'
              fullWidth
              size='small'
              disabled={
                !contract ||
                (localServiceWorks && localServiceWorks.length === 0)
              }
              variant='contained'
            >
              Сохранить
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <MySelectAutoCompl
          selectName={`contract`}
          selectLabel={`Договор`}
          fieldToShow={`contractDescription`}
          handleChangeSelects={handleChangeSelects}
          selectedOption={contract ?? ''}
          // @ts-ignore
          arrToSelect={arr__Contracts ?? []}
        />
      </Grid>
      <TableContainer
        sx={{
          maxWidth: 1200,
          margin: '1rem auto',
          maxHeight: 800,
        }}
      >
        <Table
          stickyHeader
          padding='none'
          sx={{
            width: '100%',
            minWidth: 900,
            '& td,th': {
              border: '1px solid white',
            },
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell align='center'>
                <IconButton onClick={addTableRow}>
                  <PlusOneIcon color='success' sx={{ fontSize: '2rem' }} />
                </IconButton>
              </TableCell>
              <TableCell>
                <Typography variant='body1' align='center'>
                  Перелік видів робіт (у розрізі розділів локальних кошторисів)
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '100px' }}>
                <Typography variant='body1' align='center'>
                  Одиниця виміру
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '100px' }}>
                <Typography variant='body1' align='center'>
                  Кількість
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '100px' }}>
                <Typography variant='body1' align='center'>
                  Del
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {localServiceWorks.length > 0 &&
              localServiceWorks.map((row, rowIndex) => (
                <TableRow key={row.row_id}>
                  <TableCell align='center'>{`${rowIndex + 1}`}</TableCell>
                  <TableCell align='center'>
                    <TextField
                      multiline
                      fullWidth
                      name={`${row.row_id}-serviceWork`}
                      type='text'
                      id={`${row.row_id}-serviceWork`}
                      value={row.serviceWork ?? ''}
                      onChange={(e) =>
                        handleChangeInputsInRow(row.row_id!, 'serviceWork', e)
                      }
                    />
                  </TableCell>
                  <TableCell align='center'>
                    <TextField
                      multiline
                      name={`${row.row_id}-unit`}
                      type='text'
                      id={`${row.row_id}-unit`}
                      value={row.unit ?? ''}
                      onChange={(e) =>
                        handleChangeInputsInRow(row.row_id!, 'unit', e)
                      }
                    />
                  </TableCell>
                  <TableCell align='center'>
                    <TextField
                      name={`${row.row_id}-amount`}
                      type='number'
                      id={`${row.row_id}-amount`}
                      value={row.amount ?? ''}
                      onChange={(e) =>
                        handleChangeInputsInRow(row.row_id!, 'amount', e)
                      }
                    />
                  </TableCell>
                  <TableCell align='center' sx={{ width: 50 }}>
                    <IconButton onClick={() => deleteTableRow(row.row_id!)}>
                      <DeleteForeverIcon
                        color='error'
                        sx={{ fontSize: '1rem' }}
                      />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}
