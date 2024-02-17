import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Loading from '@/app/loading';

export default function MySpinner() {
  return (
    <Grid
      container
      direction={`column`}
      justifyContent={`flex-start`}
      alignItems={`center`}
    >
      <Grid item>
        <Typography variant='h6'>
          Если долго крутиться - то пока в базе ничего нет
        </Typography>
      </Grid>
      <Grid item>
        <Loading />
      </Grid>
    </Grid>
  );
}
