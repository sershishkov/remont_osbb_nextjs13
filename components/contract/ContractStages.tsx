import React from 'react';
import Grid from '@mui/material/Grid';

import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import Switch from '@mui/material/Switch';

export default function ContractStages({
  contractStages,
  handleChangeContractStages,
}: Readonly<{
  contractStages: any;
  handleChangeContractStages: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
}>) {
  return (
    <Grid
      container
      direction={`column`}
      justifyContent={`flex-start`}
      alignItems={`flex-start`}
    >
      <FormControl component='fieldset' variant='standard'>
        <FormLabel component='legend'>Стадии выполнения</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={contractStages.isMeasured}
                onChange={handleChangeContractStages}
                name='isMeasured'
              />
            }
            label='Замер сделан'
          />
          <FormControlLabel
            control={
              <Switch
                checked={contractStages.isEstimateCalculated}
                onChange={handleChangeContractStages}
                name='isEstimateCalculated'
              />
            }
            label='Смета рассчитана'
          />
          <FormControlLabel
            control={
              <Switch
                checked={contractStages.isEstimateHasBeenSentToClient}
                onChange={handleChangeContractStages}
                name='isEstimateHasBeenSentToClient'
              />
            }
            label='Смета отправлена клиенту'
          />
          <FormControlLabel
            control={
              <Switch
                checked={contractStages.isEstimateApprovedByClient}
                onChange={handleChangeContractStages}
                name='isEstimateApprovedByClient'
              />
            }
            label='Смета одобрена клиентом'
          />
          <FormControlLabel
            control={
              <Switch
                checked={contractStages.isMaterialsHaveBeenOrdered}
                onChange={handleChangeContractStages}
                name='isMaterialsHaveBeenOrdered'
              />
            }
            label='Материал заказан'
          />
          <FormControlLabel
            control={
              <Switch
                checked={contractStages.isMaterialsDelivered}
                onChange={handleChangeContractStages}
                name='isMaterialsDelivered'
              />
            }
            label='Материал доставлен'
          />
          <FormControlLabel
            control={
              <Switch
                checked={contractStages.isMaterialsPaid}
                onChange={handleChangeContractStages}
                name='isMaterialsPaid'
              />
            }
            label='Закупка материалов оплачена'
          />
          <FormControlLabel
            control={
              <Switch
                checked={contractStages.isWorkCompleted}
                onChange={handleChangeContractStages}
                name='isWorkCompleted'
              />
            }
            label='Работы выполнены'
          />
          <FormControlLabel
            control={
              <Switch
                checked={contractStages.isWorksPaid}
                onChange={handleChangeContractStages}
                name='isWorksPaid'
              />
            }
            label='Работы оплачены'
          />
          <FormControlLabel
            control={
              <Switch
                checked={contractStages.isDocumentsHaveBeenIssued}
                onChange={handleChangeContractStages}
                name='isDocumentsHaveBeenIssued'
              />
            }
            label='Документы выписаны'
          />
          <FormControlLabel
            control={
              <Switch
                checked={contractStages.isDocumentsHaveBeenGivenToClient}
                onChange={handleChangeContractStages}
                name='isDocumentsHaveBeenGivenToClient'
              />
            }
            label='Документы переданы клиенту на подпись'
          />
          <FormControlLabel
            control={
              <Switch
                checked={contractStages.isClientReturnedSignedDocuments}
                onChange={handleChangeContractStages}
                name='isClientReturnedSignedDocuments'
              />
            }
            label='Клиент вернул подписанные документы'
          />
          <FormControlLabel
            control={
              <Switch
                checked={contractStages.isContractPaid}
                onChange={handleChangeContractStages}
                name='isContractPaid'
              />
            }
            label='Контракт оплачен клиентом'
          />
        </FormGroup>
      </FormControl>
    </Grid>
  );
}
