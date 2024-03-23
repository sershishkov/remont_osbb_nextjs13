'use client';
import React, { useState, useLayoutEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { I_Contract } from '@/interfaces/refdata';
import { item__get_one } from '@/lib/actions/refdata.actions';
import { paramsProps } from '@/interfaces/CommonInterfaces';
import RemsBudjetProectnKoshtorisToPrint from '@/components/documents/formsToPrint/rems-budjet/RemsBudjetProectnKoshtorisToPrint';

export default function RemsBudjetProectnKoshtorisPrint({
  params,
}: Readonly<paramsProps>) {
  const { id } = params;
  const searchParam = useSearchParams();
  const mode = searchParam.get('mode');
  const [currentContract, setCurrentContract] = useState<I_Contract>();

  useLayoutEffect(() => {
    if (id) {
      const myGetOne = async () => {
        const localContract = await item__get_one(
          { _id: id },
          '/manager/refdata/contract'
        );

        setCurrentContract(localContract);
      };
      myGetOne();
    }
  }, [id]);

  return (
    <RemsBudjetProectnKoshtorisToPrint
      currentContract={currentContract!}
      mode={mode!}
    />
  );
}
