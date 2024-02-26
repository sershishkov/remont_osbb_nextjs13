'use client';
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

import { get__all, delete__one } from '@/lib/actions/refdata.actions';
import { accountant_role } from '@/constants/constants';
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
import PrintIcon from '@mui/icons-material/Print';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import MySelectAutoCompl from '@/components/common/MySelectAutoCompl';
import MySpinner from '@/components/common/MySpinner';

const initState = {
  contract: '',
  aktOurFirm: '',
  aktClient: '',

  aktDateStart: '',
  aktDateEnd: '',
};

const headerFields = [
  '№ акта',
  'Дата',

  'Сумма акта',
  'Наша Фирма',
  'Клиент',
  'Работа',
];

const tableFields = [
  'aktOfWorkNumber',
  'aktOfWorkDate',

  'totalAktSum',
  'ourFirm',
  'client',
  'contractDescription',
];

const arrToShow = (enteredArr: any) => {
  const localArr = JSON.parse(JSON.stringify(enteredArr));
  const transformedArr = localArr.map((currentItem: any) => {
    return {
      _id: currentItem._id,
      aktOfWorkNumber: currentItem.aktOfWorkNumber,
      aktOfWorkDate: new Date(currentItem.aktOfWorkDate).toLocaleDateString(
        'uk-UA',
        {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        }
      ),
      totalAktSum: currentItem.totalSums.totalAktSum,
      ourFirm: currentItem.contract.ourFirm.clientShortName,
      client: currentItem.contract.client.clientShortName,
      contractDescription: currentItem.contract.contractDescription,
      creator: currentItem.creator,
      isActive: currentItem.isActive,
    };
  });
  return transformedArr;
};

export default function AktShow({
  currentURL,
  tableHeader,
}: {
  readonly currentURL: string;
  readonly tableHeader: string;
}) {
  const session = useSession();
  const user = session?.data?.user;

  const [formData, setFormData] = useState(initState);
  const [countTotalItems, setCountTotalItems] = useState(0);

  const [arr__Contracts, setArr__Contracts] = useState([]);
  const [arr__OurFirms, setArr__OurFirms] = useState<I_Client[]>([]);
  const [arr__Clients, setArr__Clients] = useState<I_Client[]>([]);

  const [searchText, setSearchText] = useState('');
  const [totalResults, setTotalResults] = useState([]);
  const [resultFetch, setResultFetch] = useState([]);

  const {
    contract,
    aktOurFirm,
    aktClient,

    aktDateStart,
    aktDateEnd,
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

      const contracts = await get__all(
        { page: '0', limit: '0', filter: '' },
        '/manager/refdata/contract'
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

      setArr__Contracts(contracts.items);
      setArr__OurFirms(arr__ourFirms);
      setArr__Clients(arr__Clients);

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

        aktDateStart: aktDateStart,
        aktDateEnd: aktDateEnd,
        contract: contract,
        aktOurFirm: aktOurFirm,
        aktClient: aktClient,
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
    const all_items = await get__all(
      { page: '0', limit: '0', filter: '' },
      currentURL
    );
    setResultFetch(arrToShow(all_items.items));
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
              name='aktDateStart'
              label='Дата старт'
              type='date'
              id='aktDateStart'
              value={aktDateStart ?? ''}
              onChange={onChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item sx={{ width: 150 }}>
            <TextField
              margin='normal'
              // required
              fullWidth
              name='aktDateEnd'
              label='Дата финиш'
              type='date'
              id='aktDateEnd'
              value={aktDateEnd ?? ''}
              onChange={onChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item sx={{ width: 200 }}>
            <MySelectAutoCompl
              selectName={`contract`}
              selectLabel={`Контракты`}
              fieldToShow={`contractDescription`}
              handleChangeSelects={handleChangeSelects}
              selectedOption={contract ?? ''}
              // @ts-ignore
              arrToSelect={arr__Contracts}
            />
          </Grid>
          <Grid item sx={{ width: 150 }}>
            <MySelectAutoCompl
              selectName={`aktOurFirm`}
              selectLabel={`Наша`}
              fieldToShow={`clientShortName`}
              handleChangeSelects={handleChangeSelects}
              selectedOption={aktOurFirm ?? ''}
              // @ts-ignore
              arrToSelect={arr__OurFirms}
            />
          </Grid>
          <Grid item sx={{ width: 200 }}>
            <MySelectAutoCompl
              selectName={`aktClient`}
              selectLabel={`Клиент`}
              fieldToShow={`clientShortName`}
              handleChangeSelects={handleChangeSelects}
              selectedOption={aktClient ?? ''}
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

      {!resultFetch || resultFetch?.length === 0 ? (
        <MySpinner />
      ) : (
        <Grid item sx={{ width: '100%' }}>
          <TableContainer component={Paper} sx={{ maxHeight: 800 }}>
            <Table
              stickyHeader
              sx={{
                width: '100%',
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell
                    align='center'
                    colSpan={
                      headerFields.length ? headerFields.length : undefined
                    }
                  >
                    {`${tableHeader} `}
                  </TableCell>
                  <TableCell align='center' colSpan={4}>{` Всего ${
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
                    akt
                  </TableCell>
                  <TableCell
                    sx={{ width: '0.8rem', fontSize: '0.8rem' }}
                    align='center'
                  >
                    inv
                  </TableCell>
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
                          <TableCell
                            align='center'
                            key={item}
                            sx={{
                              color:
                                row.hasOwnProperty('isActive') &&
                                row.isActive === false
                                  ? 'red'
                                  : undefined,
                            }}
                          >
                            {row[item]}
                          </TableCell>
                        ))}

                      <TableCell align='center' sx={{ width: 15 }}>
                        <IconButton
                          size='small'
                          component={Link}
                          href={`${currentURL}/print/akt/${row._id}`}
                        >
                          <PrintIcon
                            sx={{ width: '1.2rem', fontSize: '1.2rem' }}
                            color='success'
                          />
                        </IconButton>
                      </TableCell>
                      <TableCell align='center' sx={{ width: 15 }}>
                        <IconButton
                          size='small'
                          component={Link}
                          href={`${currentURL}/print/invoice/${row._id}`}
                        >
                          <PrintIcon
                            sx={{ width: '1.2rem', fontSize: '1.2rem' }}
                            color='success'
                          />
                        </IconButton>
                      </TableCell>
                      <TableCell align='center' sx={{ width: 15 }}>
                        <IconButton
                          disabled={
                            user?._id !== row.creator ||
                            !accountant_role.includes(user?.role!)
                          }
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
                          disabled={
                            user?._id !== row.creator ||
                            !accountant_role.includes(user?.role!)
                          }
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
