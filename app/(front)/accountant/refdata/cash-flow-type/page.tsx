import type { Metadata } from 'next';

import MyIconButtonAdd from '@/components/common/MyIconButtonAdd';

import CashFlowTypeShow from './CashFlowTypeShow';
const currentURL = `/accountant/refdata/cash-flow-type`;

const title = 'Тип операции по кассе';

export const metadata: Metadata = {
  title: title,
};

export default function CashRegisterList() {
  return (
    <>
      <MyIconButtonAdd href={`${currentURL}/add`} />

      <CashFlowTypeShow currentURL={currentURL} tableHeader={title} />
    </>
  );
}
