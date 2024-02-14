import type { Metadata } from 'next';

import MyIconButtonAdd from '@/components/common/MyIconButtonAdd';

import TableFilter from '@/components/common/TableFilter';
const currentURL = `/accountant/refdata/client-type`;

const title = 'Типы Клиентов';

export const metadata: Metadata = {
  title: title,
};

export default function ClientTypeList() {
  const headerFields = ['Наименование'];
  const tableFields = ['clientTypeName'];
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
