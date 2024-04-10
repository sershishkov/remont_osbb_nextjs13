'use client';
import React, { useState, useEffect } from 'react';
import { item__get_one } from '@/lib/actions/refdata.actions';
import { paramsProps } from '@/interfaces/CommonInterfaces';

import AktRemsMusorToPrint from '@/components/documents/formsToPrint/rems-potochn/AktRemsMusorToPrint';
import {
  I_Client,
  I_RowInAktRemsMusor,
  I_AktRemsMusor,
} from '@/interfaces/refdata';

export default function AktRemsMusorPrint({ params }: Readonly<paramsProps>) {
  const { id } = params;
  const [currentExecutor, setCurrentExecutor] = useState<I_Client>();
  const [currentClient, setCurrentClient] = useState<I_Client>();
  const [aktRemsMusorNumber, setAktRemsMusorNumber] = useState('');
  const [aktRemsMusorDate, setAktRemsMusorDate] = useState('');
  const [serviceWorks, setServiceWorks] = useState<I_RowInAktRemsMusor[]>([]);
  const [totalAktRemsMusorSum, setTotalAktRemsMusorSum] = useState('');
  const [totalAktRemsMusorToShow, setTotalAktRemsMusorToShow] = useState('');
  useEffect(() => {
    const myGetDetails = async () => {
      const currentAkt: I_AktRemsMusor = await item__get_one(
        { _id: id },
        '/manager/documents/akt-rems-musor'
      );

      const localExecutor = await item__get_one(
        //@ts-ignore
        { _id: currentAkt?.executorFirm._id },
        '/manager/refdata/client'
      );

      const localClient = await item__get_one(
        //@ts-ignore
        { _id: currentAkt?.ourFirm },
        '/manager/refdata/client'
      );

      const localAktRemsMusorNumber = currentAkt?.aktRemsMusorNumber;
      const localAktRemsMusorDate = new Date(
        currentAkt?.aktRemsMusorDate ?? ''
      ).toLocaleDateString('uk-UA', {
        year: 'numeric',
      });
      const localServiceWorks = currentAkt?.serviceWorks.map((work) => ({
        row_id: work?._id!,
        //@ts-ignore
        serviceWork: work?.serviceWork.serviceWorkName!,
        extraInformation: work?.extraInformation ?? '',
        //@ts-ignore
        unit: work?.serviceWork?.unit?.unitName!,
        amount: work?.amount.toString(),
        price: work?.price.toFixed(2),
        rowSum: work?.rowSum.toFixed(2),
      }));
      const localTotalAktRemsMusorSum = currentAkt?.totalAktRemsMusorSum;
      const localTotalAktRemsMusorToShow =
        currentAkt?.totalAktRemsMusorToShow.toFixed(2);

      setCurrentExecutor(localExecutor);
      setCurrentClient(localClient);

      setAktRemsMusorNumber(localAktRemsMusorNumber);
      setAktRemsMusorDate(localAktRemsMusorDate);
      setServiceWorks(localServiceWorks);
      setTotalAktRemsMusorSum(localTotalAktRemsMusorSum!);
      setTotalAktRemsMusorToShow(localTotalAktRemsMusorToShow);
    };
    myGetDetails();
  }, [id]);

  return (
    <AktRemsMusorToPrint
      currentExecutor={currentExecutor!}
      currentClient={currentClient!}
      aktRemsMusorNumber={aktRemsMusorNumber}
      aktRemsMusorDate={aktRemsMusorDate}
      serviceWorks={serviceWorks}
      totalAktRemsMusorSum={totalAktRemsMusorSum}
      totalAktRemsMusorToShow={totalAktRemsMusorToShow}
    />
  );
}
