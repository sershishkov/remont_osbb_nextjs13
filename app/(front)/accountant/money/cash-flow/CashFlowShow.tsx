'use client';
import React, { useState, useEffect } from 'react';

import { get__all, delete__one } from '@/lib/actions/refdata.actions';
import {
  I_Contract,
  I_Client,
  I_ClientType,
  I_Worker,
  I_CashRegister,
  I_CashFlowType,
} from '@/interfaces/refdata';

import Link from '@mui/material/Link';

import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';

import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import MySelectAutoCompl from '@/components/common/MySelectAutoCompl';

import MySpinner from '@/components/common/MySpinner';

const initState = {
  cashFlowType: '',
  сashRegister: '',
  contract: '',
  responsiblePerson: '',
  ourFirm: '',
  client: '',

  dateStart: '',
  dateEnd: '',
  sumStart: '',
  sumEnd: '',
};

const headerFields = [
  'Касса',
  'Дата',
  'Сумма',
  'Тип оперции',
  'Договор',
  'Вид Работ',
  'Клиент',
  'Исполнитель',
  'Отв.Лицо',
  'Примечание',
];

const tableFields = [
  'сashRegister',
  'cashFlowDate',
  'cashFlowSum',
  'cashFlowType',
  'contract',
  'contractDescription',
  'client',
  'ourFirm',
  'responsiblePerson',
  'additionalInformation',
];

const arrToShow = (enteredArr: any) => {
  const localArr = JSON.parse(JSON.stringify(enteredArr));
  const transformedArr = localArr.map((currentItem: any) => {
    return {
      _id: currentItem?._id,
      сashRegister: currentItem?.сashRegister?.cashRegisterName,
      cashFlowDate: new Date(currentItem?.cashFlowDate).toLocaleDateString(
        'uk-UA',
        {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit',
        }
      ),
      cashFlowSum: currentItem?.cashFlowSum?.toFixed(2),
      cashFlowType: currentItem?.cashFlowType?.cashFlowTypeName,
      contract: currentItem?.contract?.contractNumber ?? '',
      contractDescription: currentItem?.contract?.contractDescription ?? '',
      client: currentItem?.client?.clientShortName ?? '',
      ourFirm: currentItem?.ourFirm?.clientShortName ?? '',
      responsiblePerson: currentItem?.responsiblePerson
        ? `${currentItem?.responsiblePerson?.lastName} ${currentItem?.responsiblePerson?.firstName}`
        : '',
      additionalInformation: currentItem?.additionalInformation ?? '',
    };
  });
  return transformedArr;
};

