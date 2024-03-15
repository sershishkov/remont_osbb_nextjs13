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
import {
  generateDocNumber,
  generateMultipleDocNumbers,
  setDefaultMonths,
} from '@/lib/helpers/helperFunction';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import PrintIcon from '@mui/icons-material/Print';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { red } from '@mui/material/colors';

import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import Switch from '@mui/material/Switch';
import Link from '@mui/material/Link';

import MySelectAutoCompl from '@/components/common/MySelectAutoCompl';
import {
  accountant_role,
  arr_paymentProectnAvt,
  monthsWorkBudjet,
} from '@/constants/constants';
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

  invoiceNumberBase: '',
  invoiceNumberNakl: '',
  invoiceNumberAkt: '',

  aktNumber: '',
  naklNumber: '',
  koshtorisNumber: '',

  contrProectAvtorskNumber: '',
  aktProectAvtorskNumber: '',

  jurnalAvtoskiyNumber: '',
  jurnalRabotNumber: '',
  prikazGipNumber: '',
  prikazEngineeNumber: '',
  prikazOhranaTrudaNumber: '',

  proectnSumBudjet: '890',
  avtorskSumBudjet: '890',
  expertizaSumBudjet: '0',
  tehnadzorSumBudjet: '0',
  tehnadzorSumBudjetGlava1_9: '0',

  zvedeniySumBudjet: '0',
  dogovornayaSumBudjet: '0',

  paymentSourceProectnAvt: 'собств',
  startMonthWorkBudjet: '',
  endMonthWorkBudjet: '',
  kodDkBudjet: 'код ДК 021:2015 - 45453000-7 Капітальний ремонт і реставрація',

  dopUgodaSum: '0',

  salaryMin: '6700',
  salaryLevel_3_8: '14627',
  lifeTime: '100',
  whereWirkIsPerfomed: `в під'їзді`,

  endWorkRemservis: '',
  remsCalendarGrafikUnit: '',
  remsCalendarGrafikAmount: '0',
};

export interface ILocalParticipant {
  id: string;
  participant: string;
  participantPercentage: string;
}

