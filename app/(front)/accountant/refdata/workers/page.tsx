import type { Metadata } from 'next';

import MyIconButtonAdd from '@/components/common/MyIconButtonAdd';

import TableFilter from '@/components/common/TableFilter';
const currentURL = `/accountant/refdata/workers`;

export const metadata: Metadata = {
  title: 'Сотрудники',
};

function WorkersList() {
  const headerFields = ['Фамилия', 'Имя', 'NikName'];
  const tableFields = ['lastName', 'firstName', 'user.name'];

  return (
    <>
      <MyIconButtonAdd href={`${currentURL}/add`} />

      <TableFilter
        headerFields={headerFields}
        tableFields={tableFields}
        currentURL={currentURL}
        tableHeader={`Сотрудники`}
      />
    </>
  );
}

export default WorkersList;
