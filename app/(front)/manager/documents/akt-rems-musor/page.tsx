import type { Metadata } from 'next';

import MyIconButtonAdd from '@/components/common/MyIconButtonAdd';

import AktRemsMusorShow from './AktRemsMusorShow';
const currentURL = `/manager/documents/akt-rems-musor`;

const title = 'Накладные Ремс';

export const metadata: Metadata = {
  title: title,
};

export default function AktRemsMusorList() {
  return (
    <>
      <MyIconButtonAdd href={`${currentURL}/add`} />

      <AktRemsMusorShow currentURL={currentURL} tableHeader={title} />
    </>
  );
}
