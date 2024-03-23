'use client';
import React, { useState, useLayoutEffect } from 'react';
import { paramsProps } from '@/interfaces/CommonInterfaces';
import { I_Contract, I_Client, I_CalendarnGrafik } from '@/interfaces/refdata';
import { item__get_one, get__all } from '@/lib/actions/refdata.actions';

import RemsBudjetJurnalRabotToPrint from '@/components/documents/formsToPrint/rems-budjet/RemsBudjetJurnalRabotToPrint';

export default function RemsBudjetJurnalRabotPrint({
  params,
}: Readonly<paramsProps>) {
  const { id } = params;
  const [currentContract, setCurrentContract] = useState<I_Contract>();
  const [currentCalendarnGrafik, setCurrentCalendarnGrafik] =
    useState<I_CalendarnGrafik>();
  const [currentExecutor, setCurrentExecutor] = useState<I_Client>();
  useLayoutEffect(() => {
    if (id) {
      const myGetOne = async () => {
        const localContract = await item__get_one(
          { _id: id },
          '/manager/refdata/contract'
        );
        const localCalendarnGrafiks = await get__all(
          //@ts-ignore
          {
            page: '0',
            limit: '0',
            filter: '',
            contract: id,
          },
          '/manager/documents/calendarn-grafik'
        );

        const localExecutor = await item__get_one(
          //@ts-ignore
          { _id: localContract?.ourFirm._id },
          '/manager/refdata/client'
        );

        setCurrentContract(localContract);
        setCurrentExecutor(localExecutor);
        setCurrentCalendarnGrafik(localCalendarnGrafiks?.items[0]);
      };
      myGetOne();
    }
  }, [id]);

  return (
    <RemsBudjetJurnalRabotToPrint
      currentContract={currentContract!}
      currentExecutor={currentExecutor!}
      currentCalendarnGrafik={currentCalendarnGrafik!}
    />
  );
}
