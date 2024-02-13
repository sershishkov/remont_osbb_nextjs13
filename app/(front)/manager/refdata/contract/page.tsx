import type { Metadata } from 'next';

import MyIconButtonAdd from '@/components/common/MyIconButtonAdd';

import TableFilter from '@/components/common/TableFilter';
const currentURL = `/manager/refdata/contract`;

const title = 'Контракты';

export const metadata: Metadata = {
  title: title,
};

export default function ContractList() {
  const headerFields = [
    'Номер контракта',
    'наша фирма',
    'Клиент',

    'Описание работ',
  ];
  const tableFields = [
    'contractNumber',
    'ourFirm.clientShortName',
    'client.clientShortName',

    'contractDescription',
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
