import type { Metadata } from 'next';

import MyIconButtonAdd from '@/components/common/MyIconButtonAdd';

import TableFilter from '@/components/common/TableFilter';
const currentURL = `/manager/refdata/client`;

const title = 'Контрагенты';

export const metadata: Metadata = {
  title: title,
};

export default function ServiceWorksList() {
  const headerFields = ['Фирма', 'ТИП', 'Тел:', 'email'];
  const tableFields = [
    'clientLongName',
    'firmType.firmTypeShortName',
    'telNumber',
    'email',
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
