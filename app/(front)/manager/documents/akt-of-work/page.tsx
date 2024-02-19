import type { Metadata } from 'next';

import MyIconButtonAdd from '@/components/common/MyIconButtonAdd';

import AktShow from './AktShow';
const currentURL = `/manager/documents/akt-of-work`;

const title = 'Акты';

export const metadata: Metadata = {
  title: title,
};

export default function DocumentAktOfWorkList() {
  return (
    <>
      <MyIconButtonAdd href={`${currentURL}/add`} />

      <AktShow currentURL={currentURL} tableHeader={title} />
    </>
  );
}
