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
export default function ContractBudjetJKH({
  formData,
  id,
  calendGrafikId,
  remsNaklId,
  onChange,
}: Readonly<{
  formData: any;
  id: string;
  calendGrafikId: string;
  remsNaklId: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}>) {
  return (
    <Grid item xs={6} sx={{ padding: 1 }}>
      <Grid
        container
        direction={`column`}
        justifyContent={`flex-start`}
        // spacing={2}
        alignItems={`center`}
      >
        <Grid item sx={{ width: '100%', border: '1px solid grey' }}>
          <Typography variant='body1' align='center'>
            ЖКХ
          </Typography>
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
                name='contrProectAvtorskNumber'
                label='№ Дог ПрАвт'
                type='text'
                id='contrProectAvtorskNumber'
                value={formData.contrProectAvtorskNumber ?? ''}
                onChange={onChange}
              />
            </Grid>
            <Grid item sx={{ width: 150 }}>
              <TextField
                margin='normal'
                size='small'
                required
                fullWidth
                name='aktProectAvtorskNumber'
                label='№ Акт ПрАвт'
                type='text'
                id='aktProectAvtorskNumber'
                value={formData.aktProectAvtorskNumber ?? ''}
                onChange={onChange}
              />
            </Grid>

            <Grid item>
              <Grid
                container
                direction={`column`}
                spacing={1}
                // justifyContent={`space-between`}
                alignItems={`center`}
              >
                <Grid item>
                  <Button
                    disabled={!id}
                    startIcon={<PrintIcon />}
                    component={Link}
                    href={`${currentURL}/print/project-and-avtosk-dogov/${id}`}
                    fullWidth
                    size='small'
                    color='success'
                    variant='contained'
                  >
                    Дог
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    disabled={!id}
                    startIcon={<PrintIcon />}
                    component={Link}
                    href={`${currentURL}/print/project-and-avtosk-akt/${id}`}
                    fullWidth
                    size='small'
                    color='success'
                    variant='contained'
                  >
                    Акт
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    disabled={!id}
                    startIcon={<PrintIcon />}
                    component={Link}
                    href={`${currentURL}/print/project-and-avtosk-kosht/${id}`}
                    fullWidth
                    size='small'
                    color='success'
                    variant='contained'
                  >
                    кошт
                  </Button>
                </Grid>
              </Grid>
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
            <Grid item sx={{ width: 150 }}>
              <Typography variant='body2' align='center'>
                Технадзор
              </Typography>
            </Grid>

            <Grid item>
              <Button
                disabled={!id}
                startIcon={<PrintIcon />}
                component={Link}
                href={`${currentURL}/print/teh-nadzor-dogov/${id}`}
                fullWidth
                size='small'
                color='success'
                variant='contained'
              >
                Дог
              </Button>
            </Grid>
            <Grid item>
              <Button
                disabled={!id}
                startIcon={<PrintIcon />}
                component={Link}
                href={`${currentURL}/print/teh-nadzor-akt/${id}`}
                fullWidth
                size='small'
                color='success'
                variant='contained'
              >
                Акт
              </Button>
            </Grid>
            <Grid item>
              <Button
                disabled={!id || formData.paymentSourceProectnAvt === 'собств'}
                startIcon={<PrintIcon />}
                component={Link}
                href={`${currentURL}/print/teh-nadzor-kosht/${id}`}
                fullWidth
                size='small'
                color='success'
                variant='contained'
              >
                кошт
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
            {!calendGrafikId && (
              <Grid item sx={{ width: 25 }}>
                <IconButton
                  component={Link}
                  sx={{
                    color: red[500],
                    padding: 0,
                    // marginLeft: -1,
                  }}
                  href={`/manager/documents/calendarn-grafik/add/${id}`}
                >
                  <AddCircleOutlineIcon />
                </IconButton>
              </Grid>
            )}
            <Grid item>
              <Button
                disabled={!calendGrafikId}
                startIcon={<EditIcon />}
                component={Link}
                href={`/manager/documents/calendarn-grafik/${calendGrafikId}`}
                fullWidth
                size='small'
                color='primary'
                variant='contained'
              ></Button>
            </Grid>
            <Grid item>
              <Button
                disabled={!calendGrafikId}
                startIcon={<PrintIcon />}
                component={Link}
                href={`/manager/documents/calendarn-grafik/print/${calendGrafikId}`}
                fullWidth
                size='small'
                color='success'
                variant='contained'
              >
                КалендГр
              </Button>
            </Grid>
            <Grid item>
              <Button
                disabled={!id}
                startIcon={<PrintIcon />}
                component={Link}
                href={`${currentURL}/print/jkh-plan-finans/${id}`}
                fullWidth
                size='small'
                color='success'
                variant='contained'
              >
                ПланФинанс
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
                href={`${currentURL}/print/jkh-pismo-ot-osbb/${id}`}
                fullWidth
                size='small'
                color='success'
                variant='contained'
              >
                ПисьмоОт
              </Button>
            </Grid>
            <Grid item>
              <Button
                disabled={!id}
                startIcon={<PrintIcon />}
                component={Link}
                href={`${currentURL}/print/jkh-nakaz-osbb/${id}`}
                fullWidth
                size='small'
                color='success'
                variant='contained'
              >
                наказ
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
                href={`${currentURL}/print/trebovanie-po-smete-avk/${id}`}
                fullWidth
                size='small'
                color='success'
                variant='contained'
              >
                Требования для сметы
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
                накл
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