export default function ContractAddEdit({
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
  const [relAktId, setRelAktId] = useState('');
  const [relNaklId, setRelNaklId] = useState('');
  const [relNaklSum, setRelNaklSum] = useState(0);
  const [relAktSum, setRelAktSum] = useState(0);

  const [calendGrafikId, setCalendGrafikId] = useState('');
  const [remsNaklId, setRemsNaklId] = useState('');
  const [remsAktMusorlId, setRemsAktMusorlId] = useState('');

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

    invoiceNumberBase,
    invoiceNumberNakl,
    invoiceNumberAkt,

    aktNumber,
    naklNumber,
    koshtorisNumber,

    contrProectAvtorskNumber,
    aktProectAvtorskNumber,

    jurnalAvtoskiyNumber,
    jurnalRabotNumber,
    prikazGipNumber,
    prikazEngineeNumber,
    prikazOhranaTrudaNumber,

    proectnSumBudjet,
    avtorskSumBudjet,
    expertizaSumBudjet,
    tehnadzorSumBudjet,
    tehnadzorSumBudjetGlava1_9,

    zvedeniySumBudjet,
    dogovornayaSumBudjet,

    paymentSourceProectnAvt,
    startMonthWorkBudjet,
    endMonthWorkBudjet,
    kodDkBudjet,
    dopUgodaSum,

    salaryMin,
    salaryLevel_3_8,
    lifeTime,
    whereWirkIsPerfomed,

    endWorkRemservis,
    remsCalendarGrafikUnit,
    remsCalendarGrafikAmount,
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
    const docNums = generateMultipleDocNumbers();
    const defMonth = setDefaultMonths();

    setFormData((prevState) => ({
      ...prevState,
      contractNumber: generateDocNumber(),
      contractDate: new Date().toISOString().split('T')[0],
      invoiceNumberBase: docNums.invoiceNumberBase,
      invoiceNumberNakl: docNums.invoiceNumberNakl,
      invoiceNumberAkt: docNums.invoiceNumberAkt,
      aktNumber: docNums.aktNumber,
      naklNumber: docNums.naklNumber,
      koshtorisNumber: docNums.koshtorisNumber,
      contrProectAvtorskNumber: docNums.contrProectAvtorskNumber,
      aktProectAvtorskNumber: docNums.aktProectAvtorskNumber,
      jurnalAvtoskiyNumber: docNums.jurnalAvtoskiyNumber,
      jurnalRabotNumber: docNums.jurnalRabotNumber,
      prikazGipNumber: docNums.prikazGipNumber,
      prikazEngineeNumber: docNums.prikazEngineeNumber,
      prikazOhranaTrudaNumber: docNums.prikazOhranaTrudaNumber,
      endWorkRemservis: new Date().toISOString().split('T')[0],
      //@ts-ignore
      startMonthWorkBudjet: defMonth?.startMonth ?? '',
      //@ts-ignore
      endMonthWorkBudjet: defMonth?.endMonth ?? '',
    }));

    myGetAll();
  }, []);

  useLayoutEffect(() => {
    if (id) {
      const myGetOne = async () => {
        const item: I_Contract = await item__get_one({ _id: id }, currentURL);

        if (item) {
          const docNums = generateMultipleDocNumbers();
          const defMonth = setDefaultMonths();
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

            invoiceNumberBase:
              item.invoiceNumberBase ?? docNums.invoiceNumberBase,
            invoiceNumberNakl:
              item.invoiceNumberNakl ?? docNums.invoiceNumberNakl,
            invoiceNumberAkt: item.invoiceNumberAkt ?? docNums.invoiceNumberAkt,

            aktNumber: item.aktNumber ?? docNums.aktNumber,
            naklNumber: item.naklNumber ?? docNums.naklNumber,
            koshtorisNumber: item.koshtorisNumber ?? docNums.koshtorisNumber,

            contrProectAvtorskNumber:
              item.contrProectAvtorskNumber ?? docNums.contrProectAvtorskNumber,
            aktProectAvtorskNumber:
              item.aktProectAvtorskNumber ?? docNums.aktProectAvtorskNumber,

            jurnalAvtoskiyNumber:
              item.jurnalAvtoskiyNumber ?? docNums.jurnalAvtoskiyNumber,
            jurnalRabotNumber:
              item.jurnalRabotNumber ?? docNums.jurnalRabotNumber,
            prikazGipNumber: item.prikazGipNumber ?? docNums.prikazGipNumber,
            prikazEngineeNumber:
              item.prikazEngineeNumber ?? docNums.prikazEngineeNumber,
            prikazOhranaTrudaNumber:
              item.prikazOhranaTrudaNumber ?? docNums.prikazOhranaTrudaNumber,

            proectnSumBudjet: item.proectnSumBudjet?.toFixed(2) ?? '890',
            avtorskSumBudjet: item.avtorskSumBudjet?.toFixed(2) ?? '890',
            expertizaSumBudjet: item.expertizaSumBudjet?.toFixed(2) ?? '0',
            tehnadzorSumBudjet: item.tehnadzorSumBudjet?.toFixed(2) ?? '0',
            tehnadzorSumBudjetGlava1_9:
              item.tehnadzorSumBudjetGlava1_9?.toFixed(2) ?? '0',

            zvedeniySumBudjet: item.zvedeniySumBudjet?.toFixed(2) ?? '0',
            dogovornayaSumBudjet: item.dogovornayaSumBudjet?.toFixed(2) ?? '0',
            dopUgodaSum: item.dopUgodaSum?.toFixed(2) ?? '0',

            salaryMin: item.salaryMin?.toFixed(2) ?? '6700',
            salaryLevel_3_8: item.salaryLevel_3_8?.toFixed(2) ?? '14627',
            lifeTime: item.lifeTime?.toFixed(2) ?? '100',
            whereWirkIsPerfomed: item.whereWirkIsPerfomed ?? `в під'їзді`,

            paymentSourceProectnAvt: item.paymentSourceProectnAvt ?? 'собств',
            startMonthWorkBudjet:
              item.startMonthWorkBudjet ?? defMonth.startMonth,
            endMonthWorkBudjet: item.endMonthWorkBudjet ?? defMonth.endMonth,
            kodDkBudjet:
              item.kodDkBudjet ??
              'код ДК 021:2015 - 45453000-7 Капітальний ремонт і реставрація',
            endWorkRemservis: item.endWorkRemservis
              ? new Date(item.endWorkRemservis).toISOString().split('T')[0]
              : new Date().toISOString().split('T')[0],

            prepaymentPercentage: item.prepaymentPercentage.toFixed(2) ?? '70',
            //@ts-ignore
            contractType: item.contractType!._id.toString(),
            //@ts-ignore
            paymentSource: item.paymentSource!._id.toString(),
            //@ts-ignore
            responsibleManager: item.responsibleManager._id.toString(),
            //@ts-ignore
            responsibleWorker: item.responsibleWorker._id.toString(),
            remsCalendarGrafikUnit: item.remsCalendarGrafikUnit ?? ``,
            remsCalendarGrafikAmount: item.remsCalendarGrafikAmount ?? `0`,
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

          const localArrOfRelNakl = await get__all(
            {
              page: '0',
              limit: '0',
              filter: '',
              contract: id,
            },
            `/manager/documents/nakladnaya`
          );

          const localArrOfRelAkt = await get__all(
            {
              page: '0',
              limit: '0',
              filter: '',
              contract: id,
            },
            `/manager/documents/akt-of-work`
          );

          if (localArrOfRelNakl?.items?.length > 0) {
            const relNakl = localArrOfRelNakl?.items[0];
            setRelNaklId(relNakl._id);
            setRelNaklSum(Number(relNakl.totalNaklSum));
          }
          if (localArrOfRelAkt?.items?.length > 0) {
            const relAkt = localArrOfRelAkt?.items[0];
            setRelAktId(relAkt._id);
            setRelAktSum(Number(relAkt.totalSums.totalAktSum));
          }
          const localArrOfcalendarnGrafik = await get__all(
            {
              page: '0',
              limit: '0',
              filter: '',
              contract: id,
            },
            `/manager/documents/calendarn-grafik`
          );
          if (localArrOfcalendarnGrafik?.items?.length > 0) {
            const relGrafik = localArrOfcalendarnGrafik?.items[0];
            setCalendGrafikId(relGrafik._id);
          }

          const localArrOfRelnaklRems = await get__all(
            {
              page: '0',
              limit: '0',
              filter: '',
              contract: id,
            },
            `/manager/documents/nakl-rems`
          );
          if (localArrOfRelnaklRems?.items?.length > 0) {
            const relNaklRems = localArrOfRelnaklRems?.items[0];
            setRemsNaklId(relNaklRems._id);
          }

          const localArrOfRelAktlRemsMusor = await get__all(
            {
              page: '0',
              limit: '0',
              filter: '',
              contract: id,
            },
            `/manager/documents/akt-rems-musor`
          );
          if (localArrOfRelAktlRemsMusor?.items?.length > 0) {
            const relAKtRemsMusor = localArrOfRelAktlRemsMusor?.items[0];
            setRemsAktMusorlId(relAKtRemsMusor._id);
          }
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

      invoiceNumberBase,
      invoiceNumberNakl,
      invoiceNumberAkt,

      aktNumber,
      naklNumber,
      koshtorisNumber,

      contrProectAvtorskNumber,
      aktProectAvtorskNumber,

      jurnalAvtoskiyNumber,
      jurnalRabotNumber,
      prikazGipNumber,
      prikazEngineeNumber,
      prikazOhranaTrudaNumber,

      proectnSumBudjet: Number(proectnSumBudjet),
      avtorskSumBudjet: Number(avtorskSumBudjet),
      expertizaSumBudjet: Number(expertizaSumBudjet),
      tehnadzorSumBudjet: Number(tehnadzorSumBudjet),
      tehnadzorSumBudjetGlava1_9: Number(tehnadzorSumBudjetGlava1_9),

      zvedeniySumBudjet: Number(zvedeniySumBudjet),
      dogovornayaSumBudjet: Number(dogovornayaSumBudjet),
      dopUgodaSum: Number(dopUgodaSum),

      salaryMin: Number(salaryMin),
      salaryLevel_3_8: Number(salaryLevel_3_8),
      lifeTime: Number(lifeTime),
      whereWirkIsPerfomed: whereWirkIsPerfomed,

      paymentSourceProectnAvt,
      startMonthWorkBudjet,
      endMonthWorkBudjet,
      kodDkBudjet,

      endWorkRemservis,
      remsCalendarGrafikUnit,
      remsCalendarGrafikAmount,

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
          <Grid item sx={{ width: 200 }}>
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
          <Grid item sx={{ width: 300 }}>
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
          justifyContent={`space-between`}
          alignItems={`center`}
          spacing={2}
        >
          <Grid item xs={6}>
            <TextField
              margin='normal'
              size='small'
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
              size='small'
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

      <Grid item sx={{ width: '100%' }}>
        <Grid
          container
          direction={`row`}
          sx={{ border: '1px solid grey' }}
          // spacing={1}
        >
          <Grid item xs={3} sx={{ border: '1px solid grey', padding: 1 }}>
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
                      value={contractNumber ?? ''}
                      onChange={onChange}
                    />
                  </Grid>
                  <Grid
                    item
                    sx={{ display: mode === 'edit' ? 'block' : 'none' }}
                  >
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
                      value={contractDate ?? ''}
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
                      value={guaranteePeriod ?? ''}
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
                      value={prepaymentPercentage ?? ''}
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
                      value={invoiceNumberBase ?? ''}
                      onChange={onChange}
                    />
                  </Grid>
                  <Grid
                    item
                    sx={{ display: mode === 'edit' ? 'block' : 'none' }}
                  >
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
                      value={invoiceNumberNakl ?? ''}
                      onChange={onChange}
                    />
                  </Grid>
                  <Grid
                    item
                    sx={{ display: mode === 'edit' ? 'block' : 'none' }}
                  >
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
                      value={invoiceNumberAkt ?? ''}
                      onChange={onChange}
                    />
                  </Grid>
                  <Grid
                    item
                    sx={{ display: mode === 'edit' ? 'block' : 'none' }}
                  >
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
                      value={aktNumber ?? ''}
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

                  <Grid
                    item
                    sx={{ display: mode === 'edit' ? 'block' : 'none' }}
                  >
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
                  <Grid
                    item
                    sx={{ display: mode === 'edit' ? 'block' : 'none' }}
                  >
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
                      value={naklNumber ?? ''}
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
                  <Grid
                    item
                    sx={{ display: mode === 'edit' ? 'block' : 'none' }}
                  >
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
                  <Grid
                    item
                    sx={{ display: mode === 'edit' ? 'block' : 'none' }}
                  >
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
                      value={koshtorisNumber ?? ''}
                      onChange={onChange}
                    />
                  </Grid>
                  <Grid
                    item
                    sx={{ display: mode === 'edit' ? 'block' : 'none' }}
                  >
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
                  <Grid
                    item
                    sx={{ display: mode === 'edit' ? 'block' : 'none' }}
                  >
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
          </Grid>

          <Grid item xs={6} sx={{ border: '1px solid grey', padding: 1 }}>
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
                      value={kodDkBudjet ?? ''}
                      onChange={onChange}
                    />
                  </Grid>
                  <Grid item sx={{ flex: 1 }}>
                    <MySelectAutoCompl
                      selectName={`startMonthWorkBudjet`}
                      selectLabel={`месяц Старт`}
                      fieldToShow={`caption`}
                      handleChangeSelects={handleChangeSelects}
                      selectedOption={startMonthWorkBudjet ?? ''}
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
                      selectedOption={endMonthWorkBudjet ?? ''}
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
                      selectedOption={paymentSourceProectnAvt ?? ''}
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
                      value={dogovornayaSumBudjet ?? ''}
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
                      value={zvedeniySumBudjet ?? ''}
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
                      value={proectnSumBudjet ?? ''}
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
                      value={avtorskSumBudjet ?? ''}
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
                      value={tehnadzorSumBudjet ?? ''}
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
                      value={tehnadzorSumBudjetGlava1_9 ?? ''}
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
                      value={expertizaSumBudjet ?? ''}
                      onChange={onChange}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item sx={{ width: '100%' }}>
                <Grid
                  container
                  direction={`row`}
                  justifyContent={`flex-start`}
                  alignItems={`flex-start`}
                >
                  <Grid item xs={6} sx={{ padding: 1 }}>
                    <Grid
                      container
                      direction={`column`}
                      justifyContent={`flex-start`}
                      // spacing={2}
                      alignItems={`center`}
                    >
                      <Grid
                        item
                        sx={{ width: '100%', border: '1px solid grey' }}
                      >
                        <Typography variant='body1' align='center'>
                          ЖКХ
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        mt={1}
                        sx={{ width: '100%', border: '1px solid grey' }}
                      >
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
                              value={contrProectAvtorskNumber ?? ''}
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
                              value={aktProectAvtorskNumber ?? ''}
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
                      <Grid
                        item
                        mt={1}
                        sx={{ width: '100%', border: '1px solid grey' }}
                      >
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
                              disabled={
                                !id || paymentSourceProectnAvt === 'собств'
                              }
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
                      <Grid
                        item
                        mt={1}
                        sx={{ width: '100%', border: '1px solid grey' }}
                      >
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
                                href={`/manager/documents/calendarn-grafik/add`}
                              >
                                <AddCircleOutlineIcon />
                              </IconButton>
                            </Grid>
                          )}
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
                      <Grid
                        item
                        mt={1}
                        sx={{ width: '100%', border: '1px solid grey' }}
                      >
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
                      <Grid
                        item
                        mt={1}
                        sx={{ width: '100%', border: '1px solid grey' }}
                      >
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
                              href={`/manager/documents/nakl-rems/print/nakl1/${remsNaklId}`}
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
                  <Grid item xs={6} sx={{ padding: 1 }}>
                    <Grid
                      container
                      direction={`column`}
                      justifyContent={`flex-start`}
                      alignItems={`center`}
                    >
                      <Grid
                        item
                        sx={{ width: '100%', border: '1px solid grey' }}
                      >
                        <Typography variant='body1' align='center'>
                          Ремсервис
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        mt={1}
                        sx={{ width: '100%', border: '1px solid grey' }}
                      >
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
                              href={`${currentURL}/print/rems-budjet-proectn-koshtoris/${id}`}
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
                              href={`${currentURL}/print/rems-budjet-avtorsk-koshtoris/${id}`}
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
                      <Grid
                        item
                        mt={1}
                        sx={{ width: '100%', border: '1px solid grey' }}
                      >
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
                              value={jurnalAvtoskiyNumber ?? ''}
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
                              value={jurnalRabotNumber ?? ''}
                              onChange={onChange}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid
                        item
                        mt={1}
                        sx={{ width: '100%', border: '1px solid grey' }}
                      >
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
                      <Grid
                        item
                        mt={1}
                        sx={{ width: '100%', border: '1px solid grey' }}
                      >
                        <Grid
                          container
                          direction={`row`}
                          justifyContent={`space-between`}
                          alignItems={`center`}
                        >
                          <Grid item>
                            <Button
                              disabled={
                                remsCalendarGrafikUnit === '' ||
                                remsCalendarGrafikAmount === '0'
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
                              required
                              fullWidth
                              name='remsCalendarGrafikUnit'
                              label='Ед.изм'
                              type='text'
                              id='remsCalendarGrafikUnit'
                              value={remsCalendarGrafikUnit ?? ''}
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
                              name='remsCalendarGrafikAmount'
                              label='Кол-во'
                              type='number'
                              id='remsCalendarGrafikAmount'
                              value={remsCalendarGrafikAmount ?? ''}
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
                      <Grid
                        item
                        mt={1}
                        sx={{ width: '100%', border: '1px solid grey' }}
                      >
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
                              value={prikazGipNumber ?? ''}
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
                              value={prikazEngineeNumber ?? ''}
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
                              value={prikazOhranaTrudaNumber ?? ''}
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
                      <Grid
                        item
                        mt={1}
                        sx={{ width: '100%', border: '1px solid grey' }}
                      >
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
                      <Grid
                        item
                        mt={1}
                        sx={{ width: '100%', border: '1px solid grey' }}
                      >
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
                              href={`/manager/documents/nakl-rems/print/nakl1/${remsNaklId}`}
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
                      <Grid
                        item
                        mt={1}
                        sx={{ width: '100%', border: '1px solid grey' }}
                      >
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
                      <Grid
                        item
                        mt={1}
                        sx={{ width: '100%', border: '1px solid grey' }}
                      >
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
                              value={dopUgodaSum ?? ''}
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
                      <Grid
                        item
                        mt={1}
                        sx={{ width: '100%', border: '1px solid grey' }}
                      >
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
                              value={salaryMin ?? ''}
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
                              value={salaryLevel_3_8 ?? ''}
                              onChange={onChange}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid
                        item
                        mt={1}
                        sx={{ width: '100%', border: '1px solid grey' }}
                      >
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
                              value={lifeTime ?? ''}
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
                              value={whereWirkIsPerfomed ?? ''}
                              onChange={onChange}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={3} sx={{ border: '1px solid grey', padding: 1 }}>
            <Grid
              container
              direction={`column`}
              // spacing={1}
              // justifyContent={`space-between`}
              alignItems={`center`}
            >
              <Grid item>
                <Typography variant='body2'>Ремсервис</Typography>
              </Grid>
              <Grid
                item
                mt={1}
                sx={{ width: '100%', border: '1px solid grey' }}
              >
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
                      value={endWorkRemservis ?? ''}
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
              <Grid
                item
                mt={1}
                sx={{ width: '100%', border: '1px solid grey' }}
              >
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
                      href={`/manager/documents/nakl-rems/print/nakl1/${remsNaklId}`}
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
                      href={`/manager/documents/nakl-rems/print/nakl2/${remsNaklId}`}
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
                      href={`/manager/documents/nakl-rems/print/nakl1/${remsNaklId}`}
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
              <Grid
                item
                mt={1}
                sx={{ width: '100%', border: '1px solid grey' }}
              >
                <Grid
                  container
                  direction={`row`}
                  justifyContent={`space-between`}
                  alignItems={`center`}
                >
                  <Grid item sx={{ width: 50 }}>
                    <Typography variant='body2' align='center'>
                      Допуски
                    </Typography>
                  </Grid>

                  <Grid item>
                    <Button
                      disabled={!id}
                      startIcon={<PrintIcon />}
                      component={Link}
                      href={`${currentURL}/print/rems-potochn-dopusk-voznesen/${id}`}
                      fullWidth
                      size='small'
                      color='success'
                      variant='contained'
                    >
                      Возн
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      disabled={!id}
                      startIcon={<PrintIcon />}
                      component={Link}
                      href={`${currentURL}/print/rems-potochn-dopusk-zavodsk/${id}`}
                      fullWidth
                      size='small'
                      color='success'
                      variant='contained'
                    >
                      Заводс
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      disabled={!id}
                      startIcon={<PrintIcon />}
                      component={Link}
                      href={`${currentURL}/print/rems-potochn-dopusk-ukrainskaya/${id}`}
                      fullWidth
                      size='small'
                      color='success'
                      variant='contained'
                    >
                      Украинская
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                mt={1}
                sx={{ width: '100%', border: '1px solid grey' }}
              >
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
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid
          container
          direction={`row`}
          justifyContent={`space-between`}
          alignItems={`flex-start`}
        >
          <Grid item xs={6} sx={{ border: '1px solid grey', padding: 1 }}>
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
                        checked={
                          contractStages.isDocumentsHaveBeenGivenToClient
                        }
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
          </Grid>
          {/* <Grid
            item
            xs={3}
            sx={{ border: '1px solid grey', padding: 1 }}
          ></Grid> */}
          {/* <Grid
            item
            xs={3}
            sx={{ border: '1px solid grey', padding: 1 }}
          ></Grid> */}
          <Grid item xs={6} sx={{ border: '1px solid grey', padding: 1 }}>
            <Grid
              container
              direction={`column`}
              justifyContent={`flex-start`}
              alignItems={`center`}
            >
              <Grid
                item
                sx={{
                  display: accountant_role.includes(user?.role!)
                    ? 'block'
                    : 'none',
                  width: '100%',
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
                        sx={{
                          color: otherParticipantsSum > 100 ? 'red' : 'green',
                        }}
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
                              handleChangeSelects={
                                handleChangeSelectsParticipant
                              }
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
                              size='small'
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
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid item sx={{ width: '100%' }}></Grid>
    </Grid>
  );
}
