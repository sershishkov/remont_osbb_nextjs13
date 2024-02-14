import type { Metadata } from 'next';

import MyIconButtonAdd from '@/components/common/MyIconButtonAdd';

import TableFilter from '@/components/common/TableFilter';
const currentURL = `/accountant/refdata/storehouse`;

const title = 'Склады';

export const metadata: Metadata = {
  title: title,
};

export default function StoreHouseList() {
  const headerFields = ['Наименование', 'Адрес', 'Ответственный'];
  const tableFields = [
    'storeHouseName',
    'address',
    'responsiblePerson.lastName',
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
