import type { Metadata } from 'next';

import MyIconButtonAdd from '@/components/common/MyIconButtonAdd';

import NaklRemsShow from './NaklRemsShow';
const currentURL = `/manager/documents/nakl-rems`;

const title = 'Накладные Ремс';

export const metadata: Metadata = {
  title: title,
};

export default function DocumentNakladnayaList() {
  return (
    <>
      <MyIconButtonAdd href={`${currentURL}/add`} />

      <NaklRemsShow currentURL={currentURL} tableHeader={title} />
    </>
  );
}
