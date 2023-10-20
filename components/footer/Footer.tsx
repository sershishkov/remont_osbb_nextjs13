import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

function Footer() {
  return (
    <Grid container justifyContent='space-between'>
      <Grid item xs={6}>
        <Grid
          container
          flexDirection='column'
          justifyContent='center'
          alignItems='center'
        >
          <Grid item>
            <Typography variant='h6'>
              Ремонт любой сложности для ОСББ
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={6}>
        <Grid
          container
          flexDirection='column'
          justifyContent='center'
          alignItems='center'
        >
          <Grid item component={Link} href='tel:+380502279650'>
            <Typography variant='h6'>+380502279650</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Footer;
