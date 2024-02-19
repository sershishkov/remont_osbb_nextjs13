import type { Metadata } from 'next';

import MyIconButtonAdd from '@/components/common/MyIconButtonAdd';

import ContractShow from './ContractShow';
const currentURL = `/manager/refdata/contract`;

const title = 'Контракты';

export const metadata: Metadata = {
  title: title,
};

export default function ContractList() {
  return (
    <>
      <MyIconButtonAdd href={`${currentURL}/add`} />

      <ContractShow currentURL={currentURL} tableHeader={title} />
    </>
  );
}
