import type { Metadata } from 'next';

import MyIconButtonAdd from '@/components/common/MyIconButtonAdd';

import TableFilter from '@/components/common/TableFilter';
const currentURL = `/accountant/refdata/worker-profession`;

export const metadata: Metadata = {
  title: 'Профессии',
};

function WorkerProfessionList() {
  const headerFields = ['Наименование'];
  const tableFields = ['workerProfessionName'];
  return (
    <>
      <MyIconButtonAdd href={`${currentURL}/add`} />

      <TableFilter
        headerFields={headerFields}
        tableFields={tableFields}
        currentURL={currentURL}
        tableHeader={`Профессии`}
      />
    </>
  );
}

export default WorkerProfessionList;
