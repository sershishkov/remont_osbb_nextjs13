import type { Metadata } from 'next';

import MyIconButtonAdd from '@/components/common/MyIconButtonAdd';

import TableFilter from '@/components/common/TableFilter';
const currentURL = `/manager/documents/akt-of-work`;

const title = 'Акты';

export const metadata: Metadata = {
  title: title,
};

export default function DocumentAktOfWorkList() {
  const headerFields = [
    '№ Дог',
    '№ Акта',
    'Сумма акта',
    'Наша фирма',
    'Клиент',
    'Работа',
  ];
  const tableFields = [
    'contract.contractNumber',
    'aktOfWorkNumber',

    'totalSums.totalAktSum',
    'contract.ourFirm.clientShortName',
    'contract.client.clientShortName',
    'contract.contractDescription',
  ];

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
