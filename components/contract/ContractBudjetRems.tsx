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

export default function ContractBudjetRems({
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
        alignItems={`center`}
      >
        <Grid item sx={{ width: '100%', border: '1px solid grey' }}>
          <Typography variant='body1' align='center'>
            Ремсервис бюджет
          </Typography>
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
                ПрАвт
              </Typography>
            </Grid>

            <Grid item>
              <Button
                disabled={!id}
                startIcon={<PrintIcon />}
                component={Link}
                href={`${currentURL}/print/rems-budjet-pr-and-avt-dog/${id}`}
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
                href={`${currentURL}/print/rems-budjet-pr-and-avt-akt/${id}`}
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
                href={`${currentURL}/print/rems-budjet-proectn-koshtoris/${id}?mode=project`}
                fullWidth
                size='small'
                color='success'
                variant='contained'
              >
                к Пр
              </Button>
            </Grid>
            <Grid item>
              <Button
                disabled={!id}
                startIcon={<PrintIcon />}
                component={Link}
                href={`${currentURL}/print/rems-budjet-proectn-koshtoris/${id}?mode=avt`}
                fullWidth
                size='small'
                color='success'
                variant='contained'
              >
                к авт
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
            <Grid item sx={{ width: 150 }}>
              <TextField
                margin='normal'
                size='small'
                required
                fullWidth
                name='jurnalAvtoskiyNumber'
                label='№ журн Авт'
                type='text'
                id='jurnalAvtoskiyNumber'
                value={formData.jurnalAvtoskiyNumber ?? ''}
                onChange={onChange}
              />
            </Grid>
            <Grid item sx={{ width: 150 }}>
              <TextField
                margin='normal'
                size='small'
                required
                fullWidth
                name='jurnalRabotNumber'
                label='№ журн Работы'
                type='text'
                id='jurnalRabotNumber'
                value={formData.jurnalRabotNumber ?? ''}
                onChange={onChange}
              />
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
                Журн
              </Typography>
            </Grid>

            <Grid item>
              <Button
                disabled={!id}
                startIcon={<PrintIcon />}
                component={Link}
                href={`${currentURL}/print/rems-budjet-jurnal-avtorsk/${id}`}
                fullWidth
                size='small'
                color='success'
                variant='contained'
              >
                Авт
              </Button>
            </Grid>
            {!calendGrafikId && (
              <Grid item sx={{ width: 25 }}>
                <IconButton
                  component={Link}
                  sx={{
                    color: red[500],
                    padding: 0,
                    // marginLeft: -1,
                  }}
                  href={`/manager/documents/calendarn-grafik/add`}
                >
                  <AddCircleOutlineIcon />
                </IconButton>
              </Grid>
            )}
            <Grid item>
              <Button
                disabled={!id}
                startIcon={<PrintIcon />}
                component={Link}
                href={`${currentURL}/print/rems-budjet-jurnal-rabot/${id}`}
                fullWidth
                size='small'
                color='success'
                variant='contained'
              >
                Произв
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
                disabled={
                  formData.remsCalendarGrafikUnit === '' ||
                  formData.remsCalendarGrafikAmount === '0'
                }
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
            <Grid item sx={{ width: 120 }}>
              <TextField
                margin='normal'
                size='small'
                // required
                fullWidth
                name='remsCalendarGrafikUnit'
                label='Ед.изм'
                type='text'
                id='remsCalendarGrafikUnit'
                value={formData.remsCalendarGrafikUnit ?? ''}
                onChange={onChange}
                sx={{
                  input: {
                    fontSize: '.8rem',
                  },
                }}
              />
            </Grid>
            <Grid item sx={{ width: 120 }}>
              <TextField
                margin='normal'
                size='small'
                // required
                fullWidth
                name='remsCalendarGrafikAmount'
                label='Кол-во'
                type='number'
                id='remsCalendarGrafikAmount'
                value={formData.remsCalendarGrafikAmount ?? ''}
                onChange={onChange}
                sx={{
                  input: {
                    fontSize: '.8rem',
                  },
                }}
              />
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
            <Grid item sx={{ width: 120 }}>
              <TextField
                margin='normal'
                size='small'
                required
                fullWidth
                name='prikazGipNumber'
                label='№ приказ ГИП'
                type='text'
                id='prikazGipNumber'
                value={formData.prikazGipNumber ?? ''}
                onChange={onChange}
                sx={{
                  input: {
                    fontSize: '.8rem',
                  },
                }}
              />
            </Grid>
            <Grid item sx={{ width: 120 }}>
              <TextField
                margin='normal'
                size='small'
                required
                fullWidth
                name='prikazEngineeNumber'
                label='№ приказ Инж'
                type='text'
                id='prikazEngineeNumber'
                value={formData.prikazEngineeNumber ?? ''}
                onChange={onChange}
                sx={{
                  input: {
                    fontSize: '.8rem',
                  },
                }}
              />
            </Grid>
            <Grid item sx={{ width: 120 }}>
              <TextField
                margin='normal'
                size='small'
                required
                fullWidth
                name='prikazOhranaTrudaNumber'
                label='№ приказ ОхрТруда'
                type='text'
                id='prikazOhranaTrudaNumber'
                value={formData.prikazOhranaTrudaNumber ?? ''}
                onChange={onChange}
                sx={{
                  input: {
                    fontSize: '.8rem',
                  },
                }}
              />
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
                Приказы
              </Typography>
            </Grid>

            <Grid item>
              <Button
                disabled={!id}
                startIcon={<PrintIcon />}
                component={Link}
                href={`${currentURL}/print/rems-budjet-nakaz-gip/${id}`}
                fullWidth
                size='small'
                color='success'
                variant='contained'
              >
                ГИП
              </Button>
            </Grid>
            <Grid item>
              <Button
                disabled={!id}
                startIcon={<PrintIcon />}
                component={Link}
                href={`${currentURL}/print/rems-budjet-nakaz-engineer/${id}`}
                fullWidth
                size='small'
                color='success'
                variant='contained'
              >
                Инженер
              </Button>
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
                Охр.Труда
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
                Накладные
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
                href={`${currentURL}/print/rems-budjet-zavdannya/${id}`}
                fullWidth
                size='small'
                color='success'
                variant='contained'
              >
                Завдання
              </Button>
            </Grid>
            <Grid item>
              <Button
                disabled={!id}
                startIcon={<PrintIcon />}
                component={Link}
                href={`${currentURL}/print/rems-budjet-vihidny-dannie/${id}`}
                fullWidth
                size='small'
                color='success'
                variant='contained'
              >
                Вихідні
              </Button>
            </Grid>
            <Grid item>
              <Button
                disabled={!id}
                startIcon={<PrintIcon />}
                component={Link}
                href={`${currentURL}/print/rems-budjet-cc1/${id}`}
                fullWidth
                size='small'
                color='success'
                variant='contained'
              >
                СС1
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
            <Grid item sx={{ width: 150 }}>
              <TextField
                margin='normal'
                size='small'
                required
                fullWidth
                name='dopUgodaSum'
                label='Доп Соглаш Сум'
                type='number'
                id='dopUgodaSum'
                value={formData.dopUgodaSum ?? ''}
                onChange={onChange}
              />
            </Grid>
            <Grid item>
              <Button
                disabled={!id}
                startIcon={<PrintIcon />}
                component={Link}
                href={`${currentURL}/print/rems-budjet-dop-ugoda/${id}`}
                fullWidth
                size='small'
                color='success'
                variant='contained'
              >
                ДопУгода
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
            <Grid item sx={{ width: 150 }}>
              <TextField
                margin='normal'
                size='small'
                required
                fullWidth
                name='salaryMin'
                label='МинЗарплата'
                type='number'
                id='salaryMin'
                value={formData.salaryMin ?? ''}
                onChange={onChange}
              />
            </Grid>
            <Grid item sx={{ width: 150 }}>
              <TextField
                margin='normal'
                size='small'
                required
                fullWidth
                name='salaryLevel_3_8'
                label='ЗП Разряд 3,8'
                type='number'
                id='salaryLevel_3_8'
                value={formData.salaryLevel_3_8 ?? ''}
                onChange={onChange}
              />
            </Grid>
            <Grid item sx={{ width: 150 }}>
              <TextField
                margin='normal'
                size='small'
                required
                fullWidth
                name='planPributokSum'
                label='ПланирПрибут'
                type='number'
                id='planPributokSum'
                value={formData.planPributokSum ?? ''}
                onChange={onChange}
              />
            </Grid>
            <Grid item sx={{ width: 150 }}>
              <TextField
                margin='normal'
                size='small'
                required
                fullWidth
                name='adminVytratySum'
                label='АдминЗатраты'
                type='number'
                id='adminVytratySum'
                value={formData.adminVytratySum ?? ''}
                onChange={onChange}
              />
            </Grid>
            <Grid item sx={{ width: 150 }}>
              <TextField
                margin='normal'
                size='small'
                required
                fullWidth
                name='salaryOneDaySum'
                label='ЗП 1 день'
                type='number'
                id='salaryOneDaySum'
                value={formData.salaryOneDaySum ?? ''}
                onChange={onChange}
              />
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
              <TextField
                margin='normal'
                size='small'
                required
                fullWidth
                name='lifeTime'
                label='Срок экспл(лет)'
                type='number'
                id='lifeTime'
                value={formData.lifeTime ?? ''}
                onChange={onChange}
              />
            </Grid>
            <Grid item sx={{ width: 150 }}>
              <TextField
                multiline
                margin='normal'
                size='small'
                required
                fullWidth
                name='whereWirkIsPerfomed'
                label='Работы Где?'
                type='text'
                id='whereWirkIsPerfomed'
                value={formData.whereWirkIsPerfomed ?? ''}
                onChange={onChange}
              />
            </Grid>
            <Grid item sx={{ width: 150 }}>
              <TextField
                multiline
                margin='normal'
                size='small'
                required
                fullWidth
                name='servWorkShortForJournal'
                label='Работа сокращ?'
                type='text'
                id='servWorkShortForJournal'
                value={formData.servWorkShortForJournal ?? '?????'}
                onChange={onChange}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
