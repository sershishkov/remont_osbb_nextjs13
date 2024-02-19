'use client';
import React, { useState, useEffect } from 'react';

import { get__all, delete__one } from '@/lib/actions/refdata.actions';

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

  naklDateStart: '',
  naklDateEnd: '',
};

const headerFields = [
  '№ накладн',
  'Дата',

  'Сумма накладн',
  'Наша Фирма',
  'Клиент',
  'Работа',
];

const tableFields = [
  'nakladnayaNumber',
  'nakladnayaDate',

  'totalNaklSum',
  'ourFirm',
  'client',
  'contractDescription',
];

const arrToShow = (enteredArr: any) => {
  const localArr = JSON.parse(JSON.stringify(enteredArr));
  const transformedArr = localArr.map((currentItem: any) => {
    return {
      _id: currentItem._id,
      nakladnayaNumber: currentItem.nakladnayaNumber,
      nakladnayaDate: new Date(currentItem.nakladnayaDate).toLocaleDateString(
        'uk-UA',
        {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        }
      ),
      totalNaklSum: currentItem.totalNaklSum,
      ourFirm: currentItem.contract.ourFirm.clientShortName,
      client: currentItem.contract.client.clientShortName,
      contractDescription: currentItem.contract.contractDescription,
    };
  });
  return transformedArr;
};

export default function NaklShow({
  currentURL,
  tableHeader,
}: {
  readonly currentURL: string;
  readonly tableHeader: string;
}) {
  const [formData, setFormData] = useState(initState);
  const [countTotalItems, setCountTotalItems] = useState(0);

  const [arr__Contracts, setArr__Contracts] = useState([]);

  const [searchText, setSearchText] = useState('');
  const [totalResults, setTotalResults] = useState([]);
  const [resultFetch, setResultFetch] = useState([]);

  const {
    contract,

    naklDateStart,
    naklDateEnd,
  } = formData;

  useEffect(() => {
    const myGetAll = async () => {
      const getTotalItems = await get__all(
        { page: '0', limit: '0', filter: '' },
        currentURL
      );

      const contracts = await get__all(
        { page: '0', limit: '0', filter: '' },
        '/manager/refdata/contract'
      );

      setArr__Contracts(contracts.items);

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

        naklDateStart: naklDateStart,
        naklDateEnd: naklDateEnd,
        contract: contract,
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
              name='naklDateStart'
              label='Дата старт'
              type='date'
              id='naklDateStart'
              value={naklDateStart ?? ''}
              onChange={onChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item sx={{ width: 150 }}>
            <TextField
              margin='normal'
              // required
              fullWidth
              name='naklDateEnd'
              label='Дата финиш'
              type='date'
              id='naklDateEnd'
              value={naklDateEnd ?? ''}
              onChange={onChange}
              InputLabelProps={{ shrink: true }}
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
              arrToSelect={arr__Contracts}
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
                    print nakl
                  </TableCell>
                  <TableCell
                    sx={{ width: '0.8rem', fontSize: '0.8rem' }}
                    align='center'
                  >
                    print inv
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
                          <TableCell align='center' key={item}>
                            {row[item]}
                          </TableCell>
                        ))}

                      <TableCell align='center' sx={{ width: 15 }}>
                        <IconButton
                          size='small'
                          component={Link}
                          href={`${currentURL}/print/nakladnaya/${row._id}`}
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
