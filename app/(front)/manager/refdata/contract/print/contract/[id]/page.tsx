'use client';
import React, { useState, useLayoutEffect } from 'react';
import { paramsProps } from '@/interfaces/CommonInterfaces';

import { item__get_one, get__all } from '@/lib/actions/refdata.actions';

import { I_Contract, I_Client } from '@/interfaces/refdata';

import AgroContractPrint from '@/components/documents/formsToPrint/AgroContractPrint';
import BaseContractPrint from '@/components/documents/formsToPrint/BaseContractPrint';
import BudjetJkhContractPrint from '@/components/documents/formsToPrint/BudjetJkhContractPrint';
import RemsContractBudjetPrint from '@/components/documents/formsToPrint/RemsContractBudjetPrint';
import RemsContractPotochnPrint from '@/components/documents/formsToPrint/RemsContractPotochnPrint';
import RemsContractTenderPrint from '@/components/documents/formsToPrint/RemsContractTenderPrint';

const currentURL = '/manager/refdata/contract';

export default function ContractPrint({ params }: Readonly<paramsProps>) {
  const { id } = params;
  const [currentContract, setCurrentContract] = useState<I_Contract>();
  const [currentContractType, setCurrentContractType] = useState('');
  const [currentOurFirm, setCurrentOurFirm] = useState<I_Client>();
  const [currentClient, setCurrentClient] = useState<I_Client>();
  const [naklSum, setNaklSum] = useState(0);
  const [aktSum, setAktSum] = useState(0);

  useLayoutEffect(() => {
    if (id) {
      const myGetOne = async () => {
        const currentContract = await item__get_one({ _id: id }, currentURL);
        const localRelatedNakls = await get__all(
          {
            page: '0',
            limit: '0',
            filter: '',
            contract: id,
          },
          '/manager/documents/nakladnaya'
        );

        const localRelatedAkts = await get__all(
          {
            page: '0',
            limit: '0',
            filter: '',
            contract: id,
          },
          '/manager/documents/akt-of-work'
        );

        const totalNakl = localRelatedNakls.items.reduce(
          (accumulator: number, currentValue: number) =>
            //@ts-ignore
            accumulator + Number(currentValue.totalNaklSum),
          0
        );
        const totalAkt = localRelatedAkts.items.reduce(
          (accumulator: number, currentValue: number) =>
            //@ts-ignore
            accumulator + Number(currentValue.totalSums.totalAktSum),
          0
        );

        const localOurFirm = await item__get_one(
          //@ts-ignore
          { _id: currentContract?.ourFirm?._id },
          '/manager/refdata/client'
        );

        const localClient = await item__get_one(
          //@ts-ignore
          { _id: currentContract?.client._id },
          '/manager/refdata/client'
        );

        setCurrentContract(currentContract);
        //@ts-ignore
        setCurrentContractType(currentContract?.contractType?.contractTypeName);
        setCurrentOurFirm(localOurFirm);
        setCurrentClient(localClient);

        setNaklSum(totalNakl);
        setAktSum(totalAkt);
      };
      myGetOne();
    }
  }, [id]);

  if (currentContractType === 'Ремсервис(тендер)') {
    return <RemsContractTenderPrint />;
  } else if (currentContractType === 'Ремсервис (бюджет)') {
    return (
      <RemsContractBudjetPrint
        currentContract={currentContract!}
        currentOurFirm={currentOurFirm!}
        currentClient={currentClient!}
        aktSum={aktSum ?? 0}
      />
    );
  } else if (currentContractType === 'Ремсервис (поточный)') {
    return (
      <RemsContractPotochnPrint
        currentContract={currentContract!}
        currentOurFirm={currentOurFirm!}
        currentClient={currentClient!}
        aktSum={aktSum ?? 0}
      />
    );
  } else if (currentContractType === 'Бюджет ЖКХ') {
    return (
      <BudjetJkhContractPrint
        currentContract={currentContract!}
        currentOurFirm={currentOurFirm!}
        currentClient={currentClient!}
      />
    );
  } else if (currentContractType === 'Дог. Агросервис') {
    return (
      <AgroContractPrint
        currentContract={currentContract!}
        currentOurFirm={currentOurFirm!}
        currentClient={currentClient!}
        naklSum={naklSum ?? 0}
        aktSum={aktSum ?? 0}
      />
    );
  } else {
    return (
      <BaseContractPrint
        currentContract={currentContract!}
        currentContractType={currentContractType}
        currentOurFirm={currentOurFirm!}
        currentClient={currentClient!}
        naklSum={naklSum ?? 0}
        aktSum={aktSum ?? 0}
      />
    );
  }
}
