'use client';
import React, { useState, useEffect } from 'react';

import { get__all, delete__one } from '@/lib/actions/refdata.actions';

import { I_Client, I_ClientType } from '@/interfaces/refdata';

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
import MySelectMultipleAutoCompl from '@/components/common/MySelectMultipleAutoCompl';
import MySpinner from '@/components/common/MySpinner';

const initState = {
  ourFirm: '',
  client: '',
  contractDateStart: '',
  contractDateEnd: '',
  contractType: '',
  paymentSource: '',
  responsibleManager: '',
  responsibleWorker: '',
  participants: [],
};

const headerFields = [
  'Номер контракта',
  'Наша фирма',
  'Клиент',

  'Дата',
  'Описание работ',
  'Адрес работ',
  'Тип Контакта',

  'Ист.Средств',
  'Отв.Менеджер',
  'Отв.Работник',
  'Участники',
];

const tableFields = [
  'contractNumber',
  'ourFirm',
  'client',

  'contractDate',
  'contractDescription',
  'workAddress',
  'contractType',

  'paymentSource',
  'responsibleManager',
  'responsibleWorker',
  'participants',
];

const arrToShow = (enteredArr: any) => {
  const localArr = JSON.parse(JSON.stringify(enteredArr));
  const transformedArr = localArr.map((currentItem: any) => {
    let arrToString = '';
    currentItem.participantsOfContract.forEach((element: any) => {
      arrToString += `${element.participant.lastName}-${element.participantPercentage}%, `;
    });

    return {
      _id: currentItem._id,
      contractNumber: currentItem.contractNumber,
      ourFirm: currentItem.ourFirm.clientShortName,
      client: currentItem.client.clientShortName,
      contractDate: new Date(currentItem.contractDate).toLocaleDateString(
        'uk-UA',
        {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        }
      ),
      contractDescription: currentItem.contractDescription,
      workAddress: currentItem.workAddress,
      contractType: currentItem.contractType.contractTypeName,
      paymentSource: currentItem.paymentSource.paymentSourceName,
      responsibleManager: currentItem.responsibleManager.lastName,
      responsibleWorker: currentItem.responsibleWorker.lastName,
      participants: arrToString,
    };
  });
  return transformedArr;
};

