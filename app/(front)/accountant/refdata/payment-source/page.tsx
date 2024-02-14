import type { Metadata } from 'next';

import MyIconButtonAdd from '@/components/common/MyIconButtonAdd';

import TableFilter from '@/components/common/TableFilter';
const currentURL = `/accountant/refdata/payment-source`;

const title = 'Источники средств';

export const metadata: Metadata = {
  title: title,
};

export default function PaymentSourceList() {
  const headerFields = ['Наименование'];
  const tableFields = ['paymentSourceName'];
  return (
    <>
      <MyIconButtonAdd href={`${currentURL}/add`} />

      <TableFilter
        headerFields={headerFields}
        tableFields={tableFields}
        currentURL={currentURL}
        tableHeader={title}
      />
    </>
  );
}