export default function CashFlowShow({
  currentURL,
  tableHeader,
}: {
  readonly currentURL: string;
  readonly tableHeader: string;
}) {
  const [formData, setFormData] = useState(initState);
  const [countTotalItems, setCountTotalItems] = useState(0);

  const [searchText, setSearchText] = useState('');
  const [totalResults, setTotalResults] = useState([]);
  const [resultFetch, setResultFetch] = useState([]);

  const [arr__Contracts, setArr__Contracts] = useState<I_Contract[]>([]);
  const [arr__ClientContracts, setArr__ClientContracts] = useState<
    I_Contract[]
  >([]);
  const [arr__Workers, setArr__Workers] = useState<I_Worker[]>([]);
  const [arr__CashRegisters, setArr__CashRegisters] = useState<
    I_CashRegister[]
  >([]);
  const [arr__CashFlowTypes, setArr__CashFlowTypes] = useState<
    I_CashFlowType[]
  >([]);
  const [arr__OurFirms, setArr__OurFirms] = useState<I_Client[]>([]);
  const [arr__Clients, setArr__Clients] = useState<I_Client[]>([]);

  const {
    cashFlowType,
    сashRegister,
    contract,
    responsiblePerson,
    ourFirm,
    client,

    dateStart,
    dateEnd,
    sumStart,
    sumEnd,
  } = formData;

  useEffect(() => {
    const myGetAll = async () => {
      const getTotalItems = await get__all(
        { page: '0', limit: '0', filter: '' },
        currentURL
      );

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
      const all__workers = await get__all(
        { page: '0', limit: '0', filter: '' },
        '/accountant/refdata/workers'
      );
      const all__ClientTypes = await get__all(
        { page: '0', limit: '0', filter: '' },
        '/accountant/refdata/client-type'
      );
      const allFirms = await get__all(
        { page: '0', limit: '0', filter: '' },
        '/manager/refdata/client'
      );

      const ourFirmObj = all__ClientTypes.items.find(
        (item: I_ClientType) => item.clientTypeName === 'наша фирма'
      );
      const arr__ourFirms: I_Client[] = [];
      const arr__Clients: I_Client[] = [];

      allFirms.items.forEach((item: I_Client) => {
        const hasOurFirm = item.clientType?.some(
          (oneType) => oneType._id === ourFirmObj?._id
        );

        if (hasOurFirm) {
          arr__ourFirms.push(item);
        } else {
          arr__Clients.push(item);
        }
      });

      setCountTotalItems(getTotalItems.total);
      setTotalResults(arrToShow(getTotalItems.items));
      setResultFetch(arrToShow(getTotalItems.items));

      setArr__CashFlowTypes(all__cashFlowTypes.items);
      setArr__CashRegisters(all__сashRegisters.items);
      setArr__Contracts(all__contracts.items);
      setArr__ClientContracts(all__contracts.items);
      setArr__OurFirms(arr__ourFirms);
      setArr__Clients(arr__Clients);
      setArr__Workers(all__workers.items);
    };
    myGetAll();
  }, [currentURL]);

  useEffect(() => {
    setSearchText('');
    const searchInput = document.getElementById('searchText');
    searchInput?.focus();
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

  const onChangeSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleSearch = async () => {
    const filtered_items = await get__all(
      {
        page: '0',
        limit: '0',
        filter: searchText,

        cashFlowType: cashFlowType,
        сashRegister: сashRegister,
        contract: contract,
        responsiblePerson: responsiblePerson,

        dateStart: dateStart,
        dateEnd: dateEnd,
        sumStart: Number(sumStart),
        sumEnd: Number(sumEnd),
      },
      currentURL
    );

    setResultFetch(arrToShow(filtered_items?.items));
  };
  const handleRestart = () => {
    setResultFetch(totalResults);
    setSearchText('');
  };

  const deleteHanler = async (_id: string) => {
    await delete__one(_id, currentURL);
    const all_items = await get__all(
      { page: '0', limit: '0', filter: '' },
      currentURL
    );
    setResultFetch(arrToShow(all_items.items));

    setSearchText('');
  };

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

  return (
    <Grid
      container
      alignItems='center'
      direction='column'
      sx={{
        // maxWidth: 1200,
        minWidth: 600,
      }}
    >
      <Grid item sx={{ width: '100%' }}>
        <Grid
          container
          alignItems='center'
          justifyContent='space-between'
          spacing={1}
        >
          <Grid item sx={{ flex: 1 }}>
            <TextField
              margin='normal'
              focused
              fullWidth
              id='searchText'
              name='searchText'
              label='Строка поиска'
              type='search'
              value={searchText ?? ''}
              onChange={onChangeSearch}
            />
          </Grid>
          <Grid item sx={{ width: 150 }}>
            <TextField
              margin='normal'
              // required
              fullWidth
              name='dateStart'
              label='Дата старт'
              type='date'
              id='dateStart'
              value={dateStart ?? ''}
              onChange={onChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item sx={{ width: 150 }}>
            <TextField
              margin='normal'
              // required
              fullWidth
              name='dateEnd'
              label='Дата финиш'
              type='date'
              id='dateEnd'
              value={dateEnd ?? ''}
              onChange={onChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item sx={{ width: 150 }}>
            <TextField
              margin='normal'
              // required
              fullWidth
              name='sumStart'
              label='Сумма от..'
              type='number'
              id='sumStart'
              value={sumStart ?? ''}
              onChange={onChange}
            />
          </Grid>
          <Grid item sx={{ width: 150 }}>
            <TextField
              margin='normal'
              // required
              fullWidth
              name='sumEnd'
              label='Сумма до..'
              type='number'
              id='sumEnd'
              value={sumEnd ?? ''}
              onChange={onChange}
            />
          </Grid>

          <Grid item>
            <Typography align='center'>{`Найдено:${resultFetch?.length}`}</Typography>
          </Grid>
          <Grid item>
            <IconButton onClick={handleSearch}>
              <SearchIcon color='success' />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton onClick={handleRestart}>
              <RestartAltIcon color='error' />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
      <Grid item sx={{ width: '100%' }}>
        <Grid
          container
          alignItems='center'
          justifyContent='space-between'
          spacing={1}
        >
          <Grid item sx={{ width: 200 }}>
            <MySelectAutoCompl
              selectName={`cashFlowType`}
              selectLabel={`Тип операции`}
              fieldToShow={`cashFlowTypeName`}
              handleChangeSelects={handleChangeSelects}
              selectedOption={cashFlowType ?? ''}
              // @ts-ignore
              arrToSelect={arr__CashFlowTypes}
            />
          </Grid>

          <Grid item sx={{ width: 200 }}>
            <MySelectAutoCompl
              selectName={`сashRegister`}
              selectLabel={`Касса`}
              fieldToShow={`cashRegisterName`}
              handleChangeSelects={handleChangeSelects}
              selectedOption={сashRegister ?? ''}
              // @ts-ignore
              arrToSelect={arr__CashRegisters}
            />
          </Grid>
          <Grid item sx={{ width: 200 }}>
            <MySelectAutoCompl
              selectName={`client`}
              selectLabel={`Клиент`}
              fieldToShow={`clientShortName`}
              handleChangeSelects={handleChangeSelects}
              selectedOption={client ?? ''}
              // @ts-ignore
              arrToSelect={arr__Clients}
            />
          </Grid>

          <Grid item sx={{ width: 300 }}>
            <MySelectAutoCompl
              selectName={`contract`}
              selectLabel={`Контракты`}
              fieldToShow={`contractDescription`}
              handleChangeSelects={handleChangeSelects}
              selectedOption={contract ?? ''}
              // @ts-ignore
              arrToSelect={arr__ClientContracts}
            />
          </Grid>
          <Grid item sx={{ width: 150 }}>
            <MySelectAutoCompl
              selectName={`ourFirm`}
              selectLabel={`Исполнитель`}
              fieldToShow={`clientShortName`}
              handleChangeSelects={handleChangeSelects}
              selectedOption={ourFirm ?? ''}
              // @ts-ignore
              arrToSelect={arr__OurFirms}
            />
          </Grid>
          <Grid item sx={{ width: 200 }}>
            <MySelectAutoCompl
              selectName={`responsiblePerson`}
              selectLabel={`Отв.Лицо`}
              fieldToShow={`lastName`}
              handleChangeSelects={handleChangeSelects}
              selectedOption={responsiblePerson ?? ''}
              // @ts-ignore
              arrToSelect={arr__Workers}
            />
          </Grid>
        </Grid>
      </Grid>
      {!resultFetch || resultFetch?.length === 0 ? (
        <MySpinner />
      ) : (
        <Grid item sx={{ width: '100%' }}>
          <TableContainer component={Paper} sx={{ maxHeight: 750 }}>
            <Table
              stickyHeader
              sx={{
                width: '100%',
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell
                    colSpan={
                      headerFields.length ? headerFields.length : undefined
                    }
                    sx={{ textAlign: 'center' }}
                  >
                    {`${tableHeader} `}
                  </TableCell>
                  <TableCell colSpan={2}>{` Всего ${
                    countTotalItems ?? 0
                  }`}</TableCell>
                </TableRow>
                <TableRow>
                  {headerFields.length > 0 &&
                    headerFields.map((item) => (
                      <TableCell align='center' key={item}>
                        {item}
                      </TableCell>
                    ))}

                  <TableCell
                    sx={{ width: '0.8rem', fontSize: '0.8rem' }}
                    align='center'
                  >
                    edit
                  </TableCell>
                  <TableCell
                    sx={{ width: '0.8rem', fontSize: '0.8rem' }}
                    align='center'
                  >
                    del
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {resultFetch.length > 0 &&
                  resultFetch.map((row: any) => (
                    <TableRow key={row._id}>
                      {tableFields.length > 0 &&
                        tableFields.map((item) => (
                          <TableCell align='center' key={item}>
                            {row[item]}
                          </TableCell>
                        ))}

                      <TableCell align='center' sx={{ width: 15 }}>
                        <IconButton
                          size='small'
                          component={Link}
                          href={`${currentURL}/${row._id}`}
                        >
                          <EditIcon
                            sx={{ width: '1.2rem', fontSize: '1.2rem' }}
                            color='primary'
                          />
                        </IconButton>
                      </TableCell>
                      <TableCell align='center' sx={{ width: 15 }}>
                        <IconButton
                          size='small'
                          onClick={() => deleteHanler(row._id)}
                        >
                          <DeleteForeverIcon
                            sx={{ width: '1.2rem', fontSize: '1.2rem' }}
                            color='error'
                          />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      )}
    </Grid>
  );
}
