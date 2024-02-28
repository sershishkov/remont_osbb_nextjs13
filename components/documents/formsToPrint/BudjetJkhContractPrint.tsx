import React from 'react';
import { I_Contract, I_Client } from '@/interfaces/refdata';
import { FloatToSamplesInWordsUkr } from '@/lib/helpers/myPropisUkr';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import classes from './styles.module.scss';

export default function BudjetJkhContractPrint({
  currentContract,
  currentOurFirm,
  currentClient,
}: Readonly<{
  currentContract: I_Contract;
  currentOurFirm: I_Client;
  currentClient: I_Client;
}>) {
  return <div>BudjetJkhContractPrint</div>;
}