export default function ContractShow({
  currentURL,
  tableHeader,
}: {
  readonly currentURL: string;
  readonly tableHeader: string;
}) {
  const [formData, setFormData] = useState(initState);
  const [countTotalItems, setCountTotalItems] = useState(0);

  const [arr__OurFirms, setArr__OurFirms] = useState<I_Client[]>([]);
  const [arr__Clients, setArr__Clients] = useState<I_Client[]>([]);
  const [arr__ContractTypes, setArr__ContractTypes] = useState([]);
  const [arr__PaymentSources, setArr__PaymentSources] = useState([]);
  const [arr__Workers, setArr__Workers] = useState([]);

  const [searchText, setSearchText] = useState('');
  const [totalResults, setTotalResults] = useState([]);
  const [resultFetch, setResultFetch] = useState([]);

  const {
    ourFirm,
    client,
    contractDateStart,
    contractDateEnd,
    contractType,
    paymentSource,
    responsibleManager,
    responsibleWorker,
    participants,
  } = formData;

  useEffect(() => {
    const myGetAll = async () => {
      const getTotalItems = await get__all(
        { page: '0', limit: '0', filter: '' },
        currentURL
      );
      const allFirms = await get__all(
        { page: '0', limit: '0', filter: '' },
        '/manager/refdata/client'
      );
      const contractTypes = await get__all(
        { page: '0', limit: '0', filter: '' },
        '/accountant/refdata/contract-type'
      );
      const paymentSources = await get__all(
        { page: '0', limit: '0', filter: '' },
        '/accountant/refdata/payment-source'
      );
      const workers = await get__all(
        { page: '0', limit: '0', filter: '' },
        '/accountant/refdata/workers'
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

      setArr__OurFirms(arr__ourFirms);
      setArr__Clients(arr__Clients);
      setArr__ContractTypes(contractTypes.items);
      setArr__PaymentSources(paymentSources.items);
      setArr__Workers(workers.items);

      setCountTotalItems(getTotalItems.total);
      setTotalResults(arrToShow(getTotalItems.items));
      setResultFetch(arrToShow(getTotalItems.items));
    };
    myGetAll();
  }, [currentURL]);

  useEffect(() => {
    setSearchText('');
    const searchInput = document.getElementById('searchText');
    searchInput?.focus();
  }, []);

  const onChangeSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
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

  const handleSearch = async () => {
    const filtered_items = await get__all(
      {
        page: '0',
        limit: '0',
        filter: searchText,

        ourFirm: ourFirm,
        client: client,
        contractDateStart: contractDateStart,
        contractDateEnd: contractDateEnd,
        contractType: contractType,
        paymentSource: paymentSource,
        responsibleManager: responsibleManager,
        responsibleWorker: responsibleWorker,
        participants: participants,
      },
      currentURL
    );

    setResultFetch(arrToShow(filtered_items?.items));
  };
  const handleRestart = () => {
    setResultFetch(totalResults);
    setFormData(initState);
    setSearchText('');
  };

  const deleteHanler = async (_id: string) => {
    await delete__one(_id, currentURL);
    setResultFetch(
      await get__all({ page: '0', limit: '0', filter: '' }, currentURL)
    );
    setFormData(initState);
    setSearchText('');
  };

  return (
    <Grid
      container
      alignItems='center'
      direction='column'
      sx={{
        maxWidth: 1200,
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
              name='contractDateStart'
              label='Дата старт'
              type='date'
              id='contractDateStart'
              value={contractDateStart ?? ''}
              onChange={onChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item sx={{ width: 150 }}>
            <TextField
              margin='normal'
              // required
              fullWidth
              name='contractDateEnd'
              label='Дата финиш'
              type='date'
              id='contractDateEnd'
              value={contractDateEnd ?? ''}
              onChange={onChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item sx={{ width: 150 }}>
            <MySelectAutoCompl
              selectName={`ourFirm`}
              selectLabel={`Наша`}
              fieldToShow={`clientShortName`}
              handleChangeSelects={handleChangeSelects}
              selectedOption={ourFirm ?? ''}
              // @ts-ignore
              arrToSelect={arr__OurFirms}
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
              selectName={`contractType`}
              selectLabel={`Тип контракта`}
              fieldToShow={`contractTypeName`}
              handleChangeSelects={handleChangeSelects}
              selectedOption={contractType ?? ''}
              // @ts-ignore
              arrToSelect={arr__ContractTypes}
            />
          </Grid>
          <Grid item sx={{ width: 200 }}>
            <MySelectAutoCompl
              selectName={`paymentSource`}
              selectLabel={`Ист.Средств`}
              fieldToShow={`paymentSourceName`}
              handleChangeSelects={handleChangeSelects}
              selectedOption={paymentSource ?? ''}
              // @ts-ignore
              arrToSelect={arr__PaymentSources}
            />
          </Grid>
          <Grid item sx={{ width: 200 }}>
            <MySelectAutoCompl
              selectName={`responsibleManager`}
              selectLabel={`Отв.Менеджер`}
              fieldToShow={`lastName`}
              handleChangeSelects={handleChangeSelects}
              selectedOption={responsibleManager ?? ''}
              // @ts-ignore
              arrToSelect={arr__Workers}
            />
          </Grid>
          <Grid item sx={{ width: 200 }}>
            <MySelectAutoCompl
              selectName={`responsibleWorker`}
              selectLabel={`Отв.Работник`}
              fieldToShow={`lastName`}
              handleChangeSelects={handleChangeSelects}
              selectedOption={responsibleWorker ?? ''}
              // @ts-ignore
              arrToSelect={arr__Workers}
            />
          </Grid>

          <Grid item sx={{ width: 200 }}>
            <MySelectMultipleAutoCompl
              selectName={`participants`}
              selectLabel={`Участники`}
              fieldToShow={`lastName`}
              handleChangeMultipleSelects={handleChangeSelects}
              selectedOptions={participants ?? []}
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
          <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
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

                  <TableCell style={{ width: 25 }} align='center'>
                    edit
                  </TableCell>
                  <TableCell style={{ width: 25 }} align='center'>
                    delete
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

                      <TableCell align='center'>
                        <IconButton
                          component={Link}
                          href={`${currentURL}/${row._id}`}
                        >
                          <EditIcon color='primary' />
                        </IconButton>
                      </TableCell>
                      <TableCell align='center'>
                        <IconButton onClick={() => deleteHanler(row._id)}>
                          <DeleteForeverIcon color='error' />
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
