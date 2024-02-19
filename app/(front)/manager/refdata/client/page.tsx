import type { Metadata } from 'next';

import MyIconButtonAdd from '@/components/common/MyIconButtonAdd';

import ClientsShow from './ClientsShow';
const currentURL = `/manager/refdata/client`;

const title = 'Контрагенты';

export const metadata: Metadata = {
  title: title,
};

export default function ServiceWorksList() {
  return (
    <>
      <MyIconButtonAdd href={`${currentURL}/add`} />

      <ClientsShow currentURL={currentURL} tableHeader={title} />
    </>
  );
}
