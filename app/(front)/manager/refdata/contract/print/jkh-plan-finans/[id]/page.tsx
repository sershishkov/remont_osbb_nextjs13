'use client';
import React, { useState, useLayoutEffect } from 'react';
import { paramsProps } from '@/interfaces/CommonInterfaces';
import { I_Contract, I_Client } from '@/interfaces/refdata';
import { item__get_one } from '@/lib/actions/refdata.actions';

import JkhPlanFinansToPrint from '@/components/documents/formsToPrint/jkh/JkhPlanFinansToPrint';

export default function JkhPlanFinansPrint({ params }: Readonly<paramsProps>) {
  const { id } = params;
  const [currentContract, setCurrentContract] = useState<I_Contract>();
  const [currentClient, setCurrentClient] = useState<I_Client>();
  const [currentExecutor, setCurrentExecutor] = useState<I_Client>();

  useLayoutEffect(() => {
    if (id) {
      const myGetOne = async () => {
        const currentContract = await item__get_one(
          { _id: id },
          '/manager/refdata/contract'
        );
        const localClient = await item__get_one(
          //@ts-ignore
          { _id: currentContract?.client._id },
          '/manager/refdata/client'
        );
        const localExecutor = await item__get_one(
          //@ts-ignore
          { _id: currentContract?.ourFirm._id },
          '/manager/refdata/client'
        );

        setCurrentContract(currentContract);
        setCurrentClient(localClient);
        setCurrentExecutor(localExecutor);
      };
      myGetOne();
    }
  }, [id]);
  return (
    <JkhPlanFinansToPrint
      currentContract={currentContract!}
      currentClient={currentClient!}
      currentExecutor={currentExecutor!}
    />
  );
}
