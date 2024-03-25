import React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import IconButton from '@mui/material/IconButton';

import PrintIcon from '@mui/icons-material/Print';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { red } from '@mui/material/colors';

import Link from '@mui/material/Link';

const currentURL = '/manager/refdata/contract';

export default function ContractBase({
  formData,
  mode,
  id,
  relAktSum,
  relNaklSum,
  relNaklId,
  relAktId,
  onChange,
}: Readonly<{
  formData: any;
  mode: string;
  id: string;
  relAktSum: number;
  relNaklSum: number;
  relNaklId: string;
  relAktId: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}>) {
  return (
    <Grid
      container
      direction={`column`}
      justifyContent={`flex-start`}
      alignItems={`center`}
    >
      <Grid item sx={{ width: '100%' }}>
        <Typography variant='body2' align='center'>
          Основное
        </Typography>
      </Grid>
      <Grid item sx={{ width: '100%' }}>
        <Grid
          container
          direction='row'
          spacing={1}
          justifyContent={`space-between`}
          alignItems={`center`}
        >
          <Grid item sx={{ width: 150 }}>
            <TextField
              margin='normal'
              size='small'
              required
              fullWidth
              name='contractNumber'
              label='Номер контракта'
              type='text'
              id='contractNumber'
              value={formData.contractNumber ?? ''}
              onChange={onChange}
            />
          </Grid>
          <Grid item sx={{ display: mode === 'edit' ? 'block' : 'none' }}>
            <Button
              disabled={!id}
              startIcon={<PrintIcon />}
              component={Link}
              href={`${currentURL}/print/contract/${id}`}
              fullWidth
              size='small'
              color='success'
              variant='contained'
            >
              Договор
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item sx={{ width: '100%' }}>
        <Grid
          container
          direction='row'
          spacing={1}
          justifyContent={`space-between`}
          alignItems={`center`}
        >
          <Grid item sx={{ width: 150 }}>
            <TextField
              margin='normal'
              size='small'
              required
              fullWidth
              name='contractDate'
              label='Дата Контракта'
              type='date'
              id='contractDate'
              value={formData.contractDate ?? ''}
              onChange={onChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item sx={{ width: 120 }}>
            <TextField
              margin='normal'
              size='small'
              required
              fullWidth
              name='guaranteePeriod'
              label='Гарант (мес)'
              type='number'
              id='guaranteePeriod'
              value={formData.guaranteePeriod ?? ''}
              onChange={onChange}
            />
          </Grid>
          <Grid item sx={{ width: 120 }}>
            <TextField
              margin='normal'
              size='small'
              required
              fullWidth
              name='prepaymentPercentage'
              label='Предопл(%)'
              type='number'
              id='prepaymentPercentage'
              value={formData.prepaymentPercentage ?? ''}
              onChange={onChange}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid item sx={{ width: '100%' }}>
        <Grid
          container
          direction='row'
          spacing={1}
          justifyContent={`space-between`}
          alignItems={`center`}
        >
          <Grid item sx={{ width: 150 }}>
            <TextField
              margin='normal'
              size='small'
              required
              fullWidth
              name='invoiceNumberBase'
              label='№ Счет осн'
              type='text'
              id='invoiceNumberBase'
              value={formData.invoiceNumberBase ?? ''}
              onChange={onChange}
            />
          </Grid>
          <Grid item sx={{ display: mode === 'edit' ? 'block' : 'none' }}>
            <Button
              disabled={!id}
              startIcon={<PrintIcon />}
              component={Link}
              href={`${currentURL}/print/invoicemix/${id}`}
              fullWidth
              size='small'
              color='success'
              variant='contained'
            >
              Счет ({(relAktSum + relNaklSum).toFixed(2)})
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item sx={{ width: '100%' }}>
        <Grid
          container
          direction='row'
          spacing={1}
          justifyContent={`space-between`}
          alignItems={`center`}
        >
          <Grid item sx={{ width: 150 }}>
            <TextField
              margin='normal'
              size='small'
              required
              fullWidth
              name='invoiceNumberNakl'
              label='№ Счет накл'
              type='text'
              id='invoiceNumberNakl'
              value={formData.invoiceNumberNakl ?? ''}
              onChange={onChange}
            />
          </Grid>
          <Grid item sx={{ display: mode === 'edit' ? 'block' : 'none' }}>
            <Button
              disabled={!relNaklId}
              startIcon={<PrintIcon />}
              component={Link}
              href={`/manager/documents/nakladnaya/print/invoice/${relNaklId}`}
              fullWidth
              size='small'
              color='success'
              variant='contained'
            >
              Счет
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item sx={{ width: '100%' }}>
        <Grid
          container
          direction='row'
          spacing={1}
          justifyContent={`space-between`}
          alignItems={`center`}
        >
          <Grid item sx={{ width: 150 }}>
            <TextField
              margin='normal'
              size='small'
              required
              fullWidth
              name='invoiceNumberAkt'
              label='№ Счет акт'
              type='text'
              id='invoiceNumberAkt'
              value={formData.invoiceNumberAkt ?? ''}
              onChange={onChange}
            />
          </Grid>
          <Grid item sx={{ display: mode === 'edit' ? 'block' : 'none' }}>
            <Button
              disabled={!relAktId}
              startIcon={<PrintIcon />}
              component={Link}
              href={`/manager/documents/akt-of-work/print/invoice/${relAktId}`}
              fullWidth
              size='small'
              color='success'
              variant='contained'
            >
              Счет
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item sx={{ width: '100%' }}>
        <Grid
          container
          direction='row'
          spacing={1}
          justifyContent={`space-between`}
          alignItems={`center`}
        >
          <Grid item sx={{ width: 150 }}>
            <TextField
              margin='normal'
              size='small'
              required
              fullWidth
              name='aktNumber'
              label='№ Акта'
              type='text'
              id='aktNumber'
              value={formData.aktNumber ?? ''}
              onChange={onChange}
            />
          </Grid>
          {!relAktId && (
            <Grid item sx={{ width: 25 }}>
              <IconButton
                component={Link}
                sx={{ color: red[500], padding: 0, marginLeft: -1 }}
                href={`/manager/documents/akt-of-work/add`}
              >
                <AddCircleOutlineIcon />
              </IconButton>
            </Grid>
          )}

          <Grid item sx={{ display: mode === 'edit' ? 'block' : 'none' }}>
            <Button
              disabled={!relAktId}
              startIcon={<EditIcon />}
              component={Link}
              href={`/manager/documents/akt-of-work/${relAktId}`}
              fullWidth
              size='small'
              color='primary'
              variant='contained'
            >
              {/* Акт */}
            </Button>
          </Grid>
          <Grid item sx={{ display: mode === 'edit' ? 'block' : 'none' }}>
            <Button
              disabled={!relAktId}
              startIcon={<PrintIcon />}
              component={Link}
              href={`/manager/documents/akt-of-work/print/akt/${relAktId}`}
              fullWidth
              size='small'
              color='success'
              variant='contained'
            >
              {/* Акт */}({relAktSum.toFixed(2)})
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item sx={{ width: '100%' }}>
        <Grid
          container
          direction='row'
          spacing={1}
          justifyContent={`space-between`}
          alignItems={`center`}
        >
          <Grid item sx={{ width: 150 }}>
            <TextField
              margin='normal'
              size='small'
              required
              fullWidth
              name='naklNumber'
              label='№ Накладной'
              type='text'
              id='naklNumber'
              value={formData.naklNumber ?? ''}
              onChange={onChange}
            />
          </Grid>
          {!relNaklId && (
            <Grid item sx={{ width: 25 }}>
              <IconButton
                component={Link}
                sx={{ color: red[500], padding: 0, marginLeft: -1 }}
                href={`/manager/documents/nakladnaya/add`}
              >
                <AddCircleOutlineIcon />
              </IconButton>
            </Grid>
          )}
          <Grid item sx={{ display: mode === 'edit' ? 'block' : 'none' }}>
            <Button
              disabled={!relNaklId}
              startIcon={<EditIcon />}
              component={Link}
              href={`/manager/documents/nakladnaya/${relNaklId}`}
              fullWidth
              size='small'
              color='primary'
              variant='contained'
            ></Button>
          </Grid>
          <Grid item sx={{ display: mode === 'edit' ? 'block' : 'none' }}>
            <Button
              disabled={!relNaklId}
              startIcon={<PrintIcon />}
              component={Link}
              href={`/manager/documents/nakladnaya/print/nakladnaya/${relNaklId}`}
              fullWidth
              size='small'
              color='success'
              variant='contained'
            >
              {/* Накл */}({relNaklSum.toFixed(2)})
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item sx={{ width: '100%' }}>
        <Grid
          container
          direction='row'
          spacing={1}
          justifyContent={`space-between`}
          alignItems={`center`}
        >
          <Grid item sx={{ width: 150 }}>
            <TextField
              margin='normal'
              size='small'
              required
              fullWidth
              name='koshtorisNumber'
              label='№ Кошториса'
              type='text'
              id='koshtorisNumber'
              value={formData.koshtorisNumber ?? ''}
              onChange={onChange}
            />
          </Grid>
          <Grid item sx={{ display: mode === 'edit' ? 'block' : 'none' }}>
            <Button
              disabled={!id}
              startIcon={<PrintIcon />}
              component={Link}
              href={`${currentURL}/print/koshtoris/${id}?mode=предварительный`}
              fullWidth
              size='small'
              color='success'
              variant='contained'
            >
              Предв
            </Button>
          </Grid>
          <Grid item sx={{ display: mode === 'edit' ? 'block' : 'none' }}>
            <Button
              disabled={!id}
              startIcon={<PrintIcon />}
              component={Link}
              href={`${currentURL}/print/koshtoris/${id}?mode=договор`}
              fullWidth
              size='small'
              color='success'
              variant='contained'
            >
              дог
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
