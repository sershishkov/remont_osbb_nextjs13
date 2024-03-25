import React from 'react';
import Grid from '@mui/material/Grid';

import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import MySelectAutoCompl from '@/components/common/MySelectAutoCompl';
import { arr_paymentProectnAvt, monthsWorkBudjet } from '@/constants/constants';

export default function ContractBudjetCommon({
  formData,
  onChange,
  handleChangeSelects,
}: Readonly<{
  formData: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeSelects: (
    targetName: string,
    targetValue: string | string[]
  ) => void;
}>) {
  return (
    <Grid item sx={{ width: '100%' }}>
      <Grid
        container
        direction={`column`}
        justifyContent={`flex-start`}
        alignItems={`center`}
      >
        <Grid item sx={{ width: '100%' }}>
          <Typography variant='body1' align='center'>
            Бюджет
          </Typography>
        </Grid>
        <Grid item sx={{ width: '100%' }}>
          <Grid
            container
            direction={`row`}
            justifyContent={`space-between`}
            alignItems={`center`}
            spacing={1}
          >
            <Grid item sx={{ width: 300 }}>
              <TextField
                margin='normal'
                size='small'
                multiline
                required
                fullWidth
                name='kodDkBudjet'
                label='Код ДК'
                type='text'
                id='kodDkBudjet'
                value={formData.kodDkBudjet ?? ''}
                onChange={onChange}
              />
            </Grid>
            <Grid item sx={{ flex: 1 }}>
              <MySelectAutoCompl
                selectName={`startMonthWorkBudjet`}
                selectLabel={`месяц Старт`}
                fieldToShow={`caption`}
                handleChangeSelects={handleChangeSelects}
                selectedOption={formData.startMonthWorkBudjet ?? ''}
                // @ts-ignore
                arrToSelect={monthsWorkBudjet ?? []}
              />
            </Grid>
            <Grid item sx={{ flex: 1 }}>
              <MySelectAutoCompl
                selectName={`endMonthWorkBudjet`}
                selectLabel={`месяц Финиш`}
                fieldToShow={`caption`}
                handleChangeSelects={handleChangeSelects}
                selectedOption={formData.endMonthWorkBudjet ?? ''}
                // @ts-ignore
                arrToSelect={monthsWorkBudjet ?? []}
              />
            </Grid>
            <Grid item sx={{ flex: 1 }}>
              <MySelectAutoCompl
                selectName={`paymentSourceProectnAvt`}
                selectLabel={`ИстСредствПрАвт`}
                fieldToShow={`caption`}
                handleChangeSelects={handleChangeSelects}
                selectedOption={formData.paymentSourceProectnAvt ?? ''}
                // @ts-ignore
                arrToSelect={arr_paymentProectnAvt ?? []}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item sx={{ width: '100%' }}>
          <Grid
            container
            direction={`row`}
            justifyContent={`space-between`}
            alignItems={`center`}
            spacing={1}
          >
            <Grid item sx={{ width: 120 }}>
              <TextField
                margin='normal'
                size='small'
                required
                fullWidth
                name='dogovornayaSumBudjet'
                label='Сум Договорн'
                type='number'
                id='dogovornayaSumBudjet'
                value={formData.dogovornayaSumBudjet ?? ''}
                onChange={onChange}
              />
            </Grid>
            <Grid item sx={{ width: 120 }}>
              <TextField
                margin='normal'
                size='small'
                required
                fullWidth
                name='zvedeniySumBudjet'
                label='Сум Зведеный'
                type='number'
                id='zvedeniySumBudjet'
                value={formData.zvedeniySumBudjet ?? ''}
                onChange={onChange}
              />
            </Grid>
            <Grid item sx={{ width: 120 }}>
              <TextField
                margin='normal'
                size='small'
                required
                fullWidth
                name='proectnSumBudjet'
                label='Сум Проект'
                type='number'
                id='proectnSumBudjet'
                value={formData.proectnSumBudjet ?? ''}
                onChange={onChange}
              />
            </Grid>
            <Grid item sx={{ width: 120 }}>
              <TextField
                margin='normal'
                size='small'
                required
                fullWidth
                name='avtorskSumBudjet'
                label='Сум Авт'
                type='number'
                id='avtorskSumBudjet'
                value={formData.avtorskSumBudjet ?? ''}
                onChange={onChange}
              />
            </Grid>
            <Grid item sx={{ width: 120 }}>
              <TextField
                margin='normal'
                size='small'
                required
                fullWidth
                name='tehnadzorSumBudjet'
                label='Сум техНадз'
                type='number'
                id='tehnadzorSumBudjet'
                value={formData.tehnadzorSumBudjet ?? ''}
                onChange={onChange}
              />
            </Grid>
            <Grid item sx={{ width: 120 }}>
              <TextField
                margin='normal'
                size='small'
                required
                fullWidth
                name='tehnadzorSumBudjetGlava1_9'
                label='Гл1-9 Звед'
                type='number'
                id='tehnadzorSumBudjetGlava1_9'
                value={formData.tehnadzorSumBudjetGlava1_9 ?? ''}
                onChange={onChange}
              />
            </Grid>
            <Grid item sx={{ width: 120 }}>
              <TextField
                margin='normal'
                size='small'
                required
                fullWidth
                name='expertizaSumBudjet'
                label='Сум експертиза'
                type='number'
                id='expertizaSumBudjet'
                value={formData.expertizaSumBudjet ?? ''}
                onChange={onChange}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
