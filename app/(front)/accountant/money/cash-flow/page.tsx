import type { Metadata } from 'next';

import MyIconButtonAdd from '@/components/common/MyIconButtonAdd';

import CashFlowShow from './CashFlowShow';
const currentURL = `/accountant/money/cash-flow`;

const title = 'Движение по кассе';

export const metadata: Metadata = {
  title: title,
};

export default function CashFlowList() {
  return (
    <>
      <MyIconButtonAdd href={`${currentURL}/add`} />

      <CashFlowShow currentURL={currentURL} tableHeader={title} />
    </>
  );
}
