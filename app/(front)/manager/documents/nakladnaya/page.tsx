import type { Metadata } from 'next';

import MyIconButtonAdd from '@/components/common/MyIconButtonAdd';

import NaklShow from './NaklShow';
const currentURL = `/manager/documents/nakladnaya`;

const title = 'Накладные';

export const metadata: Metadata = {
  title: title,
};

export default function DocumentNakladnayaList() {
  return (
    <>
      <MyIconButtonAdd href={`${currentURL}/add`} />

      <NaklShow currentURL={currentURL} tableHeader={title} />
    </>
  );
}
