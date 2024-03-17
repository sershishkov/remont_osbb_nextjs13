'use client';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { item__get_one } from '@/lib/actions/refdata.actions';
import { paramsProps } from '@/interfaces/CommonInterfaces';

import NaklRems1ToPrint from '@/components/documents/formsToPrint/nakl-rems/NaklRems1ToPrint';
import NaklRems2ToPrint from '@/components/documents/formsToPrint/nakl-rems/NaklRems2ToPrint';
import NaklRems3ToPrint from '@/components/documents/formsToPrint/nakl-rems/NaklRems3ToPrint';
import { I_NakladnayaRems } from '@/interfaces/refdata';

export default function NaklRemsPrint({ params }: Readonly<paramsProps>) {
  const { id } = params;
  const searchParam = useSearchParams();
  const mode = searchParam.get('mode');
  const [currentNakl, setCurrentNakl] = useState<I_NakladnayaRems>();

  useEffect(() => {
    if (id) {
      const myGetOne = async () => {
        const localNakl = await item__get_one(
          { _id: id },
          '/manager/documents/nakl-rems'
        );

        setCurrentNakl(localNakl);
      };

      myGetOne();
    }
  }, [id]);
  if (mode === 'percent1') {
    return <NaklRems1ToPrint currentNakl={currentNakl!} />;
  } else if (mode === 'percent2') {
    return <NaklRems2ToPrint currentNakl={currentNakl!} />;
  } else if (mode === 'percent3') {
    return <NaklRems3ToPrint currentNakl={currentNakl!} />;
  } else {
    return <p>Увы не та метка для накладной</p>;
  }
}
