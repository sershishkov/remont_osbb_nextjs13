import type { Metadata } from 'next';

import MyIconButtonAdd from '@/components/common/MyIconButtonAdd';

import CashRegisterShow from './CashRegisterShow';
const currentURL = `/accountant/refdata/cash-register`;

const title = 'Кассы';

export const metadata: Metadata = {
  title: title,
};

export default function CashRegisterList() {
  return (
    <>
      <MyIconButtonAdd href={`${currentURL}/add`} />

      <CashRegisterShow currentURL={currentURL} tableHeader={title} />
    </>
  );
}
