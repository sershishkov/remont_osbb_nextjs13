'use client';

import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

import {
  item__get_one,
  item__edit,
  get__all,
  item__add,
} from '@/lib/actions/refdata.actions';
import { generateDocNumber } from '@/lib/helpers/helperFunction';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import PrintIcon from '@mui/icons-material/Print';

import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import Switch from '@mui/material/Switch';
import Link from '@mui/material/Link';

import MySelectAutoCompl from '@/components/common/MySelectAutoCompl';
import { accountant_role } from '@/constants/constants';
import {
  I_Client,
  I_ContractType,
  I_PaymentSource,
  I_Worker,
  I_ClientType,
  I_Contract,
} from '@/interfaces/refdata';

const currentURL = '/manager/refdata/contract';
const initState = {
  contractNumber: '',
  ourFirm: '',
  client: '',

  contractDate: '',
  contractDescription: 'Поточный ремонт - ',
  workAddress: '',
  contractType: '',
  paymentSource: '',
  responsibleManager: '',
  responsibleWorker: '',
  guaranteePeriod: '12',
  prepaymentPercentage: '70',
};

export interface ILocalParticipant {
  id: string;
  participant: string;
  participantPercentage: string;
}

function ContractAddEdit({
  id,
  mode,
  title,
}: Readonly<{ id?: string; mode: string; title: string }>) {
  const route = useRouter();
  const session = useSession();
  const user = session?.data?.user;

  const [formData, setFormData] = useState(initState);
  const [otherParticipantsSum, setOtherParticipantsSum] = useState(0);
  const [mainParticipantSum, setMainParticipantSum] = useState(100);
  const [otherParticipants, setOtherParticipants] = useState<
    ILocalParticipant[]
  >([]);

  const [isClientTouched, setIsClientTouched] = useState<boolean>(false);

  const [arr__ourFirms, setArr__ourFirms] = useState<I_Client[]>([]);
  const [arr__Clients, setArr__Clients] = useState<I_Client[]>([]);

  const [arr__ContractTypes, setArr__ContractTypes] = useState<
    I_ContractType[]
  >([]);
  const [arr__PaymentSources, setArr__PaymentSources] = useState<
    I_PaymentSource[]
  >([]);
  const [arr__Workers, setArr__Workers] = useState<I_Worker[]>([]);

  const [contractStages, setContractStages] = useState({
    isMeasured: false,
    isEstimateCalculated: false,
    isEstimateHasBeenSentToClient: false,
    isEstimateApprovedByClient: false,
    isMaterialsHaveBeenOrdered: false,
    isMaterialsDelivered: false,
    isWorkCompleted: false,
    isDocumentsHaveBeenIssued: false,
    isDocumentsHaveBeenGivenToClient: false,
    isClientReturnedSignedDocuments: false,
    isContractPaid: false,
    isMaterialsPaid: false,
    isWorksPaid: false,
  });

  const {
    contractNumber,
    ourFirm,
    client,

    contractDate,
    contractDescription,
    workAddress,
    contractType,
    paymentSource,
    responsibleManager,
    responsibleWorker,
    guaranteePeriod,
    prepaymentPercentage,
  } = formData;

  const {
    isMeasured,
    isEstimateCalculated,
    isEstimateHasBeenSentToClient,
    isEstimateApprovedByClient,
    isMaterialsHaveBeenOrdered,
    isMaterialsDelivered,
    isWorkCompleted,
    isDocumentsHaveBeenIssued,
    isDocumentsHaveBeenGivenToClient,
    isClientReturnedSignedDocuments,
    isContractPaid,
    isMaterialsPaid,
    isWorksPaid,
  } = contractStages;

  useEffect(() => {
    const inputFocus = document.getElementById('ourFirm');
    inputFocus?.focus();
  }, []);

  useEffect(() => {
    const myGetAll = async () => {
      const all__ClientTypes = await get__all(
        { page: '0', limit: '0', filter: '' },
        '/accountant/refdata/client-type'
      );

      const all__Clients = await get__all(
        { page: '0', limit: '0', filter: '' },
        '/manager/refdata/client'
      );
      const all__ContractTypes = await get__all(
        { page: '0', limit: '0', filter: '' },
        '/accountant/refdata/contract-type'
      );
      const all__PaymentSources = await get__all(
        { page: '0', limit: '0', filter: '' },
        '/accountant/refdata/payment-source'
      );
      const all__Workers = await get__all(
        { page: '0', limit: '0', filter: '' },
        '/accountant/refdata/workers'
      );
      const ourFirmObj = all__ClientTypes.items.find(
        (item: I_ClientType) => item.clientTypeName === 'наша фирма'
      );

      const arr__ourFirms: I_Client[] = [];
      const arr__Clients: I_Client[] = [];

      all__Clients.items.forEach((item: I_Client) => {
        const hasOurFirm = item.clientType?.some(
          (oneType) => oneType._id === ourFirmObj._id
        );

        if (hasOurFirm) {
          arr__ourFirms.push(item);
        } else {
          arr__Clients.push(item);
        }
      });

      setArr__ourFirms(arr__ourFirms);
      setArr__Clients(arr__Clients);
      setArr__ContractTypes(all__ContractTypes.items);
      setArr__PaymentSources(all__PaymentSources.items);
      setArr__Workers(all__Workers.items);
    };

    setFormData((prevState) => ({
      ...prevState,
      contractNumber: generateDocNumber(),
      contractDate: new Date().toISOString().split('T')[0],
    }));

    myGetAll();
  }, []);

  useLayoutEffect(() => {
    if (id) {
      const myGetOne = async () => {
        const item: I_Contract = await item__get_one({ _id: id }, currentURL);

        if (item) {
          setFormData((prevState) => ({
            ...prevState,
            contractNumber: item.contractNumber!,
            //@ts-ignore
            ourFirm: item.ourFirm!._id.toString(),
            //@ts-ignore
            client: item.client!._id.toString(),

            contractDate: new Date(item.contractDate!)
              .toISOString()
              .split('T')[0],

            contractDescription: item.contractDescription!,
            workAddress: item.workAddress!,
            guaranteePeriod: item.guaranteePeriod,
            prepaymentPercentage: item.prepaymentPercentage.toFixed(2),
            //@ts-ignore
            contractType: item.contractType!._id.toString(),
            //@ts-ignore
            paymentSource: item.paymentSource!._id.toString(),
            //@ts-ignore
            responsibleManager: item.responsibleManager._id.toString(),
            //@ts-ignore
            responsibleWorker: item.responsibleWorker._id.toString(),
          }));

          setContractStages({
            isMeasured: item.isMeasured,
            isEstimateCalculated: item.isEstimateCalculated,
            isEstimateHasBeenSentToClient: item.isEstimateHasBeenSentToClient,
            isEstimateApprovedByClient: item.isEstimateApprovedByClient,
            isMaterialsHaveBeenOrdered: item.isMaterialsHaveBeenOrdered,
            isMaterialsDelivered: item.isMaterialsDelivered,
            isWorkCompleted: item.isWorkCompleted,
            isDocumentsHaveBeenIssued: item.isDocumentsHaveBeenIssued,
            isDocumentsHaveBeenGivenToClient:
              item.isDocumentsHaveBeenGivenToClient,
            isClientReturnedSignedDocuments:
              item.isClientReturnedSignedDocuments,
            isContractPaid: item.isContractPaid,
            isMaterialsPaid: item.isMaterialsPaid,
            isWorksPaid: item.isWorksPaid,
          });

          const mainParticipant = { ...item.participantsOfContract![0] };

          const shortParticipant = item.participantsOfContract?.slice(1);

          const newParticipants = shortParticipant?.map((member) => {
            return {
              id: uuidv4(),
              //@ts-ignore
              participant: member.participant._id.toString(),
              participantPercentage: member.participantPercentage.toString(),
            };
          });
          //@ts-ignore
          const mainSum: number = mainParticipant?.participantPercentage;
          const otherSum = 100 - mainSum;
          //@ts-ignore
          setMainParticipantSum(mainSum);
          setOtherParticipantsSum(otherSum);

          setOtherParticipants(newParticipants ?? []);
        }
      };
      myGetOne();
    }
  }, [id]);

  useEffect(() => {
    if (client && isClientTouched) {
      const currentClient = arr__Clients.find((item) => item._id === client);
      setFormData((prevState) => ({
        ...prevState,
        workAddress: currentClient?.address!,
      }));
    }
  }, [client, arr__Clients, isClientTouched]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const actualOtherParticipants = otherParticipants.map((item) => {
      return {
        participant: item.participant,
        participantPercentage: Number(item.participantPercentage),
      };
    });

    const mainParticipant = {
      participant: responsibleManager,
      participantPercentage: mainParticipantSum,
    };

    const created__Data = {
      contractNumber,
      ourFirm,
      client,

      contractDate,
      contractDescription,
      workAddress,
      contractType,
      paymentSource,
      responsibleManager,
      responsibleWorker,
      participantsOfContract: [mainParticipant, ...actualOtherParticipants],

      guaranteePeriod,
      prepaymentPercentage: Number(prepaymentPercentage),

      isMeasured,
      isEstimateCalculated,
      isEstimateHasBeenSentToClient,
      isEstimateApprovedByClient,
      isMaterialsHaveBeenOrdered,
      isMaterialsDelivered,
      isWorkCompleted,
      isDocumentsHaveBeenIssued,
      isDocumentsHaveBeenGivenToClient,
      isClientReturnedSignedDocuments,
      isContractPaid,
      isMaterialsPaid,
      isWorksPaid,
    };

    if (mode === 'add') {
      await item__add(created__Data, currentURL, route);
    } else if (mode === 'edit') {
      //@ts-ignore
      created__Data._id = id;
      await item__edit(created__Data, currentURL, route);
    }
  };
  const handleChangeSelects = (
    targetName: string,
    targetValue: string | string[]
  ) => {
    if (targetName === 'client') {
      setIsClientTouched(true);
    }
    setFormData((prevState) => ({
      ...prevState,
      [targetName]: targetValue,
    }));
  };
  const handleChangeSelectsParticipant = (
    targetName: string,
    targetValue: string
  ) => {
    const rowId = targetName.split('_')[1];

    const temp__localParticipants = [...otherParticipants];
    const currentIndex = temp__localParticipants.findIndex(
      (item) => item.id === rowId
    );
    temp__localParticipants[currentIndex].participant = targetValue;

    setOtherParticipants(temp__localParticipants);
  };

  const onClickAddItem = (link: string) => {
    route.push(`${link}`);
  };

  const addParticipant = () => {
    const newParticipant = {
      id: uuidv4(),
      participant: '',
      participantPercentage: '0',
    };

    setOtherParticipants((prevState) => [...prevState, newParticipant]);
  };

  const deleteParticipant = (id: string) => {
    const deletedParticipant = otherParticipants.find((item) => item.id === id);
    const deletedSum = Number(deletedParticipant?.participantPercentage);

    const newOthersSum = otherParticipantsSum - deletedSum;
    const newMainSum = 100 - newOthersSum;

    const filteredParticipants = otherParticipants.filter(
      (item) => item.id !== id
    );
    setOtherParticipants(filteredParticipants);
    setOtherParticipantsSum(newOthersSum);
    setMainParticipantSum(newMainSum);
  };
  const reculcParticipantsSum = () => {
    const otherPartSum = otherParticipants.reduce(
      (sum, item) => sum + Number(item.participantPercentage),
      0
    );
    const mainSum = 100 - otherPartSum;
    setOtherParticipantsSum(otherPartSum);
    setMainParticipantSum(mainSum);
  };

  const onChangePercentage = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    id: string
  ) => {
    const temp__localParticipants = [...otherParticipants];
    const currentIndex = temp__localParticipants.findIndex(
      (item) => item.id === id
    );
    temp__localParticipants[currentIndex].participantPercentage =
      e.target.value;

    setOtherParticipants(temp__localParticipants);
  };

  const handleChangeContractStages = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setContractStages({
      ...contractStages,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <Grid
      component='form'
      onSubmit={onSubmit}
      container
      direction='column'
      autoComplete='off'
    >
      <Grid item className='item item-heading'>
        <Grid
          container
          direction={`row`}
          justifyContent={`space-between`}
          alignItems={`center`}
        >
          <Grid item>
            <Typography variant='body2' align='center'>
              {title}
            </Typography>
          </Grid>
          <Grid item>
            <Button
              type='submit'
              fullWidth
              disabled={
                !contractNumber ||
                !ourFirm ||
                !client ||
                !contractDate ||
                !contractDescription ||
                !workAddress ||
                !contractType ||
                !paymentSource ||
                !responsibleManager ||
                !responsibleWorker ||
                mainParticipantSum < 0
              }
              variant='contained'
            >
              Сохранить
            </Button>
          </Grid>
          <Grid item sx={{ display: mode === 'edit' ? 'block' : 'none' }}>
            <Button
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
          <Grid item sx={{ display: mode === 'edit' ? 'block' : 'none' }}>
            <Button
              startIcon={<PrintIcon />}
              component={Link}
              href={`${currentURL}/print/koshtoris/${id}`}
              fullWidth
              size='small'
              color='success'
              variant='contained'
            >
              Кошторис
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid
          container
          direction={`row`}
          justifyContent={`space-between`}
          alignItems={`center`}
          spacing={1}
        >
          <Grid item sx={{ width: 150 }}>
            <TextField
              margin='normal'
              required
              fullWidth
              name='contractNumber'
              label='Номер контракта'
              type='text'
              id='contractNumber'
              value={contractNumber ?? ''}
              onChange={onChange}
            />
          </Grid>

          <Grid item sx={{ width: 150 }}>
            <TextField
              margin='normal'
              required
              fullWidth
              name='contractDate'
              label='Дата Контракта'
              type='date'
              id='contractDate'
              value={contractDate ?? ''}
              onChange={onChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item sx={{ width: 100 }}>
            <TextField
              margin='normal'
              required
              fullWidth
              name='guaranteePeriod'
              label='Гаранития (мес)'
              type='number'
              id='guaranteePeriod'
              value={guaranteePeriod ?? ''}
              onChange={onChange}
            />
          </Grid>
          <Grid item sx={{ width: 100 }}>
            <TextField
              margin='normal'
              required
              fullWidth
              name='prepaymentPercentage'
              label='Предопл(%)'
              type='number'
              id='prepaymentPercentage'
              value={prepaymentPercentage ?? ''}
              onChange={onChange}
            />
          </Grid>
          <Grid item sx={{ width: 200 }}>
            <Stack
              direction='row'
              spacing={1}
              alignItems={`center`}
              // direction={{ xs: 'column', sm: 'row' }}
            >
              <MySelectAutoCompl
                selectName={`contractType`}
                selectLabel={`Тип контракта`}
                fieldToShow={`contractTypeName`}
                handleChangeSelects={handleChangeSelects}
                selectedOption={contractType ?? ''}
                // @ts-ignore
                arrToSelect={arr__ContractTypes ?? []}
              />

              <IconButton
                onClick={() =>
                  onClickAddItem('/accountant/refdata/contract-type/add')
                }
              >
                <AddIcon color='success' sx={{ fontSize: 30 }} />
              </IconButton>
            </Stack>
          </Grid>
          <Grid item sx={{ width: 200 }}>
            <Stack
              direction='row'
              spacing={1}
              // direction={{ xs: 'column', sm: 'row' }}
            >
              <MySelectAutoCompl
                selectName={`paymentSource`}
                selectLabel={`Источник средств`}
                fieldToShow={`paymentSourceName`}
                handleChangeSelects={handleChangeSelects}
                selectedOption={paymentSource ?? ''}
                // @ts-ignore
                arrToSelect={arr__PaymentSources ?? []}
              />

              <IconButton
                onClick={() =>
                  onClickAddItem('/accountant/refdata/payment-source/add')
                }
              >
                <AddIcon color='success' sx={{ fontSize: 30 }} />
              </IconButton>
            </Stack>
          </Grid>

          <Grid item sx={{ width: 200 }}>
            <Stack
              direction='row'
              spacing={1}
              alignItems={`center`}
              // direction={{ xs: 'column', sm: 'row' }}
            >
              <MySelectAutoCompl
                selectName={`responsibleManager`}
                selectLabel={`Отв.Менеджер`}
                fieldToShow={`lastName`}
                handleChangeSelects={handleChangeSelects}
                selectedOption={responsibleManager ?? ''}
                // @ts-ignore
                arrToSelect={arr__Workers ?? []}
              />
              <Typography
                variant='body2'
                sx={{
                  color: mainParticipantSum < 0 ? 'red' : 'green',
                }}
              >
                {mainParticipantSum.toFixed(2)}%
              </Typography>
            </Stack>
          </Grid>
          <Grid item sx={{ width: 200 }}>
            <Stack
              direction='row'
              spacing={1}
              // direction={{ xs: 'column', sm: 'row' }}
            >
              <MySelectAutoCompl
                selectName={`responsibleWorker`}
                selectLabel={`Отв.исполнитель`}
                fieldToShow={`lastName`}
                handleChangeSelects={handleChangeSelects}
                selectedOption={responsibleWorker ?? ''}
                // @ts-ignore
                arrToSelect={arr__Workers ?? []}
              />

              <IconButton
                onClick={() =>
                  onClickAddItem('/accountant/refdata/workers/add')
                }
              >
                <AddIcon color='success' sx={{ fontSize: 30 }} />
              </IconButton>
            </Stack>
          </Grid>
        </Grid>
      </Grid>

      <Grid item>
        <Grid
          container
          direction={`row`}
          justifyContent={`flex-start`}
          alignItems={`center`}
          spacing={2}
        >
          <Grid item xs={6}>
            <MySelectAutoCompl
              selectName={`ourFirm`}
              selectLabel={`Наша фирма`}
              fieldToShow={`clientShortName`}
              handleChangeSelects={handleChangeSelects}
              selectedOption={ourFirm ?? ''}
              // @ts-ignore
              arrToSelect={arr__ourFirms ?? []}
            />
          </Grid>

          <Grid item xs={6}>
            <Stack
              direction='row'
              spacing={2}
              // direction={{ xs: 'column', sm: 'row' }}
            >
              <MySelectAutoCompl
                selectName={`client`}
                selectLabel={`Клиент`}
                fieldToShow={`clientShortName`}
                handleChangeSelects={handleChangeSelects}
                selectedOption={client ?? ''}
                // @ts-ignore
                arrToSelect={arr__Clients ?? []}
              />

              <IconButton
                onClick={() => onClickAddItem('/manager/refdata/client/add')}
              >
                <AddIcon color='success' sx={{ fontSize: 30 }} />
              </IconButton>
            </Stack>
          </Grid>
        </Grid>
      </Grid>

      <Grid item>
        <Grid
          container
          direction={`row`}
          justifyContent={`space-between`}
          alignItems={`center`}
          spacing={2}
        >
          <Grid item xs={6}>
            <TextField
              margin='normal'
              multiline
              required
              fullWidth
              name='contractDescription'
              label='Описание работ'
              type='text'
              id='contractDescription'
              value={contractDescription ?? ''}
              onChange={onChange}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              margin='normal'
              multiline
              required
              fullWidth
              name='workAddress'
              label='Адрес выполнения работ'
              type='text'
              id='workAddress'
              value={workAddress ?? ''}
              onChange={onChange}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid
        item
        sx={{
          display: accountant_role.includes(user?.role!) ? 'block' : 'none',
        }}
      >
        <Grid container direction='column'>
          <Grid item>
            <Stack
              direction='row'
              justifyContent='center'
              alignItems='center'
              spacing={2}
            >
              <Typography variant='h6' align='center'>
                Другие участники сделки
              </Typography>
              <Button
                onClick={addParticipant}
                variant='contained'
                color='success'
              >
                Добавить участника
              </Button>
              <Typography
                variant='h6'
                sx={{ color: otherParticipantsSum > 100 ? 'red' : 'green' }}
              >
                Сумма {otherParticipantsSum}%
              </Typography>
            </Stack>
          </Grid>
          <Grid item>
            {otherParticipants.length > 0 &&
              otherParticipants.map((item, rowIndex) => (
                <Grid
                  container
                  key={item.id}
                  direction='row'
                  justifyContent='center'
                  alignItems='center'
                  spacing={5}
                >
                  <Grid item sx={{ width: 300 }}>
                    <MySelectAutoCompl
                      selectName={`participant_${item.id}`}
                      selectLabel={`Участник`}
                      fieldToShow={`lastName`}
                      handleChangeSelects={handleChangeSelectsParticipant}
                      selectedOption={
                        otherParticipants[rowIndex]['participant']
                      }
                      // @ts-ignore
                      arrToSelect={arr__Workers ?? []}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      margin='normal'
                      required
                      // fullWidth
                      name={`participantPercentage-${item.id}`}
                      label='%%%'
                      type='number'
                      id={`participantPercentage-${item.id}`}
                      value={item.participantPercentage ?? ''}
                      onChange={(e) => onChangePercentage(e, item.id)}
                      onBlur={reculcParticipantsSum}
                    />
                  </Grid>
                  <Grid item>
                    <Button
                      onClick={() => deleteParticipant(item.id)}
                      variant='contained'
                      color='error'
                    >
                      Удалить участника
                    </Button>
                  </Grid>
                </Grid>
              ))}
          </Grid>
        </Grid>
      </Grid>

      <Grid item>
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

      <Grid item sx={{ width: '100%' }}></Grid>
    </Grid>
  );
}

export default ContractAddEdit;
