import React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import PrintIcon from '@mui/icons-material/Print';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { red } from '@mui/material/colors';

import Link from '@mui/material/Link';

const currentURL = '/manager/refdata/contract';

export default function ContractPotochnRems({
  formData,
  id,
  remsAktMusorlId,
  remsNaklId,
  onChange,
}: Readonly<{
  formData: any;
  id: string;
  remsAktMusorlId: string;
  remsNaklId: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}>) {
  return (
    <Grid container direction={`column`} alignItems={`center`}>
      <Grid item>
        <Typography variant='body2'>Ремсервис поточный</Typography>
      </Grid>
      <Grid item mt={1} sx={{ width: '100%', border: '1px solid grey' }}>
        <Grid
          container
          direction={`row`}
          justifyContent={`space-between`}
          alignItems={`center`}
        >
          <Grid item sx={{ width: 150 }}>
            <TextField
              margin='normal'
              size='small'
              required
              fullWidth
              name='endWorkRemservis'
              label='КонецРабот'
              type='date'
              id='endWorkRemservis'
              value={formData.endWorkRemservis ?? ''}
              onChange={onChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item>
            <Button
              disabled={!id}
              startIcon={<PrintIcon />}
              component={Link}
              href={`${currentURL}/print/rems-potochn-nakaz-ohrana-truda/${id}`}
              fullWidth
              size='small'
              color='success'
              variant='contained'
            >
              Приказ Охр.Труда
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item mt={1} sx={{ width: '100%', border: '1px solid grey' }}>
        <Grid
          container
          direction={`row`}
          justifyContent={`space-between`}
          alignItems={`center`}
        >
          <Grid item sx={{ width: 50 }}>
            <Typography variant='body2' align='center'>
              Накл
            </Typography>
          </Grid>

          {!remsNaklId && (
            <Grid item sx={{ width: 25 }}>
              <IconButton
                component={Link}
                sx={{
                  color: red[500],
                  padding: 0,
                  marginLeft: -1,
                }}
                href={`/manager/documents/nakl-rems/add`}
              >
                <AddCircleOutlineIcon />
              </IconButton>
            </Grid>
          )}
          <Grid item>
            <Button
              disabled={!remsNaklId}
              startIcon={<EditIcon />}
              component={Link}
              href={`/manager/documents/nakl-rems/${remsNaklId}`}
              fullWidth
              size='small'
              color='primary'
              variant='contained'
            >
              {/* Акт */}
            </Button>
          </Grid>
          <Grid item>
            <Button
              disabled={!remsNaklId}
              startIcon={<PrintIcon />}
              component={Link}
              href={`/manager/documents/nakl-rems/print/${remsNaklId}?mode=percent1`}
              fullWidth
              size='small'
              color='success'
              variant='contained'
            >
              1
            </Button>
          </Grid>
          <Grid item>
            <Button
              disabled={!remsNaklId}
              startIcon={<PrintIcon />}
              component={Link}
              href={`/manager/documents/nakl-rems/print/${remsNaklId}?mode=percent2`}
              fullWidth
              size='small'
              color='success'
              variant='contained'
            >
              2
            </Button>
          </Grid>
          <Grid item>
            <Button
              disabled={!remsNaklId}
              startIcon={<PrintIcon />}
              component={Link}
              href={`/manager/documents/nakl-rems/print/${remsNaklId}?mode=percent3`}
              fullWidth
              size='small'
              color='success'
              variant='contained'
            >
              3
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Grid item mt={1} sx={{ width: '100%', border: '1px solid grey' }}>
        <Grid
          container
          direction={`row`}
          justifyContent={`space-between`}
          alignItems={`center`}
        >
          <Grid item>
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
              Счет
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item mt={1} sx={{ width: '100%', border: '1px solid grey' }}>
        <Grid
          container
          direction={`column`}
          justifyContent={`flex-start`}
          alignItems={`center`}
        >
          <Grid item sx={{ width: '100%' }}>
            <TextField
              margin='normal'
              size='small'
              multiline
              // required
              fullWidth
              name='remsAktSkrytRabotWork'
              label='Работы коротко'
              type='text'
              id='remsAktSkrytRabotWork'
              value={formData.remsAktSkrytRabotWork ?? '?????'}
              onChange={onChange}
              sx={{
                input: {
                  fontSize: '.8rem',
                },
              }}
            />
          </Grid>
          <Grid item sx={{ width: '100%' }}>
            <TextField
              margin='normal'
              size='small'
              multiline
              // required
              fullWidth
              name='remsAktSkrytRabotMaterial'
              label='Материалы'
              type='text'
              id='remsAktSkrytRabotMaterial'
              value={formData.remsAktSkrytRabotMaterial ?? '?????'}
              onChange={onChange}
              sx={{
                input: {
                  fontSize: '.8rem',
                },
              }}
            />
          </Grid>
          <Grid item>
            <Button
              disabled={!id}
              startIcon={<PrintIcon />}
              component={Link}
              href={`${currentURL}/print/rems-potochn-akt-skr-robot/${id}`}
              fullWidth
              size='small'
              color='success'
              variant='contained'
            >
              Срытые
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item mt={1} sx={{ width: '100%', border: '1px solid grey' }}>
        <Grid
          container
          direction={`row`}
          justifyContent={`space-between`}
          alignItems={`center`}
        >
          {!remsAktMusorlId && (
            <Grid item sx={{ width: 25 }}>
              <IconButton
                component={Link}
                sx={{
                  color: red[500],
                  padding: 0,
                }}
                href={`/manager/documents/akt-rems-musor/add/${id}`}
              >
                <AddCircleOutlineIcon />
              </IconButton>
            </Grid>
          )}
          <Grid item>
            <Button
              disabled={!remsAktMusorlId}
              startIcon={<EditIcon />}
              component={Link}
              href={`/manager/documents/akt-rems-musor/${remsAktMusorlId}`}
              fullWidth
              size='small'
              color='primary'
              variant='contained'
            >
              {/* Акт */}
            </Button>
          </Grid>
          <Grid item>
            <Button
              disabled={!remsAktMusorlId}
              startIcon={<PrintIcon />}
              component={Link}
              href={`/manager/documents/akt-rems-musor/print/${remsAktMusorlId}`}
              fullWidth
              size='small'
              color='success'
              variant='contained'
            >
              Акт.Мусор
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
