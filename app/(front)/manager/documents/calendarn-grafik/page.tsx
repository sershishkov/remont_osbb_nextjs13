import type { Metadata } from 'next';

import MyIconButtonAdd from '@/components/common/MyIconButtonAdd';

import CalendarnShow from './CalendarnShow';
const currentURL = `/manager/documents/calendarn-grafik`;

const title = 'Календарные графики';

export const metadata: Metadata = {
  title: title,
};

export default function CalendarnList() {
  return (
    <>
      <MyIconButtonAdd href={`${currentURL}/add`} />

      <CalendarnShow currentURL={currentURL} tableHeader={title} />
    </>
  );
}
